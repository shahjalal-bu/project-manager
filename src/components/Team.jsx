// import moment from "moment";
import React, { useState } from "react";
import TeamEditModal from "./TeamEditModal";
import moment from "moment/moment";

function Team({ teamInfo }) {
  const { name, description, createdAt, color, _id, members } = teamInfo;
  const [control, setControl] = useState(false);
  return (
    <div
      className="flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 relative"
      draggable="true"
    >
      <button
        className="absolute top-0 right-0  items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        onClick={() => setControl(true)}
      >
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      <span
        className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500  bg-${color}-100 rounded-full`}
      >
        {name}
      </span>
      <h4 className="mt-3 text-sm font-medium">{description}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">
            {moment(createdAt).format("MMM Do YY")}
          </span>
        </div>
      </div>
      {/* pass data to edit modal  */}
      {control ? (
        <TeamEditModal setControl={setControl} members={members} id={_id} />
      ) : null}
    </div>
  );
}

export default Team;
