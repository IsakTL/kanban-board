import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // If the user exists and the password is correct, return a JWT token
  const {username, password} = req.body;

  // Match username to user
  const user = await User.findOne(
    {where: {username}}
  );
  
  if(!user){
    return res.status(401).json({message: 'Invalid username or password'});
  }

  // Validate password for valid user
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if(!passwordIsValid) {
    return res.status(401).json({message: 'Invalid username or password'});
  }

  const superSecretKey = process.env.JWT_SECRET_KEY || '';
  
  // Token is validated for one hour
  const token = jwt.sign({username}, superSecretKey, {expiresIn: '24h'});

  return res.json({token});
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
