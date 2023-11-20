import mongoose from 'mongoose';

const connectionString =
  process.env.URI_DB ??
  'mongodb+srv://ami:1234@cluster0.kyprtz4.mongodb.net/chat?retryWrites=true&w=majority';
//conexion con mongoDB
export const connectDB = (connectionString: string) => {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error(error);
    });
  process.on('uncaughtException', (error) => {
    console.error(error);
    mongoose.connection.close();
  });
};
