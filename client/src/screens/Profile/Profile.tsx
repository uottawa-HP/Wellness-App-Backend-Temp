import * as React from 'react';
import { Image ,TouchableOpacity, SafeAreaView, Alert, ScrollView, Dimensions, Linking} from 'react-native';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import AuthActions from "../../store/auth/actions";
import { useState , useEffect } from 'react';
import CoolIcons from '../../../assets/CoolIcons';
import Colors from '../../constants/Colors';
import { SvgUri } from 'react-native-svg';
import Points from '../../constants/Points';
import { connected } from 'process';
import { Appearance } from 'react-native'
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import dictionnaryFR from '../../constants/dictionnaryFR';
import dictionnaryEN from '../../constants/dictionnaryEN';
import { store } from '../../store/reduxStore';
import LanguageActions from '../../store/language/actions';


interface ProfileProps {
  auth: any;
  language:any;
}

const mapStateToProps = (state: ProfileProps) => ({
  auth: state.auth,
  language: state.language,
});

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {

  const navigation = useNavigation();
  const logout = () => {
    AuthActions.logout();
    navigation.navigate('Home');
  }

  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('focus', (e) => {
        if (AuthActions.isUserLoggedIn()) {
          //refreshing user's info, in case some changes happened on the database
          AuthActions.updateStore();
        }

      });
    }
    unsubscribe();
    return () => {
    }
  }, [navigation]);

  const handlePress = () => setExpanded(!expanded);
  //path to the badges 
  const badges = '../../../assets/images/badges';

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  

  //handles the language changes 
  const [language,setLanguage]=useState('english');
  const [dictionnary,setDictionnary] = useState(dictionnaryEN);
  useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('focus', (e) => {
        setLanguage(LanguageActions.getLanguage());
        setDictionnary(LanguageActions.getLanguage()==='english' ? dictionnaryEN : dictionnaryFR)
    });
    }
    unsubscribe();
    return () => {
    }
  }, [navigation]);
  
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);

  let dim = Dimensions.get('window').width*0.18
  let badgeSize = Dimensions.get('window').width*0.09
  let streak = Dimensions.get('window').width*0.06

  const handleLogin = () =>{
    console.log("Login pressed.")
    Linking.openURL("https://login.microsoftonline.com/d41fdab1-7e15-4cfd-b5fa-7200e54deb6b/saml2");
  }

  const tempLogInSuccessfull = () =>{

    const data = {email: 'aheymans@uottawa.ca',firstName:"Adrien",lastName:"Heymans",userType:"student"}
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
                    .catch(() => { navigation.navigate('Login'); });; // Remain on login page if fetching gamification data fails
            })
            .catch(() => { navigation.navigate('Login'); }); // Remain on login page if signin fails
  }

  return (
    // if a user is connected, the profile screen will be different than if no user is connected 
    <SafeAreaView style={props.auth.user.name ? (theme === 'light' ? styles.container : darkModeStyles.container) 
    : (theme === 'light' ? styles.guestContainer : darkModeStyles.guestContainer)}>
      {props.auth.user.name ?
      <ScrollView>
        <View style={theme === 'light' ? styles.scrollContainer : darkModeStyles.scrollContainer}>
          <View>
            <View style={theme === 'light' ? styles.topContainer : darkModeStyles.topContainer}>
              <View style={[theme === 'light' ? styles.backgroundColor 
                : darkModeStyles.backgroundColor, styles.userInfo]}>
                <Text style={styles.greeting}>{dictionnary.profile.Welcome}</Text>
                <Text style={styles.title}>{props.auth.user.name.firstName} !</Text>
              </View>
              <View style={[theme === 'light' ? styles.backgroundColor 
                : darkModeStyles.backgroundColor, styles.avatarContainer]}>
                {props.auth.user.name && props.auth.user.avatar ?
                  <View style={styles.avatarIcon}>
                    <SvgUri
                      width={dim}
                      height={dim}
                      uri={"https://avataaars.io/?avatarStyle=Circle&topType=" + props.auth.user.avatar.top + "&accessoriesType=" + props.auth.user.avatar.accessories + "&hairColor=" + props.auth.user.avatar.hairColor + "&facialHairType=" + props.auth.user.avatar.facialHair + "&facialHairColor=Brown&clotheType=" + props.auth.user.avatar.clothes + "&clotheColor=Blue03&eyeType=" + props.auth.user.avatar.eyes + "&eyebrowType=" + props.auth.user.avatar.eyebrows + "&mouthType=" + props.auth.user.avatar.mouth + "&skinColor=" + props.auth.user.avatar.skin}
                    />
                  </View>
                  : null}
              </View>
            </View>
            <View style={theme === 'light' ? styles.statusContainer : darkModeStyles.statusContainer}>
              <View style={theme === 'light' ? styles.pointsContainer : darkModeStyles.pointsContainer}>
                <Text style={theme === 'light' ? styles.points : darkModeStyles.points}>{props.auth.game.points} Points</Text></View>
              {props.auth.game.streak > 0 ?
                <View style={theme === 'light' ? styles.streaksContainer : darkModeStyles.streaksContainer}>
                  <Text style={theme === 'light' ? styles.streak : darkModeStyles.streak}>{props.auth.game.streak} </Text>
                  <Image style={[styles.imageStyle, {height: streak, width: streak}]} source={require('../../../assets/images/streak.png')} />
                </View>
                : null}
              <View style={styles.badgeContainer}>
                {/* Checking points means to pass 1 less variable to frontend from the backend */}
                {
                  props.auth.game.points >= Points.diamond ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/diamond.png')} resizeMethod="scale" resizeMode="contain"/> :
                    props.auth.game.points >= Points.platinum ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/platinum.png')} resizeMethod="scale" resizeMode="contain"/> :
                      props.auth.game.points >= Points.gold ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/gold.png')} resizeMethod="scale" resizeMode="contain" /> :
                        props.auth.game.points >= Points.silver ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/silver.png')} resizeMethod="scale" resizeMode="contain"/> :
                          props.auth.game.points >= Points.bronze ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/bronze.png')} resizeMethod="scale" resizeMode="contain"/> :
                            null
                }
              </View>
            </View>
          </View>
          <View style={[styles.optionsContainer, theme === 'light' ? styles.backgroundColor : darkModeStyles.backgroundColor]}>
            <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={theme === 'light' ? styles.leftIcon : darkModeStyles.leftIcon}>
                  <MaterialIcons name="leaderboard" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue :'white'} />
                </View>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                  <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{dictionnary.profile.Leaderboard}</Text>
                </View>
                <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
                  <CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white' }/></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PointSystem')} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={theme === 'light' ? styles.leftIcon : darkModeStyles.leftIcon}>
                  <CoolIcons name="info_square" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} />
                </View>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                  <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{dictionnary.profile.PointSystem}</Text>
                </View>
                <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
                  <CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} /></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert(dictionnary.profile.ComingSoon) }} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={theme === 'light' ? styles.leftIcon : darkModeStyles.leftIcon}>
                  <CoolIcons name="notification" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} />
                </View>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                  <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{dictionnary.profile.Notifications}</Text>
                </View>
                <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
                  <CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} /></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={theme === 'light' ? styles.leftIcon : darkModeStyles.leftIcon}>
                  <CoolIcons name="edit" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} />
                </View>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                  <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{dictionnary.profile.EditProfile}</Text>
                </View>
                <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
                  <CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} /></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Language')} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={theme === 'light' ? styles.leftIcon : darkModeStyles.leftIcon}>
                  <CoolIcons name="flag_fill" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} />
                </View>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                  <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{dictionnary.profile.Language}</Text>
                </View>
                <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
                  <CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} /></View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.optionsContainer, theme === 'light' ? styles.backgroundColor : darkModeStyles.backgroundColor]}>
            <TouchableOpacity onPress={() => logout()} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={[theme === 'light' ? styles.leftIcon : darkModeStyles.leftIcon, styles.rotate90]}>
                  <MaterialIcons name="logout" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} />
                </View>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                  <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{dictionnary.profile.LogOut}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View> 
        </ScrollView>:
        <View style={styles.guestContainer}>
          <View style={styles.guestTopContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Language')} activeOpacity={0.5}>
                <View style={theme === 'light' ? styles.iconSettingsContainer : darkModeStyles.iconSettingsContainer}>
                  <CoolIcons name="settings" style={{fontSize: RFPercentage(3)}} color={Colors.darkBlue} /></View>
            </TouchableOpacity>
            <Text style={theme === 'light' ? styles.guestTitle : darkModeStyles.guestTitle}>{dictionnary.profile.WellnessJourney} </Text>
            <View style={styles.wellnessCharactersContainer}>
              <Image style={styles.wellnessCharacters} source={require('../../../assets/images/all-wellness-animals.png')} />
            </View>
          </View>
          <View style={theme === 'light' ? styles.guestBottomContainer : darkModeStyles.guestBottomContainer}>
            
            <Text style={theme === 'light' ? styles.text : darkModeStyles.text}>
                {dictionnary.profile.Description}
            </Text>

            <TouchableOpacity style={styles.signupContainer} onPress={() => navigation.navigate("LoginAzure")}>
              <Text style={styles.buttonSignup}>{dictionnary.profile.Login}</Text>
            </TouchableOpacity>

            
            
          </View>
        </View>
      }
    </SafeAreaView>

  );
}

export default connect(mapStateToProps)(Profile);

