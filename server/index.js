const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router.js');
const connectToDatabase = require('./models/index.js');

const app = express();


//middlewares
app.use(cors()); //cross origin resource sharing to allow requests from the client
app.use(bodyParser.json()); //parsing the data from the client
app.use(router); //using the router

const PORT = 3000;

//connecting to the db and running the server

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});