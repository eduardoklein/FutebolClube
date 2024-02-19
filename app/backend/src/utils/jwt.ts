import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? 'jwt_secret';

const tokenGenerator = (email: string, id: number, role: string) => {
  const token = jwt.sign({
    sub: id,
    email,
    role,
  }, secret, {
    expiresIn: '24h',
  });
  return token;
};

export default {
  tokenGenerator,
};
