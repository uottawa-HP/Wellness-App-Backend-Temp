import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    // fontSize: 20,
    fontSize: RFPercentage(2.6),
    fontWeight: 'bold',
    color: 'white'
  },
});

export default darkModeStyles;
