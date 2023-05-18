import IEvent from './EventsInterface';
import { Language, VirtualOrInPerson} from './EventsTypes';
// Convert to event
const convertToEvent = (jsonObject:{[key:string]:string}) =>{

  const converted:IEvent = {
    id: jsonObject.id,
    nameEN: jsonObject.nameEN,
    nameFR: jsonObject.nameFR,
    eventLead: jsonObject.eventLead,
    language: languageStringToEnum(jsonObject.language),
    time:jsonObject.time,
    startDate: new Date(jsonObject.startDate),
    endDate: new Date(jsonObject.endDate),
    location: jsonObject.location,
    virtualOrInPerson: VPStringToEnum(jsonObject.virtualOrInPerson),
    detailsEN: jsonObject.detailsEN,
    detailsFR: jsonObject.detailsFR,
    registration: jsonObject.registration,
    pillar: jsonObject.pillar,
    weekly: jsonObject.weekly,
    displayEvent: jsonObject.displayEvent,
  };
  return converted;
};
// Convert event to json
const convertToJSON = (eventObject:IEvent)=>{
  const jsonObject:{[key:string]:string} = {};
  for (const [key, value] of Object.entries(eventObject)) {
    if (key==='startDate'||key==='endDate'){
      jsonObject[key] = value.toJSON();
    }
    else{
      jsonObject[key] = value;
    }
  }
  return jsonObject;
}
// Convert language to defined enumeration type
const languageStringToEnum = (lang:string)=>{
  if (lang === "Fr" || lang === Language.FR){
    return Language.FR;
  }
  else if (lang === "En" || lang === Language.EN){
    return Language.EN;
  }
  else if (lang === "Bil" || lang === Language.BIL){
    return Language.BIL;
  }
  else{
    return Language.NA;
  }
};
// Convert event type to defined enumeration type
const VPStringToEnum = (VP:string)=>{
  if (VP === "Virtual"){
    return VirtualOrInPerson.VIRTUAL;
  }
  else if (VP === "In-person"){
    return VirtualOrInPerson.INPERSON;
  }
  else{
    return VirtualOrInPerson.NA;
  }
};

export {convertToEvent,languageStringToEnum,convertToJSON,VPStringToEnum};
