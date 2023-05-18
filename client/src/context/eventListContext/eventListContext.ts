import { EventListAPI } from '../../api';

import { convertToEvent, IEvent } from '../../interfaces';
import SectionListData from '../../screens/Events/SectionListData';

// Compare events from earliest to latest start date. If start date is same, earlier event = earlier end date
const compareEvents = (e1: IEvent, e2: IEvent) => {
  // Cannot combine if statements because end date should only be checked if start date is the same
  if (e1.startDate > e2.startDate) {
    return 1;
  }
  else if (e1.startDate < e2.startDate) {
    return -1;
  }
  else if (e1.endDate > e2.endDate) {
    return 1;
  }
  else if (e1.endDate < e2.endDate) {
    return -1;
  }
  return 0;
};

//Check for events occuring after current date, return the content
const checkList = () => {
  var currDate = new Date();
  return EventListAPI.getEvents(currDate.toISOString()).then((response) => {
    const eventContent = response.message;
    var res = [];
    for (var key in eventContent) {
      res.push(convertToEvent(eventContent[key]));
    };

    res.sort(compareEvents);

    let dateFound: boolean;
    let date: string;
    let eventsToBeDisplay = new Array<SectionListData>();
    let today = new Date();
    for (let i = 0; i < res.length; i++) {

      //check if event description/details are available
      if (res[i].detailsEN == undefined) {
        res[i].detailsEN = "No description provided.";
      }

      //checks if eventLead is provided
      if (res[i].eventLead == undefined) {
        res[i].eventLead = "Unknown";
      }

      dateFound = false;

      if ((res[i].startDate.getDate() === today.getDate() && res[i].startDate.getMonth() === today.getMonth() && res[i].startDate.getFullYear() === today.getFullYear()) || (res[i].startDate.getDate() < today.getDate() && res[i].startDate.getMonth() === today.getMonth() && res[i].startDate.getFullYear() === today.getFullYear()) || (res[i].startDate.getMonth() < today.getMonth() && res[i].startDate.getFullYear() === today.getFullYear()) || (res[i].startDate.getFullYear() < today.getFullYear())) {
        date = 'Today';
      } else if (res[i].startDate.getDate() === (today.getDate() + 1) && res[i].startDate.getMonth() === today.getMonth() && res[i].startDate.getFullYear() === today.getFullYear()) {
        date = 'Tomorrow';
      } else {
        date = res[i].startDate.getDate() + "/" + (res[i].startDate.getMonth() + 1) + "/" + res[i].startDate.getFullYear();
      }
      for (let j = 0; j < eventsToBeDisplay.length; j++) {
        if (date == eventsToBeDisplay[j].title) {
          eventsToBeDisplay[j].addEvent(res[i]);
          dateFound = true;
        }
      }
      if (!dateFound) {
        let add: SectionListData = new SectionListData(date);
        add.addEvent(res[i]);
        eventsToBeDisplay.push(add);
      }
    }

    return eventsToBeDisplay;

  }).catch((error) => {
    throw error;
  });
};

const EventListContext = {
  checkList
};

export default EventListContext;
