import { Language, VirtualOrInPerson } from "./EventsTypes";

interface IEvent {
  id: string,
  nameEN: string,
  nameFR: string,
  language: Language,
  startDate: Date,// date and time YYYY-MM-DDTHH:MM:SSZ
  endDate: Date,// date and time YYYY-MM-DDTHH:MM:SSZ
  time: string,
  eventLead: string,
  location: string,
  virtualOrInPerson: VirtualOrInPerson,
  detailsEN: string,
  detailsFR:string,
  registration: string,// only sometimes has a value
  pillar:string,
  weekly:string,
  displayEvent:string,
};

export default IEvent;
