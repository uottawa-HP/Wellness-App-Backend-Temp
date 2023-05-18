import React, { Component, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import AuthActions from "../../store/auth/actions";
import { Appearance } from 'react-native'
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';
import WebView, { WebViewNavigation } from 'react-native-webview';
import AzureLogInContext from '../../context/azureLogIn';
import axios, { AxiosResponse } from 'axios';
import { request } from 'https';
import jwt_decode from 'jwt-decode';
// this file does not a stylesheet for darkModeStyles.tsx,
// because only 2 changes were needed to support dark mode

interface DecodedToken {
    given_name: String,
    family_name: String,
    upn: String
}
interface LoginAzureProps extends Component {
    auth: any,
    errors: any
}

interface LoginAzure {
    email: String,
    password: String
}

const mapStateToProps = (state: LoginAzureProps) => ({
    auth: state.auth,
    errors: state.errors
});

const LoginAzure: React.FC<LoginAzureProps> = (props: LoginAzureProps) => {
    const navigation = useNavigation();
    //handles the language changes 
    const [language,setLanguage]=useState('english');
    const [dictionnary,setDictionnary] = useState(dictionnaryEN);
    const [codeUsed,setCodeUsed]=useState(false)
    
     useEffect(() => {
        const unsubscribe = () => {
        navigation.addListener('focus', (e) => {
            setLanguage(LanguageActions.getLanguage());
            setDictionnary(LanguageActions.getLanguage()==='english' ? dictionnaryEN : dictionnaryFR)
            navigation.setOptions({headerTitle:dictionnary.login.Login})
        });
        }
        unsubscribe();
        return () => {
        }
    }, [navigation]);

    const [theme, setTheme] = useState(Appearance.getColorScheme());
  
    // handles light/dark mode appearance
    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
      });
     return () => subscription.remove();
    }, []);

    //AZURE IDs

    const tenantID ='d41fdab1-7e15-4cfd-b5fa-7200e54deb6b';
    const clientID ='78be11a6-aeba-42da-89ce-0530e56fc170';
    const clientSecret ='Ei18Q~Dwa5.j2uczSoZDhGVEEXhGr9RVIG4oCaob';
    const callbackURL='http://localhost:3000/login-success';
    const authURL ='https://login.microsoftonline.com/d41fdab1-7e15-4cfd-b5fa-7200e54deb6b/oauth2/authorize';
    const accessTokenURL='https://login.microsoftonline.com/d41fdab1-7e15-4cfd-b5fa-7200e54deb6b/oauth2/v2.0/token';
    
    //the url used to fetch the microsoft lofin page 
    const azureURL ='https://login.microsoftonline.com/'+tenantID+'/oauth2/authorize?response_type=code&client_id='+clientID+'&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin-success';
    
    
    //print every message from thr webview
    const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
        
        const url = navigationState.url;
        
        if (url.includes('error')){
            Alert.alert('We could not sign you in. \nTry again later...') ;
            navigation.navigate('Profile');
        }
        else if (url.includes('code')&&!codeUsed){
            var code = url.split("code=")[1];
            code=code.split("&")[0]
            setCodeUsed(true)
            let token =  await AzureLogInContext.getAzureJWT(code)
            let decodedToken:DecodedToken = jwt_decode(token)
            const data = {email: decodedToken.upn,firstName:decodedToken.given_name,lastName:decodedToken.family_name,userType:"student"}
            console.log("Logging in "+data.email)
            AuthActions.loginSSO(data)
                    
                    .then(() => {
                        // Get gamification info of user
                        AuthActions.getGameInfo()
                            .then(() => {
                                // Redirect user to homepage if login & getting gamification data successful 
                                navigation.reset({ routes: [{ name: 'Home' }] }) 
                                navigation.reset({ routes: [{ name: 'Profile' }] }) 
                                navigation.navigate('Home');
                                
                            })
                            .catch(() => { 
                                console.log("An error occured in getGameInfo")
                                navigation.navigate('Profile'); });; // Remain on login page if fetching gamification data fails
                    })
                    .catch(() => { 
                        console.log("An error occured in loginSSO")
                        navigation.navigate('Profile'); }); // Remain on login page if signin fails
        
        }
           
        
    };

    return (
        <WebView
            scrollEnabled={true}
            startInLoadingState={true}
            source={{
                uri: azureURL
              }}
              onNavigationStateChange={onNavigationStateChange}
        />
        
    );
}

export default connect(mapStateToProps)(LoginAzure);

