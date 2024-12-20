import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VocabType = {
  vocab: string;
  wordType: string;
  examples: string[];
  definition: string;
};

type initType = {
  listVocabFlashCar: VocabType[];
};

const initialState: initType = {
  listVocabFlashCar: [],
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
