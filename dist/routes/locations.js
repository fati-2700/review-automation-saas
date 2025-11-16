"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../utils/prisma");
const auth_1 = require("../utils/auth");
exports.locationRoutes = express_1.default.Router();
// All routes require authentication
exports.locationRoutes.use(auth_1.authenticateToken);
// Get all locations
exports.locationRoutes.get('/', async (req, res, next) => {
    try {
        const userId = req.userId;
        const locations = await prisma_1.prisma.location.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(locations);
    }
    catch (error) {
        next(error);
    }
});
// Create location
exports.locationRoutes.post('/', async (req, res, next) => {
    try {
        const { name, address } = req.body;
        const userId = req.userId;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const location = await prisma_1.prisma.location.create({
            data: {
                userId,
                name,
                address,
            },
        });
        res.status(201).json(location);
    }
    catch (error) {
        next(error);
    }
});
