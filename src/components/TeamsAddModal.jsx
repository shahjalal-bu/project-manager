import React from "react";

const TeamsAddModal = ({
  control = false,
  setControl,
  teamName,
  setTeamName,
  bgColor,
  setBgColor,
  description,
  setDescription,
  handleAddTeam,
}) => {
  return (
    control && (
      <div
        id="close"
        onClick={(e) => {
          if (e.target.id === "close") setControl(false);
        }}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white p-2 rounded w-96">
          <p className="text-center text-gray-700 mb-5">
            Enter Information Of Teams
          </p>
          <div className="flex flex-col">
            <input
              type="text"
              className="border border-gray-700 p-2 rounded"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <div className="flex items-center p-2">
              <h2>Select a color:</h2>
              <div
                id="green"
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-1 cursor-pointer border-green-500 hover:bg-green-500 ${
                  bgColor === "green" && "bg-green-500"
                }`}
                onClick={() => setBgColor("green")}
              ></div>

              <div
                id="yellow"
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-1 cursor-pointer border-pink-500 hover:bg-pink-500 ${
                  bgColor === "pink" && "bg-pink-500"
                }`}
                onClick={() => setBgColor("pink")}
              ></div>

              <div
                id="red"
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-1 cursor-pointer border-purple-500 hover:bg-purple-500 ${
                  bgColor === "purple" && "bg-purple-500"
                }`}
                onClick={() => setBgColor("purple")}
              ></div>
            </div>

            <textarea
              type="text"
              className="border border-gray-700 p-2 rounded mb-5"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="px-5 py-2 bg-gray-700 text-white rounded"
              onClick={handleAddTeam}
            >
              Add A Team
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TeamsAddModal;
