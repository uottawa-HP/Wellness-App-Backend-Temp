import IActivitiesBookings from './ActivitiesBookingsInterface';

// Convert to json
const convertToActivityJSON = (activitiesObject: IActivitiesBookings) => {
  const jsonObject: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(activitiesObject)) {
    jsonObject[key] = value;
  }
  return jsonObject;
}

const requiredPicture = (name:String) =>{

  switch (name){
    case 'plant-room.png':
      return require('../../../assets/images/bookings/plant-room.png')
    case 'light-room.png':
      return require('../../../assets/images/bookings/light-room.png')
    case 'clinic.png':
      return require('../../../assets/images/bookings/clinic.png')
    case 'virtual-reality.png':
      return require('../../../assets/images/bookings/virtual-reality.png')
    case 'pet-therapy.png':
      return require('../../../assets/images/bookings/pet-therapy.png')
    case 'hiv-testing.png':
      return require('../../../assets/images/bookings/hiv-testing.png')
    case 'coaching.png':
      return require('../../../assets/images/bookings/coaching.png')
    case 'social.png':
      return require('../../../assets/images/bookings/social.png')
    case 'yoga.png':
      return require('../../../assets/images/bookings/yoga.png')
    case 'reiki.png':
      return require('../../../assets/images/bookings/reiki.png')
    case 'mentor-session.png':
      return require('../../../assets/images/bookings/mentor-session.png')
  }
}

const convertToActivitySmartsheet = (jsonObject: { [key: string]: string }) => {

  //picture names need to be pre-loaded because the require() function needs to be ready before bundle 
  var pictureRequired = requiredPicture(jsonObject.picture);
  const converted:IActivitiesBookings = {
    nameEN:jsonObject.nameEN,
    nameFR:jsonObject.nameFR,
    id:jsonObject.id,
    descriptionEN:jsonObject.descriptionEN,
    descriptionFR:jsonObject.descriptionFR,
    urlEN:jsonObject.urlEN,
    urlFR:jsonObject.urlFR,
    picture: pictureRequired,
    display:Boolean(jsonObject.display),
  };
  return converted;
};
export { convertToActivitySmartsheet,convertToActivityJSON};
