import { useState } from 'react';
import { TestResult } from './components/test-result';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { StatusEnum } from '../../redux/slice/questionsSlice';

const localeStorage = (newResults: number[]) => {
	const currentHistory = localStorage.getItem('history');
	const historyArr = currentHistory ? JSON.parse(currentHistory) : [];
	const newEntry = {
		results: newResults,
		date: new Date().toLocaleDateString(),
		time: new Date().toLocaleTimeString(),
	};
	historyArr.push(newEntry);
	localStorage.setItem('history', JSON.stringify(historyArr));
};

export const Test: React.FC = () => {
	const [isTestComplete, setIsTestComplete] = useState(false);
	const questions = useSelector((state: RootState) => state.questions.items);
	const status = useSelector((state: RootState) => state.questions.status);
	const [testResults, setTestResults] = useState<number[]>(
		new Array(questions.length).fill(0),
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const handleOptionSelect = (option: string) => {
		const updatedSelectedOptions = [...selectedOptions];
		updatedSelectedOptions[currentQuestionIndex] = option;
		setSelectedOptions(updatedSelectedOptions);
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	};

	const handlePreviousQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
	};

	const handleCompleteTest = () => {
		const newResults = selectedOptions.map((selectedOption, index) =>
			questions[index].answer.includes(selectedOption) ? 1 : 0,
		);
		localeStorage(newResults);
		setTestResults(newResults);
		setIsTestComplete(true);
	};

	const handleRestartTest = () => {
		setIsTestComplete(false);
		setTestResults([]);
		setSelectedOptions([]);
		setCurrentQuestionIndex(0);
	};

	const renderOptions = (options: string[]) => {
		return options.map((option, index) => (
			<div key={index} className="option">
				<input
					className="ml-5"
					type="checkbox"
					checked={selectedOptions[currentQuestionIndex] === option}
					onChange={() => handleOptionSelect(option)}
				/>
				<label className="ml-5 text-2xl">{option}</label>
			</div>
		));
	};
	const currentQuestion = questions[currentQuestionIndex];

	if (status === StatusEnum.LOADING) {
		return <div>Загрузка....</div>;
	}

	if (isTestComplete) {
		return (
			<TestResult results={testResults} onRestart={handleRestartTest} />
		);
	}
	return (
		<div className="test-container">
			<h2 className="text-5xl">Вопрос {currentQuestionIndex + 1}</h2>
			<p className="text-3xl m-5"> {currentQuestion.text}</p>
			<div className="options">
				{renderOptions(currentQuestion.options)}
			</div>
			<div className="flex justify-between mt-5">
				<button
					className="button-test bg-slate-400 hover:bg-orange-400"
					onClick={handlePreviousQuestion}
					disabled={currentQuestionIndex === 0}
				>
					Предыдущий вопрос
				</button>
				{currentQuestionIndex < questions.length - 1 ? (
					<button
						className="button-test bg-slate-400 hover:bg-orange-400"
						onClick={handleNextQuestion}
					>
						Следующий вопрос
					</button>
				) : (
					<button
						className="button-test "
						onClick={handleCompleteTest}
					>
						Завершить тест
					</button>
				)}
			</div>
		</div>
	);
};
