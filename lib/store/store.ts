import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { chatSlice } from "./slice/chat_slice";
import { AIQuesGenSlice } from "./slice/ai_gen_slice";

const reducers = combineReducers({
    chatSlice: chatSlice.reducer,
    aiQuesSlice: AIQuesGenSlice.reducer,
});

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
