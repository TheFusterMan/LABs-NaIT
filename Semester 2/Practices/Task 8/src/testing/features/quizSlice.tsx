import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
    lists: Record<number, string | string[]>;
}

const initialState: QuizState = { lists: {} };

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ index: number; items: string | string[] }>) => {
            state.lists[action.payload.index] = action.payload.items;
        },
        clearAnswers: (state) => {
            state.lists = {};
        }
    },
});

export const { setAnswer, clearAnswers } = quizSlice.actions;
export default quizSlice.reducer;