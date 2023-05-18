import smartsheetAPI from '../../smartsheet';
import {IWellnessNews} from '../../interfaces';
import { title } from 'process';
import { start } from 'repl';

export default class WellnessNewsService {

  private columnIndexes = {
    'startDate':0,
    'endDate':1,
    'titleFR':2,
    'titleEN':3,
    'descriptionFR':4,
    'descriptionEN':5,
    'url':6,
    'display':7,
  }

private convertToWelnessNewsSmartsheet = (idRow:string, cells:any[]) =>{
  const converted:IWellnessNews = {
    id:idRow,
    startDate: new Date(cells[this.columnIndexes.startDate].value),
    endDate: new Date(cells[this.columnIndexes.endDate].value),
    titleFR: cells[this.columnIndexes.titleFR].value,
    titleEN: cells[this.columnIndexes.titleEN].value,
    descriptionEN: cells[this.columnIndexes.descriptionEN].value,
    descriptionFR: cells[this.columnIndexes.descriptionFR].value,
    url: cells[this.columnIndexes.url].value,
    display: cells[this.columnIndexes.display].value,
  };
  return converted;
};

// Create EST/EDT date given YYYY-MM-DD and hh:mm
private createESTDate = (date: string, time = "00:00") => {
  let correctDateString = date;
  let correctTimeString = time;
  const splitTime = time.split(":");
  const hour = parseInt(splitTime[0], 10);
  // If hour is > 24, have to increment the day
  if (hour > 23) {
    const splitDate = date.split("-");
    // Integer division for days to add
    const addDay = Math.floor(hour / 24);
    // Remainder is new hour of day
    const addHours = hour % 24;
    const correctDate = new Date(parseInt(splitDate[0], 10), parseInt(splitDate[1], 10) - 1, parseInt(splitDate[2], 10) + addDay);
    correctDateString = `${correctDate.getFullYear()}-${correctDate.getMonth() + 1}-${correctDate.getDate()}`;

    //  Padding if needed
    if (addHours < 10) {
      correctTimeString = `0${addHours}:${splitTime[1]}`;
    }
    else {
      correctTimeString = `${addHours}:${splitTime[1]}`;
    }
  }
  let dateTimezone = new Date(`${correctDateString}T${correctTimeString}:00.000-0500`);

  // Checking if offset is actually daylight savings or not.
  if (!isNaN(dateTimezone.getTimezoneOffset()) && dateTimezone.getTimezoneOffset() / 60 === 4) {
    dateTimezone = new Date(`${correctDateString}T${correctTimeString}:00.000-0400`);
  }
  return dateTimezone;
};
// Create a start and end date for month in year

private pushToWellnessNewsList = (wellnessNewsList, row, startDate:Date, endDate:Date) => {

  row.cells[this.columnIndexes.startDate].value = startDate.toISOString();
  row.cells[this.columnIndexes.endDate].value = endDate.toISOString();


  // creating a random id for the wellnessNews
  const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  // Convert to event from smartsheet entry and add to response
  wellnessNewsList.push(this.convertToWelnessNewsSmartsheet(guid(), row.cells));
};

// Parse through smartsheet
public parseSmarsheet = (res, dateNow) => {
  const wellnessNewsList = [];

  res.rows.forEach((row, index) => {
    try {
      const englishTitle: string = row.cells[this.columnIndexes.titleEN].value;


      // Check if row should be displayed
      const show:boolean = row.cells[this.columnIndexes.display].value;
      if (show) {



          // Try to create initial dates

          let startDate = this.createESTDate(row.cells[this.columnIndexes.startDate].value,'00:00');
          let endDate = this.createESTDate(row.cells[this.columnIndexes.endDate].value,'23:59');


          // Some news have no end date
          if (isNaN((endDate).getTime())) {
            // If start date exists
            if (!isNaN((startDate).getTime())) {
              // Making assumption that the news is only occuring on one day
              endDate = this.createESTDate(row.cells[this.columnIndexes.startDate].value, '23:59');
            }
            // Some news don't have start or end dates, we are just displaying the news today
            else if (!row.cells[this.columnIndexes.startDate].value) {
              // Assuming that the news will be only today
              startDate = this.createESTDate(dateNow,'00:00');
              endDate = this.createESTDate(dateNow,'23:59');
            }

          }
          // End date has not passed
          if (endDate>dateNow && startDate<dateNow) {

            this.pushToWellnessNewsList(wellnessNewsList, row, startDate, endDate);

          }
        }
      }

    catch (err){
      console.log(err);
      console.log(row);
    }
  });

  console.log(wellnessNewsList.length.toString() + " wellness news retrieved");
  return wellnessNewsList;
}
// get list of events
public getWellnessNews = (date: string) => {
  // Get sheet using sheet ID
  return smartsheetAPI.getSheet(4224254192445316).then((res) => {
    let dateNow: Date;
    if (date == null) {
      dateNow = new Date(0);
    }
    else {
      dateNow = new Date(date);
    }
    return this.parseSmarsheet(res, dateNow);
  });
};
};