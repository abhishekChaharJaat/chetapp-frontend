import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import messageReducer from "./user/messageSlice";
import socketReducer from "./user/socketSlice";
const store = configureStore({
  reducer: {
    userSlice: userReducer,
    messageSlice: messageReducer,
    socketSlice: socketReducer,
  },
});

export default store;
