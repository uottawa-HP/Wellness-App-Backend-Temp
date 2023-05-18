import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const darkModeStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'baseline',
        backgroundColor: '#171717',
      },
      title: {
        // fontSize: 28,
        fontSize: RFPercentage(3.8),
        paddingLeft: '5%',
        paddingRight: '2%',
        fontFamily: 'barlow-condensed-bold',
        alignSelf: 'flex-start',
        color: 'white'
      },
      body: {
        // fontSize: 18,
        fontSize: RFPercentage(2.6),
        paddingHorizontal: '7%',
        fontFamily: 'BarlowCondensed_400Regular',
        color: 'white'
      },
      textContainer: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 16 
      },
      image: {
        width: 170,
        height: 170,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius:200
      },
      button: {
        backgroundColor: '#019347',
        width: 169,
        height: 40,
        borderRadius: 16,
        fontSize: 10
      },
      listitem: {
        // fontSize: 18,
        fontSize: RFPercentage(2.6),
        paddingHorizontal: '7%',
        fontFamily: 'BarlowCondensed_500Medium',
        color: 'white'
      },
      itemName: {
        // fontSize: 16,
        fontSize: RFPercentage(2.4),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'BarlowCondensed_600SemiBold',
        color: 'white',
      },
});

export default darkModeStyles;
