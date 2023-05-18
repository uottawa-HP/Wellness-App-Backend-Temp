const getAzureJWT = async (code: String) => {
 
    let data = "grant_type=authorization_code&code="+code+"&redirect_uri=http://localhost:3000/login-success&client_id=78be11a6-aeba-42da-89ce-0530e56fc170&client_secret=Ei18Q~Dwa5.j2uczSoZDhGVEEXhGr9RVIG4oCaob"
   
    // Replace these values from the values of you app
    const TOKEN_ENDPOINT ='https://login.microsoftonline.com/d41fdab1-7e15-4cfd-b5fa-7200e54deb6b/oauth2/v2.0/token';

    const axios = require('axios');
    
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
   
    let token = '';

    const response = await axios
      .post(TOKEN_ENDPOINT, data)
      .then((response: { data: { access_token: string; }; }) => {
        token = response.data.access_token;
        return token;
      })
      .catch((error: any) => {
        console.log(error); 
      });

    return response;
}

const AzureLogInContext = {
  getAzureJWT,
};

export default AzureLogInContext;
