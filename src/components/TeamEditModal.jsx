import React, { useState } from "react";
import TeamUserSelector from "./TeamUserSelector";

const TeamEditModal = ({ setControl, members, id }) => {
  return (
    <div
      id="close"
      onClick={(e) => {
        if (e.target.id === "close") {
          setControl(false);
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white px-6 py-4 rounded-lg w-96">
        <p className="text-center text-3xl border-b-2 border-solid border-slate-200 rounded-b text-gray-700  p-2 mb-2">
          Add A User To Team
        </p>
        <div className="flex flex-col">
          <TeamUserSelector members={members} id={id} setControl={setControl} />
        </div>
      </div>
    </div>
  );
};

export default TeamEditModal;
