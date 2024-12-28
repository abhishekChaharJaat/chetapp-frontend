import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import messageReducer from "./user/messageSlice";
import { combineReducers } from "@reduxjs/toolkit";
import socketReducer from "./user/socketSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  userSlice: userReducer,
  messageSlice: messageReducer,
  socketSlice: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
// const store = configureStore({
//   reducer: {
//     userSlice: userReducer,
//     messageSlice: messageReducer,
//     socketSlice: socketReducer,
//   },
// });

// export default store;
