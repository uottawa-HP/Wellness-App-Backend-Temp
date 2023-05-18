import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  title: {
    // fontSize: 28,
    fontSize: RFPercentage(3.8),
    paddingLeft: '5%',
    paddingRight: '2%',
    fontFamily: 'barlow-condensed-bold',
    alignSelf: 'flex-start',
    color: 'white'
  },
  touchable: {
    marginTop: 15,
  },
  element: {
    // padding: 10,
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: '#171717',
  },
  imageContainer: {
    // flex:1,
    width: '25%',
    backgroundColor: '#171717',
  },
  contentContainer: {
    paddingLeft: 12,
    width: '65%',
    // flex:2,
    backgroundColor: '#171717',
    alignSelf: 'center'
  },
  iconContainer: {
    width: '10%',
    flex:1,
    backgroundColor: 'transparent',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  languageOptionContainer: {
    marginHorizontal:'4%',
    flexDirection: 'row',
    paddingVertical:20,
    backgroundColor: 'black',
    borderRadius:10,
    justifyContent:'center',
    marginVertical:10
  },
  languageOption: {
    marginLeft: '5%',
    marginRight: 14,
    fontFamily: 'BarlowCondensed_400Regular',
    fontSize: RFPercentage(2.6),
    color:'white',
    width:'75%',
    alignSelf:'center'
  
  },  
});

export default darkModeStyles;
