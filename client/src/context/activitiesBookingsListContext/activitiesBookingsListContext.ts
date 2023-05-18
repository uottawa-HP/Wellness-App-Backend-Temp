import { ActivitiesBookingsListAPI } from '../../api';

import { convertToActivitySmartsheet} from '../../interfaces';


//Check for activities, return the content
const checkList = () => {
  return ActivitiesBookingsListAPI.getActivitiesBookings().then((response: any) => {
    const activitiesContent = response.message;
    
    var res = [];
    for (var key in activitiesContent) {
      res.push(convertToActivitySmartsheet(activitiesContent[key]));
    };
    return res;

  }).catch((error: any) => {
    throw error;
  });
};

const ActivitiesBookingsListContext = {
  checkList
};

export default ActivitiesBookingsListContext;
