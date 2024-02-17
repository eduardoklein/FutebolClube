import { Router } from 'express';
import loginController from '../controllers/login.controller';
import validateFields from '../middlewares/validateFields';

const loginRoutes = Router();

loginRoutes.post(
  '/',
  (req, res, next) => { validateFields.noEmptyFields(req, res, next); },
  (req, res, next) => { validateFields.noInvalidFields(req, res, next); },
  (req, res, next) => { loginController.login(req, res, next); },
);

export default loginRoutes;
