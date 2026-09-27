import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/__redux_store__/connectionsSlice";
import { useEffect } from "react";

// http://localhost:3000/user/connections
const Connections = () => {
  const connections = useSelector((store) => store.connection.connections);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      if (connections) return;
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.connections));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) return <div>Loading connections...</div>;

  if (connections.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">
        No connections found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-100">Connections</h1>
        <ul className="space-y-4">
          {connections.map((user) => {
            const connectionUser = user.user ;

            return (
              <li
                key={connectionUser._id}
                className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-700/80"
              >
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start">
                  {connectionUser.profilePicture?.trim() ? (
                    <img
                      src={connectionUser.profilePicture}
                      alt={`${connectionUser.firstName} ${connectionUser.lastName}`}
                      className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-2 ring-indigo-400/40"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white">
                      {connectionUser.firstName?.[0] || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-white">
                      {connectionUser.firstName} {connectionUser.lastName}
                    </h2>
                    {connectionUser.gender && (
                      <span className="text-sm capitalize text-indigo-300">
                        {connectionUser.gender}
                      </span>
                    )}
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {connectionUser.about ||
                        "This user has not added a bio yet."}
                    </p>
                    {connectionUser.phoneNumber && (
                      <p className="mt-3 text-sm text-slate-400">
                        Phone: {connectionUser.phoneNumber}
                      </p>
                    )}
                    {connectionUser.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {connectionUser.skills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Connections;
