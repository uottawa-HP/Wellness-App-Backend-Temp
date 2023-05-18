import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  itemContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.lightBackground,
  },
  container: {
    display: 'flex'
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
    marginBottom: 30,
  },
  title: {
    fontSize: RFPercentage(3.7),
    fontWeight: '900',
    paddingHorizontal: '3%',
    marginBottom: 5,
    color: 'black',
    fontFamily: 'barlow-condensed-bold',
  },
  questionTitle: {
    //fontSize: 25,
    fontSize: RFPercentage(3.7),
    fontWeight: '900',
    paddingHorizontal: '3%',
    marginBottom: 5,
    color: 'black',
    fontFamily: 'BarlowCondensed_500Medium'
  },
  subtitle: {
    // fontSize: 24,
    fontSize: RFPercentage(3.3),
    paddingHorizontal: '3%',
    marginBottom:5,
    color: '#ea7754',
    fontFamily: 'BarlowCondensed_500Medium',
  },
  body: {
    // fontSize: 18,
    fontSize: RFPercentage(2.6),
    paddingHorizontal: '7%',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  back: {
    paddingTop: '1%',
    alignSelf: 'center',
    fontSize: RFPercentage(3.8),
  },
  info: {
      paddingTop: '1%',
      fontSize: RFPercentage(3),
      alignSelf: 'center'
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  imageStyle: {
    borderRadius: 7,
    marginTop: 6,
    alignSelf: 'center'
  },
  //used for the pop up window 
  modal: {
    margin: 10,
    backgroundColor: Colors.backgroundClr,
    borderRadius: 20,  
    alignItems: "center",
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    marginHorizontal: '4%',
    marginTop:'3%',
    paddingBottom:'3%',
    paddingTop:"2%"
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
    // fontSize: 21,
    fontSize: RFPercentage(2.8),
    fontWeight: '700',
    paddingHorizontal: '7%',
    color:"green",
    fontFamily: 'BarlowCondensed_400Regular'
  },
  modalExplanationText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: RFPercentage(2.8),
    fontWeight: '600',
    paddingHorizontal: '7%',
    fontFamily: 'BarlowCondensed_500Medium',
    color: 'black'
  },
  buttonTrue: {
    marginTop: 15,
    width: 169,
    height: 40,
    borderRadius: 16,
    // fontSize: 10,
    fontSize: RFPercentage(2.5),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: "#97C1A9",
  },
  buttonFalse: {
    marginTop: 15,
    width: 169,
    height: 40,
    borderRadius: 16,
    fontSize: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: "#FF968A",
  },
  buttonSource: {
    marginTop: 15,
    marginBottom: 15,
    width: 169,
    height: 40,
    borderRadius: 16,
    // fontSize: 10,
    
    fontSize: RFPercentage(2.5),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bluePrimary,
  },
  buttonSourceText:{
    color: 'white', 
    fontFamily: 'BarlowCondensed_400Regular', 
    fontSize: RFPercentage(2.3)
  },
  rewardMessage: {
    marginTop:10,
    // fontSize: 21,
    fontSize: RFPercentage(2.7),
    fontWeight: '700',
    paddingHorizontal: '7%'
  },
  doorContainer:{
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 5, 
    backgroundColor: Colors.backgroundClr
  },
  doorImage:{
    marginTop:15,
    marginBottom:15, 
    width: 100,
    height: 100
  },

  fadingContainer: {
    padding: 20,
    backgroundColor: Colors.bluePrimary,
    borderRadius:20,
  },
  fadingText: {
    fontFamily: 'BarlowCondensed_400Regular', 
    fontSize: RFPercentage(2.3)

  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16,
    borderRadius:20,
    
  }
  
});

export default styles;
