import React, { useState } from "react";
import "./login.css";
import { FaGraduationCap, FaUtensils, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

function App() {

  const [page, setPage] = useState("home");

  const [errorMsg, setErrorMsg] = useState("");
  const [role, setRole] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");

 function openLogin(roleName) {
  setRole(roleName);
  setUsername("");
  setPassword("");
  setFullName("");
  setStudentId("");
  setEmail("");
  setErrorMsg("");
  setPage("login");
}

  function isPasswordValid(pass) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  }

  function handleSignup() {
  if (!fullName || !studentId || !email || !username || !password) {
    setErrorMsg("please fill all fields");
    return;
  }

  if (!isPasswordValid(password)) {
    setErrorMsg("password must be 8+ chars with uppercase, lowercase, number and special character");
    return;
  }

  fetch("http://localhost/canteen_mgmt_backend/signup.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, studentId, email, username, password })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
        setFullName("");
        setStudentId("");
        setEmail("");
        setUsername("");
        setPassword("");
        setErrorMsg("");
        setPage("home");
      } else {
        setErrorMsg(data.message);
      }
    })
    .catch((err) => {
      console.log("error:", err);
      setErrorMsg("Something went wrong, check if server is running");
    });
}

  function handleLogin() {
    if (username === "" || password === "") {
      setErrorMsg("Please enter username and password");
      return;
    }

    fetch("http://localhost/canteen_mgmt_backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setErrorMsg("");
          alert("Welcome " + role);
        } else {
          setErrorMsg(data.message);
        }
      })
      .catch((err) => {
        console.log("error:", err);
        setErrorMsg("Something went wrong, check if the server is running");
      });
  }

  return (
    <div className="page">
      {page === "home" && (
        <div className="center">
          <p className="tag">
            CANTEEN MANAGEMENT SYSTEM
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
            <button className="backBtn" onClick={() => {
              setUsername("");
              setPassword("");
              setErrorMsg("");
              setPage("home");
            }}>
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
            {errorMsg && <p className="errorText">{errorMsg}</p>}
            <button className="loginBtn" onClick={handleLogin}>
              Login
            </button>

            {role === "Student" && (
              <p style={{ fontSize: "13px", marginTop: "12px" }}>
                New here?{" "}
                <span
                  style={{ color: "#3f5d4f", cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    setUsername("");
                    setPassword("");
                    setErrorMsg("");
                    setPage("signup");
                  }}
                >
                  Create an account
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {page === "signup" && (
        <div className="center">
          <div className="loginBox">
            <button className="backBtn" onClick={() => {
              setErrorMsg("");
              setPage("home");
            }}>
              <FaArrowLeft size={12} /> Back
            </button>

            <h2 className="loginHeading">Student Sign Up</h2>

            <label className="label">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" className="input" />

            <label className="label">Student ID</label>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter student ID" className="input" />

            <label className="label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter college email" className="input" />

            <label className="label">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" className="input" />

            <label className="label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ chars, mixed case, number, symbol" className="input" />

            {errorMsg && <p className="errorText">{errorMsg}</p>}

            <button className="loginBtn" onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
