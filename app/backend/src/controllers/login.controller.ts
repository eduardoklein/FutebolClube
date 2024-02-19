import { RequestHandler, Response } from 'express';
import loginService from '../services/login.service';

const login:RequestHandler = async (req, res):Promise<Response> => {
  const { email, password } = req.body;
  const responseObject = await loginService.login(email, password);
  return res.status(responseObject.status).json(responseObject.data);
};

const getRole:RequestHandler = async (_req, res):Promise<Response> => {
  const { role } = res.locals.decodedToken;
  const responseObject = loginService.getRole(role);
  return res.status(responseObject.status).json({ role: responseObject.data });
};

export default {
  login,
  getRole,
};
