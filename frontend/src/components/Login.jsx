import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/__redux_store__/userSlice";
import { BACKEND_API } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("priyaaa.patel@example.com");
  const [password, setPassword] = useState("Priyaa@2026");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${BACKEND_API}/auth/login`,
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
              Log in
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:translate-y-0"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
