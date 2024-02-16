import { RequestHandler, Response } from 'express';
import teamsService from '../services/teams.service';

const getAll:RequestHandler = async (_req, res):Promise<Response> => {
  const responseObject = await teamsService.getAll();
  return res.status(responseObject.status).json(responseObject.data);
};

const getById:RequestHandler = async (req, res):Promise<Response> => {
  const { id } = req.params;
  const responseObject = await teamsService.getById(id);
  return res.status(responseObject.status).json(responseObject.data);
};

export default {
  getAll,
  getById,
};
