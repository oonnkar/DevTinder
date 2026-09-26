import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder🫨</a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div className="w-10 rounded-full">
            {user &&(
              <img
                alt="Tailwind CSS Navbar component"
                src={user.profilePicture}
              />
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
