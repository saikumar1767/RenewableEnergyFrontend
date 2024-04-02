import React, { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
    token: null,
  });

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token not found, user is not logged in
      setAuthState({ isLoggedIn: false, user: null, token: null });
      localStorage.clear();
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token expired, log out the user
        console.log("Logged Out Successfully");
        setAuthState({ isLoggedIn: false, user: null, token: null });
        localStorage.clear();
      }
    } catch (error) {
      console.log("Error decoding token:", error);
      setAuthState({ isLoggedIn: false, user: null, token: null });
      localStorage.clear();
    }
  };

  // Fetching user data from local storage
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setAuthState({ isLoggedIn: true, user, token });
    }
  }, []);

  useEffect(() => {
    // Check token expiration when component mounts
    checkTokenExpiration();

    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, []);

  // Login Handler
  const handleLogin = (data) => {
    localStorage.clear();
    setAuthState({ isLoggedIn: true, user: data.user, token: data.token });
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", data.user);
    localStorage.setItem("token", data.token);
  };

  // Logout Handler
  const handleLogout = () => {
    setAuthState({ isLoggedIn: false, user: null, token: null });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authState, handleLogin, handleLogout }}>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
