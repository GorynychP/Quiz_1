import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type QuestionType = {
	id: string;
	text: string;
	answer: string[] | [];
	options: string[] | [];
};
export type QuestionTypeTransform = {
	_id: string;
	text: string;
	answer: string[] | [];
	options: string[] | [];
};

export enum StatusEnum {
	LOADING = 'loading',
	COMPLETED = 'completed',
	ERROR = 'error',
}

interface QuestionSliceState {
	items: QuestionType[];
	status: string;
}

const transform = (arr: QuestionTypeTransform[]) => {
	return arr.map((item) => {
		return {
			id: item._id,
			text: item.text,
			answer: item.answer,
			options: item.options,
		};
	});
};

const initialState: QuestionSliceState = {
	items: [],
	status: StatusEnum.LOADING,
};

const questionSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<QuestionType[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchQuestionsAsync.pending, (state) => {
				state.status = StatusEnum.LOADING;
			})
			.addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.items = transform(action.payload);
			})
			.addCase(fetchQuestionsAsync.rejected, (state) => {
				state.status = StatusEnum.ERROR;
				// state.error = action.error.message;
				state.items = [];
			})
			.addCase(createQuestionsAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.items.push(action.payload);
			})
			.addCase(deleteQuestionAsync.fulfilled, (state, action) => {
				state.status = StatusEnum.COMPLETED;
				state.items = state.items.filter(
					(question) => question.id !== action.payload,
				);
			});
	},
});
export const fetchQuestionsAsync = createAsyncThunk(
	'questions/fetchQuestionsStatus',
	async () => {
		const { data } = await axios.get('http://localhost:3005');
		return data;
	},
);
export const createQuestionsAsync = createAsyncThunk(
	'questions/createQuestionsStatus',
	async (newQuestion, { dispatch }) => {
		const { data } = await axios.post('http://localhost:3005', newQuestion);
		dispatch(fetchQuestionsAsync());
		return data;
	},
);
export const deleteQuestionAsync = createAsyncThunk(
	'questions/deleteQuestionStatus',
	async (id: string) => {
		const { data } = await axios.delete(`http://localhost:3005/${id}`);
		return data;
	},
);

export const { setItems } = questionSlice.actions;
export default questionSlice.reducer;
