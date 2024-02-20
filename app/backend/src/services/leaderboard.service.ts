import TeamModel from '../database/models/teams.model';
import MatchModel from '../database/models/matches.models';
import leaderboardConstructor from '../utils/leaderboardConstructor';
import { Team } from '../Types/Team';
import { Match } from '../Types/Match';
import { Leaderboard } from '../Types/Leaderboad';

const getHomeTeamPerformance = async () => {
  const matchesList = await MatchModel.findAll();
  const finishedMatches = matchesList.filter((match) =>
    match.dataValues.inProgress === false) as unknown as Match[];
  const totalTeams = await TeamModel.findAll() as unknown as Team[];
  const leaderboard = leaderboardConstructor.general(totalTeams) as Leaderboard[];
  const homeLeaderboard = leaderboardConstructor.homeTeam(finishedMatches, leaderboard);

  return { status: 200, data: homeLeaderboard };
};

const getAwayTeamPerformance = async () => {
  const matchesList = await MatchModel.findAll();
  const finishedMatches = matchesList.filter((match) =>
    match.dataValues.inProgress === false) as unknown as Match[];
  const totalTeams = await TeamModel.findAll() as unknown as Team[];
  const leaderboard = leaderboardConstructor.general(totalTeams) as Leaderboard[];
  const awayLeaderboard = leaderboardConstructor.awayTeam(finishedMatches, leaderboard);

  return { status: 200, data: awayLeaderboard };
};

export default {
  getHomeTeamPerformance,
  getAwayTeamPerformance,
};
