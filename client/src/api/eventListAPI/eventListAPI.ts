import {genFetch} from '../genericAPICalls';
import serverURL from '../serverURL';
//Gets the upcoming events 
const getEvents = (date:string) => {
  return genFetch(serverURL+'/events/list/'+date);
};

const EventListAPI = {
  getEvents,
};

export default EventListAPI;