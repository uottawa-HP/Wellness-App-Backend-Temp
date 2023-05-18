import { StyleSheet, Platform } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: Colors.backgroundClr,
  },
  scrollContainer: {
    paddingTop: Platform.OS == 'ios' ? 35: '16%',
    paddingBottom: '5%',
    paddingHorizontal: '2%'
  },
  title: {
    // fontSize: 30,
    fontSize: RFPercentage(4.1),
    paddingHorizontal: '7%',
    fontFamily: 'BarlowCondensed_600SemiBold'
  },
  cardSession: {
    textAlign: 'left',
    // alignContent: 'flex-start',
    alignSelf: 'stretch',
    // justifyContent: 'space-around',
    backgroundColor: 'white',
    // height: 155,
    borderRadius: 10,
  },
  cardEmerg: {
    marginTop: 30,
    textAlign: 'left',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    backgroundColor: Colors.blueSecondary,
    borderRadius: 10
  },

  titleEcall: {
    color: 'black',
    // fontSize: 20,
    fontSize: RFPercentage(2.7),
    backgroundColor: Colors.blueSecondary,
    fontFamily: 'BarlowCondensed_600SemiBold'
  },

  element: {
    // padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 10,
  },
  imageContainer: {
    // flex:1,
    width: '25%',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingLeft: 12,
    width: '65%',
    // flex:2,
    backgroundColor: 'white',
  },
  iconContainer: {
    width: '10%',
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  ddIcon: {
    // flex:1,
    backgroundColor: Colors.blueSecondary,
    paddingRight:10,
    paddingLeft:8,
    justifyContent: 'center', 
    alignItems: 'center',
    // width: 10,
  },
  callText: {
    color: 'black',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    backgroundColor: Colors.blueSecondary,
    fontFamily: 'BarlowCondensed_400Regular',
    flexWrap: 'wrap'
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    fontSize: 20,
    paddingBottom: 8,
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: 'black',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    width: '90%'
  }
});

export default styles;
