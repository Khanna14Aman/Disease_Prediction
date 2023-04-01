import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LandingPage } from "./screens/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Forgot from "./screens/Forgot";
import FillData from "./screens/FillData";
import Profile from "./screens/Profile";
import ErrorMessage from "./components/Error";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/filldata" element={<FillData />} />
          <Route
            exact
            path="/*"
            element={<ErrorMessage>{"Wrong URL"}</ErrorMessage>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
