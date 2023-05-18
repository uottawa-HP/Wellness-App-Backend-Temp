import Colors from '../../constants/Colors';
import { Platform, StyleSheet } from 'react-native';

const darkModeStyles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#171717',
  },
  itemContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: '#171717',
  },
  guestContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.lightBackground,
  },
  titleContainer: {
    paddingTop: '8%',
    paddingLeft: '4%',
    flexDirection: 'row',
    backgroundColor:'#171717',
    alignItems: 'center'
  },
  contentContainer: {
    paddingLeft: 12,
    width: '70%',
    paddingTop: 5, 
    backgroundColor: '#171717',
  },

  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    fontSize: 19,
    color: 'white',
    paddingBottom: 10,
    paddingTop:15,
    marginTop: '2%',
    marginHorizontal: '3%',
    },

  backgroundColor: {
    backgroundColor: '#171717',
  },

  editAvatarContainer: {
    marginTop: '5%',
    marginHorizontal: '3%',
    borderRadius: 5,
    width: '94%',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#171717'
  },
  buttonEditAvatar: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'BarlowCondensed_500Medium',
    backgroundColor: Colors.bluePrimary,
    color: 'white',
  },
  input: {
    height: '7%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '94%',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:5,
    marginTop: '2%',
    marginHorizontal: '3%',
    backgroundColor: Colors.darkBackground,
    fontFamily: 'BarlowCondensed_500Medium',
    color:'white'
    
  },
  phoneInputContainer:{
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal: '3%',
    borderWidth: 1,
    borderRadius:5,
    backgroundColor: Colors.darkBackground,
    height: '7%',
    width: '94%',
  },
  phoneInputTextContainer:{
    height:'100%',
    width:'100%',
    paddingVertical:0,
    backgroundColor: Colors.darkBackground
  },
  phoneInputText: {
    color:'white',
    fontFamily: 'BarlowCondensed_500Medium',
  },
  phoneCountryCodeText:{
    color:'white',
    fontFamily: 'BarlowCondensed_500Medium',
  }
});

export default darkModeStyles;