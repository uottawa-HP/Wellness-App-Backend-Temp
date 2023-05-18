import {genFetch} from '../genericAPICalls';
import serverURL from '../serverURL';
//Gets the upcoming events 
const getActivitiesBookings = () => {
  return genFetch(serverURL+'/activitiesBookings/activities');
};

const ActivitiesBookingsListAPI = {
  getActivitiesBookings,
};

export default ActivitiesBookingsListAPI;