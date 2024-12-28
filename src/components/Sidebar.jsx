import React, { useEffect } from "react";
import User from "./User";
// import profile from "../profile.png";
import { fetchAllUsers } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isVisble, setIsVisible, screenSize }) => {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.userSlice.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div
      className={`${screenSize.width < 650 && !isVisble ? "hidden" : "block"} ${
        screenSize.width < 650 ? "w-full" : "w-[220px]"
      }`}
    >
      <div
        className={`flex flex-col h-screen pt-[60px] md:pt-[75px] bg-gray-700 text-white ${
          screenSize.width < 650 ? "w-full" : "w-[220px]"
        }   `}
      >
        <div className="p-1 md:p-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 text-gray-800 my-1 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 overflow-y-scroll overflow-x-hidden">
          <ul className="space-y-1 md:space-y-2 p-1 md:p-4">
            {allUsers?.map((user, idx) => {
              return (
                <User
                  key={idx}
                  user={user}
                  isVisble={isVisble}
                  setIsVisible={setIsVisible}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
