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
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const utils_1 = require("../utils/utils");
const UserController = {
    getOne: (err, req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // ! type explicit // try catch
        const { _id } = req.params;
        const user = yield users_1.User.findById(_id);
        if (!user) {
            (0, utils_1.badRequestHandler)(err, req, res, 'UserController/getOne', 'User', 'id', _id);
        }
        else {
            res.status(200).send(user);
        }
        // ! does err argument work like this?
        if (err) {
            (0, utils_1.errorHandler)(err, req, res, 'UserController/getOne');
        }
    }),
    postOne: (err, req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, utils_1.isValidUser)(req.body)) {
            const { email, password, username, dogName } = req.body;
            // !!! types
            const user = yield users_1.User.create({
                email,
                password,
                username,
                dogName,
            });
            res.status(200).send(user);
        }
        else {
            console.error('Missing user information');
            res.status(400).send({ error: 'Missing user information' });
        }
        // ! does err argument work like this?
        if (err) {
            (0, utils_1.errorHandler)(err, req, res, 'UserController/getOne');
        }
    }),
};
exports.default = UserController;
