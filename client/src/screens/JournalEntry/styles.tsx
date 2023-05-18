/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  input: {
    fontFamily: 'BarlowCondensed_400Regular',
    marginTop: 20,
    fontSize: RFPercentage(2.7),
    // fontSize: 20,
    padding: '5%',
    color: '#002E16'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#E7ECF4',
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: '5%',
    paddingHorizontal: '3%',
    width: '100%',
  },
  title: {
    // fontSize: 23,
    fontSize: RFPercentage(3.1),
    fontFamily: 'BarlowCondensed_600SemiBold',
    paddingHorizontal: '8%',
    marginTop: '10%',
    width: '100%',
    color: '#000000'
  },
  divider: {
    marginTop: 10,
    height: 2,
    alignSelf: 'center',
    width: '85%',
    borderBottomWidth: 1.25,
  },
  delete: {
    // fontSize: 20,
    fontSize: RFPercentage(2.7),
    marginTop: 5,
    color: 'red'
  },
  dividerButton: {
    height: 1,
    width: '100%',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#E7ECF4',
    width: '50%',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '12%',
  },
  buttonContainer:{
    width: '100%',
    height: 50,
    bottom: 0,
    flexDirection: 'row',
  },
  save: {
    fontSize: RFPercentage(2.8),
    // fontSize: 21,
    fontFamily: 'BarlowCondensed_500Medium'
  },
  bottomContainer: {
    backgroundColor: '#E7ECF4',
    paddingVertical: '0.5%'
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#E7ECF4'
  },

  titlePage: {
    fontSize: RFPercentage(3.8),
    // fontSize: 28,
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