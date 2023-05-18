import {EventsService} from '../../services';
const express = require('express');
const EventsRouter = express.Router();

const ES = new EventsService();

// Get the events ending after :date
EventsRouter.get('/list/:date?', (req, res) => {
  console.log('Event list requested');
  ES.getEvents(req.params.date).then((eventList)=>{
    res.json({
      status: 200,
      message: eventList
    });
  });
});

export default EventsRouter;
