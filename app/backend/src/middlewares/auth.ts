import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? 'jwt_secret';

function extractToken(bearerToken: string): string {
  return bearerToken.split(' ')[1];
}

const authentication: RequestHandler = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = extractToken(bearerToken);
  try {
    const decodedToken = jwt.verify(token, secret);
    res.locals.decodedToken = decodedToken as object;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default {
  authentication,
};
