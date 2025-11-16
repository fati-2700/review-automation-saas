"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../utils/prisma");
const auth_1 = require("../utils/auth");
exports.responseRoutes = express_1.default.Router();
// All routes require authentication
exports.responseRoutes.use(auth_1.authenticateToken);
// Update response text
exports.responseRoutes.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.userId;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        // Verify response belongs to user's review
        const response = await prisma_1.prisma.response.findUnique({
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
        const updatedResponse = await prisma_1.prisma.response.update({
            where: { id },
            data: {
                draftText: text,
                characterCount,
                status: 'draft',
            },
        });
        // Create history entry
        await prisma_1.prisma.responseHistory.create({
            data: {
                responseId: id,
                text,
                characterCount,
            },
        });
        res.json(updatedResponse);
    }
    catch (error) {
        next(error);
    }
});
