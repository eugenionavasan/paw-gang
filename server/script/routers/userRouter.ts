import express from "express";
import UserController from "../controllers/usersController";

export const userRouter: express.Router = express.Router()

userRouter.get('/user/:_id', UserController.getOne)
userRouter.post('/user', UserController.postOne)
