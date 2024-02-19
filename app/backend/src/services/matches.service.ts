import MatchModel, { MatchSequelizeModel } from '../database/models/matches.models';
import TeamModel from '../database/models/teams.model';
import { ResponseArray } from '../Types/Response';

const getAll = async (inProgress: string): Promise<ResponseArray<MatchSequelizeModel>> => {
  const matchesList = await MatchModel.findAll({ include: [
    { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
    { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
  ] });
  if (inProgress === 'true') {
    const ongoingMatches = matchesList.filter((match) =>
      match.dataValues.inProgress === true);
    return { status: 200, data: ongoingMatches };
  }
  if (inProgress === 'false') {
    const ongoingMatches = matchesList.filter((match) =>
      match.dataValues.inProgress === false);
    return { status: 200, data: ongoingMatches };
  }
  return { status: 200, data: matchesList };
};

const endMatch = async (id: string) => {
  await MatchModel.update({ inProgress: false }, { where: { id } });
  return { status: 200, data: { message: 'Finished' } };
};

const updateGoals = async (id: string, newHomeGoals: number, newAwayGoals: number) => {
  await MatchModel.update(
    { homeTeamGoals: newHomeGoals, awayTeamGoals: newAwayGoals },
    { where: { id } },
  );
  return { status: 200, data: { message: 'Finished' } };
};

export default {
  getAll,
  endMatch,
  updateGoals,
};
