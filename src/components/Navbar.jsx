import React, { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import DummyListPage from "./DummyList";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <nav className="navbar">
        {!isLoggedIn ? null : (
          <ul>
            <li>
              <Link
                to="/dashboard"
                onClick={() => {
                  if (!isLoggedIn) alert("Please login first");
                  navigate("/");
                }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dummy-list"
                onClick={() => {
                  if (!isLoggedIn) alert("Please login first");
                  navigate("/");
                }}
              >
                Dummy List
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="content">
        <div className="container">
          <Routes>
            {!isLoggedIn ? (
              <Route path="/*" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/dummy-list" element={<DummyListPage />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
