import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearUserFromLocalStorage } from "../services/authService";

const Layout = ({ user, setUser, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    clearUserFromLocalStorage();
    navigate("/");
  };

  const shouldHideLogin =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <nav>
        {user ? (
          <div>
            <span>Welcome, {user.username}!</span>
            {user.role === "user" && (
              <>
                <Link to="/">HomePage </Link>
                <Link to="/user">UserPage </Link>
                <Link to="/service">ServicePage </Link>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          !shouldHideLogin && (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          )
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
