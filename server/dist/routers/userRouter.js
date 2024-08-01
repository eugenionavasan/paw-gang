"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/:_id', usersController_1.default.getOne);
exports.userRouter.post('/', usersController_1.default.postOne);
