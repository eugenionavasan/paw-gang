"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
// defining the Schema for the Events
exports.eventSchema = new mongoose_1.Schema({
    place_id: { type: String, required: true },
    park_name: { type: String, required: true },
    address: { type: String, required: true },
    date: {
        type: Date,
        required: true,
        //We'll use Eugenio is get and setter?
    },
    user: { type: String, required: true },
    dog_avatar: { type: String, required: true },
});
exports.Event = (0, mongoose_1.model)('Event', exports.eventSchema);
