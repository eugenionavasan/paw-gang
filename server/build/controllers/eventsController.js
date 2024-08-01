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
const models = require('../models/events.js');
// GET EVENTS (I don't need this one but i am having it for thunderclient testing purposes)
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield models.find();
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).send();
    }
});
// GET EVENTS by place_id
const getEventsbyPark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { place_id } = req.params;
        if (!place_id) {
            res.status(400).json({ message: 'place_id is required' });
            return;
        }
        const events = yield models.find({ place_id });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// GET EVENTS by user
const getEventsbyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.params;
        if (!user) {
            res.status(400).json({ message: 'user is required' });
            return;
        }
        const events = yield models.find({ user });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// POST EVENT
const postEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { place_id, park_name, address, date, user, dog_avatar } = req.body;
        if (!place_id || !park_name || !address || !date || !user || !dog_avatar) {
            res.status(400).json({ error: 'Missing required parameters.' });
            return;
        }
        const newEvent = yield models.create({
            place_id,
            park_name,
            address,
            date,
            user,
            dog_avatar,
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error('Internal server error', error);
        res.status(500).send();
    }
});
//DELETE EVENT
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ message: '_id is required' });
            return;
        }
        const deletedEvent = yield models.findByIdAndDelete(_id);
        if (!deletedEvent) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res
            .status(200)
            .json({ message: 'Event deleted successfully', deletedEvent });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
//EDIT EVENT only the date
const editEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const { date } = req.body;
        if (!_id) {
            res.status(400).json({ message: '_id is required' });
            return;
        }
        if (!date) {
            res.status(400).json({ message: 'date is required for updating' });
            return;
        }
        const updatedEvent = yield models.findByIdAndUpdate(_id, { date }, { new: true, runValidators: true });
        if (!updatedEvent) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res
            .status(200)
            .json({ message: 'Event updated successfully', updatedEvent });
    }
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = {
    getEventsbyPark,
    getEventsbyUser,
    getEvents,
    postEvents,
    deleteEvent,
    editEvent,
}; // exporting the functions to be used in the router
