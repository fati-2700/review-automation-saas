import express from 'express';
import { prisma } from '../utils/prisma';
import { authenticateToken, AuthRequest } from '../utils/auth';
import { generateResponse, adjustTone } from '../utils/responseGenerator';

export const reviewRoutes = express.Router();

// All routes require authentication
reviewRoutes.use(authenticateToken);

// Get all reviews with filters
reviewRoutes.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { rating, status, search } = req.query;
    const userId = req.userId!;

    const where: any = {
      userId,
    };

    if (rating) {
      where.rating = parseInt(rating as string);
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search as string, mode: 'insensitive' } },
        { reviewText: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        location: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        response: {
          select: {
            id: true,
            draftText: true,
            finalText: true,
            status: true,
            characterCount: true,
            publishedAt: true,
          },
        },
      },
      orderBy: {
        reviewDate: 'desc',
      },
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// Get single review
reviewRoutes.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const review = await prisma.review.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        location: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        response: {
          include: {
            history: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    next(error);
  }
});

// Create review manually
reviewRoutes.post('/', async (req: AuthRequest, res, next) => {
  try {
    const { locationId, customerName, rating, reviewText, reviewDate } = req.body;
    const userId = req.userId!;

    if (!locationId || !rating || !reviewText) {
      return res.status(400).json({ message: 'locationId, rating, and reviewText are required' });
    }

    // Verify location belongs to user
    const location = await prisma.location.findFirst({
      where: {
        id: locationId,
        userId,
      },
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Get brand voice settings
    const brandVoice = await prisma.brandVoiceSettings.findUnique({
      where: { userId },
    });

    // Generate response
    const responseText = adjustTone(
      generateResponse({
        rating: parseInt(rating),
        brandVoice,
      }),
      brandVoice?.tone || 'professional'
    );

    const characterCount = responseText.length;

    // Create review with response
    const review = await prisma.review.create({
      data: {
        locationId,
        userId,
        customerName,
        rating: parseInt(rating),
        reviewText,
        reviewDate: reviewDate ? new Date(reviewDate) : new Date(),
        status: 'pending',
        response: {
          create: {
            draftText: responseText,
            characterCount,
          },
        },
      },
      include: {
        location: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        response: true,
      },
    });

    // Create initial history entry
    await prisma.responseHistory.create({
      data: {
        responseId: review.response!.id,
        text: responseText,
        characterCount,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

// Approve and publish review response
reviewRoutes.post('/:id/approve', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const review = await prisma.review.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        response: true,
      },
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (!review.response) {
      return res.status(400).json({ message: 'Review has no response' });
    }

    // Update response
    const updatedResponse = await prisma.response.update({
      where: { id: review.response.id },
      data: {
        finalText: review.response.draftText,
        status: 'published',
        publishedAt: new Date(),
      },
    });

    // Update review status
    await prisma.review.update({
      where: { id },
      data: {
        status: 'published',
      },
    });

    res.json(updatedResponse);
  } catch (error) {
    next(error);
  }
});

