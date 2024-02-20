import { Match } from '../Types/Match';
import { Team } from '../Types/Team';
import { Leaderboard } from '../Types/Leaderboad';

const general = (totalTeams: Team[]) => {
  const leaderboardObject = totalTeams.map((team) => {
    const object = {
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };
    return object;
  });

  return leaderboardObject;
};

const calculatePointsHome = (homeTeamGoals: number, awayTeamGoals: number): number => {
  if (homeTeamGoals > awayTeamGoals) {
    return 3;
  } if (homeTeamGoals === awayTeamGoals) {
    return 1;
  }
  return 0;
};

const calculatePointsAway = (homeTeamGoals: number, awayTeamGoals: number): number => {
  if (awayTeamGoals > homeTeamGoals) {
    return 3;
  } if (awayTeamGoals === homeTeamGoals) {
    return 1;
  }
  return 0;
};

const updateLeaderboardForMatchHome = (homeTeam: Leaderboard, match: Match): Leaderboard => {
  const { homeTeamGoals, awayTeamGoals } = match;
  const pointsToAdd = calculatePointsHome(homeTeamGoals, awayTeamGoals);
  const victoriesToAdd = pointsToAdd === 3 ? 1 : 0;
  const drawsToAdd = pointsToAdd === 1 ? 1 : 0;
  const lossesToAdd = pointsToAdd === 0 ? 1 : 0;

  return {
    ...homeTeam,
    totalPoints: homeTeam.totalPoints + pointsToAdd,
    totalVictories: homeTeam.totalVictories + victoriesToAdd,
    totalDraws: homeTeam.totalDraws + drawsToAdd,
    totalLosses: homeTeam.totalLosses + lossesToAdd,
    totalGames: homeTeam.totalGames + 1,
    goalsFavor: homeTeam.goalsFavor + homeTeamGoals,
    goalsOwn: homeTeam.goalsOwn + awayTeamGoals,
  };
};

const updateLeaderboardForMatchAway = (homeTeam: Leaderboard, match: Match): Leaderboard => {
  const { homeTeamGoals, awayTeamGoals } = match;
  const pointsToAdd = calculatePointsAway(homeTeamGoals, awayTeamGoals);
  const victoriesToAdd = pointsToAdd === 3 ? 1 : 0;
  const drawsToAdd = pointsToAdd === 1 ? 1 : 0;
  const lossesToAdd = pointsToAdd === 0 ? 1 : 0;

  return {
    ...homeTeam,
    totalPoints: homeTeam.totalPoints + pointsToAdd,
    totalVictories: homeTeam.totalVictories + victoriesToAdd,
    totalDraws: homeTeam.totalDraws + drawsToAdd,
    totalLosses: homeTeam.totalLosses + lossesToAdd,
    totalGames: homeTeam.totalGames + 1,
    goalsFavor: homeTeam.goalsFavor + homeTeamGoals,
    goalsOwn: homeTeam.goalsOwn + awayTeamGoals,
  };
};

const homeTeam = (finishedMatches: Match[], leaderboard: Leaderboard[]) => {
  const updatedLeaderboard = [...leaderboard];

  finishedMatches.forEach((match) => {
    const homeTeamIndex = match.homeTeamId - 1;
    const homeTeamConst = updatedLeaderboard[homeTeamIndex];

    updatedLeaderboard[homeTeamIndex] = updateLeaderboardForMatchHome(homeTeamConst, match);
  });

  return updatedLeaderboard;
};

const awayTeam = (finishedMatches: Match[], leaderboard: Leaderboard[]) => {
  const updatedLeaderboard = [...leaderboard];

  finishedMatches.forEach((match) => {
    const awayTeamIndex = match.awayTeamId - 1;
    const awayTeamConst = updatedLeaderboard[awayTeamIndex];

    updatedLeaderboard[awayTeamIndex] = updateLeaderboardForMatchAway(awayTeamConst, match);
  });

  return updatedLeaderboard;
};

export default {
  general,
  homeTeam,
  awayTeam,
};
