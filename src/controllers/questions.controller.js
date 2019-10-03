import Question from '../models/question';
import Vote from '../models/vote';

export const create = async (req, res, next) => {
  try {
    const question = await Question.create({
      ...req.body,
      user: req.user,
    });
    res.status(201).json(question.toJSON());
  } catch (error) {
    next(new Error('Problem creating question.'));
  }
};

export const show = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) res.json(question.toJSON());
    else next({ status: 404, message: 'Question not found.' });
  } catch (error) {
    next(new Error('Problem getting question.'));
  }
};

export const update = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      await Vote.findOneAndUpdate(
        { question: question, user: req.user },
        { value: req.params.vote === 'upvote' ? 1 : -1 },
        { upsert: true }
      );
      const vote = await Vote.findOne({ question: question, user: req.user });
      res.status(201).json({vote, totalVotes: await question.upvotes});
    } else next({ status: 404, message: 'Question not found.' });
  } catch (error) {
    next(error);
  }
};
