import mongoose from 'mongoose';

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
