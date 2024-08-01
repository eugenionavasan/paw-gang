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
    getOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.params;
            if (!_id)
                return (0, utils_1.missingParamHandler)(res, 'UserController/getOne', 'User', '_uid');
            const user = yield users_1.User.findById(_id);
            if (!user)
                return (0, utils_1.noResultHandler)(res, 'UserController/getOne', 'User', { _id });
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
    postOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!(0, utils_1.isValidUser)(req.body))
                return (0, utils_1.missingBodyHandler)(res, 'UserController/postOne', 'User');
            const { email, password, username, dogName } = req.body;
            const user = yield users_1.User.create({
                email,
                password,
                username,
                dogName,
            });
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = UserController;
