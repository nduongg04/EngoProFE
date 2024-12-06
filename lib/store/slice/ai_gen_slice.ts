import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialType = {
    subject: string;
    minute: string;
    questions: string;
    isGenAI: boolean;
    isValid: boolean;
};

const initialState: initialType = {
    subject: "",
    minute: "",
    questions: "",
    isGenAI: false,
    isValid: true,
};

export const AIQuesGenSlice = createSlice({
    name: "ai-gen-slice",
    initialState,
    reducers: {
        setSubject: (state, action: PayloadAction<{ subject: string }>) => {
            state.subject = action.payload.subject;
        },
        setMinute: (state, action: PayloadAction<{ minute: string }>) => {
            state.minute = action.payload.minute;
        },
        setQuestions: (state, action: PayloadAction<{ questions: string }>) => {
            state.questions = action.payload.questions;
        },
        setIsGenAI: (state, action: PayloadAction<{ isGenAI: boolean }>) => {
            state.isGenAI = action.payload.isGenAI;
        },
        setIsValid: (state, action: PayloadAction<{ isValid: boolean }>) => {
            state.isValid = action.payload.isValid;
        },
    },
});

export const { setMinute, setQuestions, setSubject, setIsGenAI, setIsValid } =
    AIQuesGenSlice.actions;
