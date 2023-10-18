import React, { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { EditComponent } from './components';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
	StatusEnum,
	createQuestionsAsync,
	deleteQuestionAsync,
} from '../../redux/slice/questionsSlice';
import {
	fetchOneQuestionAsync,
	updateQuestionAsync,
} from '../../redux/slice/oneQuestionSlice';

export const EditTest: React.FC = () => {
	// const isEditing = !!useMatch('/editTest/:id');
	const questions = useSelector((state: RootState) => state.questions.items);
	const oneQuestions = useSelector(
		(state: RootState) => state.oneQuestion.item,
	);
	const status = useSelector((state: RootState) => state.questions.status);

	const dispatch = useAppDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const [questionIndex, setQuestionIndex] = useState<number | null>(0);

	useEffect(() => {
		if (params.id) {
			dispatch(fetchOneQuestionAsync(params.id));
		}
	}, [params.id, dispatch]);

	const handleDeleteQuestion = () => {
		if (questionIndex !== null) {
			const id = params.id || '';
			dispatch(deleteQuestionAsync(id));
			navigate('/editTest');
			if (questions.length > 1) {
				setQuestionIndex(questions.length - 2);
				return;
			}
			setQuestionIndex(null);
		}
	};

	const handleAddQuestion = () => {
		const newQuestion = {
			id: (questions.length + 1).toString(),
			answer: ['Ответ№1'],
			text: 'Новый вопрос',
			options: ['Ответ№1', 'Ответ№2', 'Ответ№3', 'Ответ№4'],
		};

		dispatch(createQuestionsAsync(newQuestion));
		setQuestionIndex(questions.length - 1);
	};

	const handleSave = () => {
		dispatch(updateQuestionAsync(oneQuestions));
	};

	// if (status === StatusEnum.LOADING) {
	// 	return (
	// 		<div className="edit-test-container">
	// 			<h1>загрузка...</h1>
	// 		</div>
	// 	);
	// }

	return (
		<div
			className={
				questionIndex !== null
					? 'edit-container'
					: 'edit-test-container'
			}
		>
			<div className="question-container">
				<div className="question-list">
					{status !== StatusEnum.LOADING ? (
						questions.map((question, index) => (
							<Link to={`/editTest/${question.id}`} key={index}>
								<div
									key={index}
									className={`question-item ${
										index === questionIndex
											? 'selected'
											: ''
									}`}
									onClick={() => setQuestionIndex(index)}
								>
									<span className="font-bold  mr-2">
										{`Вопрос: ${index + 1}.  `}{' '}
									</span>
									{question.text}
								</div>
							</Link>
						))
					) : (
						<div>Загрузка...</div>
					)}
				</div>
				<div className="mt-5 flex">
					<Link to="/">
						<button className="button-test">
							Вернуться на главную
						</button>
					</Link>
					<button className="button-test" onClick={handleAddQuestion}>
						Добавить 📝
					</button>
				</div>
			</div>

			<div
				className="flex flex-col justify-between "
				style={{ width: '65%' }}
			>
				{questionIndex !== null && (
					<>
						<EditComponent />
						<div className="mt-10">
							<button
								className="button-test bg-red-500 w-44"
								onClick={handleDeleteQuestion}
							>
								Удалить вопрос
							</button>
							<button
								className="button-test bg-orange-400"
								onClick={() => setQuestionIndex(null)}
							>
								Отменить
							</button>
							<button
								className="button-test"
								onClick={handleSave}
							>
								Сохранить
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
