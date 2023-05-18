import { WellnessTipsAPI } from '../../api';
import { IWellnessTip } from '../../interfaces';

const checkTip = () => {
  //Check for a new daily tip, return the content
  var currDate = new Date();
  
  return WellnessTipsAPI.getDailyTip(currDate.getFullYear().toString(),("0" + (currDate.getMonth()+1)).slice(-2) ,("0" + currDate.getDate()).slice(-2)).then((response) => {
    const tip: IWellnessTip = response.message[0];
    //returning the tip retrieved
    return tip;
  }).catch((error) => {
    throw error;
  });
};

const WellnessTipsContext = {
  checkTip
};

export default WellnessTipsContext;
