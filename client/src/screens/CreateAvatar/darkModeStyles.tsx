import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor:'#171717',
  },
  titleList: {
    color: 'white',
    fontWeight: '800',
    fontFamily: 'BarlowCondensed_600SemiBold',
    // fontSize: 20
    fontSize: RFPercentage(2.8),
    paddingLeft: '3%'
  },
});

export default darkModeStyles;

