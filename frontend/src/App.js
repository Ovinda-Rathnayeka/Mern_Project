import Home from "./Component/Home/Home";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import UserDashboard from "./Component/UserDashbaord/UserDashbaord";
import UpdateDetails from "./Component/UserDashbaord/UpdateDetails";
import DisplayU from "./Component/AdminUser/DisplayU";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userdashbaord" element={<UserDashboard />} />
          <Route path="/updatedetails" element={<UpdateDetails />} />
          <Route path="/admin" element={<DisplayU />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
