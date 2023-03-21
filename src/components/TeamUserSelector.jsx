import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetAllUserQuery } from "../features/users/usersApi";
import { useEditTeamMutation } from "../features/teams/teamsApi";
import Button from "./ui/Button";
import { useAuth } from "../contexts/authContext";

const TeamUserSelector = ({ id, members, setControl }) => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMemberEmail, setSelectedMemberEmail] = useState("");
  const [open, setOpen] = useState(false);
  const { data, isSuccess } = useGetAllUserQuery();
  const [editTeam, { data: resData }] = useEditTeamMutation();
  const { currentUser } = useAuth();
  const { email } = currentUser;

  useEffect(() => {
    if (isSuccess) {
      setUsers(data);
    }
  }, [data, setUsers, isSuccess]);

  const handleEditTeam = () => {
    editTeam({
      id: id,
      member: selectedMemberEmail,
    });
    console.log(resData);
    setControl(false);
  };

  // filter user

  const filteredUsers = users.filter(
    (el) => el.email !== email && !members.includes(el.email)
  );

  return (
    <div className="w-72 font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selectedMemberEmail && "text-gray-700"
        }`}
      >
        {selectedMemberEmail
          ? selectedMemberEmail?.length > 25
            ? selectedMemberEmail?.substring(0, 25) + "..."
            : selectedMemberEmail
          : "Select User"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter User Name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {filteredUsers?.map((user) => (
          <>
            {filteredUsers.length < 1 && (
              <li>There is no more user to add team</li>
            )}

            <li
              key={user?.id}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                user?.name?.toLowerCase() ===
                  selectedMemberEmail?.toLowerCase() && "bg-sky-600 text-white"
              }
              ${
                user?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => {
                if (
                  user?.name?.toLowerCase() !==
                  selectedMemberEmail.toLowerCase()
                ) {
                  setSelectedMemberEmail(user?.email);
                  setOpen(false);
                  setInputValue("");
                }
              }}
            >
              {user?.name}-({user?.email})
            </li>
          </>
        ))}
      </ul>
      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
        <Button
          className="text-red-500 background-transparent"
          onClick={() => setControl(false)}
        >
          Close
        </Button>
        <Button
          className="bg-purple-500 text-white active:bg-purple-600 "
          onClick={handleEditTeam}
        >
          Add User
        </Button>
      </div>
    </div>
  );
};

export default TeamUserSelector;
