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
      goalsBalance: 0,
      efficiency: 0,
    };
    return object;
  });

  return leaderboardObject;
};

const calculateBalanceAndEfficiency = (
  homeTeamGoals: number,
  awayTeamGoals: number,
  points: number,
  games: number,
) => {
  const goalsBalance = homeTeamGoals - awayTeamGoals;
  const efficiency = parseFloat(Number((points / (games * 3)) * 100).toFixed(2));

  return { goalsBalance, efficiency };
};

const addEandB = (updatedLeaderboard: Leaderboard[]) => updatedLeaderboard.map((place) => {
  const result = calculateBalanceAndEfficiency(
    place.goalsFavor,
    place.goalsOwn,
    place.totalPoints,
    place.totalGames,
  );
  return {
    ...place,
    efficiency: result.efficiency,
    goalsBalance: result.goalsBalance,
  };
});

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

const sortedReturn = (updatedLeaderboardWithBandE: Leaderboard[]) => updatedLeaderboardWithBandE
  .sort((place1, place2) => {
    if (place1.totalPoints === place2.totalPoints) {
      if (place1.totalVictories === place2.totalVictories) {
        if (place1.goalsBalance === place2.goalsBalance) {
          return place2.goalsFavor - place1.goalsFavor;
        }
        return place2.goalsBalance - place1.goalsBalance;
      }
      return place2.totalVictories - place1.totalVictories;
    }
    return place2.totalPoints - place1.totalPoints;
  });

const homeTeam = (finishedMatches: Match[], leaderboard: Leaderboard[]) => {
  const updatedLeaderboard = [...leaderboard];

  finishedMatches.forEach((match) => {
    const homeTeamIndex = match.homeTeamId - 1;
    const homeTeamConst = updatedLeaderboard[homeTeamIndex];

    updatedLeaderboard[homeTeamIndex] = updateLeaderboardForMatchHome(homeTeamConst, match);
  });

  const updatedLeaderboardWithBandE = addEandB(updatedLeaderboard) as Leaderboard[];

  return sortedReturn(updatedLeaderboardWithBandE);
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
