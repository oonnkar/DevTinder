import { createSlice, configureStore } from "@reduxjs/toolkit";

const feeSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeFeed } = feeSlice.actions;
export default feeSlice.reducer;
