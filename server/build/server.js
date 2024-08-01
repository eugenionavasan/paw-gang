"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = require('./router');
const index_1 = __importDefault(require("./models/index"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)()); // Cross-Origin Resource Sharing to allow requests from the client
app.use(body_parser_1.default.json()); // Parsing the data from the client
app.use(router); // Using the router
const PORT = process.env.PORT || 3000;
const LOCAL_IP_ADDRESS = process.env.LOCAL_IP_ADDRESS || '127.0.0.1';
// connecting to the db and running the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, index_1.default)();
        app.listen(Number(PORT), LOCAL_IP_ADDRESS, () => {
            console.log(`Server is running on http://${LOCAL_IP_ADDRESS}:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
startServer();
