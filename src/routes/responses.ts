import express, { Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticateToken, AuthRequest } from '../utils/auth';

export const responseRoutes = express.Router();

// All routes require authentication
responseRoutes.use(authenticateToken);

// Update response text
responseRoutes.patch('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.userId!;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    // Verify response belongs to user's review
    const response = await prisma.response.findUnique({
      where: { id },
      include: {
        review: true,
      },
    });

    if (!response || response.review.userId !== userId) {
      return res.status(404).json({ message: 'Response not found' });
    }

    const characterCount = text.length;

    // Update response
    const updatedResponse = await prisma.response.update({
      where: { id },
      data: {
        draftText: text,
        characterCount,
        status: 'draft',
      },
    });

    // Create history entry
    await prisma.responseHistory.create({
      data: {
        responseId: id,
        text,
        characterCount,
      },
    });

    res.json(updatedResponse);
  } catch (error) {
    next(error);
  }
});

