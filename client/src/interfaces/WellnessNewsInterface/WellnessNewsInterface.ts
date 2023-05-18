interface IWellnessNews {
  id: string,
  startDate: Date,// date the news was published
  endDate: Date,// last day the news should be published
  titleFR: string,
  titleEN: string,
  descriptionFR: string,
  descriptionEN: string,
  url: string,
  display: string,// only sometimes has a value
};

export default IWellnessNews;
