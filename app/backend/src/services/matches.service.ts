import MatchModel,
{ MatchInputtableFields, MatchSequelizeModel } from '../database/models/matches.models';
import TeamModel from '../database/models/teams.model';
import { ResponseArray } from '../Types/Response';
import teamsService from './teams.service';

const equalTeamError = { message: 'It is not possible to create a match with two equal teams' };
const noTeamWithThisIdError = { message: 'There is no team with such id!' };

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

const createMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const homeTeam = await teamsService.getById(homeTeamId.toString());
  const awayTeam = await teamsService.getById(awayTeamId.toString());
  if (homeTeam.data === null || awayTeam.data === null) {
    return { status: 404, data: noTeamWithThisIdError };
  }
  if (homeTeamId === awayTeamId) { return { status: 422, data: equalTeamError }; }
  const params = { homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
    inProgress: true } as MatchInputtableFields;
  const result = await MatchModel.create(params);
  return { status: 201, data: result };
};

export default {
  getAll,
  endMatch,
  updateGoals,
  createMatch,
};
