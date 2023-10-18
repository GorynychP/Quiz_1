import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	QuestionType,
	QuestionTypeTransform,
	StatusEnum,
	fetchQuestionsAsync,
} from './questionsSlice';

interface QuestionSliceState {
	item: QuestionType;
	status: string;
}

const transform = (obj: QuestionTypeTransform) => {
	return {
		id: obj._id,
		text: obj.text,
		answer: obj.answer,
		options: obj.options,
	};
};
const initialState: QuestionSliceState = {
	item: {
		id: '',
		text: '',
		answer: [],
		options: [],
	},
	status: StatusEnum.LOADING,
};

const questionSlice = createSlice({
	name: 'oneQuestion',
	initialState,
	reducers: {
		setItem(state, action: PayloadAction<QuestionType>) {
			state.item = action.payload;
		},
		deleteOption(state, action: PayloadAction<string>) {
			state.item.options = state.item.options.filter(
				(option) => option !== action.payload,
			);
		},
		setItemText(state, action: PayloadAction<string>) {
			state.item.text = action.payload;
		},
		setItemOptions(state, action: PayloadAction<string[]>) {
			state.item.options = action.payload;
		},
		setItemAnswer(state, action: PayloadAction<string[]>) {
			state.item.answer = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOneQuestionAsync.pending, (state) => {
				state.status = StatusEnum.LOADING;
			})
			.addCase(fetchOneQuestionAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.item = transform(action.payload);
			})
			.addCase(fetchOneQuestionAsync.rejected, (state) => {
				state.status = StatusEnum.ERROR;
				// state.error = action.error.message;
				state.item = initialState.item;
			})
			.addCase(updateQuestionAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.item = action.payload;
			});
	},
});

export const fetchOneQuestionAsync = createAsyncThunk(
	'questions/fetchOneQuestionStatus',
	async (id: string) => {
		const { data } = await axios.get(`http://localhost:3005/${id}`);
		return data;
	},
);

export const updateQuestionAsync = createAsyncThunk(
	'questions/updateQuestionStatus',
	async (newQuestion: QuestionType, { dispatch }) => {
		const { data } = await axios.put(
			`http://localhost:3005/${newQuestion.id}`,
			newQuestion,
		);
		dispatch(fetchQuestionsAsync());
		return data;
	},
);

export const {
	setItem,
	setItemText,
	setItemOptions,
	setItemAnswer,
	deleteOption,
} = questionSlice.actions;
export default questionSlice.reducer;
