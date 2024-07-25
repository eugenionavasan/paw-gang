const models = require('../models/events.js');

//GET EVENTS by place_id

const getEventsbyPark = async (req, res) => {
  try {
    const { place_id } = req.params; // Or use req.query if the place_id is passed as a query parameter
    if (!place_id) {
      return res.status(400).json({ message: 'place_id is required' });
    }

    const events = await models.find({ place_id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

//GET EVENTS by user

const getEventsbyUser = async (req, res) => {
  try {
    const { user } = req.params; // Or use req.query if the user is passed as a query parameter
    if (!user) {
      return res.status(400).json({ message: 'user is required' });
    }

    const events = await models.find({ user });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

//POST EVENT 

const postEvents = async (req, res) => {
  try {
    const { place_id, date, user, dog_avatar } = req.body;

    if (!place_id || !date || !user || !dog_avatar) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }
    const newEvent = await  models.create({ place_id, date, user, dog_avatar });
    res.status(201);
    res.json(newEvent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500);
  }
};

module.exports = { getEventsbyPark, getEventsbyUser, postEvents }; //exporting the functions to be used in the router