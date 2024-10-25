import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Socket } from "socket.io-client";

type chatState = {
    socket: Socket | null;
};

const initState: chatState = {
    socket: null,
};

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState: initState,
    reducers: {
        setSocket: (state, action: PayloadAction<{ socket: any }>) => {
            const { socket } = action.payload;
            state.socket = socket;
        },
    },
});

export const { setSocket } = chatSlice.actions;
