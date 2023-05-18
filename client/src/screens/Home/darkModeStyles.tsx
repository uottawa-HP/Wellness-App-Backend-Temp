import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH* 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 9 / 16);


const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  scrollContainer: {
    paddingTop: Platform.OS == 'ios' ? '10%' : '16%',
    paddingBottom: '5%',
  },
  guestContainer: {
    flexDirection: 'column',
    backgroundColor: '#171717',
  },
  topContainer: {
    backgroundColor: '#171717',
    flexDirection: 'row',
    width: '100%',
    paddingTop: Platform.OS == 'ios' ? 0 : '5%',
  },
  backgroundColor: {
    backgroundColor: '#171717',
  },
  userInfo: {
    flex: 2,
    paddingLeft: '7%',
    paddingTop: '2%',
  },
  avatarContainer: {
    flex: 1 ,
    paddingLeft: '12%',
  },
  element: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    marginVertical: '2%',
    borderRadius: 10,
    alignSelf: 'stretch',
    textAlign: 'left',
    paddingVertical: 22,
    shadowOffset:{  width: 0.3,  height: 0.3  },
    shadowOpacity: 0.05,
    elevation: 1,
  },
  imageContainer: {
    width: '25%',
    backgroundColor: '#000000',
    paddingLeft: '10%',
  },
  contentContainer: {
    paddingLeft: '12%',
    paddingTop: '5%',
    width: '55%',
    backgroundColor: '#000000',
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_600SemiBold',
    color: 'white',
    // fontSize: 18,
    fontSize: RFPercentage(2.4),
    width: '145%'
  },
  cardTip: {
    textAlign: 'left',
    alignContent: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginBottom: 30,
    borderRadius: 10,
    marginHorizontal: '4%',
    width: '92%',
    marginVertical: '2%',
    shadowOffset:{  width: 0.3,  height: 0.3  },
    shadowOpacity: 0.05,
    elevation: 1,
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    marginTop: '3%',
  },
  dailyMissionContainer: {
    textAlign: 'left',
    alignContent: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    borderRadius: 10,
    marginHorizontal: '4%',
    width: '92%',
    marginVertical: '2%',
    shadowOffset:{  width: 0.3,  height: 0.3  },
    shadowOpacity: 0.05,
    elevation: 1,
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    marginTop: '4%',
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statusContainer: {
    backgroundColor: '#171717',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '1%'
  },
  pointsContainer: {
    backgroundColor: '#ffc2b0',
    marginLeft: '5%',
    marginTop: '7%',
    paddingHorizontal: 16,
    paddingVertical: '2.5%',
    borderRadius: 5,
    alignSelf: 'center'
  },
  points : {
    color: '#e36540',
    fontFamily: 'BarlowCondensed_500Medium',
    //  fontSize: 18,
    fontSize: RFPercentage(2.7),
  },
  events: {
    backgroundColor: '#171717', 
    marginTop: '4%', 
    marginBottom: 25
  },
  streaksContainer: {
    backgroundColor: '#ffc2b0',
    marginLeft: 12,
    marginTop: '7%',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 7,
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
  carouselContainer: {
    marginTop: 30,
  },
  itemContainerCarousel: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    // paddingHorizontal:20,
    marginLeft:'5.5%',
    backgroundColor:'transparent' 
  },
  itemLabelTitleCarousel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    // alignSelf:'left',
    marginBottom:10,
    fontFamily:'BarlowCondensed_600SemiBold'
  },
  itemLabelTextCarousel: {
    color: 'white',
    fontSize: 18,
    fontFamily:'BarlowCondensed_500Medium',
    marginHorizontal:20
  },
  backgroundCarousel: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius:20,
    paddingVertical:20,
  },
  paginationActiveDotCarousel:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.blueSecondary,
  },
  paginationInactiveDotCarousel:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  noResult : {
    backgroundColor: '#171717',
    marginVertical: '10%',
    marginHorizontal: '25%',
  },
  noResultText1: {
      fontFamily: 'BarlowCondensed_600SemiBold',
      textAlign: 'center',
      //fontSize: 20,
      color: 'white',
      fontSize: RFPercentage(2.6),
  },
  noResultText2: {
    fontFamily: 'BarlowCondensed_400Regular',
    textAlign: 'center',
    //fontSize: 20,
    fontSize: RFPercentage(2.6),
    color: 'white',
    marginTop: '5%',
    marginBottom: '5%',
  },
  noResultImage: {
    marginTop:'3%',
    marginBottom:'2%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius:20,
    height:120,
    width:120,
  },
  doneBtn: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: 'white',
    // fontSize: 18
    fontSize: RFPercentage(2.7)
  },
  button: {
    marginTop: 15,
    width: 169,
    height: 40,
    borderRadius: 16,
    fontSize: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    marginTop: 15,
    width: 169,
    height: '7%',
    borderRadius: 16,
    fontSize: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBackground,
  },
});

export default darkModeStyles;

