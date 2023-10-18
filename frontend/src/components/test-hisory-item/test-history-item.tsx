import { AnswerScale } from './components';

interface TestHistoryItemProps {
	date: string;
	time: string;
	history: [];
	correctAnswers: number;
	totalQuestions: number;
}

export const TestHistoryItem: React.FC<TestHistoryItemProps> = ({
	date,
	time,
	history,
	correctAnswers,
	totalQuestions,
}) => {
	console.log('totalQuestions', totalQuestions);
	return (
		<div className="test-history">
			<div>
				<p>{date}</p>
				<p>{time}</p>
			</div>
			<div className="w-96">
				<AnswerScale
					history={history}
					totalQuestions={totalQuestions}
				/>
			</div>
			<div>
				{correctAnswers} из {totalQuestions}
			</div>
		</div>
	);
};
