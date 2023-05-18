/* eslint-disable prettier/prettier */
import * as React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { FAB } from 'react-native-elements';
import { connect } from "react-redux";
import { useEffect, useState } from 'react';

import { TouchableOpacity, SafeAreaView, FlatList, Dimensions, Alert } from 'react-native';
import {Appearance} from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import styles from './styles';

import { JournalContext } from '../../context';
import SimpleLineIcons from '@expo/vector-icons/build/SimpleLineIcons';
import { Ionicons } from '@expo/vector-icons';
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Portal, Modal, Provider } from 'react-native-paper';
import { Input, Icon } from 'native-base';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';
import AuthActions from '../../store/auth/actions';

interface JournalProps {
  auth: any;
}

const mapStateToProps = (state: JournalProps) => ({
  auth: state.auth,
});

const Journal: React.FC<JournalProps> = (props: JournalProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
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
    return () => {}
  }, [navigation]);

  const [refreshing] = useState(false);


  // Use entries to access user's current journal entries. setEntries() sets user's entries upon navigating to this page
  const [entries, setEntries] = React.useState<Array<{ [key: string]: any }>>([]);
  
  // Keep a copy of the array with all the entries to be able to loop through everything when searching/filtering
  const [entriesFixed, setEntriesFixed] = React.useState<Array<{ [key: string]: any }>>([]);
  
  // Gets all of user's entries at the beginning and stores in array called entries init above. No need to touch this
  const refreshList = () => {
    if (props.auth.user._id) {
      JournalContext.getAllUserEntry(props.auth.user._id).then((returned) => {
        setEntries(returned.entryList.reverse());
        setEntriesFixed(returned.entryList);
        setStartDate("");
        setEndDate("");
      }
      ).catch(() => {
        setEntries([]);
      })
    }
  }

  const _listEmptyComponent = () => {
    return (
      <Text style={theme === 'light' ? styles.JournalStatus : darkModeStyles.JournalStatus}>{dictionnary.journal.Empty}</Text>
    )
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    hideModal();
    refreshList();
    setQuery("");
  }, [isFocused])
  useEffect(() => {
    refreshList();
    hideModal();
    setQuery("");
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', (e) => {
      refreshList();
    });
    hideModal();
    setQuery("");
    return unsubscribe;
  }, [navigation]);

  // transform number to corresponding month
  const getMonth = (date: Date): String => {
    var month = '';
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
    return month.toString();
  }

  // creates string format of the journal entry
  const getJournalDate = (journaDate: string) => {
    if (LanguageActions.getLanguage()==='french'){
      //if the language is french
      //if the language is english
      const entryDate = new Date(journaDate);
      const date = entryDate.getDate();
      const month = getMonth(entryDate);
      const year = entryDate.getFullYear();
      return date +" " + month +" "+ year;
    }
    else{

      //if the language is english
      const entryDate = new Date(journaDate);
      const date = entryDate.getDate();
      const month = getMonth(entryDate);
      const year = entryDate.getFullYear();
      return month +" "+date+ " , "+ year;
    }
  }

  const getTitle = (title:string) => {
    switch(title){
      case 'Feeling Happy':
        return dictionnary.happy.Happy;
      case 'Feeling Angry':
        return dictionnary.angry.Angry;
      case 'Feeling Lonely':
        return dictionnary.lonely.Lonely;
      case 'Feeling Grateful':
        return dictionnary.gratitude.Grateful;
      case 'Feeling Stressed':
        return dictionnary.anxiety.Stressed;
      case 'Feeling Insecure':
        return dictionnary.insecure.Insecure;
    }
    return title;
  }
    

  //The components to book the different services 
  const items = [
    { key: 'a', name: dictionnary.gratitude.Grateful, code: 'Reflect on what you are grateful for.', nav: 'Gratitude' },
    { key: 'b', name: dictionnary.anxiety.Stressed, code: 'Work through your stress and write down your thoughts', nav: 'Anxiety' },
    { key: 'c', name: dictionnary.lonely.Lonely, code: 'Feeling Lonely', nav: 'Lonely' },
    { key: 'd', name: dictionnary.insecure.Insecure, code: 'Feeling Lonely', nav: 'Insecure' },
    { key: 'e', name: dictionnary.happy.Happy, code: 'Feeling Happy', nav: 'Happy' },
    { key: 'f', name: dictionnary.angry.Angry, code: 'Feeling Angry', nav: 'Angry' },
  ];

  const handlePress = (item: any) => {
    // User chooses a prompt
    if (item.title == 'Feeling Grateful') {
      navigation.navigate('LoadPrompt', { entry: item, prompt: dictionnary.gratitude.GratefulPrompt })
    } else if (item.title == 'Feeling Stressed') {
      navigation.navigate('LoadPrompt', { entry: item, prompt: dictionnary.anxiety.StressedPrompt })
    } else if (item.title == 'Feeling Lonely') {
      navigation.navigate('LoadPrompt', { entry: item, prompt: dictionnary.lonely.LonelyPrompt })
    } else if (item.title == 'Feeling Insecure') {
      navigation.navigate('LoadPrompt', { entry: item, prompt: dictionnary.insecure.InsecurePrompt })
    } else if (item.title == 'Feeling Happy') {
      navigation.navigate('LoadPrompt', { entry: item, prompt: dictionnary.happy.HappyPrompt })
    } else if (item.title == 'Feeling Angry') {
      navigation.navigate('LoadPrompt', { entry: item, prompt: dictionnary.angry.AngryPrompt })
    } 
    else {
      navigation.navigate('LoadEntry', { entry: item })
    }
  };

  // Modal for prompts
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Calendar for choosing start date
  const [showStart, setShowStart] = useState(false);
  const showCalendarStart = () => setShowStart(true);
  const hideCalendarStart = () => setShowStart(false);

  // Calendar for choosing endDate
  const [showEnd, setShowEnd] = useState(false);
  const showCalendarEnd = () => setShowEnd(true);
  const hideCalendarEnd = () => setShowEnd(false);

  // Search by title and entry
  const searchJournal = (event: string) => {
    const filteredEntries = Array<{ [key: string]: any }>()
    const query = event.toLowerCase();
    setQuery(query)
  
    entriesFixed.map((item) => {
      const entryTitle = item.title.toLowerCase();
      const entryContent = item.entry.toLowerCase();
      if(entryTitle.includes(query) || entryContent.includes(query)) {
        filteredEntries.push(item)
      }   
    })
    
    if (query === "") {
      refreshList()
    } else {
      setEntries(filteredEntries)
    }
  };

  // keeps track of the start and end date of the filters
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // mininum and maximum date to choose from calendar
  const minDate = new Date(-12,0,1);
  const maxDate = new Date();

  // scaling of notebook icon
  const dim = Dimensions.get('window').width*0.12

  const [query, setQuery] = useState(""); 

    // creates string format of the journal entry
  const formatDate = (journaDate: string) => {
    const date = journaDate.split(" ");
    return date[1] + " " + parseInt(date[2],10) + ", " + date[3];
  }

  // filters entries according to dates selected user
  const applyDates = () => {
    const filteredEntries = Array<{ [key: string]: any }>()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (startDate==="" && endDate==="") {
      return
    }

    entriesFixed.map((item) => {
      const entryDate = new Date(item.date);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      const date = entryDate.getDate();
      const month = entryDate.getMonth() + 1;
      const year = entryDate.getFullYear();

      if (startDate!=="" && endDate===""){
        const startOne = new Date(startDate)
        const startString = startOne.toISOString().split("T")[0].split("-");
        const dateStart = parseInt(startString[2],10)
        const monthStart = parseInt(startString[1],10);
        const yearStart = parseInt(startString[0],10);
        if (dateStart === date && monthStart === month && yearStart === year) {
            filteredEntries.push(item)
        }
      } 
      else if (startDate==="" && endDate!=="") {
        const endOne = new Date(endDate)
        const endString = endOne.toISOString().split("T")[0].split("-");
        const dateEnd = parseInt(endString[2],10)
        const monthEnd = parseInt(endString[1],10);
        const yearEnd = parseInt(endString[0],10);
        if (dateEnd === date && monthEnd === month && yearEnd === year) {
          filteredEntries.push(item)
        }
      }
      else {
        if (start <= entryDate && entryDate <= end) {
          filteredEntries.push(item)
        }
      }
    })
    setEntries(filteredEntries)
  }

  // Reset all the filters
  const resetDates = () => {
    setStartDate("");
    setEndDate("");
    setEntries(entriesFixed)
  }

  return (
    <Provider>
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
      <View style={theme === 'light' ? styles.titleContainer : darkModeStyles.titleContainer}>
        <Ionicons onPress={() => navigation.goBack()} name="chevron-back-outline" color={theme === 'light' ? 
        '#2C2F40' : 'white'} style={styles.back} />
        <View style={theme === 'light' ? styles.colLeft : darkModeStyles.colLeft}>
        <Text style={theme === 'light' ? styles.title : darkModeStyles.title}>{dictionnary.journal.MyJournal}</Text>
        </View>
      </View>
      <View style={[styles.promptList, {backgroundColor: theme === 'light' ? '#f9f9f9' : '#171717'}]}>
      <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal} >
            <View style={{backgroundColor: '#104291', borderRadius: 7}}>
            <FlatList 
              style={{borderRadius: 15}}
              data={items}
              scrollEnabled={false}
              renderItem={({ item }) => (
                  <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.nav)}>
                      <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
              )}      
            /> 
            </View>
          </Modal>
        </Portal>
        <TouchableOpacity  style={styles.button} onPress={showModal} activeOpacity={0.7}>
          <Text style={styles.buttonText}>{dictionnary.journal.Feeling} </Text>
              <Ionicons name={visible ? 'caret-up' : 'caret-down-outline'} color='white' style={{fontSize: RFPercentage(2), paddingTop: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={applyDates}>
          <Text style={[styles.filtersButton, {marginHorizontal: '6%'}]}>{dictionnary.journal.Apply}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetDates}>
            <Text style={[styles.filtersButton, {marginHorizontal: '0%'}]}>{dictionnary.journal.Reset}</Text>
          </TouchableOpacity>
      </View>

      <Portal>
        <Modal visible={showStart} onDismiss={hideCalendarStart}>
        <View style={{marginHorizontal: '2%', backgroundColor: theme === 'light' ? '#f9f9f9' : '#242424', borderRadius: 15}}>
         <CalendarPicker 
          minDate={minDate}
          maxDate={endDate === "" ? maxDate : endDate}
          todayBackgroundColor="#2a4166"
          selectedDayColor="#104291"
          selectedDayTextColor="#FFFFFF"
          disabledDatesTextStyle={[styles.calendarText, {color: '#a8a8a8'}]}
          textStyle={[styles.calendarText, {color: theme === 'light' ? 'black' : 'white'}]}
          onDateChange={(date) => setStartDate(date)}
         />
        </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal visible={showEnd} onDismiss={hideCalendarEnd}>
        <View style={{marginHorizontal: '2%', backgroundColor: theme === 'light' ? '#f9f9f9' : '#242424', borderRadius: 15}}>
         <CalendarPicker 
          minDate={startDate}
          maxDate={maxDate}
          todayBackgroundColor="#2a4166"
          selectedDayColor="#104291"
          selectedDayTextColor="#FFFFFF"
          disabledDatesTextStyle={[styles.calendarText, {color: '#a8a8a8'}]}
          textStyle={[styles.calendarText, {color: theme === 'light' ? 'black' : 'white'}]}
          onDateChange={(date) => setEndDate(date)}
         />
        </View>
        </Modal>
      </Portal>
      <View style={[styles.datesContainer, {backgroundColor: theme === 'light' ? '#f9f9f9':'#171717'}]}>
      <Ionicons name='ios-calendar' style={[styles.iconCalendar, {color: theme === 'light' ? 'black' : 'white'}]} onPress={showCalendarStart}/>
      <TouchableOpacity onPress={showCalendarStart} style={{paddingHorizontal: '3%'}}>
      {startDate === "" ? 
          <Text style={[styles.filterText, {color: '#808080'}]}>{dictionnary.journal.StartDate}</Text> : 
          <Text style={styles.filterText}>{formatDate(startDate.toString())}</Text>}
      </TouchableOpacity>
      <Ionicons name='ios-calendar' style={[styles.iconCalendar, {color: theme === 'light' ? 'black' : 'white', marginLeft: '9%'}]} onPress={showCalendarEnd}/>
      <TouchableOpacity onPress={showCalendarEnd} style={{paddingHorizontal: '3%'}}>
      {endDate === "" ? 
          <Text style={[styles.filterText, {color: '#808080'}]}>{dictionnary.journal.EndDate}</Text> : 
          <Text style={styles.filterText}>{formatDate(endDate.toString())}</Text>}
      </TouchableOpacity>
      </View>

      <View style={[styles.searchBar, 
                    {backgroundColor: theme === 'light' ? '#eaeaea' : '#4a4c4f'}]}>
          <Input 
            style={theme === 'light' ? styles.placeholderText : darkModeStyles.placeholderText}
            placeholderTextColor={theme === 'light' ? '#636363' : '#b2b7bf'}
            placeholder={dictionnary.journal.Search}
            onChangeText={(text) => searchJournal(text)}
            value={query}
            />
            <Icon name="ios-search" style={{ fontSize: RFPercentage(4.5), color: theme === 'light' ? '#636363' : '#b2b7bf'}}/>
      </View>

      <View style={theme === 'light' ? styles.entryList : darkModeStyles.entryList}>
        <FlatList
          // code  for displaying the journal entries
          data={entries}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={_listEmptyComponent}
          persistentScrollbar={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.touchable} onPress={() => handlePress(item)} activeOpacity={0.5}>
              <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
                <View style={[styles.imageContainer, { width: dim, height: dim,
                  backgroundColor: item.title === 'Feeling Stressed' ? '#FF4A07' : item.title === 'Feeling Angry' || item.title === 'Feeling Lonely' || item.title === 'Feeling Insecure' ? '#FFAD03' :
                  item.title === 'Feeling Grateful' || item.title === 'Feeling Happy' ? '#228B05' : '#2C2F40',
                }]}>
                  <SimpleLineIcons name='notebook' 
                    style={[styles.imageStyle, 
                    {color: item.title === 'Feeling Angry' || item.title === 'Feeling Stressed' ||
                    item.title === 'Feeling Grateful' || item.title === 'Feeling Lonely' || item.title === 'Feeling Insecure' ||
                    item.title === 'Feeling Happy' ? 'black' : 'white'}]} />
                </View>
                <View style={styles.contentContainer}>
                  <View style={theme === 'light' ? styles.dateCont : darkModeStyles.dateCont}>
                    <Text style={theme === 'light' ? styles.date : darkModeStyles.date}>{getJournalDate(item.date)}</Text>
                  </View>
                  <View style={theme === 'light' ? styles.titleCont : darkModeStyles.titleCont}>
                    <Text style={theme === 'light' ? styles.titleElem : darkModeStyles.titleElem}>{getTitle(item.title)}</Text>
                  </View>
                  <View style={theme === 'light' ? styles.descCont : darkModeStyles.descCont}>
                    <Text numberOfLines={2} style={theme === 'light' ? styles.featureDesc : darkModeStyles.featureDesc}>{item.entry} </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          onRefresh={refreshList}
        />
        <FAB title="+" style={styles.buttonNewEntry} color="#104291" placement="right" onPress={() => navigation.navigate('JournalEntry')} />
      </View>
    </SafeAreaView>
    </Provider>
  );
}
export default connect(mapStateToProps)(Journal);