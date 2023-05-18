/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  input: {
    fontFamily: 'BarlowCondensed_400Regular',
    marginTop: 20,
    // fontSize: 20,
    fontSize: RFPercentage(2.7),
    padding: '2%',
    color: '#f9f9f9'
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#1c1c1c',
    paddingTop: 20,
    justifyContent: 'center'
  },
  title: {
    // fontSize: 23,
    fontSize: RFPercentage(3.1),
    fontFamily: 'BarlowCondensed_500Medium',
    paddingHorizontal: '8%', 
    width: '100%',
    marginTop: '10%',
    color: '#f9f9f9'
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
  save: {
    // fontSize: 21,
    fontSize: RFPercentage(2.8),
    color: 'white',
    fontFamily: 'BarlowCondensed_500Medium'
  },
  bottomContainer: {
    backgroundColor: '#1c1c1c',
    paddingVertical: '1%'
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
});

export default darkModeStyles;