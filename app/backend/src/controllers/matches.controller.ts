import { RequestHandler, Response } from 'express';
import matchesService from '../services/matches.service';

const getAll:RequestHandler = async (req, res):Promise<Response> => {
  const { inProgress } = req.query;
  const responseObject = await matchesService.getAll(inProgress as string);
  return res.status(responseObject.status).json(responseObject.data);
};

export default {
  getAll,
};
