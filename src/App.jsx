import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  clearUserFromLocalStorage,
} from "./services/authService";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import ServicePage from "./pages/ServicePage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  useEffect(() => {
    setUserToLocalStorage(user);
  }, [user]);

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route
            path="/register"
            element={<RegisterPage setUser={setUser} />}
          />
          {user && (
            <>
              <Route
                path="/admin"
                element={
                  user.role === "admin" ? <AdminPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/user"
                element={
                  user.role === "user" ? <UserPage /> : <Navigate to="/" />
                }
              />
              <Route
                path="/service"
                element={
                  user.role === "user" ? <ServicePage /> : <Navigate to="/" />
                }
              />
              <Route
                path="*"
                element={
                  <Navigate to={user.role === "admin" ? "/admin" : "/user"} />
                }
              />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
