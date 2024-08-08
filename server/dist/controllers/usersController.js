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
            const { email, password } = req.body;
            // Validate input
            if (!email || !password)
                return (0, utils_1.missingBodyHandler)(res, 'UserController/getOne', 'email and password');
            // Find user by email
            const user = yield users_1.User.findOne({ email });
            if (!user)
                return (0, utils_1.noResultHandler)(res, 'UserController/getOne', 'User', { email });
            // Check if the provided password matches the user's password
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                res.status(400).json({ error: 'Invalid password' });
                return;
            }
            // Return the user if password is correct
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
            // Create a new user with the hashed password
            const user = new users_1.User({
                email,
                password, // The password will be hashed automatically in the pre-save hook
                username,
                dogName,
            });
            yield user.save(); // Save the user to the database
            res.status(201).json(user); // Return the created user
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = UserController;
