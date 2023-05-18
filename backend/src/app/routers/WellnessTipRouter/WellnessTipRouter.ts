import {WellnessTipService} from '../../services';
const express = require('express');
const WellnessTipRouter = express.Router();
const WTS = new WellnessTipService();

WellnessTipRouter.get('/dailyTip/:date?', (req, res) => {
  console.log('Daily tip requested');

  // fetch the daily tips and receives them in format json
  WTS.getDailyTips(req.params.date).then((tipList)=>{
    res.json({
      status: 200,
      message: tipList
    });
  });
});

export default WellnessTipRouter;