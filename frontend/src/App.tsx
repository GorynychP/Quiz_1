import { Link, Route, Routes } from 'react-router-dom';
import { EditTest, Main, Test } from './pages';
import { useEffect } from 'react';
import { fetchQuestionsAsync } from './redux/slice/questionsSlice';
import { useAppDispatch } from './redux/store';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(fetchQuestionsAsync());
			} catch (error) {
				console.error('Error in useEffect:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	return (
		<>
			<div className="w-auto flex">
				<Link className="mr-8" to="/">
					Главная
				</Link>
				<Link className="mr-8" to="/test">
					Страница теста
				</Link>
				<Link className="mr-8" to="/editTest">
					Редактирование теста
				</Link>
			</div>
			<div className="mt-24">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/test" element={<Test />} />
					{/* <Route path="/editTest" element={<EditTest />} /> */}
					<Route path="/editTest/:id?" element={<EditTest />} />
					<Route
						path="*"
						element={<div> Неизвестная страница</div>}
					/>
				</Routes>
			</div>
		</>
	);
};

export default App;
