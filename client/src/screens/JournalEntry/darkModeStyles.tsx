/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  input: {
    fontFamily: 'BarlowCondensed_400Regular',
    marginTop: 20,
    fontSize: RFPercentage(2.7),
    // fontSize: 20,
    padding: '5%',
    color: '#f9f9f9'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#1c1c1c',
    paddingTop: 20,
  },
  title: {
    // fontSize: 23,
    fontSize: RFPercentage(3.1),
    fontFamily: 'BarlowCondensed_600SemiBold',
    paddingHorizontal: '8%',
    marginTop: '10%',
    width: '100%',
    color: '#f9f9f9'
  },
  button: {
    backgroundColor: '#1c1c1c',
    width: '50%',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '12%',
  },
  bottomContainer: {
    backgroundColor: '#1c1c1c',
    paddingVertical: '0.5%'
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