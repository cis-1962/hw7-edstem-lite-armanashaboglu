import mongoose, { Schema, Document } from 'mongoose';

interface QuestionDocument extends Document {
  questionText: string;
  answer: string;
  author: string;
}

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String },
  author: { type: String, required: true }
});

const Question = mongoose.model<QuestionDocument>('Question', questionSchema);

export default Question;
