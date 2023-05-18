import { StyleSheet, Platform } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#171717',
  },
  cardSession: {
    textAlign: 'left',
    // alignContent: 'flex-start',
    alignSelf: 'stretch',
    // justifyContent: 'space-around',
    backgroundColor: '#0d0d0d',
    // height: 155,
    borderRadius: 10,
    borderColor: '#545454'
  },
  cardEmerg: {
    marginTop: 30,
    textAlign: 'left',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    backgroundColor: Colors.blueSecondary,
    borderRadius: 10,
    borderColor: '#545454'
  },

  titleEcall: {
    color: 'black',
    fontSize: 20,
    backgroundColor: Colors.blueSecondary,
    fontFamily: 'BarlowCondensed_600SemiBold'
  },

  element: {
    // padding: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageContainer: {
    // flex:1,
    width: '25%',
    backgroundColor: '#0d0d0d',
    alignSelf: 'center'
  },
  contentContainer: {
    paddingLeft: 12,
    width: '65%',
    // flex:2,
    backgroundColor: '#0d0d0d',
  },
  iconContainer: {
    width: '10%',
    flex:1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    fontSize: 20,
    paddingBottom: 8,
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: 'white',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    width: '90%'
  }
});

export default darkModeStyles;
