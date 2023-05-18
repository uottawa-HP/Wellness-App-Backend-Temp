import smartsheetAPI from '../../smartsheet';
import {IEvent, languageStringToEnum, VPStringToEnum} from '../../interfaces';
import { title } from 'process';
import { start } from 'repl';

export default class EventsService {

  // French months too just in case (1 case found on manual inspection)
  private months = {
    'january': "01",
    'janvier': "01",
    'february': "02",
    'février': "02",
    'march': "03",
    'mars': "03",
    'april': "04",
    'avril': "04",
    'may': "05",
    'mai': "05",
    'june': "06",
    'juin': "06",
    'july': "07",
    'juillet': "07",
    'august': "08",
    'août': "08",
    'september': "09",
    'septembre': "09",
    'october': "10",
    'octobre': "10",
    'november': "11",
    'novembre': "11",
    'december': "12",
    'décembre': "12"
  };
  // For checking if event occurs on each given day of a month
  private days = {
    'sunday': 0,
    'dimanche': 0,
    'monday': 1,
    'lundi': 1,
    'tuesday': 2,
    'mardi': 2,
    'wednesday': 3,
    'mercredi': 3,
    'thursday': 4,
    'jeudi': 4,
    'friday': 5,
    'vendredi': 5,
    'saturday': 6,
    'samedi': 6
  };

  private columnIndexes = {
    'frenchTitle':0,
    'englishTitle':1,
    'eventLead':8,
    'language':9,
    'startDate':2,
    'endDate':3,
    'time':4,
    'location':6,
    'virtualInPerson':7,
    'detailsEN':11,
    'detailsFR':12,
    'registration':13,
    'pillar':10,
    'weekly':5,
    'displayEvent':14,

  }

private convertToEventSmartsheet = (idRow:string, cells:any[], eachDayOfWeek = "") =>{
  const converted:IEvent = {
    id:idRow,
    nameEN: cells[this.columnIndexes.englishTitle].value,
    nameFR: cells[this.columnIndexes.frenchTitle].value,
    eventLead: cells[this.columnIndexes.eventLead].value,
    language: languageStringToEnum(cells[this.columnIndexes.language].value),
    time:cells[this.columnIndexes.time].value,
    startDate: new Date(cells[this.columnIndexes.startDate].value),
    endDate: new Date(cells[this.columnIndexes.endDate].value),
    weekly: cells[this.columnIndexes.pillar].value,
    location: cells[this.columnIndexes.location].value,
    virtualOrInPerson: VPStringToEnum(cells[this.columnIndexes.virtualInPerson].value),
    detailsEN: cells[this.columnIndexes.detailsEN].value,
    detailsFR: cells[this.columnIndexes.detailsFR].value,
    registration: cells[this.columnIndexes.registration].value,
    pillar: cells[this.columnIndexes.pillar].value,
    displayEvent: cells[this.columnIndexes.displayEvent].value,
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
private startToEnd = (year, month) => {
  const startDate = this.createESTDate(year + "-" + month + "-01");

  // Date is last day of month. This creation uses local timezone
  let endDate = new Date(parseInt(year, 10), parseInt(month, 10), 0);

  // Pad with 0 if needed
  let monthPadded = (endDate.getMonth() + 1).toString();
  if (monthPadded.length === 1) {
    monthPadded = "0" + monthPadded;
  }

  // Date is still last day of month. This creation uses EST/EDT timezone
  endDate = this.createESTDate(endDate.getFullYear().toString() + "-" + monthPadded + "-" + endDate.getDate().toString(), "23:59");
  return [startDate, endDate];
};

private pushToEventList = (eventList, row, startDate:Date, endDate:Date, eachDay) => {

  row.cells[this.columnIndexes.startDate].value = startDate.toISOString();
  row.cells[this.columnIndexes.endDate].value = endDate.toISOString();


  // creating a random id for the event
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
  eventList.push(this.convertToEventSmartsheet(guid(), row.cells, eachDay));
};

private parseTime = (time: string) => {
  let startTime = "00:00";
  let endTime = "23:59";

  if (time !== undefined) {
    // Matches times like 9:45, 9h45, 9:45-13:32, 9h45 a 13h32
    const timeRegex = /[0-9]{1,2}[:|h][0-9]{2}/gm;
    const match = time.match(timeRegex);

    // Match found
    if (match !== null) {

      // First time is start time
      startTime = match[0];

      // Padding
      if (startTime.length === 4) {
        startTime = "0" + startTime;
      }

      // If there were multiple matches, choose the second match as an end time
      if (match.length > 1) {
        endTime = match[1];
      }
      else {
        // Otherwise increment start hour by 1 for end time
        endTime = `${parseInt(startTime.slice(0, 2), 10) + 1}:${startTime.slice(3, 5)}`;
      }

      // Padding
      if (endTime.length === 4) {
        endTime = "0" + endTime;
      }

      // Replace all h with :
      startTime = startTime.replace("h", ":");
      endTime = endTime.replace("h", ":");
    }
  }


  return [startTime, endTime];
};

// Parse through smartsheet
public parseSmarsheet = (res, dateNow) => {
  const eventList = [];
  const yearID = 0;

  const year = "";
  const month = "";
  res.rows.forEach((row, index) => {
    try {
      const englishTitle: string = row.cells[this.columnIndexes.englishTitle].value;

      const eachDay = row.cells[this.columnIndexes.weekly].value;
      // Check if row should be displayed
      const show:boolean = row.cells[this.columnIndexes.displayEvent].value;
      if (show) {

        // Get startTime and endTime
          const [startTime, endTime] = this.parseTime(row.cells[this.columnIndexes.time].value);

          // Try to create initial dates
          let startDate = this.createESTDate(row.cells[this.columnIndexes.startDate].value, startTime);
          let endDate = this.createESTDate(row.cells[this.columnIndexes.endDate].value, endTime);


          // Some events have no end date
          if (isNaN((endDate).getTime())) {
            // If start date exists
            if (!isNaN((startDate).getTime())) {
              // Making assumption that the event is only occuring on one day
              endDate = this.createESTDate(row.cells[this.columnIndexes.startDate].value, endTime);
            }
            // Some events don't have start or end dates, get from parent row. Mostly asynchronous events
            else if (!row.cells[this.columnIndexes.startDate].value) {
              // Assuming that the event will be running the entire month
              [startDate, endDate] = this.startToEnd(year, month);
            }

          }
          // End date has not passed
          if (endDate>dateNow) {
            // Duplicate event if it occurs each specific weekday
            if (eachDay === "monday" || eachDay === "tuesday" || eachDay === "wednesday" || eachDay === "thursday" || eachDay === "friday" || eachDay === "saturday" || eachDay === "sunday"){

              const dayNum = this.days[eachDay]
              const newDate = new Date();

              // getting the next date for the future weekly event
              if (!(newDate.getUTCDay()===dayNum)){
                newDate.setDate(newDate.getDate() + (((dayNum + 7 - newDate.getDay()) % 7) || 7));
              }


              while (newDate<=endDate ){
                if(newDate<endDate){
                  const newDateStart:Date = new Date(newDate);
                  newDateStart.setHours(startDate.getHours(),startDate.getMinutes(),startDate.getSeconds())
                  const newDateEnd:Date = new Date(newDate);
                  newDateEnd.setHours(endDate.getHours(),endDate.getMinutes(),endDate.getSeconds())
                  this.pushToEventList(eventList, row, newDateStart, newDateEnd, eachDay);

                }
                newDate.setDate(newDate.getDate() + 7);

              }
            }
            else {

              this.pushToEventList(eventList, row, startDate, endDate, eachDay);
            }
          }
        }
      }

    catch (err){
      console.log(err);
      console.log(row);
    }
  });
  console.log(eventList.length.toString() + " events retrieved");
  return eventList;
}
// get list of events
public getEvents = (date: string) => {
  // Get sheet using sheet ID
  return smartsheetAPI.getSheet(2798188752070532).then((res) => {
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