import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, setMessages } from "../redux/actions";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  // used to handle socket live messages
  useGetRealTimeMessage();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.userSlice.selectedUser);
  const { messages, loading } = useSelector((state) => state.messageSlice);
  const socket = useSelector((state) => state.socketSlice.socket);

  const messagesEndRef = useRef(null); // Ref for the messages container

  // Fetch messages for the selected user
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {loading ? (
        <div className="w-full flex flex-col justify-center items-center flex-1 gap-[8px]">
          <p className="font-sans font-bold">Loading messages...</p>
          <div className="w-6 h-6 border-2 border-t-0 border-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          className="border flex-1 overflow-auto px-2 md:px-4 pb-20"
          ref={messagesEndRef} // Attach ref to the scrollable container
        >
          <div className="mb-6 p-rounded-lg text-center text-slate-400 py-4">
            <h2 className="font-semibold text-sm md:text-lg mb-2">
              🔒 End-to-End Encrypted Chat
            </h2>
            <p className="text-[9px] md:text-sm">
              Your messages are protected with end-to-end encryption. Only you
              and the recipient <br /> can read the contents of your
              conversations. Even the service provider cannot access your
              messages.
            </p>
          </div>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <Message key={message._id} messageData={message} />
            ))
          ) : (
            <p className="text-center text-slate-400">
              No messages yet. Start chatting!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
