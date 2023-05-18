import React, { useEffect, useState } from 'react';
import { Platform, Text, View, TouchableOpacity, Linking, Share } from 'react-native';
import { IEvent, convertToEvent } from '../../interfaces';
import styles from './styles';
import { Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { getFullDate } from './utils';
import * as Calendar from 'expo-calendar';
import AuthActions from '../../store/auth/actions';
import { store } from '../../store/reduxStore';
import Points from '../../constants/Points';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import darkModeStyles from './darkModeStyles';
import { Appearance } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import dictionnaryFR from '../../constants/dictionnaryFR';
import dictionnaryEN from '../../constants/dictionnaryEN';
import LanguageActions from '../../store/language/actions';

export default function EventDetails({ route }: { route: any }) {

    const navigation = useNavigation();

    
    const [theme, setTheme] = useState(Appearance.getColorScheme());
    // handles light/dark mode appearance
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
        });
       return () => subscription.remove();
    }, []);

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

    let event: IEvent = convertToEvent(route.params.event);

    // variables to transform Date into String
    const dayStart = event.startDate.getDate();
    const dayEnd = event.endDate.getDate();
    let month = event.startDate.getMonth().toString();
    const eventStart = event.startDate.toDateString().split(" ")
    const eventEnd = event.endDate.toDateString().split(" ")

    //gets the month 
    switch (month) {
        case "0":
            month = 'January';
            break;
        case "1":
            month = 'February';
            break;
        case "2":
            month = 'March';
            break;
        case "3":
            month = 'April';
            break;
        case "4":
            month = 'May';
            break;
        case "5":
            month = 'June';
            break;
        case "6":
            month = 'July';
            break;
        case "7":
            month = 'August';
            break;
        case "8":
            month = 'September';
            break;
        case "9":
            month = 'October';
            break;
        case "10":
            month = 'November';
            break;
        case "11":
            month = 'December';
            break;
    }

    // returns an array containing all the pillars associated with the event
    const getPillar = () => {
        if (event.pillar === undefined) {
            return [];
        }
        const pillarList = event.pillar.split(",");
        for (let i = 0; i < pillarList.length; i++) {
            let temp = pillarList[i].trim();

            switch (temp){
                case "Spiritual":
                    pillarList[i]=dictionnary.eventsDetails.Spiritual;
                    break;
                case "Physical":
                    pillarList[i]=dictionnary.eventsDetails.Physical;
                    break;
                case "Emotional":
                    pillarList[i]=dictionnary.eventsDetails.Emotional;
                    break;
                case "Financial":
                    pillarList[i]=dictionnary.eventsDetails.Financial;
                    break;
                case "Environmental":
                    pillarList[i]=dictionnary.eventsDetails.Environmental;
                    break;
                case "Intellectual":
                    pillarList[i]=dictionnary.eventsDetails.Intellectual;
                    break;
                case "Social":
                    pillarList[i]=dictionnary.eventsDetails.Social;
                    break;
            }

            
        }

        return pillarList;
    }

    

    //returns the date of an event 
    const getDate = () => {
        let eventPeriod: string;
        if (eventStart[1] === eventEnd[1] && eventStart[2] === eventEnd[2] && eventStart[3] === eventEnd[3]) {
            eventPeriod = month + " " + eventStart[2] + ", " + eventStart[3];
        } else {
            eventPeriod = eventStart[1] + " " + dayStart + ", " + eventStart[3] + " - " +
                eventEnd[1] + " " + dayEnd + ", " + eventEnd[3];
        }
        return eventPeriod;
    }

    //saves the event to the calendar, works on both iOS and Android
    const saveToCalendar = async () => {
        const calendarRequest = await Calendar.requestCalendarPermissionsAsync();
        const reminderRequest = Platform.OS == "ios" ? await Calendar.requestRemindersPermissionsAsync() : { status: "granted" }
        if (calendarRequest.status === 'granted' && reminderRequest.status === 'granted') {

            const details = {
                title: LanguageActions.getLanguage()==='english' ? event.nameEN : event.nameFR  ,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                notes: LanguageActions.getLanguage()==='english' ? event.detailsEN : event.detailsFR +"\n "+ (event.registration == undefined  ? " " : event.registration),
            };
            if (Platform.OS == 'ios') {
                const calendar = await Calendar.getDefaultCalendarAsync();
                try {
                    await Calendar.createEventAsync(calendar.id, details)
                        .then(() => alert("Event added to phone calendar!"))
                } catch (error) {
                    console.log(error);
                    alert("There was a problem adding your event to the calendar");
                }
            } else {
                //getting all the calendars on the phone
                const calendars = await Calendar.getCalendarsAsync()  
                //next step is to find the default calendar
                //sometimes, not defualt calendar was selected in the settings, if this is the case we add to any calendar
                let calendar;
                for (let  i =0;i<calendars.length;i++){
                    if (calendars[i].isPrimary){
                        calendar=calendars[i];
                        break;
                    }
                }
                //if no primary calendar was found then we select a random calendar with owner acces as backup
                if (calendar==null){
                    for (let  i =0;i<calendars.length;i++){
                        if (calendars[i].accessLevel=="owner"){
                            calendar=calendars[i];
                            break;
                        }
                    }
                }
                try {
                    if (calendar!=null){
                        await Calendar.createEventAsync(calendar.id, details)
                            .then(() => alert("Event added to phone calendar!"))
                    }
                } catch (error) {
                    console.log(error);
                    alert("There was a problem adding your event to the calendar");
                }
 
            }
        }
    };

    //function used to share an event, works on both iOS and Android
    const share = async () => {

        try {
            const result = await Share.share({
                message: LanguageActions.getLanguage()==='english' ? ("Check out this event !\n" + event.nameEN + "\nLocation : "+event.location+"\nDate : " + getFullDate(event.startDate) + " to " + getFullDate(event.endDate)+"\nTime : "+ event.time +"\nLink : "+event.registration+"\nDescription : "+event.detailsEN+"\n") : ("Regarde cet évènement !\n" + event.nameFR + "\nLieu : "+event.location+"\nDate : " + getFullDate(event.startDate) + " à " + getFullDate(event.endDate)+"\nHeure : "+ event.time +"\nLien : "+event.registration+"\nDescription : "+event.detailsFR+"\n"),
            });
            if (result.action === Share.sharedAction) {
                //if a user is conected and hasn't yet shared the wellness tip
                if (store.getState().auth.user.name != null && !store.getState().auth.game.eventShared) {
                    //adding points to the DB and redux store
                    AuthActions.addPoints(Points.shareEventPoints);
                    //changing boolean value on the DB and redux store
                    AuthActions.setBooleanValue('eventShared', true);
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View style={{ height: '100%', paddingTop: 40, backgroundColor: theme === 'light' ? '#FFFFFF' : '#171717'}}>
            <View style={theme === 'light' ? styles.headerContainer : darkModeStyles.headerContainer}>
                <Text style={styles.titlePage}></Text>
                <View style={theme === 'light' ? styles.backContainer : darkModeStyles.backContainer}>
                    <AntDesign onPress={() => navigation.goBack()} name="close" style={{fontSize: RFPercentage(3.8)}} color={theme==='light' ? 'black' : 'white'} />
                </View>
            </View>
            <ScrollView style={theme === 'light' ? styles.body : darkModeStyles.body}>
                <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.wellnessContainer}>
                            {getPillar() !== undefined ? getPillar().map((item) =>
                                <TouchableOpacity activeOpacity={1} style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar} key={item}>
                                    <Text style={theme === 'light' ? styles.wellnessPillarText : darkModeStyles.wellnessPillarText}>{item}</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <Text style={theme === 'light' ? styles.title : darkModeStyles.title}>{language==='english' ? event.nameEN : event.nameFR}</Text>
                        <Text style={styles.eventLead}>
                            <Text style={{ color: '#636363', fontFamily: 'BarlowCondensed_400Regular' }}>{dictionnary.eventsDetails.Host} : </Text>
                            <Text style={{ color: '#636363', fontFamily: 'BarlowCondensed_600SemiBold' }}>{
                                event.eventLead.toLowerCase() === "unknown" ? "Unavailable" : event.eventLead
                            }</Text>
                        </Text>
                    </View>
                    <View style={styles.dividerContainer}>
                        <View style={styles.containerInfo}>
                            <Icon type='Ionicons' name="ios-location-sharp" style={styles.icon} />
                            <Text style={theme === 'light' ? styles.iconText : darkModeStyles.iconText}>{event.location === undefined ? "N/A" : event.location}</Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Icon type='MaterialCommunityIcons' name='calendar' style={styles.icon} />
                            <Text style={theme === 'light' ? styles.iconText : darkModeStyles.iconText}>{getDate()}</Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Icon type='MaterialCommunityIcons' name='clock-time-four-outline' style={styles.icon} />
                            <Text style={theme === 'light' ? styles.iconText : darkModeStyles.iconText}>{event.time === "NA" || event.time === undefined ? "N/A" : event.time}</Text>
                        </View>

                    </View>
                    
                    <View style={styles.descriptionContainer}>
                        <Text style={theme === 'light' ? styles.descriptionTitle : darkModeStyles.descriptionTitle}>{dictionnary.eventsDetails.Registration}</Text>
                        <Text style={styles.descriptionDetails}>
                            {event.registration === undefined || event.registration.toLowerCase() === "none" ? dictionnary.eventsDetails.NoRegistration :
                            event.registration.length > 1 ?
                                <Text onPress={() => { Linking.openURL(event.registration) }} style={{ textDecorationLine: 'underline',  color: theme === 'light' ? '#232323' : 'white' }}>
                                    Link to Event</Text> : null}
                        </Text>
                    </View>
                    <View style={[styles.descriptionContainer, {marginBottom: 0}]}>
                        <Text style={theme === 'light' ? styles.descriptionTitle : darkModeStyles.descriptionTitle}>{dictionnary.eventsDetails.Details}</Text>
                        {event.detailsEN==="No description provided." ?
                            <Text style={styles.descriptionDetails}>{language ==='english' ? 'No Description povided.' : 'Aucune description disponible'}</Text> : 
                            <Text style={styles.descriptionDetails}>{language==='english' ? event.detailsEN : event.detailsFR}</Text>
                        }
                        <Text style={styles.descriptionDetails}>{dictionnary.eventsDetails.Language}: {event.language}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => saveToCalendar()}>
                            <Text style={styles.btnText}>{dictionnary.eventsDetails.AddToCalendar}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme === 'light' ? styles.buttonShare : darkModeStyles.buttonShare} onPress={() => share()}>
                            <Text style={[styles.btnText, {color: '#104291'}]}>{dictionnary.eventsDetails.Share}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


//export default EventDetails;
