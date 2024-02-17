import * as bcrypt from 'bcryptjs';

const passwordValidate = async (password: string, loggedUserPassword: string) => {
  const passwordCompareResult = await bcrypt.compare(password, loggedUserPassword);
  return passwordCompareResult;
};

export default {
  passwordValidate,
};
