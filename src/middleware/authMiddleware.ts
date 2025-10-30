import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend Express Request to include a custom "user" property
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get token from "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      console.error('❌ Missing JWT_SECRET in .env');
      return res.status(500).json({ message: 'Internal server error: JWT secret missing' });
    }

    const verified = jwt.verify(token, secret);
    req.user = verified; // attach user payload to request
    next(); // move to next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};
