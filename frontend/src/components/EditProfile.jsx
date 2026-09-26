import React, { useState } from "react";
import axios from "axios";
import { BACKEND_API } from "../utils/constants";
import { useEffect } from "react";

const EditProfile = ({user}) => {
  const fallbackValue = "Something else";
  const [firstName, setFirstName] = useState(user?.firstName || fallbackValue);
  const [lastName, setLastName] = useState(user?.lastName || fallbackValue);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || fallbackValue);
  const [gender, setGender] = useState(user?.gender || fallbackValue);
  const [about, setAbout] = useState(user?.about || fallbackValue);
  const [skills, setSkills] = useState(user?.skills || fallbackValue);

  async function handleFormSubmit() {
    try {
      const res = await axios.patch(BACKEND_API + "/profile/edit", {
        firstName,
        lastName,
        phoneNumber,
        gender,
        about,
        skills,
      }, {withCredentials: true});
      console.log(res);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  }

  useEffect(() => {
    setFirstName(user?.firstName || fallbackValue);
    setLastName(user?.lastName || fallbackValue);
    setPhoneNumber(user?.phoneNumber || fallbackValue);
    setGender(user?.gender || fallbackValue);
    setAbout(user?.about || fallbackValue);
    setSkills(user?.skills || fallbackValue);
  }, [user]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,_#020817_0%,_#0f172a_40%,_#111827_100%)] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-8">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80">
              Profile
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Edit profile</h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            EP
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white shadow-inner shadow-slate-950/40 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="John Doe"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white shadow-inner shadow-slate-950/40 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </div>

          <fieldset className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white shadow-inner shadow-slate-950/40 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              placeholder="+1 234 567 890"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </fieldset>

          <fieldset className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white shadow-inner shadow-slate-950/40 outline-none transition duration-200 hover:border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </fieldset>

          <fieldset className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="about"
            >
              About
            </label>
            <textarea
              id="about"
              value={about}
              rows="4"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white shadow-inner shadow-slate-950/40 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              placeholder="Tell us about yourself"
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          <fieldset className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="skills"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              value={skills}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white shadow-inner shadow-slate-950/40 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              placeholder="React, Node, JavaScript"
              onChange={(e) => setSkills(e.target.value)}
            />
          </fieldset>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-4 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:translate-y-0"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
