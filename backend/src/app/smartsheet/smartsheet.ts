class SmartsheetAPI{
  private client;
  private smartsheet;
  constructor(){
    // Initialize the client
    this.client = require('smartsheet');
    this.smartsheet = this.client.createClient({
      accessToken: 'ec8ntzrkg27itb6zf7c2szrdwb',// IF WE MAKE THE CODE PUBLIC THIS NEEDS TO GO SOMEWHERE ELSE
      logLevel: 'info'
    });
    console.log("Created smartsheet client.");
  }

  // Get sheet by an id
  public getSheet=(id:number, date:string = new Date(0).toISOString())=>{
    // Set options
    const options = {
      id,// Id of Sheet
      rowsModifiedSince:date // ISO-8601 format ex 2020-01-30T13:25:32-07:00 or 2021-03-12T19:22:35.853Z
    };
    // Get sheet
    return this.smartsheet.sheets.getSheet(options)
      .then((sheetInfo)=> {
        return sheetInfo;
      })
      .catch((error)=> {
        console.log(error);
    });
  };
}
// Create smartsheet api
const smartsheetAPI = new SmartsheetAPI();

export default smartsheetAPI;
