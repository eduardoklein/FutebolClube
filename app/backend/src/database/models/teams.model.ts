import {
  DataTypes,
  Model,
  ModelDefined,
  Optional,
} from 'sequelize';

import db from './index';
import { Team } from '../../Types/Team';

export type TeamInputtableFields = Optional<Team, 'id'>;
type TeamSequelizeModelCreator = ModelDefined<Team, TeamInputtableFields>;
export type TeamSequelizeModel = Model<Team, TeamInputtableFields>;

const TeamModel: TeamSequelizeModelCreator = db.define('Team', {
  teamName: DataTypes.STRING,
}, {
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamModel;
