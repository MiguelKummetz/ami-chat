import { connectDB } from '../infrastructure/database/connection';
import { userRouter } from '../application/routes/UserRoutes';
import { loginRouter } from '../application/routes/LoginRoutes';
import http from 'node:http';
import { Server as WebsocketServer } from 'socket.io';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import sockets from '../infrastructure/sockets/sockets';
dotenv.config();
const connectionString = process.env.DB_URI!;
connectDB(connectionString);

//server
const app = express();
const server = http.createServer(app);
const io = new WebsocketServer(server);
sockets(io);

//config
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

const PORT = process.env.PORT;

server.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

process.on('uncaughtException', () => {
  mongoose.connection.close();
});
