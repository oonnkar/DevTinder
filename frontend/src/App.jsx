import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/__redux_store__/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed></Feed>}></Route>
            <Route
              path="/connections"
              element={<Connections></Connections>}
            ></Route>
            <Route path="/requests" element={<Requests></Requests>}></Route>
            <Route path="/premium" element={<Premium></Premium>}></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
