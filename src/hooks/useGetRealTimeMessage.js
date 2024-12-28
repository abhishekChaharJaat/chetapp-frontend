import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/actions";

const useGetRealTimeMessage = () => {
  const socket = useSelector((state) => state.socketSlice.socket);
  const messages = useSelector((state) => state.messageSlice.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => socket?.off("newMessage");
  }, [setMessages, messages]);
};
export default useGetRealTimeMessage;
