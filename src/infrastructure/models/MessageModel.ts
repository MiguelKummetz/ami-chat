import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  userId: Object,
  content: String,
  creationDate: Date
});

messageSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  }
});

export const Message = model('Message', messageSchema);
