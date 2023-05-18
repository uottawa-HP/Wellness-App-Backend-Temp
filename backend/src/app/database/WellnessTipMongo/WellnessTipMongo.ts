import {IWellnessTip} from '../../interfaces'

export default class WellnessTipMongo{
  private tempDB:{[k: string]: IWellnessTip};
  private dailyTip:IWellnessTip;
  private uniqueDBKey:number;

  constructor(){
    // //Using for setup, will be replaced with DB/source of actual tips
    // this.tempDB = {"a": {tipOfTheDay: "Greetings A!!"}, "b": {tipOfTheDay: "Greetings B!!"}, "c": {tipOfTheDay: "Greetings C!!"}, "d": {content: "Greetings D!!"}};
    // this.dailyTip = {tipOfTheDay:"Exercises your mind like you would your body. Words with friends has its perks. Keep your mind fit and healthy by playing games that keep you thinking or involving yourself in new activities."};
    // this.uniqueDBKey = 0;
  };

  // Get a wellness tip from db
  public getWellnessTip = (tipID:string):[boolean,IWellnessTip]=>{
    if (tipID in this.tempDB){
      // Get tip using tipID
      const tip = this.tempDB[tipID];

      // Return sucess and tip with that tip ID
      return [true,tip];
    }
    else{
      // No tip with that key, return empty
      return [false, {tipEN:"",tipFR:"",source:"",specialDay:"",date:""}];
    }
  };

  // Get the daily tip
  public getDailyTip = ():IWellnessTip=>{

    return this.dailyTip;
  };

  // Set the daily tip
  public setDailyTip = (tipID:string):[boolean,IWellnessTip] =>{
    const tipReq = this.getWellnessTip(tipID);
    if (tipReq[0] === true){
      this.dailyTip = tipReq[1];
      return [true,tipReq[1]];
    }
    else{
      return [false, {tipEN:"",tipFR:"",source:"",specialDay:"",date:""}];
    }
  };

  // Return keys of all tips in array
  public getKeys = () => {
    return Object.keys(this.tempDB);
  };

  // vvv REST OF FUNCTIONS NOT USED YET, BUT BASIC OUTLINES ARE HERE vvv


  // Add a wellness tip to db
  public addWellnessTip = (newTip:IWellnessTip):[boolean,string]=>{
    // Get unique ID to add with
    const uniqueID = this.generateUniqueId();
    // Add new tip to DB
    this.tempDB[uniqueID] = newTip;
    // Return sucess status and unique ID added with
    return [true,uniqueID];
  };

  // Delete a wellness tip from db
  public deleteWellnessTip = (tipID:string):[boolean,IWellnessTip]=>{
    if (tipID in this.tempDB){
      // Remove tip using tipID
      const tip = this.tempDB[tipID];
      delete this.tempDB[tipID];

      // Return sucess and tip removed
      return [true,tip];
    }
    else{
      // No tip with that key, return empty
      return [false, {tipEN:"",tipFR:"",source:"",specialDay:"",date:""}];
    }
  };

  // Edit a wellness tip in db
  public editWellnessTip = (tipID:string, tip:IWellnessTip):[boolean,IWellnessTip]=>{
    if (tipID in this.tempDB){
      // Edit wellness tips content
      this.tempDB[tipID] = tip;
      return [true,tip];
    }
    else{
      return [false, {tipEN:"",tipFR:"",source:"",specialDay:"",date:""}];
    }
  };

  // Generate an ID for each tip
  private generateUniqueId = () => {
    // Placeholder for now, not sure if needed
    this.uniqueDBKey +=1;
    return (this.uniqueDBKey - 1).toString();
  };
};
