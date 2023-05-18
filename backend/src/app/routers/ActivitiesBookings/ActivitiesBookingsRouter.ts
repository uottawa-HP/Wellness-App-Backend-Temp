import {ActivitiesBookingsService} from '../../services';
const express = require('express');
const ActivitiesBookingsRouter = express.Router();
const ABS = new ActivitiesBookingsService();

ActivitiesBookingsRouter.get('/activities', (req, res) => {
  console.log('Activities requested');

  // fetch the activities bookings and receives them in format json
  ABS.getActivitiesBookings().then((activitiesBookingsList)=>{
    res.json({
      status: 200,
      message: activitiesBookingsList
    });
  });
});

export default ActivitiesBookingsRouter;