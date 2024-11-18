import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Verify the token exists and add the user data to the request object
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Log other items in the array for curiosity
    console.log(authHeader.split(' '));
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    jwt.verify(token, secretKey, (error, user) => {
      if (error) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    })
    
  } else {
    console.log('Get you a token');
    res.sendStatus(401);
  }
};
