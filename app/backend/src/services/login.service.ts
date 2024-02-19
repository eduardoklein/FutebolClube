import jwt from '../utils/jwt';
import UserModel, { UserSequelizeModel } from '../database/models/users.models';
import { Response } from '../Types/Response';
import bcrypt from '../utils/bcrypt';

const login = async (email: string, password: string) => {
  const foundUserOnDB = await UserModel.findOne({ where: { email } });
  if (!foundUserOnDB) {
    console.log('Falhei pq o email nao existe no db');
    return { status: 401, data: { message: 'Invalid email or password' } };
  }
  const result = await bcrypt.passwordValidate(password, foundUserOnDB.dataValues.password);
  if (!result) {
    console.log('Falhei pq a senha informada é diferente da do DB');
    return { status: 401, data: { message: 'Invalid email or password' } };
  }
  const token = jwt.tokenGenerator(
    foundUserOnDB.dataValues.email,
    foundUserOnDB.dataValues.id,
    foundUserOnDB.dataValues.role,
  );
  return { status: 200, data: { token } };
};

const getRole = (role: string) => ({ status: 200, data: role });

export default {
  login,
  getRole,
};
