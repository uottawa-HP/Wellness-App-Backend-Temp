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
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: Platform.OS == 'ios' ? '10%' : '15%',
    flexDirection: 'row',
    paddingBottom: '8%',
  },
  title: {
    // fontSize: 28,
    fontSize: RFPercentage(3.8),
    paddingLeft: '5%',
    paddingRight: '2%',
    fontFamily: 'barlow-condensed-bold',
    alignSelf: 'flex-start'
  },
  back: {
    paddingTop: '1%',
    fontSize: RFPercentage(3.8)
  },
  touchable: {
    // backgroundColor: 'blue'
    marginTop: 5,
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
  languageOptionContainer: {
    marginHorizontal:'4%',
    flexDirection: 'row',
    paddingVertical:20,
    backgroundColor: 'white',
    borderRadius:10,
    justifyContent:'center',
    marginVertical:10
  },
  languageOption: {
    marginLeft: '5%',
    marginRight: 14,
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.6),
    width:'75%',
    alignSelf:'center'
  
  },
  iconContainer: {
    width: '15%',
    
    alignItems: 'center', 
  },

});

export default styles;
