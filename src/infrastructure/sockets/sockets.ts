import jwt from 'jsonwebtoken';
import { Message } from '../models/MessageModel';

export default (io: any) => {
  ////////////////
  io.on('connection', (socket: any) => {
    console.log('New user connected');
    const emitMessages = async () => {
      const messages = await Message.find();

      io.emit('server:loadMessages', messages);
    };
    emitMessages();

    socket.on('disconnect', () => {
      console.log('A user has disconnected');
    });

    socket.on('client:newMessage', async (data: any, options: any) => {
      const newMessage = new Message({
        content: data.message,
        creationDate: data.newDate,
        username: data.username
      });
      const token = options.headers.Authorization.replace('Bearer ', ''); // Extrae el token del encabezado
      const decodedToken = jwt.verify(token, process.env.SECRET!);

      if (decodedToken !== null) {
        const savedMessage = await newMessage.save();
        io.emit('server:newMessage', savedMessage);
      } else {
        console.log('token missing or invalid');
      }
    });
  });
};
