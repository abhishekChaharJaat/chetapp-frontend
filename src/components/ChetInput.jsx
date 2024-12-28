import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../redux/actions";
const ChetInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const selectedUser = useSelector((state) => state.userSlice.selectedUser);

  const handleSendMessage = async (e) => {
    dispatch(sendMessage({ message: message, id: selectedUser._id }));
    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim().length > 0) {
      handleSendMessage();
    }
  };
  return (
    <div className="w-full px-2 md:px-4 py-2 md:py-3 shadow-md h-16 md:h-20 flex justify-center items-center">
      {selectedUser?._id && (
        <div className="border-2 w-full rounded-lg relative flex items-center shadow-lg">
          <input
            value={message}
            type="text"
            placeholder="Enter your message"
            className="py-2 md:py-4 px-2 md:px-4 w-full text-sm text-md rounded-lg pr-10 shadow-md"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!selectedUser}
          />
          <button
            className="absolute right-4 inset-y-0 flex items-center text-lg text-text-2xl"
            onClick={handleSendMessage}
            disabled={message?.trim().length < 1}
          >
            <VscSend
              className={`text-orange-500 ${
                message?.trim().length < 1 && "!text-gray-400"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChetInput;
