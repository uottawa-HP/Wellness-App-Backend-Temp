import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor:'white',
  },
  buttonViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft : 2,
    marginRight :2,
},
  buttonContainer: {
    flex: 1,
    marginLeft : 5,
    marginRight :5,
},
  scrollContainer: {
    paddingTop: '0%',
    paddingBottom: '5%',
    width:'100%'
  },
  colLabel: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'stretch',
    alignSelf: 'stretch',
    paddingLeft: '5%',
    backgroundColor: 'transparent'
  },
  choiceInfo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    paddingTop: 8,
    paddingBottom:8,
    
  },
  titleList: {
    color: 'black',
    fontWeight: '800',
    fontFamily: 'BarlowCondensed_600SemiBold',
    // fontSize: 20
    fontSize: RFPercentage(2.8),
  },
  subtitle: {
    textAlign: 'center',
    // fontSize: 22,
    fontSize: RFPercentage(3.2),
    fontWeight: '700',
    paddingHorizontal: '7%',
    color:  '#E16226',
    marginBottom: 10,
    marginTop:8,
    fontFamily: 'BarlowCondensed_600SemiBold'
  },
  buttonSubmit: {
    marginTop: '3%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bluePrimary,
    fontSize: RFPercentage(2),
    overflow: 'hidden',
  },

  //for the gridView
  gridView: {
    marginTop: 15,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'space-around',
    borderRadius: 10,
    paddingHorizontal: 2,
    // paddingVertical: 1, 
    height: 60,
  },
  itemName: {
    // fontSize: 19,
    fontSize: RFPercentage(2.6),
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'BarlowCondensed_500Medium'
  },
});

export default styles;

