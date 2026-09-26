import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, emailId, profilePicture } = user;
  const defaultImage =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm rounded-2xl">
      <figure className="h-64 relative">
        <img
          src={user?.profilePicture ? user.profilePicture : defaultImage}
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
        {user._id && (
          <p className="text-xs text-base-content/40 truncate">
            ID: {user._id}
          </p>
        )}
        <div className="card-actions mt-3">
          <button className="btn btn-primary btn-block rounded-xl">
            View profile
          </button>
          <div className="flex w-full gap-3">
            <button className="btn btn-outline btn-error flex-1 rounded-xl">
              Ignore
            </button>
            <button className="btn btn-secondary flex-1 rounded-xl">
Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
