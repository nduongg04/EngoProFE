import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Socket } from "socket.io-client";

type chatState = {
  socket: Socket | null;
  isShowAIChat: boolean;
};

const initState: chatState = {
  socket: null,
  isShowAIChat: true,
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: initState,
  reducers: {
    setSocket: (state, action: PayloadAction<{ socket: any }>) => {
      const { socket } = action.payload;
      state.socket = socket;
    },

    showAIChat: (state) => {
      state.isShowAIChat = true;
    },

    disableAIChat: (state) => {
      state.isShowAIChat = false;
    },
  },
});

export const { setSocket, showAIChat, disableAIChat } = chatSlice.actions;
