import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Navbar = () => {
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/"; // Redirect to home page after logout
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">Recipe List</Link>
        </li>
        {user && (
          <li>
            <Link to="/favorites">Favorite Recipes</Link>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
