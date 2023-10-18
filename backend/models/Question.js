import mongoose from 'mongoose';

const QuestionSchema = mongoose.Schema({
	text: {
		type: String,
		// required: true,
	},
	answer: {
		type: [String],
	},
	options: {
		type: [String],
	},
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
