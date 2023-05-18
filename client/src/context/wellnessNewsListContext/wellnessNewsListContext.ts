import { WellnessNewsListAPI } from '../../api';

import { convertToWellnessNews,convertToWellnessNewsJSON, IWellnessNews } from '../../interfaces';


//Check for events occuring after current date, return the content
const checkList = () => {
  var currDate = new Date();
  return WellnessNewsListAPI.getWellnessNews(currDate.toISOString()).then((response: any) => {
    const wellnessNewsContent = response.message;
    
    var res = [];
    for (var key in wellnessNewsContent) {
      res.push(convertToWellnessNews(wellnessNewsContent[key]));
    };
    return res;

  }).catch((error: any) => {
    throw error;
  });
};

const WellnessNewsListContext = {
  checkList
};

export default WellnessNewsListContext;
