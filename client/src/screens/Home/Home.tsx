import * as React from 'react';

import { connect, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { Appearance } from 'react-native'
import { ScrollView, Image, TouchableOpacity, Linking, LogBox, SafeAreaView, Pressable, Share, SectionList, useColorScheme as _useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
import { Text, View } from '../../components/Themed';
import CoolIcons from '../../../assets/CoolIcons';
import styles from './styles';
import darkModeStyles from './darkModeStyles';
import dictionnaryFR from '../../constants/dictionnaryFR';
import dictionnaryEN from '../../constants/dictionnaryEN';
import { WellnessTipsContext,EventListContext, WellnessNewsListContext, ActivitiesBookingsListContext } from '../../context';
import { Ionicons } from '@expo/vector-icons';
import AuthActions from '../../store/auth/actions';
import Points from '../../constants/Points';
import Svg, { SvgUri, LinearGradient, Stop, Defs, Rect } from 'react-native-svg';
import LeaderboardContext from '../../context/leaderboardContext/leaderboardContext';
import Colors from '../../constants/Colors';
import SectionListData from '../Events/SectionListData';
import { IEvent, convertToJSON, IWellnessNews, IWellnessTip } from '../../interfaces';
import ListItem from '../../components/ListItem';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions} from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import Carousel, { Pagination } from 'react-native-snap-carousel'; 
import LanguageActions from '../../store/language/actions';

interface HomeProps {
  auth: any;
  language:any;
}

const mapStateToProps = (state: HomeProps) => ({
  auth: state.auth,
  language: state.language,
});


// Today's date and time
const currentDate = new Date();
const current = currentDate.toLocaleDateString();

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  //controls the theme light or dark
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  //controls the language
  const [language,setLanguage] = useState(props.language.label);
  const [dictionnary,setDictionnary] = useState(language=='english' ? dictionnaryEN : dictionnaryFR);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const date = new Date();
  // Daily tip source
  const [displayLoadingIconWellnessTips, setDisplayLoadingIconWellnessTip] = useState(true);
  const defaultTip = {tipEN:"Stay hydrated ! \nDrink about 3.7 liters of fluids a day for men and about 2.7 liters of fluids a day for women.",tipFR:"Restez hydraté ! \nBuvez environ 3,7 litres de liquides par jour pour les hommes et environ 2,7 litres de liquides par jour pour les femmes.",source:"",date:""}
  const [currentTip, setCurrentTip] = useState(defaultTip);
  const [tipFailedLoading, setTipFailedLoading] = useState(false);

  //controls the pop up window for the daily streak 
  const [isModalVisible, setModalVisible] = useState(false);
  const badges = '../../../assets/images/badges';

  // For on-going events
  const [displayLoadingIconEvents, setDisplayLoadingIconEvents] = useState(true)
  const loadingSectionList = new SectionListData("");
  const [sectionListData, setSectionListData] = useState([loadingSectionList]);
  const [refreshing] = useState(false);
  const [eventsFailedLoading, setEventsFailedLoading] = useState(false);
  const [eventsListEmpty,setEventsListEmpty]=useState(false);
  // For the booking section
  const loadingActivitiesBookingsList = new Array();
  const [activitiesBookings,setActivitiesBookings] = useState(loadingActivitiesBookingsList)
  const [displayLoadingIconBookingSection, setDisplayLoadingIconBookingSection] = useState(true);
  const [bookingSectionFailedLoading, setBookingSectionFailedLoading] = useState(false);

  // For wellness News 
  const loadingWellnessNewsList = new Array();
  const [wellnessNewsListData,setWellnessNewsListData ] = useState(loadingWellnessNewsList)


  // Getting the list of next 2 future events
  const getFutureEvents = (data: SectionListData[]) => {
    const onGoing = new SectionListData("");
    let index=0;
    data.map((item) => {
      if  (index < item.data.length && index<2) {
        const currentEvent = item.data[index];
        onGoing.addEvent(currentEvent);
        index++;
      }
    });
    setSectionListData([onGoing]);
  };

  // Checks if an event is live and returns boolean (for future use)
  const isOnGoing = (event: IEvent) => {
    
    const dateNow = new Date();
    const startTime = event.startDate.toLocaleTimeString();
    const endTime = event.endDate.toLocaleTimeString();
    const start = event.startDate.toLocaleDateString();
    const end = event.endDate.toLocaleDateString();
    if (event.time === undefined || event.time === "NA" || event.time === "NA"
      || event.time === "Every day") {
      return start <= current && current <= end;
    }
    return (event.startDate.getTime() < dateNow.getTime()) && (dateNow.getTime() < event.endDate.getTime())
  }

  // Listener in case the theme changes 
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);  
     
  useEffect(() => {
    //reset theme if changed 
    setTheme(Appearance.getColorScheme())
    //set languague 
    setLanguage(LanguageActions.getLanguage())
    //set dictionnary
    setDictionnary(LanguageActions.getLanguage()=='english' ? dictionnaryEN : dictionnaryFR)
    //refresh wellness news
    refreshWellnessNews();
    //refresh tip
    refreshTip();
    //refresh the event list
    refreshEventsList();
    //refresh user info (points, streaks, avatar,...)
    refreshUserInfo();
    //retrieve the booking secion
    refreshBookingSection();
  }, []);

  useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('focus', (e) => {
        //setting new languague
        setLanguage(LanguageActions.getLanguage());
        //setting dictionnary
        setDictionnary(LanguageActions.getLanguage()=='english' ? dictionnaryEN : dictionnaryFR)
        //refresh user info (points, streaks, avatar,...)
        refreshUserInfo();
        //refresh wellness news
        refreshWellnessNews();
        //refresh tip
        refreshTip();
        //refresh the events list
        refreshEventsList();
        //retrive the bookings section
        refreshBookingSection();
    });
      
    }
    unsubscribe();
    return () => {
    }
  }, [navigation]);

  //shows/hide the modal 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //when the modal is closed, we change the boolean value in the redux store, because the user completed the daily mission, they cannot do it twice 
  const handleClosingModal = () => {

    toggleModal();

  };

  //Refresh the tip when called by setting state
  const refreshTip = () => {

    WellnessTipsContext.checkTip().then((tip:IWellnessTip) => {
      setDisplayLoadingIconWellnessTip(false);
      setCurrentTip(tip);
      
    }).catch((error: any) => {
      setTipFailedLoading(true);
      setDisplayLoadingIconWellnessTip(false);
      //default tip displayed in case of a failure to get the tip from smartsheet
      setCurrentTip(defaultTip)
      console.log("Error getting tips")
    });
  };

  //Refresh the wellness news when called by setting state 
  const refreshWellnessNews = () =>{
    WellnessNewsListContext.checkList().then((wellnessNewsList) => {
      setWellnessNewsListData(wellnessNewsList)
    }).catch((error) => {
      console.log('Error getting wellness news');
    });
  }

  //Refresh function
  const refreshEventsList = () => {
    
    // Refresh the event list by setting state
    EventListContext.checkList().then((eventList) => {
      setDisplayLoadingIconEvents(false)
      setSectionListData(eventList);
      getFutureEvents(eventList);
      //checking if the list is empty (check the conditionnal rendering of the section list below)
      if (eventList.length==0){
        setEventsListEmpty(true);
      }
      else{
        setEventsListEmpty(false);
      }
    }).catch((error) => {
      setDisplayLoadingIconEvents(false)
      setEventsFailedLoading(true);
      console.log('Error getting events');
    });
  };

  const refreshUserInfo = () =>{
    if (AuthActions.isUserLoggedIn()) {
      AuthActions.updateStore();          
    }
  }

  const refreshBookingSection = () =>{
    ActivitiesBookingsListContext.checkList().then((activitiesList) =>{
      setDisplayLoadingIconBookingSection(false);
      setActivitiesBookings(activitiesList);      
    }).catch((error) => {
      setDisplayLoadingIconBookingSection(false);
      setBookingSectionFailedLoading(true);
      console.log("Error getitng the booking section")
    })
  }

  //returns true or false if this is the first log in of the day
  const firstLoginOfDay = () => {


    let dateMongo = new Date(props.auth.game.lastLoginDate);

    //we are now taking today's date
    let todayDate = new Date();

    //comparing if the date are equals, if they are, it is not the first log in of the day, if they aren't the date on the DB is in the past 

    if (todayDate.toLocaleDateString() == (dateMongo.toLocaleDateString())) {

      return false;
    }
    else {

      return true;
    }

  }

  //checks if the user deserves a streak for logging in 
  const checkStreaks = () => {
    let userDate = new Date(props.auth.game.lastLoginDate);
    let todayDate = new Date();
    let yesterdayDate = new Date();
    yesterdayDate.setDate(todayDate.getDate() - 1);

    //if the last time the user logged in was yesterday, we increase the streaks by 1
    if (userDate.getDay() == yesterdayDate.getDay() && userDate.getMonth() == yesterdayDate.getMonth() && userDate.getFullYear() == yesterdayDate.getFullYear()) {
      props.auth.game.streak++;
      AuthActions.updateGameInfo(props.auth.game);
    }
    //if the user already logged in today we do nothing
    else if (userDate.getDay() == todayDate.getDay() && userDate.getMonth() == todayDate.getMonth() && userDate.getFullYear() == todayDate.getFullYear()) {
      props.auth.game.streak = props.auth.game.streak;
    }
    //if the user logged in more than 1 day ago, we reset the streakls to 0
    else {
      props.auth.game.streak = 0;
      AuthActions.updateGameInfo(props.auth.game);
    }

  }

  //resets the boolean value in the database on first log in of the day to allow user to complete actions again today
  const resetGamificationValue = () => {

    //if this is the first log in of the day 

    if (firstLoginOfDay()) {
      //Resetting the streaks 
      checkStreaks();

      //We give the user 10 points for logging in 
      AuthActions.addPoints(Points.dailyLogIn);

      //we reset the boolean and the last login date value of the DB to false
      AuthActions.setBooleanValue('dailyStreakCompleted', false);
      AuthActions.setBooleanValue('wellnessTipShared', false);
      AuthActions.setBooleanValue('eventShared', false);
      AuthActions.setBooleanValue('blogPostRated', false);
      AuthActions.setBooleanValue('journalUsed', false);
      AuthActions.setBooleanValue('serviceBooked', false);
      AuthActions.resetLastLoginDate(new Date());
    }

  }

  //function to share the wellness tip
  const share = async () => {

    try {
      const result = await Share.share({
        message: LanguageActions.getLanguage()==='english' ? currentTip.tipEN : currentTip.tipFR,
      });
      if (result.action === Share.sharedAction) {
        //if a user is conected and hasn't yet shared the wellness tip
        if (AuthActions.isUserLoggedIn() && !props.auth.game.wellnessTipShared) {
          //adding points to the DB and redux store
          AuthActions.addPoints(Points.shareWellnessTipPoints);
          //changing boolean value on the DB and redux store
          AuthActions.setBooleanValue('wellnessTipShared', true);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed")
      }
    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    //testing leaderboard
    LeaderboardContext.buildList();
    //Refresh tip on first load
    refreshTip();

    //if a user is logged in, we reset the gamifiction value
    if (AuthActions.isUserLoggedIn()) {
      resetGamificationValue();
      //we show the button "Daily Mission" on the frontend
    }
  }, []);


  let dim = Dimensions.get('window').width*0.18
  let badgeSize = Dimensions.get('window').width*0.09
  let streak = Dimensions.get('window').width*0.06
  let icon = Dimensions.get('window').width*0.15

  const {width} = Dimensions.get("window");

  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

  const  renderItem = ({item}:{item:IWellnessNews}) => {
    return (

      <View style={theme === 'light' ? styles.itemContainerCarousel : darkModeStyles.itemContainerCarousel}>

      <Svg preserveAspectRatio="xMinYMin slice"  viewBox="0 0 175 175" height="100%" width="100%" style={ theme === 'light' ? styles.backgroundCarousel : darkModeStyles.backgroundCarousel }>
                <Defs>
                    <LinearGradient id="grad" x1={0.7} y1={0} x2={0.5} y2={1}>
                        <Stop offset="0" stopColor={ theme === 'light' ?  '#87CEFA' :  '#380036' }/>
                        <Stop offset="1" stopColor={ theme === 'light' ?  '#F08080' :  '#0CBABA' }/>
                    </LinearGradient>
                </Defs>
                <Rect rx={10} width="100%" height="100%" fill="url(#grad)"/>
      </Svg>
      <Text style={theme === 'light' ? styles.itemLabelTitleCarousel : darkModeStyles.itemLabelTitleCarousel}> {language==='english' ? item.titleEN : item.titleFR} </Text>
      <Text style= {theme === 'light' ? styles.itemLabelTextCarousel : darkModeStyles.itemLabelTextCarousel}> {language==='english' ? item.descriptionEN : item.descriptionFR}</Text>
      </View>
    );
  }

  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  // Convert int to month for display
  const getMonth = (date: Date): String => {
    var month = '';
    // if (language=='english'){
      switch (date.getMonth()) {
        case 0:
          month = (language=='english' ? "January" : "Janvier");
          break;
        case 1:
          month = (language=='english' ? 'February' : "Février");
          break;
        case 2:
          month = (language=='english' ? 'March' : "Mars" );
          break;
        case 3:
          month = (language=='english' ? 'April' : "Avril");
          break;
        case 4:
          month = (language=='english' ? 'May' : "Mai");
          break;
        case 5:
          month = (language=='english' ? 'June' : "Juin");
          break;
        case 6:
          month = (language=='english' ? 'July' : "Juillet");
          break;
        case 7:
          month = (language=='english' ? 'August' : "Aôut");
          break;
        case 8:
          month = (language=='english' ? 'September' : "Septembre");
          break;
        case 9:
          month = (language=='english' ? 'October' : "Octobre");
          break;
        case 10:
          month = (language=='english' ? 'November' : "Novembre");
          break;
        case 11:
          month = (language=='english' ? 'December' : 'Decembre');
          break;
      }
    // }
    return month.toString();
  }

  return (
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
      <ScrollView contentContainerStyle={theme === 'light' ? styles.scrollContainer : darkModeStyles.scrollContainer}>
        {props.auth.user.name ?
          <View style={{ marginBottom: '2%' }}>
            <View style={theme === 'light' ? styles.topContainer : darkModeStyles.topContainer}>
              <View style={theme === 'light' ? [styles.backgroundColor, styles.userInfo] : [darkModeStyles.backgroundColor, darkModeStyles.userInfo]}>
                <Text style={styles.title}>{dictionnary.home.HeyLoggedIn} {props.auth.user.name.firstName} !</Text>
                {LanguageActions.getLanguage()==='english' ? <Text style={styles.greeting}>{dictionnary.home.Date} {getMonth(date)} {date.getDate()}.</Text> : null}
                {LanguageActions.getLanguage()==='french' ? <Text style={styles.greeting}>{dictionnary.home.Date} {date.getDate()} {getMonth(date)}.</Text> : null}
              </View>
              <View style={theme === 'light' ? [styles.backgroundColor, styles.avatarContainer] : [darkModeStyles.backgroundColor, darkModeStyles.avatarContainer]}>
                {props.auth.user.name && props.auth.user.avatar ?
                  <View style={styles.avatarIcon}>
                    <SvgUri
                      width={dim}
                      height={dim}
                      uri={"https://avataaars.io/?avatarStyle=Circle&topType=" + props.auth.user.avatar.top + "&accessoriesType=" + props.auth.user.avatar.accessories + "&hairColor=" + props.auth.user.avatar.hairColor + "&facialHairType=" + props.auth.user.avatar.facialHair + "&facialHairColor=Brown&clotheType=" + props.auth.user.avatar.clothes + "&clotheColor=Blue03&eyeType=" + props.auth.user.avatar.eyes + "&eyebrowType=" + props.auth.user.avatar.eyebrows + "&mouthType=" + props.auth.user.avatar.mouth + "&skinColor=" + props.auth.user.avatar.skin}
                    />
                  </View> : null}
              </View>
            </View>
            <View style={theme === 'light' ? styles.statusContainer : darkModeStyles.statusContainer}>
              <View style={theme === 'light' ? styles.pointsContainer : darkModeStyles.pointsContainer}>
                <Text style={theme === 'light' ? styles.points : darkModeStyles.points}>{props.auth.game.points} Points</Text></View>
              {props.auth.game.streak > 0 ?
                <View style={theme === 'light' ? styles.streaksContainer : darkModeStyles.streaksContainer}>
                  <Text style={theme === 'light' ? styles.streak : darkModeStyles.streak}>{props.auth.game.streak} </Text>

                  <Image style={[styles.streakImage, {height: streak, width: streak}]} source={require('../../../assets/images/streak.png')} />

                </View>
                : null}
              <View style={styles.badgeContainer}>
                {/* Checking points means to pass 1 less variable to frontend from the backend */}
                {
                  props.auth.game.points >= Points.diamond ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/diamond.png')} resizeMethod="scale" resizeMode="contain"/> :
                    props.auth.game.points >= Points.platinum ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/platinum.png')} resizeMethod="scale" resizeMode="contain"/> :
                      props.auth.game.points >= Points.gold ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/gold.png')} resizeMethod="scale" resizeMode="contain"/> :
                        props.auth.game.points >= Points.silver ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/silver.png')} resizeMethod="scale" resizeMode="contain"/> :
                          props.auth.game.points >= Points.bronze ? <Image style={{alignSelf: 'center',flex: 1, width: badgeSize, height: badgeSize}} source={require(badges + '/bronze.png')} resizeMethod="scale" resizeMode="contain"/> :
                            null
                }
              </View>
              
            </View>
          </View>
          :
          <View style={[{ marginBottom: '3%' }, styles.userInfo, 
              theme === 'light' ? styles.backgroundColor : darkModeStyles.backgroundColor, styles.additionalPaddingTop]}>
            <Text style={styles.title}>{dictionnary.home.WelcomeNotLoggedIn}</Text>
            <Text style={styles.greeting}>{dictionnary.home.Date} {getMonth(date)} {date.getDate()}.</Text>
          </View>}

        <Carousel
            ref={isCarousel}
            data={wellnessNewsListData}
            renderItem = {renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={392}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={index => setIndex(index)}
            // scrollInterpolator={scrollInterpolator}
            // slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
            activeSlideAlignment='start'
            autoplay={true}
            autoplayInterval={7000}
            loop={true}
            lockScrollWhileSnapping={true}
        />

     

      <Pagination
        dotsLength={wellnessNewsListData.length}
        activeDotIndex={index}
        //carouselRef={isCarousel}
        dotStyle={ theme === 'light' ? styles.paginationActiveDotCarousel : darkModeStyles.paginationActiveDotCarousel}
        //tappableDots={true}
        inactiveDotStyle={theme === 'light' ? styles.paginationInactiveDotCarousel : darkModeStyles.paginationInactiveDotCarousel}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
       

        {/* The button that toggles the daily mission only visible if user is logged in AND hasn't completed the mission already */}
        {!props.auth.game.dailyStreakCompleted && props.auth.user.name ?
          <TouchableOpacity onPress={() => { navigation.navigate("DailyMission") }} activeOpacity={0.7}>
            <View style={theme === 'light' ? styles.dailyMissionContainer : darkModeStyles.dailyMissionContainer}>
              <View style={styles.dailyMissionText}>
                <Text style={[styles.cardTitleText, { marginBottom: 6 }]}>{dictionnary.home.NewDailyMission}</Text>
                <Text style={[styles.cardText, { color: Colors.greyText, fontSize: RFPercentage(2.5)}]}>{dictionnary.home.DailyMission}</Text>
              </View>
              <View style={styles.dailyMissionIcon}>
                <Ionicons name='game-controller-outline' color={Colors.greenClr} style={{ marginLeft: '6%', fontSize: RFPercentage(8) }} />
              </View>
            </View>
          </TouchableOpacity> : null}

        <TouchableOpacity onLongPress={() => share()} onPress={() => Linking.openURL(currentTip.source).catch(e => console.warn(e))} activeOpacity={0.7}>
          <View style={theme === 'light' ? styles.cardTip : darkModeStyles.cardTip}>
            <View style={styles.titleContainer}>
              <Text style={styles.cardTitleText}>{dictionnary.home.Tip}</Text>
              <CoolIcons style={styles.icon} name="external_link"/>
            </View>

            {displayLoadingIconWellnessTips ? <DotIndicator color='#EA7754' size={7}/> :
            <Text style={styles.cardText}>{language=="english" ? currentTip.tipEN : currentTip.tipFR}</Text> }

          </View>
        </TouchableOpacity>

        <Text style={styles.subtitle}>{dictionnary.home.FutureEvents}</Text>

        {displayLoadingIconEvents ? <DotIndicator color='#EA7754' size={7}/> :
        <>
          {eventsFailedLoading ? 
          <View style={theme === 'light' ? styles.noResult : darkModeStyles.noResult}>
            <Image style={styles.noResultImage} source={require('../../../assets/images/wellnessCharacter/bear.png')} resizeMode='contain' />
            <Text style={styles.noResultText2}>{dictionnary.home.EventsFailed}</Text>
          </View> : 
          <>
            {eventsListEmpty ?
              <View style={theme === 'light' ? styles.noResult : darkModeStyles.noResult}>
                <Image style={styles.noResultImage} source={require('../../../assets/images/wellnessCharacter/bear.png')} resizeMode='contain' />
                <Text style={styles.noResultText2}>{dictionnary.home.EventsEmpty}</Text>
              </View>  :

              <SectionList
                style={theme === 'light' ? styles.events : darkModeStyles.events}
                sections={sectionListData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                
                (<ListItem
                  item={item}
                  onPress={() => navigation.navigate('EventDetails', { event: convertToJSON(item) })}
                  margin="0%"
                  width="92%"
                />
                )}
                refreshing={refreshing}
                onRefresh={refreshEventsList}
              />
            }
          </>  
          }
        </>
        }

        <Text style={styles.subtitle}>{dictionnary.home.Bookings}</Text>

        {displayLoadingIconBookingSection ? <DotIndicator color='#EA7754' size={7}/> :
        <>
        {bookingSectionFailedLoading ? 
          <View style={theme === 'light' ? styles.noResult : darkModeStyles.noResult}>
            <Image style={styles.noResultImage} source={require('../../../assets/images/wellnessCharacter/moose.png')} resizeMode='contain' />
          <Text style={styles.noResultText2}>{dictionnary.home.BookingsFailed}</Text>
          </View> :
          <>
          {activitiesBookings[0]==null ?

          <View style={theme === 'light' ? styles.noResult : darkModeStyles.noResult}>
            <Image style={styles.noResultImage} source={require('../../../assets/images/wellnessCharacter/moose.png')} resizeMode='contain' />
          <Text style={styles.noResultText2}>{dictionnary.home.BookingsEmpty}</Text> 
          </View>:
            <FlatGrid
              itemDimension={width/3}
              data={activitiesBookings}
              style={styles.gridView}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('BookService', {service:item})} activeOpacity={0.7}>
                
                  <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                    <View style={theme=== 'light' ? styles.imageContainer : darkModeStyles.imageContainer}>
                      <Image style={{width: icon, height: icon}} resizeMethod="scale" resizeMode="contain" source={item.picture} />
                    </View>
                    <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                      <Text style={styles.featureDesc}>{language==='english' ? item.nameEN : item.nameFR}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          }
          </>
        }
        </>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps)(Home);