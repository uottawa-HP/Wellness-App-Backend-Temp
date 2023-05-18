require('dotenv').config();
import express = require('express');
import bodyParser = require('body-parser');
import config = require('../config/database');
import mongoose = require('mongoose');
import cors = require('cors');

import { WellnessTipRouter, WellnessNewsRouter, EventsRouter, UserRouter, GameRouter, JournalRouter, ActivitiesBookingsRouter } from './routers';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect((config.default), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const db = mongoose.connection;

  // Check connection to database
  db.once('open', () => {
    console.log('Connected to MongoDB!');
  });

  // Check for database errors
  db.on('error', (err) => {
    console.log(err);
  });
}).catch((e) => {
  console.log("Issue connecting to mongo");
  console.log(e);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify',false);



// Set up a whitelist and check against it:
// Bypassing cross origin resource blocking for testing
// Probably want a better solution for production
const whitelist = ['http://localhost:19006'];
const corsOptions = {
  origin(origin, callback) {
    // console.log('Request from:');
    // console.log(origin);
    // Check for self requests and whitelist
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Then pass them to cors
app.use(cors(corsOptions));
// Add user routers to app
app.use('/wellnessTips', WellnessTipRouter); // Use /wellnessTips subgroup because it is external api
app.use('/activitiesBookings', ActivitiesBookingsRouter); // Use /activitiesBookings subgroup because it is external api
app.use('/events', EventsRouter); // Use /events subgroup because it is external api
app.use('/wellnessNews', WellnessNewsRouter); // Use /wellnessNews subgroup because it is external api
app.use('/', UserRouter);
app.use('/', GameRouter);
app.use('/', JournalRouter);

export default app;
