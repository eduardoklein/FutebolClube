import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import auth from '../middlewares/auth';

const matchesRoutes = Router();

matchesRoutes.post(
  '/',
  (req, res, next) => { auth.authentication(req, res, next); },
  (req, res, next) => { matchesController.createMatch(req, res, next); },
);

matchesRoutes.patch(
  '/:id/finish',
  (req, res, next) => { auth.authentication(req, res, next); },
  (req, res, next) => { matchesController.endMatch(req, res, next); },
);

matchesRoutes.patch(
  '/:id/',
  (req, res, next) => { auth.authentication(req, res, next); },
  (req, res, next) => { matchesController.updateGoals(req, res, next); },
);

matchesRoutes.get(
  '/',
  (req, res, next) => { matchesController.getAll(req, res, next); },
);

export default matchesRoutes;
