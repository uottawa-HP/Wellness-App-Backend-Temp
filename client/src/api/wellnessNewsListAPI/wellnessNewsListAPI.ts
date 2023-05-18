import {genFetch} from '../genericAPICalls';
import serverURL from '../serverURL';
//Gets the upcoming events 
const getWellnessNews = (date:string) => {
  return genFetch(serverURL+'/wellnessNews/list/'+date);
};

const WellnessNewsListAPI = {
  getWellnessNews,
};

export default WellnessNewsListAPI;