import {
  DataTypes,
  Model,
  ModelDefined,
  Optional,
} from 'sequelize';

import db from './index';
import { Match } from '../../Types/Match';
import TeamModel from './teams.model';

export type MatchInputtableFields = Optional<Match, 'id'>;
type MatchSequelizeModelCreator = ModelDefined<Match, MatchInputtableFields>;
export type MatchSequelizeModel = Model<Match, MatchInputtableFields>;

const MatchModel: MatchSequelizeModelCreator = db.define('Match', {
  homeTeamId: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeamId: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default MatchModel;
