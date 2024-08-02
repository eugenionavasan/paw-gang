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
exports.app = void 0;
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const index_1 = __importDefault(require("./models/index"));
const index_2 = require("./routers/index");
// Load environment variables from .env file
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// middlewares
exports.app.use((0, cors_1.default)()); // Cross-Origin Resource Sharing to allow requests from the client
exports.app.use(body_parser_1.default.json()); // Parsing the data from the client
exports.app.use(index_2.router); // Using the router
exports.app.use(errorHandler_1.errorHandler); // Error middleware
const PORT = process.env.PORT || 3000;
const LOCAL_IP_ADDRESS = process.env.LOCAL_IP_ADDRESS || '127.0.0.1';
// connecting to the db and running the server
// ! add server.close()
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, index_1.default)();
        if (process.env.NODE_ENV !== 'test') {
            exports.app.listen(Number(PORT), LOCAL_IP_ADDRESS, () => {
                console.log(`Server is running on http://${LOCAL_IP_ADDRESS}:${PORT}`);
            });
        }
        else {
            console.log('Running in test mode; server not started.');
        }
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
startServer();
