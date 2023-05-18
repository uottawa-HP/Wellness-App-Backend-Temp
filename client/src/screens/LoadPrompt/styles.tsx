import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    // fontSize: 19,
    fontSize: RFPercentage(2.7),
    // padding: 20,
    paddingHorizontal: '5%',
    fontFamily: 'BarlowCondensed_400Regular',
  },

  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#E7ECF4',
    paddingTop: 20,
  },

  scrollContainer: {
    paddingBottom: '5%',
    paddingHorizontal: '4%',
    width: '100%',
  },

  title: {
    // fontSize: 22,
    fontSize: RFPercentage(3.1),
    paddingHorizontal: '5%',
    marginTop: 20,
    width: '100%',
    fontFamily: 'BarlowCondensed_500Medium',
  },

  divider: {
    marginTop: 10,
    height: 2,
    alignSelf: 'center',
    width: '90%', 
    borderBottomWidth: 1.25,
  },
  
  delete: {
    // fontSize: 20,
    fontSize: RFPercentage(2.8),
    // marginTop: 5,
    color: '#CC2442', 
    fontFamily: 'BarlowCondensed_500Medium',  
  },

  dividerButton: { 
    height: 1,
    width: '100%', 
    borderBottomWidth: 1,
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
    height:50,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#E7ECF4',
  },

  save: {
    // fontSize: 20,
    fontSize: RFPercentage(2.8),
    // marginTop: 5,
    fontFamily: 'BarlowCondensed_500Medium',   
  },

  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#E7ECF4'
  },

  titlePage: {
    // fontSize: 27,
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

  questionContainer: {
    paddingLeft: '4%',
    marginTop: '5%',
    backgroundColor: '#E7ECF4',
    width: '95%',
    paddingBottom: '2%'
  },

  bottomContainer: {
    // backgroundColor: '#E7ECF4',
    backgroundColor: '#B2B2B2',
  },

});

export default styles;