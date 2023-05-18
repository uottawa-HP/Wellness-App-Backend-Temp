import IActivitiesBookings from './activitiesBookingsInterface';
  const columnIndexes = {
    'nameEN':0,
    'nameFR':1,
    'id':2,
    'descriptionEN':3,
    'descriptionFR':4,
    'urlEN':5,
    'urlFR':6,
    'picture':7,
    'display':8,
  }

  const convertToActivitySmartsheet = (cells:any[]) =>{
    const converted:IActivitiesBookings = {
      nameEN:cells[columnIndexes.nameEN].value,
      nameFR:cells[columnIndexes.nameFR].value,
      id:cells[columnIndexes.id].value,
      descriptionEN:cells[columnIndexes.descriptionEN].value,
      descriptionFR:cells[columnIndexes.descriptionFR].value,
      urlEN:cells[columnIndexes.urlEN].value,
      urlFR:cells[columnIndexes.urlFR].value,
      picture:cells[columnIndexes.picture].value,
      display:cells[columnIndexes.display].value
    };
    return converted;
  };

export {
  convertToActivitySmartsheet,
};
