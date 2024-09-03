import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./Component/User/Signup";
import Login from "./Component/User/Login";
import Home from './Component/User/Dashboard';
import Profile from "./Component/User/Profile";
import AdminLogin from "./Component/Admin/AdminLogin";
import Users from './Component/Admin/Users';
import Update from './Component/Admin/UpdateUser';
import Create from './Component/Admin/CreateUser';

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem('jwt') !== null;
    
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn() ? <Navigate to="/home" /> : <Login />}
          />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/home' element={<Home/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

