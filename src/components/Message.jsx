import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ messageData }) => {
  const scroll = useRef();
  const authUser = useSelector((state) => state.userSlice.authUser);
  const selectedUser = useSelector((state) => state.userSlice.selectedUser);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

  // Format the timestamp
  const formattedTime = messageData?.createdAt
    ? moment(messageData.createdAt).format("hh:mm A")
    : "Unknown Time";

  return (
    <div
      ref={scroll}
      className="chat-container space-y-3 py-2 md:py-3 md:px-3 "
    >
      {/* Chat Start */}
      {authUser?._id !== messageData?.senderId ? (
        <div className="chat chat-start flex items-start space-x-1 md:space-x-2">
          <div className="chat-image avatar">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full">
              <img
                className="rounded-full"
                alt="Chat Avatar"
                src={
                  selectedUser?.profilePhoto ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <div>
            <div className="chat-bubble bg-gray-100 text-xs md:text-sm p-[5px] md:p-2 rounded-md shadow">
              {messageData.message}
            </div>
            <span className="text-[8px] md:text-xs text-gray-500 mt-1 block">
              {" "}
              {formattedTime}
            </span>
          </div>
        </div>
      ) : (
        <div className="chat chat-end flex items-start space-x-1 md:space-x-2 justify-end">
          <div className="">
            <div className="chat-bubble bg-gray-100 text-xs md:text-sm p-[5px] md:p-2 rounded-md shadow">
              {messageData?.message}
            </div>
            <span className="text-[8px] md:text-xs text-gray-500 mt-1 block text-right">
              {formattedTime}
            </span>
          </div>
          <div className="chat-image avatar">
            <div className="w-6 h-6 md:w-8 md:h-8  rounded-full">
              <img
                className="rounded-full"
                alt="Chat Avatar"
                src={
                  authUser?.profilePhoto ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Chat End */}
    </div>
  );
};

export default Message;
