import {IEvent, Language,VirtualOrInPerson} from '../../interfaces';

export default class EventsMongo{
  private tempDB:{[k: string]: IEvent};
  private uniqueDBKey:number;
  constructor(){
    // Using for setup, will be replaced with DB/source
    this.tempDB = {};
    this.uniqueDBKey = 0;
  };

  // Get events from db
  public getEvents = ():{[k: string]: IEvent} => {
    return this.tempDB;
  };

  // Add to db
  public addEvent = (newEvent:IEvent):[boolean,string]=>{

    // Get unique ID to add with
    const uniqueID = this.generateUniqueId();
    // Add new event to DB
    this.tempDB[uniqueID] = newEvent;
    // Return sucess status and unique ID added with
    return [true,uniqueID];
  };

  // Generate an ID for each tip
  private generateUniqueId = ()=>{
    // Placeholder for now, not sure if needed
    this.uniqueDBKey +=1;
    return (this.uniqueDBKey - 1).toString();
  };

};
