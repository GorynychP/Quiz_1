import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router/index.js';

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(`Сервер запущен:${PORT}`);
		});
	} catch (error) {
		console.log('ERROR:', error);
	}
};

start();

// mongoose
// 	.connect(
// 		'mongodb+srv://ivanAnatolyevich:ivan.lol@cluster0.wbnprso.mongodb.net/Quiz?retryWrites=true&w=majority&appName=AtlasApp',
// 	)
// 	.then(() => {
// 		app.listen(port, () => {
// 			console.log(`Сервер запущен:${port}`);
// 		});
// 	});
