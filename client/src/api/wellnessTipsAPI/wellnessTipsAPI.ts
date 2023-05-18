import { createIconSetFromFontello } from '@expo/vector-icons';
import {genFetch} from '../genericAPICalls';
import serverURL from '../serverURL';
//Gets the daily tip
const getDailyTip = (year:string,month:string,day:string) => {
  return genFetch(serverURL+'/wellnessTips/dailyTip/'+year+'-'+month+'-'+day);
};

const WellnessTipsAPI = {
  getDailyTip
};

export default WellnessTipsAPI;
