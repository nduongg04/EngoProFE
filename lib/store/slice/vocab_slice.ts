import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VocabType = {
  vocab: string;
  wordType: string;
  examples: string[];
  definition: string;
};

type initType = {
  listVocabFlashCar: VocabType[];
};

const initialState: initType = {
  listVocabFlashCar: [
    {
      vocab: "vocabulary",
      wordType: "n",
      examples: ["fjdhfjdhkjfhsdjkfsd", "fjdsfjksdfjklsd"],
      definition: "all the words that a person knows or uses",
    },
    {
      vocab: "vocabulary",
      wordType: "n",
      examples: ["fjdhfjdhkjfhsdjkfsd", "fjdsfjksdfjklsd"],
      definition: "all the words that a person knows or uses",
    },
    {
      vocab: "vocabulary",
      wordType: "n",
      examples: ["fjdhfjdhkjfhsdjkfsd", "fjdsfjksdfjklsd"],
      definition: "all the words that a person knows or uses",
    },
    {
      vocab: "vocabulary",
      wordType: "n",
      examples: ["fjdhfjdhkjfhsdjkfsd", "fjdsfjksdfjklsd"],
      definition: "all the words that a person knows or uses",
    },
  ],
};

export const vocabSlice = createSlice({
  name: "vocabSlice",
  initialState: initialState,
  reducers: {
    setListFlashCard: (
      state,
      action: PayloadAction<{ listFlashCard: VocabType[] }>,
    ) => {
      state.listVocabFlashCar = action.payload.listFlashCard;
    },
    resetFlashCard: (state) => {
      state.listVocabFlashCar = [];
    },
  },
});

export const { setListFlashCard, resetFlashCard } = vocabSlice.actions;
