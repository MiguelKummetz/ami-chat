import { connectDB } from '../infrastructure/database/connection';
import { userRouter } from '../application/routes/UserRoutes';
import logger from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();
const connectionString =
  process.env.URI_DB ??
  'mongodb+srv://ami:1234@cluster0.kyprtz4.mongodb.net/chat?retryWrites=true&w=majority';
connectDB(connectionString);

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/', (_req, res) => {
  res.send('<h1>🦝</h1>');
});

app.use('/api/users', userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

process.on('uncaughtException', () => {
  mongoose.connection.close();
});
