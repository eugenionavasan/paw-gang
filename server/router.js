const express = require('express');
const router = express.Router();
const { getEventsbyPark, getEventsbyUser, postEvents } = require('./controllers/controllers.js');

router.get('/events/park/:place_id', getEventsbyPark);
router.get('/events/user/:user', getEventsbyUser);
router.post('/events', postEvents);

module.exports = router;