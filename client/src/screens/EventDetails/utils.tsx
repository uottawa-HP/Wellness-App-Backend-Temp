// returns date to be displayed

export const getFullDate = (date:Date) => {

    let displayDate = '';
    //GET TODAY'S DATE
    const currentDate = new Date();


    if(currentDate.getDate() == date.getDate() && currentDate.getMonth() == date.getMonth() && currentDate.getFullYear() == date.getFullYear()) {
        // if event starts today
        displayDate = 'Today, at ' + date.getHours() + ":" + getMinutesInFormat(date);

    } else if ((currentDate.getDate()+1) == date.getDate() && currentDate.getMonth() == date.getMonth() && currentDate.getFullYear() == date.getFullYear()) {
        // if event starts tomorrow
        displayDate = 'Tomorrow, at ' + date.getHours() + ":" + getMinutesInFormat(date);

    } else {
        // Get Date
        displayDate = getMonthInFormat(date) + " " + date.getDate() + ", " + date.getFullYear() + " at " +  date.getHours() + ":" + getMinutesInFormat(date);
    }

    return displayDate;

}

// returns month (january, february, march, ...)

export const getMonthInFormat = (date: Date): String => {
    var month = '';
    switch (date.getMonth()) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }
    return month.toString();
  
}

// returns the minutes in 'MM' format 
export const getMinutesInFormat = (date:Date) => {

    var minutes:string = '';
    if(date.getMinutes() < 10) {
        minutes = '0' + date.getMinutes();
    }
    else {
        minutes = date.getMinutes() + '';
    }
    return minutes;
}

// If it's virtual: link to Zoom (?)
// If it's in person: link to EventBrite (?)
export const attend = () => {
    console.log("Attend pressed");
}

export const addToCalendar = () => {
    console.log("Add to Calendar pressed");
}