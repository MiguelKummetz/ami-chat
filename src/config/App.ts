import { connectDB } from '../infrastructure/database/connection';
import { userRouter } from '../application/routes/UserRoutes';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json);

app.get('/', (_req, res) => {
  res.send('holi mundo');
});
app.use('/users', userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
