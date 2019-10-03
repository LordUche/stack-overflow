import mongoose from '../utils/config';

const { Schema, model } = mongoose;

const voteSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: Number, required: true },
});

voteSchema.index({ question: 1, user: 1 }, { unique: true });

voteSchema.set('toJSON', {
  transform: (document, returnedVote) => {
    returnedVote.id = returnedVote._id.toString();
    delete returnedVote._id;
    delete returnedVote.__v;
  },
});

voteSchema.post('save', async function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('You have already upvoted this question.'));
  } else {
    next(new Error(error));
  }
});

const Vote = model('Vote', voteSchema);

export default Vote;
