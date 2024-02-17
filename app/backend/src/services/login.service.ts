import jwt from '../utils/jwt';
import UserModel, { UserSequelizeModel } from '../database/models/users.models';
import { Response } from '../Types/Response';
import bcrypt from '../utils/bcrypt';

const login = async (email: string, password: string): Promise<Response<UserSequelizeModel>> => {
  const foundUserOnDB = await UserModel.findOne({ where: { email } });
  if (!foundUserOnDB) {
    return { status: 401, data: 'Invalid email or password' };
  }
  const result = await bcrypt.passwordValidate(password, foundUserOnDB.dataValues.password);
  if (!result) {
    return { status: 401, data: 'Invalid email or password' };
  }
  const token = jwt.tokenGenerator(
    foundUserOnDB.dataValues.email,
    foundUserOnDB.dataValues.id,
    foundUserOnDB.dataValues.role,
  );
  return { status: 200, data: token };
};

export default {
  login,
};
