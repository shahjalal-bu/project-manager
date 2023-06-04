import React from "react";
import logOutImage from "../assets/images/logout.svg";
import RoundedButton from "../pages/shared/RoundedButton";
import { useAuth } from "../contexts/authContext";
import ActiveLink from "../pages/shared/ActiveLink";
import { useLocation } from "react-router-dom";

export default function Navbar({ teams, projects, search, setSearch }) {
  const { currentUser, logout } = useAuth() || {};
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="flex items-center flex-shrink-0 w-full h-20 px-10 bg-white bg-opacity-75">
      <img className="h-12" src="./logo.png" alt="logo" />
      {pathname === "/projects" && (
        <input
          className="flex items-center h-10 px-4 ml-2 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
          type="search"
          placeholder="Search for anything…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <div className="ml">
        <span
          className={`mx-2 text-sm font-semibold ${
            projects ? "text-indigo-700" : "text-gray-600"
          } hover:text-indigo-700`}
        >
          <ActiveLink to="/projects">Projects</ActiveLink>
        </span>

        <span
          className={`mx-2 text-sm font-semibold ${
            teams ? "text-indigo-700" : "text-gray-600"
          } hover:text-indigo-700`}
        >
          <ActiveLink to="/teams">Team</ActiveLink>
        </span>
      </div>

      <div className="flex items-center ml-auto">
        <button className="flex items-center justify-center w-8 h-8  overflow-hidden rounded-full cursor-pointer">
          <img src={`https://randomuser.me/api/portraits/men/1.jpg`} alt="" />
        </button>
        <RoundedButton text={currentUser?.displayName} />
        <button
          className="flex items-center justify-center  p-2 overflow-hidden rounded-full cursor-pointer"
          onClick={logout}
        >
          <img className="w-6 h-6" src={logOutImage} alt="" />
        </button>
      </div>
    </div>
  );
}
