import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: null,
    requests: null,
  },
  reducers: {
    addConnectionRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeConnectionRequest: (state, action) => {
      state.requests = state.requests.filter(
        (req) => req._id !== action.payload,
      );
    },
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state) => {
      state.connections = null;
    },
  },
});

export const {
  addConnectionRequests,
  removeConnectionRequest,
  addConnections,
  removeConnections,
} = connectionsSlice.actions;
export default connectionsSlice.reducer;
