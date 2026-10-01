import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, id });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((currentMessages) => [...currentMessages, { text, firstName }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, id]);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName: user.firstName, userId, id, text });

    setMessages((currentMessages) => [...currentMessages, { text }]);
    setInput("");
  };

  return (
    <section
      aria-label={`Chat with ${id}`}
      className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100 shadow-xl sm:p-6"
    >
      <div
        role="log"
        aria-live="polite"
        className="flex min-h-64 max-h-[28rem] flex-col gap-3 overflow-y-auto rounded-xl border border-slate-700 bg-slate-950 p-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
          >
            {message.firstName && (
              <p className="m-0 text-sm font-semibold text-sky-400">
                {message.firstName}
              </p>
            )}
            <p className="m-0 break-words text-sm text-slate-100">
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Write a message..."
          aria-label="Write a message"
          className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Chat;