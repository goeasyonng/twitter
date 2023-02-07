import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="nav">
    <Link className="nav_home" to="/">
      Home
    </Link>
    <Link className="nav_profile" to="/profile">
      My Profile
    </Link>
  </nav>
);
export default Navigation;
