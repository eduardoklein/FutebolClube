import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/home', (req, res, next) =>
  leaderboardController.getHomeTeamPerformance(req, res, next));

leaderboardRoutes.get('/away', (req, res, next) =>
  leaderboardController.getAwayTeamPerformance(req, res, next));

export default leaderboardRoutes;
