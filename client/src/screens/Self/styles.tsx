import { Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: Colors.backgroundClr,
  },
  scrollContainer: {
    paddingTop: Platform.OS == 'ios' ? '10%' : '16%',
    paddingBottom: '5%',
    paddingHorizontal: '2%'
  },
  title: {
    // fontSize: 30,
    fontSize: RFPercentage(4.1),
    paddingHorizontal: '7%',
    fontFamily: 'BarlowCondensed_600SemiBold'
  },
  touchable: {
    // backgroundColor: 'blue'
    marginTop: 5,
  },
  element: {
    // padding: 10,
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: Colors.backgroundClr,
  },
  imageContainer: {
    // flex:1,
    width: '25%',
    backgroundColor: Colors.backgroundClr,
  },
  imageStyle: {
    borderRadius: 7,
    marginTop: 6,
    alignSelf: 'center'
  },
  contentContainer: {
    paddingLeft: 12,
    width: '65%',
    // flex:2,
    backgroundColor: Colors.backgroundClr,
    alignSelf: 'center'
  },
  iconContainer: {
    width: '10%',
    flex:1,
    backgroundColor: Colors.backgroundClr,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 20,
    fontSize: RFPercentage(3),
    paddingBottom: 8,
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: Colors.greySubText,
    // fontSize: 16,
    fontSize: RFPercentage(2.5),
  },
  cardEmerg: {
    marginTop: 20,
    textAlign: 'left',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    backgroundColor: Colors.blueSecondary,
    borderRadius: 10,
  },
  titleEcall: {
    color: 'black',
    // fontSize: 20,
    fontSize: RFPercentage(2.9),
    backgroundColor: Colors.blueSecondary,
    fontFamily: 'BarlowCondensed_600SemiBold'
  },
  callText: {
    color: 'black',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    backgroundColor: Colors.blueSecondary,
    fontFamily: 'BarlowCondensed_400Regular',
    flexWrap: 'wrap'
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

});

export default styles;
