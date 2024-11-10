import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { enableMapSet } from "immer";

enableMapSet();

const initData: AnsweredQuestion[] = [
    {
        question: "What is the best country?",
        A: "Vietnam",
        B: "Korea",
        C: "US",
        D: "Philipine",
        explanation: "VietNam is the best",
        correctAnswer: "A",
    },
    {
        question: "What is the best country?",
        A: "Vietnam",
        B: "Korea",
        C: "US",
        D: "Philipine",
        explanation: "VietNam is the best",
        correctAnswer: "A",
    },
    {
        question: "What is the best country?",
        A: "Vietnam",
        B: "Korea",
        C: "US",
        D: "Philipine",
        explanation: "VietNam is the best",
        correctAnswer: "A",
    },
    {
        question: "What is the best country?",
        A: "Vietnam",
        B: "Korea",
        C: "US",
        D: "Philipine",
        explanation: "VietNam is the best",
        correctAnswer: "A",
    },
    {
        question: "What is the best country?",
        A: "Vietnam",
        B: "Korea",
        C: "US",
        D: "Philipine",
        explanation: "VietNam is the best",
        correctAnswer: "A",
    },
];

export type AnsweredQuestion = {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    correctAnswer: string;
    explanation: string;
};

type initType = {
    dataQuestion: AnsweredQuestion[];
    time: string;
    completedQuestion: number;
    userAnswerMap: Map<number, string>;
};

const initialState: initType = {
    dataQuestion: initData,
    time: "",
    completedQuestion: 0,
    userAnswerMap: new Map<number, string>(),
};

export const testAISlice = createSlice({
    name: "testAISlice",
    initialState,
    reducers: {
        setDataQuestion: (
            state,
            action: PayloadAction<{ dataQuestions: AnsweredQuestion[] }>,
        ) => {
            state.dataQuestion = action.payload.dataQuestions;
        },
        setTimeAIQues: (state, action: PayloadAction<{ time: string }>) => {
            state.time = action.payload.time;
        },
        increaseCompletedQuestion: (state) => {
            state.completedQuestion = state.completedQuestion + 1;
        },
        resetCompletedQuestion: (state) => {
            state.completedQuestion = 0;
        },
        setuserAnswserMap: (
            state,
            actions: PayloadAction<{ number: number; value: string }>,
        ) => {
            const map = state.userAnswerMap;
            const number = actions.payload.number;
            const value = actions.payload.value;
            map.set(number, value);
            state.userAnswerMap = map;
        },
        resetMap: (state) => {
            state.userAnswerMap = new Map<number, string>();
        },
    },
});

export const {
    setDataQuestion,
    setTimeAIQues,
    increaseCompletedQuestion,
    resetCompletedQuestion,
    setuserAnswserMap,
    resetMap,
} = testAISlice.actions;
