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
  console.log(email);
  console.log(password);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Falhei email');
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length < 6) {
    console.log('Falhei password');
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default {
  noEmptyFields,
  noInvalidFields,
};
