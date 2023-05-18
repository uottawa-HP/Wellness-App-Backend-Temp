import IWellnessNews from './WellnessNewsInterface';

// Convert to event
const convertToWellnessNews = (jsonObject: { [key: string]: string }) => {
  const converted:IWellnessNews = {
    id: jsonObject.id,
    startDate: new Date(jsonObject.startDate),// date the news was published
    endDate: new Date(jsonObject.endDate),// last day the news should be published
    titleFR: jsonObject.titleFR,
    titleEN: jsonObject.titleEN,
    descriptionFR: jsonObject.descriptionFR,
    descriptionEN: jsonObject.descriptionEN,
    url: jsonObject.url,
    display: jsonObject.url,// only sometimes has a value
    };
  return converted;
};
// Convert to json
const convertWellnessNewsToJSON = (wellnessNewsObject: IWellnessNews) => {
  const jsonObject: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(wellnessNewsObject)) {
    if (key === 'startDate' || key === 'endDate') {
      jsonObject[key] = value.toJSON();
    }
    else {
      jsonObject[key] = value;
    }
  }
  return jsonObject;
}
export { convertToWellnessNews,convertWellnessNewsToJSON};
