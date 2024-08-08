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
exports.deleteEvent = exports.editEvent = exports.postEvents = exports.getEventById = exports.getEventsbyUser = exports.getEventsbyPark = exports.getEvents = void 0;
const utils_1 = require("../utils/utils");
const events_1 = require("../models/events"); //! Why doesn't work with import?
// GET EVENTS (I don't need this one but i am having it for thunderclient testing purposes)
const getEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield events_1.Event.find();
        res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
});
exports.getEvents = getEvents;
// GET EVENTS by place_id
const getEventsbyPark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { place_id } = req.params;
        if (!place_id)
            return (0, utils_1.missingParamHandler)(res, 'EventController/getEventsbyPark', 'Park', 'place_id');
        // !
        const events = yield events_1.Event.find({ place_id });
        if (Object.keys(events).length === 0)
            return (0, utils_1.noResultHandler)(res, 'EventController/getEventsbyPark', 'Park', {
                place_id,
            });
        res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventsbyPark = getEventsbyPark;
// GET EVENTS by user
const getEventsbyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.params;
        if (!user)
            return (0, utils_1.missingParamHandler)(res, 'EventController/getEventsbyUser', 'User', 'user');
        const events = yield events_1.Event.find({ user });
        if (Object.keys(events).length === 0)
            return (0, utils_1.noResultHandler)(res, 'EventController/getEventsbyUser', 'User', {
                user,
            });
        res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventsbyUser = getEventsbyUser;
// GET EVENT by ID
const getEventById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            return (0, utils_1.missingParamHandler)(res, 'EventController/getEventById', 'Event', '_id');
        }
        const event = yield events_1.Event.findById(_id);
        if (!event) {
            return (0, utils_1.noResultHandler)(res, 'EventController/getEventById', 'Event', { _id });
        }
        res.status(200).json(event);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventById = getEventById;
// POST EVENT
const postEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { place_id, park_name, address, date, user, dog_avatar } = req.body;
        if (!(0, utils_1.isValidEvent)(req.body)) {
            return (0, utils_1.missingBodyHandler)(res, 'EventController/postEvents', 'Event');
        }
        const newEvent = yield events_1.Event.create({
            place_id,
            park_name,
            address,
            date: new Date(date),
            user,
            dog_avatar,
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        next(error);
    }
});
exports.postEvents = postEvents;
//EDIT EVENT only the date
const editEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const { date } = req.body;
        if (!_id)
            return (0, utils_1.missingParamHandler)(res, 'EventController/editEvent', 'Event', '_id');
        if (!date)
            return (0, utils_1.missingBodyHandler)(res, 'EventController/editEvent', 'Event');
        const updatedEvent = yield events_1.Event.findByIdAndUpdate(_id, { date }, { new: true, runValidators: true });
        if (!updatedEvent)
            return (0, utils_1.noResultHandler)(res, 'EventController/editEvents', 'Event', {
                _id,
            });
        // ! could return the updated to the client for handling
        res
            .status(200)
            .json({ message: 'Event updated successfully', updatedEvent });
    }
    catch (error) {
        next(error);
    }
});
exports.editEvent = editEvent;
//Delete Event
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        // Check if _id is provided
        if (!_id) {
            return (0, utils_1.missingParamHandler)(res, 'EventController/deleteEvent', 'Event', '_id');
        }
        // Perform delete operation
        const deletedEvent = yield events_1.Event.findByIdAndDelete(_id);
        // Check if the event was found and deleted
        if (!deletedEvent) {
            return (0, utils_1.noResultHandler)(res, 'EventController/deleteEvent', 'Event', { _id });
        }
        // Respond with success message
        res.status(200).json({
            message: 'Event deleted successfully',
            deletedEvent
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEvent = deleteEvent;
