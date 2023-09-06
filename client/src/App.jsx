import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreatePost from "./pages/posts/CreatePost";
import Error from "./components/errorPage/Error";
import MyPosts from "./pages/posts/MyPosts";
import Navbar from "./components/navbar/Navbar";
import Posts from "./pages/posts/Posts";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

import { UserContext } from "./context/UserContext";

const App = () => {
  return (
    <UserContext.Provider
      value={{
        userName: JSON.parse(localStorage.getItem("userName")),
        userEmail: JSON.parse(localStorage.getItem("userEmail")),
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route
              index
              path="/"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route
              path="/myposts"
              element={
                <PrivateRoute>
                  <MyPosts />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
