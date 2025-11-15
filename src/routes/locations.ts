import express, { Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticateToken, AuthRequest } from '../utils/auth';

export const locationRoutes = express.Router();

// All routes require authentication
locationRoutes.use(authenticateToken);

// Get all locations
locationRoutes.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    const locations = await prisma.location.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(locations);
  } catch (error) {
    next(error);
  }
});

// Create location
locationRoutes.post('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, address } = req.body;
    const userId = req.userId!;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const location = await prisma.location.create({
      data: {
        userId,
        name,
        address,
      },
    });

    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
});



