import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnectionRequests,
  removeConnectionRequest,
} from "../utils/__redux_store__/connectionsSlice";

const Requests = () => {
  const connectionRequests = useSelector((store) => store.connection?.requests);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      if (connectionRequests !== null && connectionRequests !== undefined)
        return;
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addConnectionRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestClick = async (reqStatus, reqId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/review/${reqStatus}/${reqId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeConnectionRequest(reqId));
    } catch (error) {
      console.error(error);
    }
  };
  return !connectionRequests || connectionRequests.length === 0 ? (
    <div>No Connections Requests found</div>
  ) : (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-100">
          Connection requests
        </h1>
        <ul className="space-y-4">
          {connectionRequests.map((request) => {
            const user = request.fromUser;

            return (
              <li
                key={request._id}
                className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-700/80 transition hover:ring-indigo-400/60"
              >
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-2 ring-indigo-400/40"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white">
                      {user.firstName?.[0] || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="text-xl font-bold text-white">
                        {user.firstName} {user.lastName}
                      </h2>
                      {user.gender && (
                        <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-medium capitalize text-indigo-300">
                          {user.gender}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {user.about || "This user has not added a bio yet."}
                    </p>
                    {user.phoneNumber && (
                      <p className="mt-3 text-sm text-slate-400">
                        <span className="mr-2 text-slate-500">Phone</span>
                        {user.phoneNumber}
                      </p>
                    )}
                    {user.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3 border-t border-slate-800 bg-slate-900/70 px-6 py-4">
                  <button
                    onClick={() => {
                      handleRequestClick("rejected", request._id);
                    }}
                    type="button"
                    className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400 hover:bg-rose-400/10 hover:text-rose-300"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleRequestClick("accepted", request._id);
                    }}
                    type="button"
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                  >
                    Accept
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
