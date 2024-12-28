import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../config";

// Async thunk to fetch messages
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/message/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching messages");
    }
  }
);

// Async thunk to send a message
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ message, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/api/v1/message/send/${id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error sending message");
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: "",
  sending: false,
  sendError: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload || [];
        state.error = "";
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.sendError = "";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.messages.push(action.payload.newMessage);
        state.sendError = "";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.sendError = action.payload || "Error sending message";
      });
  },
});

export default messageSlice.reducer;
export const { setMessages } = messageSlice.actions;
