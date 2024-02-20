import { RequestHandler, Response } from 'express';
import matchesService from '../services/matches.service';

const getAll:RequestHandler = async (req, res):Promise<Response> => {
  const { inProgress } = req.query;
  const responseObject = await matchesService.getAll(inProgress as string);
  return res.status(responseObject.status).json(responseObject.data);
};

const endMatch:RequestHandler = async (req, res):Promise<Response> => {
  const { id } = req.params;
  const responseObject = await matchesService.endMatch(id);
  return res.status(responseObject.status).json(responseObject.data);
};

const updateGoals:RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const responseObject = await matchesService.updateGoals(id, homeTeamGoals, awayTeamGoals);
  return res.status(responseObject.status).json(responseObject.data);
};

const createMatch:RequestHandler = async (req, res) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const responseObject = await matchesService.createMatch(
    +homeTeamId,
    +awayTeamId,
    +homeTeamGoals,
    +awayTeamGoals,
  );
  return res.status(responseObject.status).json(responseObject.data);
};

export default {
  getAll,
  endMatch,
  updateGoals,
  createMatch,
};
