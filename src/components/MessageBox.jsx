import React from "react";
import profile from "../images/profile.webp";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import ChetInput from "./ChetInput";

const MessageBox = () => {
  const selecteduser = useSelector((state) => state.userSlice.selectedUser);
  const onlineUsers = useSelector((state) => state.userSlice.onlineUsers);
  const isOnline = onlineUsers.includes(selecteduser?._id);

  return (
    <div className="pt-[60px] md:pt-[72px] h-screen w-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex h-[50px] md:h-[70px] items-center space-x-2 md:space-x-4 bg-gray-300 py-4 px-6 shadow-md">
          <img
            src={selecteduser?.profilePhoto || profile}
            alt="profile"
            className="w-7 md:w-10 h-7 md:h-10 bg-gray-600 rounded-full"
          />
          <div className="flex flex-col justify-center gap-0">
            <span className="text-sm md:text-md font-bold">
              {selecteduser?.fullName || "User.."}
            </span>
            <p className="text-[12px] text-green-700 font-sans font-[500]">
              {isOnline ? "online" : ""}
            </p>
          </div>
        </div>

        {selecteduser?._id ? (
          <Messages />
        ) : (
          <div className="bg-slate-100 mb-6 p-rounded-lg text-center text-slate-600 py-4 flex flex-col flex-1 items-center justify-center">
            <h2 className="font-bold text-lg mb-2 ">
              🔒 Select a user to start chat
            </h2>
            <p className="text-sm">
              Please select a user from the list to begin your secure,
              end-to-end encrypted chat.
            </p>
          </div>
        )}

        <ChetInput />
      </div>
    </div>
  );
};

export default MessageBox;
