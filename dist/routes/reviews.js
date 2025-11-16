"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../utils/prisma");
const auth_1 = require("../utils/auth");
const responseGenerator_1 = require("../utils/responseGenerator");
exports.reviewRoutes = express_1.default.Router();
// All routes require authentication
exports.reviewRoutes.use(auth_1.authenticateToken);
// Get all reviews with filters
exports.reviewRoutes.get('/', async (req, res, next) => {
    try {
        const { rating, status, search } = req.query;
        const userId = req.userId;
        const where = {
            userId,
        };
        if (rating) {
            where.rating = parseInt(rating);
        }
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { customerName: { contains: search, mode: 'insensitive' } },
                { reviewText: { contains: search, mode: 'insensitive' } },
            ];
        }
        const reviews = await prisma_1.prisma.review.findMany({
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
    }
    catch (error) {
        next(error);
    }
});
// Get single review
exports.reviewRoutes.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const review = await prisma_1.prisma.review.findFirst({
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
    }
    catch (error) {
        next(error);
    }
});
// Create review manually
exports.reviewRoutes.post('/', async (req, res, next) => {
    try {
        const { locationId, customerName, rating, reviewText, reviewDate } = req.body;
        const userId = req.userId;
        if (!locationId || !rating || !reviewText) {
            return res.status(400).json({ message: 'locationId, rating, and reviewText are required' });
        }
        // Verify location belongs to user
        const location = await prisma_1.prisma.location.findFirst({
            where: {
                id: locationId,
                userId,
            },
        });
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        // Get brand voice settings
        const brandVoice = await prisma_1.prisma.brandVoiceSettings.findUnique({
            where: { userId },
        });
        // Generate response
        const responseText = (0, responseGenerator_1.adjustTone)((0, responseGenerator_1.generateResponse)({
            rating: parseInt(rating),
            brandVoice,
        }), brandVoice?.tone || 'professional');
        const characterCount = responseText.length;
        // Create review with response
        const review = await prisma_1.prisma.review.create({
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
        await prisma_1.prisma.responseHistory.create({
            data: {
                responseId: review.response.id,
                text: responseText,
                characterCount,
            },
        });
        res.status(201).json(review);
    }
    catch (error) {
        next(error);
    }
});
// Approve and publish review response
exports.reviewRoutes.post('/:id/approve', async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const review = await prisma_1.prisma.review.findFirst({
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
        const updatedResponse = await prisma_1.prisma.response.update({
            where: { id: review.response.id },
            data: {
                finalText: review.response.draftText,
                status: 'published',
                publishedAt: new Date(),
            },
        });
        // Update review status
        await prisma_1.prisma.review.update({
            where: { id },
            data: {
                status: 'published',
            },
        });
        res.json(updatedResponse);
    }
    catch (error) {
        next(error);
    }
});
