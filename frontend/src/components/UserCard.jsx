import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/__redux_store__/feedSlice";
import { BACKEND_API } from "../utils/constants";

const UserCard = ({ user }) => {
  const { _id: userId, firstName, lastName, emailId, profilePicture } = user;
  const dispatch = useDispatch();

  async function handleClick(status, userId) {
    try {
      const res = await axios.post(
        `${BACKEND_API}/request/send/${status}/${userId}`, {}, {withCredentials: true},
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm rounded-2xl">
      <figure className="h-64 relative">
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body gap-3 p-6">
        <div className="badge badge-primary badge-outline rounded-full">
          Member
        </div>
        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-base-content/60 break-all">{emailId}</p>
        {userId && (
          <p className="text-xs text-base-content/40 truncate">ID: {userId}</p>
        )}
        <div className="card-actions mt-3">
          <button className="btn btn-primary btn-block rounded-xl">
            View profile
          </button>
          <div className="flex w-full gap-3">
            <button
              onClick={() => handleClick("ignore", userId)}
              className="btn btn-outline btn-error flex-1 rounded-xl"
            >
              Ignore
            </button>
            <button
              onClick={() => handleClick("interested", userId)}
              className="btn btn-secondary flex-1 rounded-xl"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
