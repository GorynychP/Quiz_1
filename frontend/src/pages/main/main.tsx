import { Link } from 'react-router-dom';
import styles from './main.module.scss';
import { TestHistoryItem } from '../../components/test-hisory-item/test-history-item';
import { useState } from 'react';

interface HistoryEntry {
	results: [];
	date: string;
	time: string;
}

export const Main: React.FC = () => {
	const raw = localStorage.getItem('history');
	const historyResult = raw ? JSON.parse(raw) : null;
	const [result, setResult] = useState(historyResult);
	const findTrueAnswer = (results: number[]) => {
		const correctAnswers = results.reduce((sum, result) => sum + result, 0);
		return correctAnswers;
	};

	return (
		<div className={`${styles.main}`}>
			<div className="text-center mt-52">
				<h1>Главная страница теста</h1>
				<div className="mt-12">
					<Link to="/test">
						<button className="button-test">Запустить тест</button>
					</Link>
					<Link to="/editTest">
						<button className="button-test">
							Редактировать тест
						</button>
					</Link>
				</div>
				<div className="text-center mt-8">
					<div className="flex justify-evenly items-center">
						<h2 className="mb-3.5 text-3xl">История тестов</h2>
						{result ? (
							<div
								className="ml-3 cursor-pointer"
								onClick={() => setResult(localStorage.clear())}
							>
								Очистить историю
							</div>
						) : null}
					</div>
					{historyResult ? (
						historyResult.map(
							(history: HistoryEntry, index: number) => (
								<TestHistoryItem
									key={index}
									date={history.date}
									time={history.time}
									history={history.results}
									correctAnswers={findTrueAnswer(
										history.results,
									)}
									totalQuestions={history.results.length}
								/>
							),
						)
					) : (
						<div>У вас пока нет истории прохождения тестов</div>
					)}
				</div>
			</div>
		</div>
	);
};
