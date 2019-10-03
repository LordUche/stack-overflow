import mongoose from '../utils/config';

const { Schema, model } = mongoose;

const answerSchema = new Schema({
  text: { type: String, required: true },
  helped: { type: Boolean, required: true, default: false },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

answerSchema.set('toJSON', {
  transform: (document, returnedAnswer) => {
    returnedAnswer.id = returnedAnswer._id.toString();
    delete returnedAnswer._id;
    delete returnedAnswer.__v;
  },
});

answerSchema.index({ question: 1, user: 1 }, { unique: true });

const Answer = model('Answer', answerSchema);

export default Answer;
