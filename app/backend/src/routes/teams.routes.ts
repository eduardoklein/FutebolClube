import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const teamRoutes = Router();

teamRoutes.get('/:id', (req, res, next) => teamsController.getById(req, res, next));
teamRoutes.get('/', (req, res, next) => teamsController.getAll(req, res, next));

export default teamRoutes;
