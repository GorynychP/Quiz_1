import { config } from 'dotenv';
import Question from '../models/Question.js';

config();

class QuestionService {
	async getAllQuestions() {
		const questions = await Question.find();
		return questions;
	}

	async getOneQuestion(id) {
		const question = await Question.findOne({ _id: id });
		return question;
	}
	async editQuestion(updateQuestion) {
		const question = await Question.updateOne(
			{ _id: updateQuestion.id },
			{
				text: updateQuestion.text,
				options: updateQuestion.options,
				answer: updateQuestion.answer,
			},
		);
		return question;
	}

	async createQuestion(text, answer, options) {
		const question = await Question.create({ text, answer, options });
		return question;
	}

	async deleteQuestion(id) {
		await Question.deleteOne({ _id: id });
	}
}

export default new QuestionService();
