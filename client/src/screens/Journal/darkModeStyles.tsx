/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#171717',
    height: '98%',
  },
  element: {
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: '#171717'
  },
  contentContainer: {
    width: '65%',
    backgroundColor: '#171717'
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_600SemiBold',
    fontSize: RFPercentage(2.8),
    paddingBottom: 8,
    color: 'white'
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.5),
    color: 'white'
  },
  entryList: {
    width: '100%',
    height: '77%',
    backgroundColor: '#171717',    
    paddingBottom: 108,
    paddingHorizontal: '6%',
  },
  titleCont: {
    overflow: 'hidden',
    backgroundColor: '#171717'
  },
  descCont: {
    overflow: 'hidden',
    backgroundColor: '#171717'
  },
  dateCont: {
    overflow: 'hidden',
    backgroundColor: '#171717'
  },
  date: {
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.6),
    paddingBottom:7,
    color: 'white'
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '8%',
    flexDirection: 'row',
    backgroundColor: '#171717'
  },
  title: {
    fontSize: RFPercentage(3.5),
    paddingLeft: '5%',
    paddingRight: '2%',
    fontFamily: 'BarlowCondensed_600SemiBold',
    alignSelf: 'flex-start',
    color: 'white',
    paddingTop: '0.5%'
  },
  JournalStatus:{
    fontSize: RFPercentage(2.5),
    justifyContent: 'center',
    fontFamily: 'BarlowCondensed_400Regular',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '30%',
    color: 'white',
  },
  colLeft: {
    backgroundColor: '#171717',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'stretch',
    alignSelf: 'stretch',
    paddingLeft: '1%',
},
  colRight: {
    backgroundColor: '#171717',
    flexDirection: 'column',
    width: '50%',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
 },
 searchBarContainer: {
   marginHorizontal: '5%',
   marginVertical: '2%',
   height: '10%'
 },
 placeholderText: {
  fontSize: RFPercentage(2.5),
  color: '#b2b7bf',
  letterSpacing: 1.2,
  fontFamily: 'BarlowCondensed_500Medium'
},
});

export default darkModeStyles;

