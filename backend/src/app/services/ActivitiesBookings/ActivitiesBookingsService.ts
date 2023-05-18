import smartsheetAPI from '../../smartsheet';
import { IActivitiesBookings, convertToActivitySmartsheet } from '../../interfaces';

export default class ActivitiesBookingsService {


  // Parse through smartsheet
  private parseSmarsheet = (res) => {

    const activitiesList = [];

    // we check each row of the smartsheet
    res.rows.forEach((row, index) => {
      const activity:IActivitiesBookings = convertToActivitySmartsheet(row.cells)

      // only adding activity where the 'display' field is true
      if (activity.display===true){
        activitiesList.push(activity);
      }

    });

    // displaying how many activites were retrieved
    console.log(activitiesList.length.toString() + " activities bookings retrieved");

    return activitiesList;
  }

  // get list of activities (temporary no arguments )
  public getActivitiesBookings = () => {

    // Get sheet using sheet ID
    return smartsheetAPI.getSheet(8274022073952132).then((res) => {

      return this.parseSmarsheet(res);
    });
  };
};

