import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F9F9F9',
        marginBottom: 0,
        paddingBottom: 0
    },
    headerTitle: {
        fontSize: RFPercentage(4.1),
        //fontSize: 30,
        fontFamily: 'BarlowCondensed_600SemiBold',
    },
    titleContainer: {
        marginHorizontal: '8%',
        marginTop: '7%',
        backgroundColor: '#F9F9F9',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5%',
    },
    searchContainer: {
        paddingTop: '2%',
        backgroundColor: '#F9F9F9',
        justifyContent:'center',
        width: '100%',
    },
    searchBarContainer: {
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        paddingHorizontal: '7%'
    },
    searchBar: {
        backgroundColor: '#EAEAEA',
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
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    itemContainer: {
        borderRadius: 70,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        marginHorizontal: '1%',
        backgroundColor: '#E7ECF4'
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
        color: '#636363',
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
        //fontSize: 20,
        fontSize: RFPercentage(2.9),
        textDecorationLine: 'underline',
        color: '#104291'
    },
    placeholderText: {
        //fontSize: 17,
        fontSize: RFPercentage(2.5),
        color: '#636363',
        letterSpacing: 1.2,
        fontFamily: 'BarlowCondensed_500Medium'
    },
    noResult : {
        backgroundColor: '#F9F9F9',
        marginVertical: '10%',
        marginHorizontal: '25%',
    },
    noResultText1: {
        fontFamily: 'BarlowCondensed_600SemiBold',
        textAlign: 'center',
        //fontSize: 20,
        fontSize: RFPercentage(2.6),
        color: '#202319'
    },
    noResultText2: {
        fontFamily: 'BarlowCondensed_400Regular',
        textAlign: 'center',
        //fontSize: 20,
        fontSize: RFPercentage(2.6),
        color: '#808080'
    },
    noResultImage: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: '1%',
        marginHorizontal: '25%'
    },
    imgContainer: {
        marginHorizontal: '40%',
        position: 'relative'
    },
    colLeft: {
        backgroundColor: '#F9F9F9',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'stretch',
        alignSelf: 'stretch',
        paddingLeft: '1%',
        paddingTop: '3%'
    },
    colRight: {
        backgroundColor: '#F9F9F9',
        flexDirection: 'column',
        width: '50%',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
     },
     left: {
        backgroundColor: '#EAEAEA',
        width: '90%',
        flexDirection: 'column',
        paddingLeft: '5%',
    },
    right: {
        backgroundColor: '#EAEAEA',
        flexDirection: 'column',
        width: '10%',
     }
});
export default styles;
