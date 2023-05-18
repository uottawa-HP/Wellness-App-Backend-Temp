import Colors from '../../constants/Colors';
import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: Colors.backgroundClr,
  },
  guestContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.lightBackground,
  },
  title: {
    // fontSize: 30,
    fontSize: RFPercentage(3.8),
    paddingTop: '1%',
    fontFamily: 'BarlowCondensed_600SemiBold'
  },
  greeting: {
    // fontSize: 24,
    fontSize: RFPercentage(3.3),
    paddingTop: '2%',
    fontFamily: 'BarlowCondensed_600SemiBold',
    color: Colors.lightGreyText,
  },
  element: {
    // padding: 10,
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: Colors.backgroundClr,
  },
  contentContainer: {
    paddingLeft: 12,
    width: '70%',
    paddingTop: 5, 
    backgroundColor: Colors.backgroundClr,
  },
  iconContainer: {
    width: '15%',
    backgroundColor: Colors.backgroundClr,
    paddingTop: 5,
    alignItems: 'center', 
  },
  iconSettingsContainer: {
    // width: '15%',
    backgroundColor: 'transparent',
    paddingTop: 5,
    alignItems: 'flex-end', 
    paddingRight:'10%'
  },
  leftIcon: {
    width: '15%',
    backgroundColor: Colors.backgroundClr,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotate90: {
    transform: [{ rotate: '180deg' }]
  },
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 2
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 19,
    fontSize: RFPercentage(2.7),
    paddingBottom: 5,
    color: Colors.darkBlue,
  },
  scrollContainer: {
    paddingTop: Platform.OS == 'ios' ? '10%' : '16%',
    paddingBottom: '5%',
    width:'100%',
    backgroundColor: Colors.backgroundClr,
    
  },
  optionsContainer: {
    paddingTop: Platform.OS == 'ios' ? '1%' : '2%' ,
    paddingBottom: '8%',
    width:'100%',
    paddingHorizontal: '2%'
  },
  topContainer: {
    backgroundColor: Colors.backgroundClr,
    flexDirection: 'row',
    width: '100%',
    paddingTop: Platform.OS == 'ios' ? 0 : '2%',
  },
  statusContainer: {
    backgroundColor: Colors.backgroundClr,
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '1%'
  },
  backgroundColor: {
    backgroundColor: Colors.backgroundClr,
  },
  userInfo: {
    flex: 2,
    paddingLeft: '9%',
  },
  avatarContainer: {
    flex: 1,
    // paddingTop: '1%',
    paddingLeft: '12%',
    marginRight: '2%'
  },
  avatarIcon: {
    // width: '15%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginRight: '1%',
    overflow: 'hidden',
    // marginTop: '1%'
  },
  pointsContainer: {
    backgroundColor: Colors.backgroundOrange,
    marginLeft: '7%',
    marginTop: '7%',
    paddingHorizontal: 16,
    paddingVertical: '2.5%',
    borderRadius: 5,
    alignSelf: 'center'
  },
  points : {
    color: Colors.orangePrimary,
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 18,
    fontSize: RFPercentage(2.7),
  },
  streaksContainer: {
    backgroundColor: Colors.backgroundOrange,
    marginLeft: 12,
    marginTop: '7%',
    paddingLeft: 14,
    paddingRight: 8,
    // paddingVertical: 7,
    borderRadius: 5,
    flexDirection: 'row'
  },
  streak : {
    color: Colors.orangePrimary,
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 18,
    fontSize: RFPercentage(2.4),
    alignSelf: 'center'
  },
  badgeContainer: {
    // width: '15%',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    marginLeft: '2%',
    marginTop: '7%',
    alignContent: 'center',
    alignSelf: 'center'
  },
  guestTopContainer: {
    backgroundColor: Colors.lightBackground,
    // flex: 1,
    height: '50%',
  },
  guestBottomContainer: {
    // backgroundColor: Colors.backgroundClr,
    backgroundColor: Colors.light.background,
    // flex: 1,
    height: '50%',
  },
  guestTitle: {
    // fontSize: 32,
    fontSize: RFPercentage(3),
    // paddingHorizontal: '8%',
    paddingTop: Platform.OS == 'ios' ? '1%': '3%',
    fontFamily: 'BarlowCondensed_600SemiBold',
    width: '70%',
    marginTop: '18%',
    marginLeft: '10%',
  },
  wellnessCharactersContainer: {
    backgroundColor: Colors.lightBackground,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  wellnessCharacters: {
    // marginTop: 3,
    height: '65%',
    width: '70%',
    overflow: 'visible'
  },

  text: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: Colors.greySubText,
    width: '65%',
    marginLeft: '15%',
    marginTop: '13%',
    fontSize: RFPercentage(2.5),
  },
  signupContainer: {
    marginTop: '8%',
    marginHorizontal: '10%',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    overflow: 'hidden'
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: '3%',
  },
  buttonLogin: {
    color: Colors.bluePrimary,
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 20,
    fontSize: RFPercentage(2.7),
  },
  buttonSignup: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    // fontSize: 20,
    fontSize: RFPercentage(2.7),
    fontFamily: 'BarlowCondensed_500Medium',
    backgroundColor: Colors.bluePrimary,
    color: 'white',
  },
});

export default styles;