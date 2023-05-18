import Colors from '../../constants/Colors';
import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#171717',
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
  element: {
    // padding: 10,
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: '#171717',
  },
  contentContainer: {
    paddingLeft: 12,
    width: '70%',
    paddingTop: 5, 
    backgroundColor: '#171717',
  },
  iconContainer: {
    width: '15%',
    backgroundColor: '#171717',
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
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotate90: {
    transform: [{ rotate: '180deg' }]
  },
  imageStyle: {
    marginTop: 3,
    height: 17,
    width: 27,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 5,
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 19,
    fontSize: RFPercentage(2.7),
    paddingBottom: 5,
    color: 'white',
  },
  scrollContainer: {
    paddingTop: Platform.OS == 'ios' ? '10%' : '16%',
    paddingBottom: '5%',
    width:'100%',
    backgroundColor: '#171717',
  },
  topContainer: {
    backgroundColor: '#171717',
    flexDirection: 'row',
    width: '100%',
    paddingTop: Platform.OS == 'ios' ? 0 : '2%',
  },
  statusContainer: {
    backgroundColor: '#171717',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '1%'
  },
  backgroundColor: {
    backgroundColor: '#171717',
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
    backgroundColor: '#ffc2b0',
    marginLeft: '7%',
    marginTop: '7%',
    paddingHorizontal: 16,
    paddingVertical: '2.5%',
    borderRadius: 5,
    alignSelf: 'center'
  },
  points : {
    color: '#e36540',
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 18,
    fontSize: RFPercentage(2.7),
  },
  streaksContainer: {
    backgroundColor: '#ffc2b0',
    marginLeft: 12,
    marginTop: '7%',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row'
  },
  streak : {
    color: '#e36540',
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
    marginLeft: 14,
    marginTop: '7%',
  },
  guestTopContainer: {
    backgroundColor: Colors.lightBackground,
    // flex: 1,
    height: '50%',
  },
  guestBottomContainer: {
    // backgroundColor: Colors.backgroundClr,
    backgroundColor: '#171717',
    // flex: 1,
    height: '50%',
  },
  guestTitle: {
    // fontSize: 32,
    fontSize: RFPercentage(4.3),
    // paddingHorizontal: '8%',
    paddingTop: Platform.OS == 'ios' ? '1%': '3%',
    fontFamily: 'BarlowCondensed_600SemiBold',
    width: '70%',
    marginTop: '18%',
    marginLeft: '10%',
    color: 'black'
  },
  text: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: "white",
    width: '65%',
    marginLeft: '15%',
    marginTop: '13%',
    fontSize: RFPercentage(2.5),
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: '3%',
    backgroundColor: '#171717'
  },
});

export default darkModeStyles;