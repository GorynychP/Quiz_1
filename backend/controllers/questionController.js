import questionsService from '../service/questionsService.js';

class QuestionController {
	async getAll(req, res) {
		try {
			const questions = await questionsService.getAllQuestions();
			return res.json(questions);
		} catch (error) {
			console.log('Ошибка получения весех questions', error);
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params;
			const question = await questionsService.getOneQuestion(id);
			// if (!question) {
			// 	throw new Error({ message: 'Такой вопрос не найден ' });
			// }
			return res.json(question);
		} catch (error) {
			console.log('Ошибка получения одного объекта', error);
		}
	}
	async create(req, res) {
		try {
			const { text, answer, options } = req.body;
			const question = await questionsService.createQuestion(
				text,
				answer,
				options,
			);
			return res.json(question);
		} catch (error) {
			console.log('Ошибка добавления ', error);
		}
	}
	async remove(req, res) {
		try {
			const { id } = req.params;
			await questionsService.deleteQuestion(id);

			return res.json(id);
		} catch (error) {
			console.log('Ошибка Удаления', error);
		}
	}

	async update(req, res) {
		try {
			const updateQuestion = req.body;
			await questionsService.editQuestion(updateQuestion);

			return res.json(updateQuestion);
		} catch (error) {
			console.log('Ошибка Обновленя', error);
		}
	}
}

export default new QuestionController();
