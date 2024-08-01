"use strict";
// do we have to build
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
// function sum (a: number, b: number): number {
//   return a + b;
// }
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
const server_1 = require("../server");
const globals_1 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TEST_PORT = process.env.TEST_PORT || 3003;
const request = (0, supertest_1.default)(server_1.app);
let server;
// ! not closing
beforeEach(done => {
    server = server_1.app.listen(TEST_PORT);
    done();
});
afterEach(done => {
    mongoose_1.default.connection.close();
    server.close();
    done();
});
describe('event endpoints', () => {
    (0, globals_1.test)('testing endpoint is valid: /events', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/events');
        (0, globals_1.expect)(response.status).toBe(200);
    }));
});
