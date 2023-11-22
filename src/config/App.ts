import { connectDB } from '../infrastructure/database/connection';
import { userRouter } from '../application/routes/UserRoutes';
import { loginRouter } from '../application/routes/LoginRoutes';
import http from 'node:http';
import { Server as WebsocketServer } from 'socket.io';
// import bodyParser from 'body-parser';
// import logger from 'morgan';
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
// const io = new Server<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >(server, {
//   connectionStateRecovery: {}
// });

//config
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(logger('dev'));

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
