import React from "react";
import { ReactComponent as ComputerIcon } from "../assets/icons/computer.svg";
import { ReactComponent as UserIcon } from "../assets/icons/user.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as StatsIcon } from "../assets/icons/stats.svg";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../config/firebase";

const Sidebar = () => {
  const history = useHistory();

  const logout = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/projects" className="navbar-link" title="You projects">
        <ComputerIcon className="navbar-icon" />
      </Link>
      <Link to="/profile" className="navbar-link " title="Your profile">
        <UserIcon className="navbar-icon hover:text-yellow-400" />
      </Link>
      <Link to="/stats" className="navbar-link " title="Your profile">
        <StatsIcon className="navbar-icon hover:text-green-400" />
      </Link>

      <a
        className="navbar-link lg:mt-auto"
        title="Your profile"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        <LogoutIcon className="navbar-icon hover:text-red-400" />
      </a>
    </nav>
  );
};

export default Sidebar;
