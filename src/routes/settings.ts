import express from 'express';
import { prisma } from '../utils/prisma';
import { authenticateToken, AuthRequest } from '../utils/auth';

export const settingsRoutes = express.Router();

// All routes require authentication
settingsRoutes.use(authenticateToken);

// Get brand voice settings
settingsRoutes.get('/brand-voice', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.userId!;

    let settings = await prisma.brandVoiceSettings.findUnique({
      where: { userId },
    });

    // Create default if doesn't exist
    if (!settings) {
      settings = await prisma.brandVoiceSettings.create({
        data: {
          userId,
          tone: 'professional',
        },
      });
    }

    res.json(settings);
  } catch (error) {
    next(error);
  }
});

// Update brand voice settings
settingsRoutes.put('/brand-voice', async (req: AuthRequest, res, next) => {
  try {
    const { tone, signOff } = req.body;
    const userId = req.userId!;

    if (tone && !['professional', 'friendly', 'casual'].includes(tone)) {
      return res.status(400).json({ message: 'Invalid tone. Must be professional, friendly, or casual' });
    }

    let settings = await prisma.brandVoiceSettings.findUnique({
      where: { userId },
    });

    if (settings) {
      settings = await prisma.brandVoiceSettings.update({
        where: { userId },
        data: {
          ...(tone && { tone }),
          ...(signOff !== undefined && { signOff }),
        },
      });
    } else {
      settings = await prisma.brandVoiceSettings.create({
        data: {
          userId,
          tone: tone || 'professional',
          signOff,
        },
      });
    }

    res.json(settings);
  } catch (error) {
    next(error);
  }
});


