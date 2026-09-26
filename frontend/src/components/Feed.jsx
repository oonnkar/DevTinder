import axios from "axios";
import React from "react";
import { BACKEND_API } from "../utils/constants";
import { useEffect } from "react";

const Feed = () => {
  console.log("Feed component rendered");

  async function getFeed() {
    try {
      console.log("Fetching feed...");
      const res = await axios.get(`${BACKEND_API}/user/feed`, {
        withCredentials: true,
      });
      console.log("Feed response:", res.data);
    } catch (error) {
      console.error(
        "Failed to fetch feed:",
        error.response?.status,
        error.response?.data ?? error.message,
      );
    }
  }

  useEffect(() => {
    console.log("Feed useEffect executed");
    getFeed();
  }, []);

  return <div>feed rendered is working hey wokring or not let me check vite is workign is wor properly 9r not we are working or ot working </div>;
};

export default Feed;
