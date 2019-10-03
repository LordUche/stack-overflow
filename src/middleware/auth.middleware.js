import { getTokenFromRequestHeaders } from '../utils/helpers';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const verifyToken = async (req, res, next) => {
  try {
    const token = getTokenFromRequestHeaders(req);
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(payload.id)
    if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('User does not exist.'));
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError')
      next({ status: 401, message: 'Invalid token.' });
    else next({ status: 403, message: 'Authentication failed.' });
  }
};
