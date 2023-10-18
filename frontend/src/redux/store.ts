import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import questions from './slice/questionsSlice';
import oneQuestion from './slice/oneQuestionSlice';
export const store = configureStore({
	reducer: { questions, oneQuestion },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
