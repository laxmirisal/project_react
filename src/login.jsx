import React, { useState } from "react";
import "./login.css";
import { FaGraduationCap, FaUtensils, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
function App() {
  
  const [page, setPage] = useState("home");


  const [role, setRole] = useState("");

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function openLogin(roleName) {
    setRole(roleName);
    setPage("login");
  }

 
  function handleLogin() {
    
    if (username === "" || password === "") {
      alert("Please enter username and password");
      return;
    }
    alert("logging in as " + role + " with username: " + username);
    
  }

  return (
    <div className="page">
      {page === "home" && (
        <div className="center">
          <p className="tag">
            <span className="dot">●</span> CANTEEN MANAGEMENT SYSTEM
          </p>
          <h1 className="heading">Pick your role.</h1>

          <div className="cardRow">
            {/* student card */}
            <div className="card" onClick={() => openLogin("Student")}>
              <div className="iconBox"><FaGraduationCap size={20} color="#3f5d4f" /></div>
              <h3 className="cardTitle">Student</h3>
              <p className="cardText">Order meals, check balance</p>
              <div className="dashedLine"></div>
              <div className="arrowCircle">→</div>
            </div>

            {/* kitchen staff card */}
            <div className="card" onClick={() => openLogin("Kitchen staff")}>
              <div className="iconBox"><FaUtensils size={20} color="#3f5d4f" /></div>
              <h3 className="cardTitle">Kitchen staff</h3>
              <p className="cardText">Manage orders, update menu</p>
              <div className="dashedLine"></div>
              <div className="arrowCircle">→</div>
            </div>

            {/* admin card */}
            <div className="card" onClick={() => openLogin("Admin")}>
               <div className="iconBox"><FaShieldAlt size={20} color="#3f5d4f" /></div>
              <h3 className="cardTitle">Admin</h3>
              <p className="cardText">Oversee accounts & reports</p>
              <div className="dashedLine"></div>
              <div className="arrowCircle">→</div>
            </div>
          </div>
        </div>
      )}

      {page === "login" && (
        <div className="center">
          <div className="loginBox">
            <button className="backBtn" onClick={() => setPage("home")}>
                <FaArrowLeft size={12} /> Back
            </button>

            <h2 className="loginHeading">{role} Login</h2>

            <label className="label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="input"
            />

            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="input"
            />

            <button className="loginBtn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
