import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/actions";

const User = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userSlice);
  const onlineUsers = useSelector((state) => state.userSlice.onlineUsers);
  const isOnline = onlineUsers.includes(user?._id);

  const selectdUserhandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <li
        onClick={() => selectdUserhandler(user)}
        className={`flex items-center space-x-2 md:space-x-3 p-2 hover:bg-gray-600 rounded-md cursor-pointer ${
          selectedUser?._id === user._id ? "bg-gray-600" : ""
        }`}
      >
        <div className="relative">
          <img
            src={user.profilePhoto}
            alt="xyz"
            className="w-5 md:w-10 md:h-10 bg-gray-600 rounded-full"
          />
          {isOnline && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <span className="text-[8px] md:text-sm">{user.fullName}</span>
      </li>
    </>
  );
};

export default User;
