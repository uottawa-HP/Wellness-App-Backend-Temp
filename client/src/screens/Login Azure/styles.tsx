import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
        alignContent: 'stretch'
    },
    scrollContainer: {
        paddingTop: '1%',
        paddingBottom: '1%',
        width: '100%'
    },
    formContainer: {
        paddingVertical: '15%',
        paddingHorizontal: '5%',
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        flexGrow: 1,
        flexWrap: 'wrap',
        width: '100%'
    },
    input: {
        borderRadius: 16,
        alignSelf: 'stretch',
        width: 500,
        fontFamily: 'BarlowCondensed_400Regular',
        // fontSize: 19,
        fontSize: RFPercentage(2.6),
        letterSpacing: 0.5
    },
    error: { 
        // fontSize: 18,
        fontSize: RFPercentage(2.4),
        color: 'red',
        fontFamily: 'BarlowCondensed_400Regular'
    },
    loginContainer: {
        marginTop: '14%',
        marginHorizontal: '3%',
        borderRadius: 5,
        width: '94%',
        alignItems: 'center',
        overflow: 'hidden',
    },
    buttonLogin: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: '3%',
        // fontSize: 20,
        fontSize: RFPercentage(2.8),
        fontFamily: 'BarlowCondensed_500Medium',
        backgroundColor: Colors.bluePrimary,
        color: 'white',
    },
});

export default styles;
