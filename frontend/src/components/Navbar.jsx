import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/__redux_store__/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from "../utils/constants";
import { removeAllConnections } from "../utils/__redux_store__/connectionsSlice";
import { removeFeed } from "../utils/__redux_store__/feedSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(
        BACKEND_API + "/auth/logout",
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      dispatch(removeAllConnections());
      dispatch(removeFeed())
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
      <Link to="/feed" className="btn btn-ghost text-xl">DevTinder🫨
      </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              aria-label="Open user menu"
            >
              <div className="w-10 rounded-full">
                <img alt="User profile" src={user.profilePicture} />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg"
            >
              <li>
                <Link to="/profile" className="rounded-lg">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/feed" className="rounded-lg">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/connections" className="rounded-lg">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="rounded-lg">
                  Requests
                </Link>
              </li>
               <li>
                <Link to="/premium" className="rounded-lg">
                  Premium
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="rounded-lg">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
