import User from '../models/user';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password: hashSync(password, 10) });

    if (user) {
      const token = jwt.sign(user, process.env.SECRET);
      res.status(201).json({ user, token });
    } else {
      throw new Error('User does not exist.');
    }
  } catch (error) {
    next({ status: 401, message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && compareSync(password, user.password)) {
      const token = jwt.sign({ email, id: user.id }, process.env.SECRET);
      res.json({ user, token });
    } else {
      throw new Error('Invalid credentials.')
    }
  } catch (error) {
    next({ status: 401, message: error.message });
  }
};
