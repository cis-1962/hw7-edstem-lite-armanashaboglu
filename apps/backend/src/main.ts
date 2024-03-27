import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import accountRouter from './routes/account';
import questionsRouter from './routes/questions';


// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb+srv://armanash:Armie101@cluster0.qga3m9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: ['secret-key'],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use('/api/account', accountRouter);
app.use('/api/questions', questionsRouter);

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'Something broke!' });
};

app.use(errorHandler);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});

// mongodb+srv://armanash:Armie101@cluster0.qga3m9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://armanash:<password>@cluster0.qga3m9z.mongodb.net/