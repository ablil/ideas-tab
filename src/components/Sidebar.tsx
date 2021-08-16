import React from "react";
import { ReactComponent as ComputerIcon } from "../assets/icons/computer.svg";
import { ReactComponent as UserIcon } from "../assets/icons/user.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as QueueIcon } from "../assets/icons/collection.svg";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import ThemeSwitch from "./commons/ThemeSwitch";

const Sidebar = () => {
  const history = useHistory();

  const logout = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/projects" className="navbar-link" title="Projects">
        <ComputerIcon className="navbar-icon" />
      </Link>
      <Link to="/profile" className="navbar-link " title="Profile">
        <UserIcon className="navbar-icon hover:text-yellow-400" />
      </Link>
      <Link to="/queue" className="navbar-link " title="Task queue">
        <QueueIcon className="navbar-icon hover:text-purple-400" />
      </Link>

      <ThemeSwitch className="mt-1" />
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
