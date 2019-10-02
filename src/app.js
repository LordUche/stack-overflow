import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import router from './routes';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(logger('dev'));

app.use('', router);

app.use('*', (req, res, next) => {
  next({ status: 404, message: 'Resource not found.' });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Something went wrong.' });
});

export default app;
