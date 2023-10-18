// src/TestResult.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// import { Question } from '../../../App';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
interface TestResultProps {
	results: number[];
	onRestart: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({
	results,
	onRestart,
}) => {
	const questions = useSelector((state: RootState) => state.questions.items);
	const totalQuestions = questions.length;
	const correctAnswers = results.reduce((sum, result) => sum + result, 0);

	return (
		<div className="test-result">
			<h2 className="text-4xl mb-5">Результаты теста</h2>
			<p>{`Правильных ответов: ${correctAnswers} из ${totalQuestions}`}</p>
			<div className="navigation-buttons">
				<button className="button-test" onClick={onRestart}>
					Пройти тест еще раз
				</button>
				<Link to="/">
					<button className="button-test">
						Вернуться на главную
					</button>
				</Link>
			</div>
		</div>
	);
};
