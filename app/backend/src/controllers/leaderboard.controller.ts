import { RequestHandler, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const getHomeTeamPerformance:RequestHandler = async (_req, res):Promise<Response> => {
  const responseObject = await leaderboardService.getHomeTeamPerformance();
  return res.status(responseObject.status).json(responseObject.data);
};

const getAwayTeamPerformance:RequestHandler = async (_req, res):Promise<Response> => {
  const responseObject = await leaderboardService.getHomeTeamPerformance();
  return res.status(responseObject.status).json(responseObject.data);
};

export default {
  getHomeTeamPerformance,
  getAwayTeamPerformance,
};
