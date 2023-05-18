/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#f9f9f9',
    height: '98%',
  },
  //used for the grid view in the dashboard 
  itemContainer: {
    marginLeft: 10,
    borderRadius: 25,
    padding: 20,
    height: '85%',
    width: 275,
    alignSelf:'center',
    paddingVertical: '10%',
    paddingHorizontal: '12%',
    marginRight:3,
  },
  touchable: {
    marginVertical: '0.5%',
  },
  element: {
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    marginTop: 15,
    borderRadius: 90,
    paddingHorizontal: '1%',
    marginRight: '10%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    borderRadius: 5,
    marginVertical: '34%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    
    fontSize: RFPercentage(2.5),
  },
  contentContainer: {
    width: '75%',
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_600SemiBold',
    fontSize: RFPercentage(2.8),
    paddingBottom: 8,
    color: '#2C2F40'
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.5),
    color: '#2C2F40'
  },
  JournalStatus:{
    fontSize: RFPercentage(2.5),
    justifyContent: 'center',
    fontFamily: 'BarlowCondensed_400Regular',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '30%',
    color: 'black',
  },
  itemName: {
    fontFamily: 'BarlowCondensed_500Medium',
    fontSize: RFPercentage(2.9),
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    color: '#fff',
  },
  promptList: {
    height: '10%',
    marginTop: 20,
    marginBottom: 5,
    alignItems: 'center',
    alignContent: 'center',
    // alignSelf: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row', 
    backgroundColor: '#f9f9f9',
    marginLeft: '8%'
  },
  entryList: {
    width: '100%',
    height: '77%',
    backgroundColor: '#f9f9f9',    
    paddingBottom: 109,
    paddingHorizontal: '6%',
  },
  divider: {
    marginTop: 10,
    height: 2,
    alignSelf: 'center',
    width: '90%',   
    borderBottomWidth: 1.25,
  },
  itemDesc: {
    marginTop: 5,
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.5),
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    color: '#fff',
  },
  buttonNewEntry: {
    backgroundColor: '#104291',
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    marginBottom: 155,
    marginRight: 28,
    shadowOffset:{  width: 1,  height: 1 },
    shadowOpacity: 1.25,
    elevation: 1,
  },
  titleCont: {
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  descCont: {
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  dateCont: {
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  date: {
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.6),
    paddingBottom:7,
    color: '#2C2F40'
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '8%',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  back: {
    paddingTop: '1%',
    fontSize: RFPercentage(3.5)
  },
  title: {
    fontSize: RFPercentage(3.5),
    paddingLeft: '5%',
    paddingRight: '2%',
    fontFamily: 'BarlowCondensed_600SemiBold',
    alignSelf: 'flex-start',
    color: '#2C2F40',
  },
  dailyGoal: {
    backgroundColor: '#104291',
    padding: 15,
    marginVertical: 5,
    width: '35%'
  },
  dailyGoalText: {
    fontFamily: 'BarlowCondensed_500Medium',
    fontSize: RFPercentage(2.5)
  },
  button: {
    backgroundColor: '#104291',
    padding: 15,
    flexDirection: 'row',
    width: '38%',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 5
},
buttonText: {
    flex: 1,
    fontFamily: 'BarlowCondensed_500Medium',
    color: 'white',
    fontSize: RFPercentage(2.7),
    textAlign: 'center'
},
icon: {
    fontSize: RFPercentage(2),
    color: 'white'
},
item: {
    backgroundColor: '#104291',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: '10%'
},
itemText: {
    color: 'white',
    fontFamily: 'BarlowCondensed_500Medium',
    fontSize: RFPercentage(2.7),
    paddingVertical: '5%',
    textAlign: 'center'
},
modal: {
    width: '50%',
    marginLeft: '25%',
    borderRadius: 8,
    shadowOpacity: 0.5,
    shadowColor: 'grey',
    shadowOffset:{  width: 1.5,  height: 1.5 },
},
colLeft: {
  width: '50%',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignContent: 'stretch',
  alignSelf: 'stretch',
  paddingLeft: '1%',
  backgroundColor: '#f9f9f9',
},
colRight: {
  flexDirection: 'column',
  width: '50%',
  alignContent: 'flex-start',
  alignSelf: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '#f9f9f9',
},
filterIcon: {
  paddingHorizontal: '4%',
  marginLeft: '30%',
  marginTop: '2%',
  fontFamily: 'BarlowCondensed_500Medium',
  fontSize: RFPercentage(3),
  textDecorationLine: 'underline',
  color: '#104291'
},
placeholderText: {
  fontSize: RFPercentage(2.5),
  color: '#636363',
  letterSpacing: 1.2,
  fontFamily: 'BarlowCondensed_500Medium'
},
searchBar: {
  flexDirection: 'row', 
  marginHorizontal: '8%',
  alignItems: 'center',
  borderRadius: 10,
  paddingHorizontal: '3%',
  paddingVertical: 1,
  marginVertical: 5
},
calendarText: {
  fontFamily: 'BarlowCondensed_400Regular',
  fontSize: RFPercentage(2.5)
},
filtersButton: {
  fontSize: RFPercentage(2.7), 
  fontFamily: 'BarlowCondensed_500Medium',
  textDecorationLine: 'underline',
  textAlign: 'center'
},
datesContainer: {
  flexDirection: 'row', 
  alignSelf: 'center',
  marginVertical: 5
},
iconCalendar: {
  fontSize: RFPercentage(2.5), 
  alignItems: 'center', 
  alignContent: 'center', 
  alignSelf: 'center'
},
filterText: {
  fontSize: RFPercentage(2.7), 
  fontFamily: 'BarlowCondensed_500Medium'
}
});

export default styles;

