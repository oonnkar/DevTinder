import { createSlice, configureStore } from "@reduxjs/toolkit";

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
    removeConnectionRequests: (state) => {
      state.requests = null;
    },
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state) => {
      state.connections = null;
    },
  },
});

export const { addConnectionRequests, removeConnectionRequests , addConnections, removeConnections } =
  connectionsSlice.actions;
export default connectionsSlice.reducer;
