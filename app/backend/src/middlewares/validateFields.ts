import { RequestHandler } from 'express';

type RequestBody = {
  email: string;
  password: string;
};

const noEmptyFields:RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const noInvalidFields:RequestHandler = (req, res, next) => {
  const { email, password } = req.body as RequestBody;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default {
  noEmptyFields,
  noInvalidFields,
};
