import { connectDB } from '../infrastructure/database/connection';
import { userRouter } from '../application/routes/UserRoutes';
import { loginRouter } from '../application/routes/LoginRoutes';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
// import bodyParser from 'body-parser';
// import logger from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();
const connectionString = process.env.DB_URI!;
connectDB(connectionString);

//server
const app = express();
const server = createServer(app);
const io = new Server(server);

//config
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(logger('dev'));

app.get('/', (_req, res) => {
  console.log('get inicial recibido');
  res.sendFile(process.cwd() + '/client/chat.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket);
});

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

process.on('uncaughtException', () => {
  mongoose.connection.close();
});
