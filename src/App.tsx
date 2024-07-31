// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import Home from "./home";
import Login from "./login";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Redirect to Home if user is authenticated and trying to access /login */}
          {user && (
            <Route path="/login" element={<Navigate replace to="/" />} />
          )}

          {/* Home route, visible only if user is authenticated */}
          {user && <Route path="/" element={<Home />} />}

          {/* Login route, visible only if user is not authenticated */}
          <Route path="/login" element={<Login />} />

          {/* Redirect any other paths to /login if user is not authenticated */}
          {!user && (
            <Route path="/" element={<Navigate replace to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
