import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH* 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 9 / 16);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundClr,
  },
  scrollContainer: {
    paddingTop: Platform.OS == 'ios' ? '10%' : '16%',
    paddingBottom: '5%',
  },
  guestContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.lightBackground,
  },
  topContainer: {
    backgroundColor: Colors.backgroundClr,
    flexDirection: 'row',
    width: '100%',
    paddingTop: Platform.OS == 'ios' ? 0 : '5%',
  },
  backgroundColor: {
    backgroundColor: Colors.backgroundClr,
  },
  userInfo: {
    flex: 2,
    paddingLeft: '7%',
    paddingTop: '1%',
  },
  additionalPaddingTop: {
    paddingTop: Platform.OS == 'ios' ? '1%' : '8%',
  },
  greeting: {
    // fontSize: 20,
    fontSize: RFPercentage(3),
    paddingTop: '2%',
    fontFamily: 'BarlowCondensed_400Regular',
    color: Colors.blueSecondary,
  },
  avatarContainer: {
    flex: 1 ,
    paddingLeft: '12%',
    // paddingTop: '1%'
  },
  avatarIcon: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginRight: '5%',
    overflow: 'hidden'
  },
  cardSession: {
    textAlign: 'left',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  element: {
    flexDirection: 'column',
    backgroundColor: 'white',
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
    width: '55%',
    backgroundColor: 'white',
    paddingLeft: '10%',
    // height: 50
  },
  contentContainer: {
    paddingLeft: '10%',
    paddingTop: '5%',
    width: '55%',
    backgroundColor: 'white',
    paddingBottom: 5
  },
  featureDesc: {
    fontFamily: 'BarlowCondensed_600SemiBold',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    width: '145%'
  },
  title: {
    //fontSize: 24,
    fontSize: RFPercentage(3.3),
    fontFamily: 'BarlowCondensed_600SemiBold',
  },
  subtitle: {
    // fontSize: 20,
    fontSize: RFPercentage(2.9),
    fontFamily: 'BarlowCondensed_500Medium',
    paddingHorizontal: '7%',
  },
  name: {
    color: '#E16226',
    fontSize: 26,
    fontFamily: 'BarlowCondensed_600SemiBold',
    paddingHorizontal: '7%',
    paddingBottom: '2%'
  },
  cardTitleText: {
    // fontSize: 20,
    fontSize: RFPercentage(2.9),
    fontFamily: 'BarlowCondensed_500Medium',
    //height: '100%',
    borderRadius: 16,
    marginLeft: 12,
    marginBottom: 8,
    flex: 1,
  },
  icon: {
    flex: 1,
    textAlign: 'right',
    paddingRight: '3%',
    color: Colors.blueSecondary,
    fontSize: RFPercentage(2.9)
  },
  cardText: {
    marginLeft: 12,
    marginRight: 14,
    marginBottom: 8,
    fontFamily: 'BarlowCondensed_400Regular',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    width: '85%',
  },
  eventCardText: {
    marginLeft: 12,
    marginRight: 14,
    marginVertical: 8,
    fontFamily: 'BarlowCondensed_400Regular',
    // fontSize: 18,
    fontSize: RFPercentage(2.4),
    width: '85%',
  },
  cardTip: {
    textAlign: 'left',
    alignContent: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
  dailyMissionText: {
    flex: 3,
  },
  dailyMissionIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  //used for the grid view in the dashboard 
  gridView: {
    marginTop: 15,
    marginHorizontal: '4%',
    flex: 1,  
  },
  itemContainer: {
    justifyContent: 'space-around',
    borderRadius: 25,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    
    color: '#fff',
    fontWeight: '600',
  },
  itemImage: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
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

  noResult : {
    backgroundColor: '#F9F9F9',
   
  },
  noResultText1: {
      fontFamily: 'BarlowCondensed_600SemiBold',
      textAlign: 'center',
      //fontSize: 20,
      fontSize: RFPercentage(2.6),
      color: '#202319'
  },
  noResultText2: {
      fontFamily: 'BarlowCondensed_400Regular',
      textAlign: 'center',
      //fontSize: 20,
      fontSize: RFPercentage(2.6),
      color: '#808080',
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

  //used for the pop up window 
  modal: {
    margin: 10,
    backgroundColor: "#D4F0F0",
    borderRadius: 30,
    paddingTop:10,
    padding: 0,
    alignItems: "center",
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },

  modalWebView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
      marginTop:15,
      marginBottom:15,
      width: 200,
      height: 200,
  
  },
  modalImageCircle: {
    marginTop:15,
    marginBottom:15,
    width: 200,
    height: 200,
    borderRadius:240,

},
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalRewardText: {
    marginBottom: 15,
    paddingBottom:10,
    textAlign: "center",
    fontSize: 21,
    fontWeight: '700',
    paddingHorizontal: '7%',
    color:"green"
  },
  modalExplanationText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 19,
    fontWeight: '600',
    paddingHorizontal: '7%',
    
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
    backgroundColor: Colors.backgroundClr,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statusContainer: {
    backgroundColor: Colors.backgroundClr,
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '1%'
  },
  pointsContainer: {
    backgroundColor: Colors.backgroundOrange,
    marginLeft: '5%',
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
    // paddingVertical: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  streak: {
    color: Colors.orangePrimary,
    fontFamily: 'BarlowCondensed_500Medium',
    // fontSize: 18,
    fontSize: RFPercentage(2.4),
    alignSelf: 'center'
  },
  badgeContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    marginLeft: '2%',
    marginTop: '7%',
    alignContent: 'center',
    alignSelf: 'center'
  },
  badge: {
    height: 35,
    width: 45,
    // height: '60%',
    // width: '60%',
    alignSelf: 'center',
    flex: 1
  },
  streakImage: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 2
  },
  events: {
    backgroundColor: '#F9F9F9', 
    marginTop: '4%', 
    marginBottom: 25
  },
  doneBtn: {
    fontFamily: 'BarlowCondensed_400Regular',
    color: 'black',
    // fontSize: 18
    fontSize: RFPercentage(2.7)
  },


  
  //Carousel for the Wellness news 


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
    //fontSize: 24,
    fontSize: RFPercentage(3),
    // alignSelf:'left',
    marginBottom:10,
    fontFamily:'BarlowCondensed_600SemiBold'
  },
  itemLabelTextCarousel: {
    color: 'white',
    //fontSize: 18,
    fontSize: RFPercentage(2.5),
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
    backgroundColor: 'black',
  }
});

export default styles;

