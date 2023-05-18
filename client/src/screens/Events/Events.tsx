import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SectionList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { View } from '../../components/Themed';
import ListItem from '../../components/ListItem';
import { EventListContext } from '../../context';
import { convertToJSON, IEvent } from '../../interfaces';
import styles from './styles';
import darkModeStyles from './darkModeStyles';
import SectionListData from './SectionListData';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Icon } from 'native-base';
import { Appearance } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { DotIndicator } from 'react-native-indicators';
import dictionnaryFR from '../../constants/dictionnaryFR';
import dictionnaryEN from '../../constants/dictionnaryEN';
import LanguageActions from '../../store/language/actions';

export default function Events({route}: {route:any}) {


  const [theme, setTheme] = useState(Appearance.getColorScheme());
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
    return;
  }, []);

  
  const navigation = useNavigation();
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

  //initializing section list data
  const loadingSectionList = new SectionListData("");
  const [displayLoadingIconEvents, setDisplayLoadingIconEvents] = useState(true)
  const [eventsFailedLoading,setEveventsFailedLoading]= useState(false);
  // helps change the section list data
  const [sectionListData, setSectionListData] = useState([loadingSectionList]);
  const [refreshing] = useState(false);
  //storing all the events in a a list that won't be modified
  const [fixedList, setFixedList] = useState([loadingSectionList]);
  const date = new Date();

  // Stores the filters being applied to the search
  const [filter, setFilter] = useState<string[]>([]);
  
  //Refresh the event list by setting state
  const refreshList = () => {
    EventListContext.checkList().then((eventList) => {
      setDisplayLoadingIconEvents(false)
      setSectionListData(eventList);
      setFixedList(eventList);
      setPressed1(true);
      setPressed2(false);
      setPressed3(false);
      setPressed4(false);
    }).catch((error) => {
      setDisplayLoadingIconEvents(false);
      setEveventsFailedLoading(true);
      console.log('get events failed');
    });
  };

  //Refresh the event list on first load
  useEffect(() => {
    refreshList();
  }, []);

  // Set the correct states of the filter buttons on the main Events page on load
  useEffect(() => {
    applyFilters(filter);
    if (filter.length === 1 && filter[0] === "this month") {
      setPressed1(false);
      setPressed2(true);
      setPressed3(false);
      setPressed4(false);
  } else if (filter.length === 1 && filter[0] === "virtual") {
      setPressed1(false);
      setPressed2(false);
      setPressed3(true);
      setPressed4(false);
  } else if (filter.length === 1 && filter[0] === "in-person") {
      setPressed1(false);
      setPressed2(false);
      setPressed3(false);
      setPressed4(true);
  } 
  else if (filter.length >= 1) {
      setPressed1(false);
      setPressed2(false);
      setPressed3(false);
      setPressed4(false);
  }
  else {
      setPressed1(true);
      setPressed2(false);
      setPressed3(false);
      setPressed4(false);
  }
  }, [route.params]);

  const alreadyInList = (listOfEvents:SectionListData,currentEvent: IEvent)=>{
    for (let i=0;i<listOfEvents.data.length;i++){
      if (listOfEvents.data[i].id == currentEvent.id){
        return true
      }
    }
    return false
  }

  // Change the state of the 3 filters on the main event page
  // Calls also the function to show the filtered events
  // Method called when one of the filter buttons is clicked
  const changeState = (btnPressed: string) => {
    if (btnPressed === "pressed1") {
      if (pressed1 === false) {
        setPressed1(!pressed1);
        setPressed2(false);
        setPressed3(false);
        setPressed4(false);
        setFilter([]);
        route.params = [];
        applyFilters([]);
        
      }
    } else if (btnPressed === "pressed2") {
      if (pressed2 === false) {
        setPressed2(!pressed2);
        setPressed1(false);
        setPressed3(false);
        setPressed4(false);
        setFilter(["this month"]);
        route.params = ["this month"];
        applyFilters(["this month"]);
        
      }
    } else if (btnPressed === "pressed3") {
      if (pressed3 === false) {
        setPressed3(!pressed3);
        setPressed1(false);
        setPressed2(false);
        setPressed4(false);
        setFilter(["virtual"]);
        route.params = ["virtual"];
        applyFilters(["virtual"]);
      }
    } else if (btnPressed === "pressed4") {
      if (pressed4 === false) {
        setPressed4(!pressed4);
        setPressed1(false);
        setPressed2(false);
        setPressed3(false);
        setFilter(["in-person"]);
        route.params = ["in-person"];
        applyFilters(["in-person"]);
      }
    }
  };

  // uses the filters selected to return the filtered events
  const applyFilters = (filters: string[]) => {
    if (filters.length === 0 || filters === undefined) {
      // Set sectionListData to contain every events when no filters are applied
      setSectionListData(fixedList);
    } else {
      const filtered = new SectionListData("");
      // loops through the whole list of events
      fixedList.map((item) => {
        // loops through the events happening on the same day
        for (let i = 0; i < item.data.length; i++) {
          // saves the events we're on
          const currentEvent = item.data[i];
          for (let j = 0; j < filters.length; j++) {
            // loops through the filters now
            const currentFilter = filters[j].toLowerCase();
            // variables to get the current date
            const todayDate = date.getDate();
            const extraDays = date.getDay();
            const todayMonth = date.getMonth();
            const todayYear = date.getFullYear();
            const eventStartDay = currentEvent.startDate.getDate();
            const eventStartMonth = currentEvent.startDate.getMonth();
            const eventStartYear = currentEvent.startDate.getFullYear();
            const eventEndDay = currentEvent.endDate.getDate();
            const eventEndMonth = currentEvent.endDate.getMonth();
            const eventEndYear = currentEvent.endDate.getFullYear();
            let isSameDay;
            if (eventStartDay === eventEndDay && eventStartMonth === eventEndMonth &&
              eventStartYear === eventEndYear) isSameDay = true;

            /* n is variable to help us deal with the edge cases of "this week"
             and "next week". n represents the number of days in a month */
            let n;
            if (todayMonth === 1) {
              n = 28; // this variable needs to be updated depending on how many days Feb has
            } else if (
              todayMonth === 3 || todayMonth === 5 || 
              todayMonth === 8 || todayMonth === 10) {
              n = 30;
            } else {
              n = 31;
            }
            if (currentFilter === "this week") {
              //getting the date of previous monday (if today's date is monday, it will return today's date)
              let start = new Date(); 
              start.setDate(start.getDate() - (start.getDay() + 6) % 7);
              start.setHours(0, 0, 0, 0);
              //getting the date of next sunday, at midnight
              let end = new Date(start); 
              end.setDate(start.getDate()+6);
              end.setHours(23, 59, 59, 999);
              //if the event is happening this week, we display it
              if (currentEvent.startDate<end && currentEvent.startDate>start){
                //if the event is not already in the list and this is the first filter to check (j==0)
                if (!alreadyInList(filtered,currentEvent)&&j==0){
                  filtered.addEvent(currentEvent);
                }
              }
              else{
                //if the event does not pass the filter, we remove it from the filtered list, should it be in there becasue it respected a previous filter
                filtered.data = filtered.data.filter((item) => item.id != currentEvent.id)
              }
            } 
            
            else if (currentFilter === "next week") {
              //getting the day of the next monday
              let start = new Date();
              //if today is a monday 
              if (start.getDay()==1){
                start.setDate(start.getDate()+6)
                start.setHours(0,0,0,0);
              }
              else{
                start.setDate(start.getDate() + ((7 - start.getDay()) % 7 + 1) % 7);
                start.setHours(0,0,0,0);
              }
              //getting next sunday (of the follwing week)
              let end = new Date(start);
              end.setDate(start.getDate()+6);
              end.setHours(23, 59, 59, 999);

              //adding the event to the list
              if (currentEvent.startDate<end && currentEvent.startDate>start){
                //if the event is not already in the list and this is the first filter to check (j==0)
                if (!alreadyInList(filtered,currentEvent)&&j==0){
                  filtered.addEvent(currentEvent);
                }
              }
              else{
                //if the event does not pass the filter, we remove it from the filtered list, should it be in there becasue it respected a previous filter
                filtered.data = filtered.data.filter((item) => item.id != currentEvent.id)
              }
            } 
            else if (currentFilter === "this month") {

              if (todayMonth==currentEvent.startDate.getMonth()){
                //if the event is not already in the list and this is the first filter to check (j==0)
                if(!alreadyInList(filtered,currentEvent) &&j==0){
                  filtered.addEvent(currentEvent);
                }
              }
              else{
                //if the event does not pass the filter, we remove it from the filtered list, should it be in there becasue it respected a previous filter
                filtered.data = filtered.data.filter((item) => item.id != currentEvent.id)
              }
            } 
            else if (currentFilter === "in-person") {
              //checking if the event is in-person
              if (currentEvent.virtualOrInPerson.trim().toLowerCase()==currentFilter){
                //if the event is not already in the list and this is the first filter to check (j==0)
                if(!alreadyInList(filtered,currentEvent) && j==0){
                  filtered.addEvent(currentEvent);
                }
              } else {
                //if the event does not pass the filter, we remove it from the filtered list, should it be in there becasue it respected a previous filter
                filtered.data = filtered.data.filter((item) => item.id != currentEvent.id)
              }
            } 
            else if (currentFilter === "virtual") {
              //checking if the event is virtual
              if (currentEvent.virtualOrInPerson.trim().toLowerCase()==currentFilter){
                //if the event is not already in the list and this is the first filter to check (j==0)
                if(!alreadyInList(filtered,currentEvent) && j==0 ){
                  filtered.addEvent(currentEvent);
                }
              } else {
                //if the event does not pass the filter, we remove it from the filtered list, should it be in there becasue it respected a previous filter
                filtered.data = filtered.data.filter((item) => item.id != currentEvent.id)
              }
            }
            else {
              // checks if an event contains the filter applied
              if (currentEvent.pillar === undefined) {
                //we remove from the list events that do not have any pillars 
                filtered.data = filtered.data.filter((item) => item.id != currentEvent.id);
              } else {
                //here we are retriveing the pillar list of the current event 
                const pillarList = currentEvent.pillar.split(",");
                //formating the pillrs of the event to lowercase 
                for (let i = 0; i < pillarList.length; i++) {
                  pillarList[i] = pillarList[i].trim().toLowerCase();
                }
                //if the event contains the pillars, we add it to the list
                if (pillarList.indexOf(currentFilter) >= 0) {
                  if(!alreadyInList(filtered,currentEvent) && j==0 ){
                    filtered.addEvent(currentEvent);
                  }
                } else {
                  //if the event does not pass the filter, we remove it from the filtered list, should it be in there becasue it respected a previous filter
                  filtered.data = filtered.data.filter((item) => item.id != currentEvent.id);
                }
              }
            }
          }
        }
      });
      // sets the new section list data to display
      setSectionListData([filtered]);
    }
  };

  // Function is called when the text is changing on the <Input> tag
  // Search if the text typed by the user is included in any of the event title
  const searchEvent = (event: string) => {
    const filteredEvents = new SectionListData("");
    const query = event.toLowerCase();
    fixedList.map((item) => {
      for (let i = 0; i < item.data.length; i++) {
        //depending on the language, we are looking for either the french or the english title match
        const eventName = (language==='english' ? item.data[i].nameEN.toLowerCase() : item.data[i].nameFR.toLowerCase());
        if (eventName.includes(query)) {
          filteredEvents.addEvent(item.data[i]);
        }
      }
    });
    if (query === "") {
      setSectionListData(fixedList);
    } else {
      setSectionListData([filteredEvents]);
    }
  };

  // initialise states for filter buttons on main page
  const [pressed1, setPressed1] = useState(true);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  const [pressed4, setPressed4] = useState(false);

  return (
    <View style={{ height: '100%', backgroundColor: theme==='light' ? '#F9F9F9' : '#171717'}}  >
      <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container} edges={['top']}>
        <View style={theme === 'light' ? styles.titleContainer : darkModeStyles.titleContainer}>
          <View style={theme === 'light' ? styles.colLeft : darkModeStyles.colLeft}>
            <Text style={theme === 'light' ? styles.headerTitle : darkModeStyles.headerTitle}>{dictionnary.events.Events}</Text>
          </View>
          <View style={theme === 'light' ? styles.colRight : darkModeStyles.colRight}>
            <Text style={theme === 'light' ? styles.filterIcon : darkModeStyles.filterIcon} onPress={() => navigation.navigate('FilterSearchPage', filter)}>{dictionnary.events.Filters}</Text>
          </View>
        </View>
        <View style={{backgroundColor: theme==='light' ? '#F9F9F9' : '#171717'}}>
        <View style={theme === 'light' ? styles.searchContainer : darkModeStyles.searchContainer}>
          <View style={theme === 'light' ? styles.searchBarContainer : darkModeStyles.searchBarContainer}>
            <View style={theme === 'light' ? styles.searchBar : darkModeStyles.searchBar}>
              <View style={theme === 'light' ? styles.left : darkModeStyles.left}>
                <Input
                    style={theme === 'light' ? styles.placeholderText : darkModeStyles.placeholderText}
                    placeholder = {dictionnary.events.SearchEvents}
                    placeholderTextColor={theme === 'light' ? '#636363' : '#b2b7bf'}
                    onChangeText={(text) => searchEvent(text)}
                />
              </View>
              <View style={theme === 'light' ? styles.right : darkModeStyles.right}>
                <Icon name="ios-search" style={{ fontSize: RFPercentage(4.5), color: theme === 'light' ? '#636363' : '#b2b7bf'}}/>
              </View>
              </View>
          </View>
        </View>
        <View style={theme === 'light' ? styles.filterContainer : darkModeStyles.filterContainer}>  
            <TouchableOpacity style={pressed1 ? styles.itemContainerPressed : theme === 'light' ? 
            styles.itemContainer : darkModeStyles.itemContainer}
              onPress={() => changeState("pressed1")}>
                <Text style={pressed1 ? styles.itemNamePressed : theme === 'light' ? styles.itemName 
                : darkModeStyles.itemName}>{dictionnary.events.All}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={pressed2 ? styles.itemContainerPressed : theme === 'light' ? 
            styles.itemContainer : darkModeStyles.itemContainer}
              onPress={() => changeState("pressed2")}>
                <Text style={pressed2 ? styles.itemNamePressed : theme === 'light' ? styles.itemName 
                : darkModeStyles.itemName}>{dictionnary.events.ThisMonth}</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={pressed3 ? styles.itemContainerPressed : theme === 'light' ? 
            styles.itemContainer : darkModeStyles.itemContainer}
              onPress={() => changeState("pressed3")}>
                <Text style={pressed3 ? styles.itemNamePressed : theme === 'light' ? styles.itemName 
                : darkModeStyles.itemName}>{dictionnary.events.Virtual}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={pressed4 ? styles.itemContainerPressed : theme === 'light' ? 
            styles.itemContainer : darkModeStyles.itemContainer}
              onPress={() => changeState("pressed4")}>
                <Text style={pressed4 ? styles.itemNamePressed : theme === 'light' ? styles.itemName 
                : darkModeStyles.itemName}>{dictionnary.events.InPerson}</Text>
            </TouchableOpacity>
        </View>
      </View>

      {displayLoadingIconEvents ? <DotIndicator color='#EA7754' size={10}/> :
        <>
        {eventsFailedLoading ? 
          
          <View style={theme === 'light' ? styles.noResult : darkModeStyles.noResult}>
            <Image style={styles.noResultImage} source={require('../../../assets/images/wellnessCharacter/bear.png')} resizeMode='contain' />
            <Text style={styles.noResultText2}>{dictionnary.home.EventsFailed}</Text>
          </View> : 
          <>
          {sectionListData.length == 0 ?
            <View style={theme === 'light' ? styles.noResult : darkModeStyles.noResult}>
              <Image style={styles.noResultImage} source={require('../../../assets/images/wellnessCharacter/bear.png')} resizeMode='contain' />
              <Text style={styles.noResultText2}>{dictionnary.home.EventsEmpty}</Text>
            </View> :

            <SectionList
              style={{ backgroundColor: theme === 'light' ? '#F9F9F9' : '#171717' }}
              sections={sectionListData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (<ListItem                  
                item={item}
                onPress={() => navigation.navigate('EventDetails', { event: convertToJSON(item) })}
                width="90%"
                margin="2%" />
              )}
              refreshing={refreshing}
              onRefresh={refreshList} />
          }
          </>
        }
        </>
      }
      </SafeAreaView>
    </View>
  );
}