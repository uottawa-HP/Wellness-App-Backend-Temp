import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  input: {
    marginTop: 10,
    // fontSize: 19,
    fontSize: RFPercentage(2.7),
    // padding: 20,
    paddingHorizontal: '5%',
    fontFamily: 'BarlowCondensed_400Regular',
    color: '#f9f9f9'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#1c1c1c',
    paddingTop: 20,
  },
  title: {
    // fontSize: 22,
    fontSize: RFPercentage(2.8),
    paddingHorizontal: '5%',
    marginTop: 20,
    width: '100%',
    fontFamily: 'BarlowCondensed_500Medium',
  },
  delete: {
    fontSize: 20,
    // marginTop: 5,
    color: '#CC2442', 
    fontFamily: 'BarlowCondensed_500Medium',  
  },
  saveButton: {
    width: '50%',
    backgroundColor: '#1c1c1c',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '12%',  
  },
  deleteButton: {
    width: '50%',
    backgroundColor: '#1c1c1c',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 50,
    paddingLeft: '10%',
  },
  buttonContainer:{
    width: '100%',
    height:50,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#E7ECF4',
  },
  save: {
    fontSize: 20,
    // marginTop: 5,
    fontFamily: 'BarlowCondensed_500Medium',   
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#1c1c1c'
  },
  backContainer:{
    alignSelf: 'flex-end',
    marginRight: '10%',
    backgroundColor: '#1c1c1c'
  },
  questionContainer: {
    paddingLeft: '4%',
    marginTop: '5%',
    backgroundColor: '#1c1c1c',
    width: '95%',
    paddingBottom: '2%'
  },
});

export default darkModeStyles;