import { Router } from 'express';
import matchesController from '../controllers/matches.controller';

const matchesRoutes = Router();

matchesRoutes.get(
  '/',
  //   (req, res, next) => { auth.authentication(req, res, next); },
  (req, res, next) => { matchesController.getAll(req, res, next); },
);

export default matchesRoutes;
