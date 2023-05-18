import Colors from '../../constants/Colors';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.backgroundClr,
  },
  itemContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: Colors.backgroundClr,
  },
  titleContainer: {
    paddingTop: '8%',
    paddingLeft: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundClr,
  },
  title: {
    fontFamily: 'BarlowCondensed_600SemiBold',
    paddingLeft: '5%',
    paddingRight: '2%',
    alignSelf: 'flex-start'
  },
  back: {
    paddingTop: '1%',
    alignSelf: 'center',
    fontSize: RFPercentage(3.8),
  },
  guestContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.lightBackground,
  },
  contentContainer: {
    paddingLeft: 12,
    width: '70%',
    paddingTop: 5, 
    backgroundColor: Colors.backgroundClr,
  },
  titleElem: {
    fontFamily: 'BarlowCondensed_500Medium',
    paddingBottom: 10,
    paddingTop:15,
    color: Colors.darkBlue,
    marginTop: '2%',
    marginHorizontal: '3%',
  },
  confirmContainer: {
    marginTop: '5%',
    marginHorizontal: '3%',
    borderRadius: 5,
    width: '94%',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: '15%'
  },
  buttonConfirm: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: '4%',
    fontFamily: 'BarlowCondensed_500Medium',
    backgroundColor: Colors.bluePrimary,
    color: 'white',
  },
  editAvatarContainer: {
    marginTop: '5%',
    marginHorizontal: '2%',
    borderRadius: 5,
    width: '94%',
    alignItems: 'center',
    overflow: 'hidden',
    textAlignVertical:'center',
  },
  buttonEditAvatar: {
    width: '100%',
    textAlign: 'center',
    textAlignVertical:'center',
    justifyContent: 'center',
    paddingVertical: '4%',
    fontFamily: 'BarlowCondensed_500Medium',
    backgroundColor: Colors.bluePrimary,
    color: 'white',
  },
  backgroundColor: {
    backgroundColor: Colors.backgroundClr,
  },
  avatarContainer: {
    flex: 1,
    paddingTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:'40%',
    marginTop: '3%',
    width:'20%',
    height:'20%'
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
    backgroundColor: Colors.backgroundClr,
    fontFamily: 'BarlowCondensed_500Medium',
  },
  phoneInputContainer:{
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal: '3%',
    borderWidth: 1,
    borderRadius:5,
    backgroundColor: Colors.backgroundClr,
    height: '7%',
    width: '94%',
  },
  phoneInputTextContainer:{
    height:'100%',
    width:'100%',
    paddingVertical:0,
  },
  phoneInputText: {
    color:'black',
    fontFamily: 'BarlowCondensed_500Medium',
  },
  phoneCountryCodeText:{
    color:'black',
    fontFamily: 'BarlowCondensed_500Medium',
  }
});

export default styles;