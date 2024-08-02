"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const eventsController_1 = require("../controllers/eventsController");
exports.eventRouter = express_1.default.Router();
exports.eventRouter.get('/', eventsController_1.getEvents);
exports.eventRouter.get('/park/:place_id', eventsController_1.getEventsbyPark);
exports.eventRouter.get('/user/:user', eventsController_1.getEventsbyUser);
exports.eventRouter.get('/:_id', eventsController_1.getEventById);
exports.eventRouter.post('/', eventsController_1.postEvents);
exports.eventRouter.delete('/:_id', eventsController_1.deleteEvent);
exports.eventRouter.put('/:_id', eventsController_1.editEvent);
