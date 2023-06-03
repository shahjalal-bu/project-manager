import React from "react";
import Select from "react-select";

const TeamsAddModal = ({
  control = true,
  setControl,
  teamName,
  setTeamName,
  bgColor,
  setBgColor,
  description,
  setDescription,
  handleAddTeam,
}) => {
  //color
  const colors = [
    { value: "green", label: "Green" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
  ];
  console.log(bgColor);
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
            <div className="my-2">
              <Select
                options={colors}
                defaultValue={bgColor}
                onChange={setBgColor}
                placeholder="Select a color.."
                isClearable
                isSearchable
                isMulti
                noOptionsMessage={() =>"No color found!"}
              />
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
