import Constants from 'expo-constants';

let serverURL: string;
if (__DEV__) {
  // If hostUri exists (mobile), use it for backend API. Otherwise use local host
  // serverURL = Constants.manifest.hostUri ? ("http://" + Constants.manifest.hostUri.split(':')[0] + ":3000") : ("http://localhost:3000");
  serverURL =  "https://wellness-app-summer-2023.azurewebsites.net/";
} else {
  // Heroku production server (Not used anymore) https://wellness-app-summer-2022.herokuapp.com
  // Azure production server  https://health-promo-mobile-app.azurewebsites.net
  // Render production server https://wellness-app-backend.onrender.com
  serverURL =  "https://capstone-wellness.vercel.app/";
}
console.log("Server is on: " + serverURL);

export default serverURL;
