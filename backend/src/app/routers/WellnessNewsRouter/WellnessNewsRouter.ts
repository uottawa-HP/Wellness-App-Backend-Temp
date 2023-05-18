import {WellnessNewsService} from '../../services';
const express = require('express');
const WellnessNewsRouter = express.Router();

const WNS = new WellnessNewsService();

// Get the wellness news
WellnessNewsRouter.get('/list/:date?', (req, res) => {
  console.log('Wellness News list requested');
  WNS.getWellnessNews(req.params.date).then((wellnessNewsList)=>{
    res.json({
      status: 200,
      message: wellnessNewsList
    });
  });
});

export default WellnessNewsRouter;



