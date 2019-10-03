import mongoose from '../utils/config';
import Vote from './vote';

const { Schema, model } = mongoose;

async function calculateVotes(question) {
  const upVotes = await Vote.find({
    question,
    value: 1,
  }).countDocuments();
  const downVotes = await Vote.find({
    question,
    value: -1,
  }).countDocuments();
  return upVotes - downVotes;
}

const questionSchema = new Schema({
  question: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

questionSchema.set('toJSON', {
  transform: (document, returnedQuestion) => {
    returnedQuestion.id = returnedQuestion._id.toString();
    delete returnedQuestion._id;
    delete returnedQuestion.__v;
  },
});

questionSchema.virtual('upvotes').get(function() {
  return calculateVotes(this);
});

const Question = model('Question', questionSchema);

export default Question;
