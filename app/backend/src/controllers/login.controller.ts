import { RequestHandler, Response } from 'express';
import loginService from '../services/login.service';

const login:RequestHandler = async (req, res):Promise<Response> => {
  const { email, password } = req.body;
  const responseObject = await loginService.login(email, password);
  return res.status(responseObject.status).json({ message: responseObject.data });
};

export default {
  login,
};
