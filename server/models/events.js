const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

//defining the Schema for the Events

const events = new Schema({
  place_id: { type: String, required: true },
  park_name: { type: String, required: true },
  adress: { type: String, required: true },
  date: { type: Date, required: true, get: (date) => moment(date).format('YYYY-MM-DD HH:00'),
    set: (date) => moment(date, 'YYYY-MM-DD HH:00').toDate() },
  user: { type: String, required: true },
  dog_avatar: { type: String, required: true }
});

const Events = mongoose.model('Events', events);

module.exports = Events;