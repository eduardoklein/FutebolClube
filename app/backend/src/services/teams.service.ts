import { Response, ResponseArray } from '../Types/Response';
import TeamModel, { TeamSequelizeModel } from '../database/models/teams.model';

const getAll = async (): Promise<ResponseArray<TeamSequelizeModel>> => {
  const teamsList = await TeamModel.findAll();
  return { status: 200, data: teamsList };
};

const getById = async (id: string): Promise<Response<TeamSequelizeModel | null>> => {
  const team = await TeamModel.findOne({ where: { id } });
  return { status: 200, data: team };
};

export default {
  getAll,
  getById,
};
