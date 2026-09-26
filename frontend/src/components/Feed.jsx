import axios from "axios";
import React from "react";
import { BACKEND_API } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/__redux_store__/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  async function getFeed() {
    try {
      if(feedData) return;
      const res = await axios.get(`${BACKEND_API}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(
        "Failed to fetch feed:",
        error.response?.status,
        error.response?.data ?? error.message,
      );
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {Array.isArray(feedData) &&
        feedData.map((feedUser) => (
          <UserCard key={feedUser._id} user={feedUser} />
        ))}
    </div>
  );
};

export default Feed;
