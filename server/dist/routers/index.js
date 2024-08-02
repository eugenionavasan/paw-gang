"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./userRouter");
const eventRouter_1 = require("./eventRouter");
exports.router = express_1.default.Router();
exports.router.use('/users', userRouter_1.userRouter);
exports.router.use('/events', eventRouter_1.eventRouter);
exports.router.all('*', (req, res) => {
    console.error('Error: Path does not exist');
    res.status(404).json({
        error: 'Path does not exist'
    });
});
