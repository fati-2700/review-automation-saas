"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../utils/prisma");
const auth_1 = require("../utils/auth");
exports.settingsRoutes = express_1.default.Router();
// All routes require authentication
exports.settingsRoutes.use(auth_1.authenticateToken);
// Get brand voice settings
exports.settingsRoutes.get('/brand-voice', async (req, res, next) => {
    try {
        const userId = req.userId;
        let settings = await prisma_1.prisma.brandVoiceSettings.findUnique({
            where: { userId },
        });
        // Create default if doesn't exist
        if (!settings) {
            settings = await prisma_1.prisma.brandVoiceSettings.create({
                data: {
                    userId,
                    tone: 'professional',
                },
            });
        }
        res.json(settings);
    }
    catch (error) {
        next(error);
    }
});
// Update brand voice settings
exports.settingsRoutes.put('/brand-voice', async (req, res, next) => {
    try {
        const { tone, signOff } = req.body;
        const userId = req.userId;
        if (tone && !['professional', 'friendly', 'casual'].includes(tone)) {
            return res.status(400).json({ message: 'Invalid tone. Must be professional, friendly, or casual' });
        }
        let settings = await prisma_1.prisma.brandVoiceSettings.findUnique({
            where: { userId },
        });
        if (settings) {
            settings = await prisma_1.prisma.brandVoiceSettings.update({
                where: { userId },
                data: {
                    ...(tone && { tone }),
                    ...(signOff !== undefined && { signOff }),
                },
            });
        }
        else {
            settings = await prisma_1.prisma.brandVoiceSettings.create({
                data: {
                    userId,
                    tone: tone || 'professional',
                    signOff,
                },
            });
        }
        res.json(settings);
    }
    catch (error) {
        next(error);
    }
});
