import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const darkModeStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#171717',
        marginBottom: 0,
        paddingBottom: 0
    },
    headerTitle: {
        fontSize: RFPercentage(4.1),
        //fontSize: 30,
        color: 'white',
        fontFamily: 'BarlowCondensed_600SemiBold',
    },
    titleContainer: {
        marginHorizontal: '8%',
        marginTop: '7%',
        backgroundColor: '#171717',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5%',
    },
    searchContainer: {
        paddingTop: '2%',
        backgroundColor: '#171717',
        justifyContent:'center',
        width: '100%',
    },
    searchBarContainer: {
        justifyContent: 'center',
        backgroundColor: '#171717',
        flexDirection: 'row',
        paddingHorizontal: '7%'
    },
    searchBar: {
        backgroundColor: '#4a4c4f',
        width:'100%', 
        flexDirection:'row',
        paddingVertical: '2%',
        borderRadius: 10,
        paddingRight: '2%'
    },
    filterContainer: {
        paddingTop: '5%',
        paddingBottom: '3%',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#171717',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    itemContainer: {
        borderRadius: 70,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        marginHorizontal: '1%',
        backgroundColor: '#657085'
    },
    itemContainerPressed: {
        borderRadius: 70,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        marginHorizontal: '1%',
        backgroundColor: '#104291'
    },
    itemName: {
        textAlign: 'center',
        flexDirection: 'column',
        color: '#1f2226',
        fontFamily: 'BarlowCondensed_500Medium',
        //fontSize: 18,
        fontSize: RFPercentage(2.5),
    },
    itemNamePressed: {
        textAlign: 'center',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'BarlowCondensed_500Medium',
        //fontSize: 18,
        fontSize: RFPercentage(2.5)
    },
    filterIcon: {
        paddingHorizontal: '4%',
        marginLeft: '53%',
        marginTop: '9%',
        fontFamily: 'BarlowCondensed_500Medium',
        //fontSize: 22,
        fontSize: RFPercentage(2.9),
        textDecorationLine: 'underline',
        color: '#104291'
    },
    placeholderText: {
        //fontSize: 17,
        fontSize: RFPercentage(2.5),
        color: '#b2b7bf',
        letterSpacing: 1.2,
        fontFamily: 'BarlowCondensed_500Medium'
    },
    noResult : {
        backgroundColor: '#171717',
        marginVertical: '10%',
        marginHorizontal: '25%',
    },
    noResultText1: {
        fontFamily: 'BarlowCondensed_600SemiBold',
        textAlign: 'center',
        //fontSize: 20,
        color: 'white',
        fontSize: RFPercentage(2.6),
    },
    colLeft: {
        backgroundColor: '#171717',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'stretch',
        alignSelf: 'stretch',
        paddingLeft: '1%',
        paddingTop: '3%'
    },
    colRight: {
        backgroundColor: '#171717',
        flexDirection: 'column',
        width: '50%',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
     },
     left: {
        backgroundColor: '#4a4c4f',
        width: '90%',
        flexDirection: 'column',
        paddingLeft: '5%',
    },
    right: {
        backgroundColor: '#4a4c4f',
        flexDirection: 'column',
        width: '10%',
     }
});
export default darkModeStyles;
