"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dogName: {
        type: String,
        required: true,
    },
    events: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});
exports.User = (0, mongoose_2.model)('Users', userSchema);
