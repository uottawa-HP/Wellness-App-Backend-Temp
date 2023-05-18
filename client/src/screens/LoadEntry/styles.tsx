/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  input: {
    fontFamily: 'BarlowCondensed_400Regular',
    marginTop: 20,
    // fontSize: 20,
    fontSize: RFPercentage(2.7),
    padding: 10,
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#E7ECF4',
    paddingTop: 20,
    justifyContent: 'center'
  },
  scrollContainer: {
    paddingBottom: '5%',
    paddingHorizontal: '6%',
    width: '100%',
  },
  title: {
    // fontSize: 23,
    fontSize: RFPercentage(3.1),
    fontFamily: 'BarlowCondensed_500Medium',
    paddingHorizontal: '8%', 
    width: '100%',
    marginTop: '10%'
  },
  divider: {
    marginTop: 10,
    height: 3,
    alignSelf: 'center',
    width: '85%', 
    borderBottomWidth: 0.5,
    borderBottomColor: '#002E16',
  },
  
  delete: {
    // fontSize: 22,
    fontSize: RFPercentage(2.8),
    color: '#CC2442',
    fontFamily: 'BarlowCondensed_500Medium'
  },
  dividerButton: {
    height: 1,
    width: '100%', 
    borderBottomWidth: 0.5,
  },
  saveButton: {
    width: '50%',
    backgroundColor: '#E7ECF4',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '12%',  
  },

  deleteButton: {
    width: '50%',
    backgroundColor: '#E7ECF4',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 50,
    paddingLeft: '10%',
  },
  buttonContainer:{
    width: '100%',
    height:45,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#E7ECF4',
  },
  save: {
    // fontSize: 21,
    fontSize: RFPercentage(2.8),
    color: '#2C2F40',
    fontFamily: 'BarlowCondensed_500Medium'
  },
  bottomContainer: {
    backgroundColor: '#E7ECF4',
    paddingVertical: '1%'
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#E7ECF4'
  },

  titlePage: {
    // fontSize: 28,
    fontSize: RFPercentage(3.8),
    paddingLeft: '5%',
    paddingRight: '2%',
    fontFamily: 'BarlowCondensed_600SemiBold',
    alignSelf: 'flex-start',
    flex: 1,
  },

  backContainer:{
    alignSelf: 'flex-end',
    marginRight: '10%',
    backgroundColor: '#E7ECF4'
  },
});

export default styles;