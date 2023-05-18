import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    itemContainer: {
        height: '100%',
        width: '100%',
    },
    scrollContainer: {
        flex: 0,
        flexGrow: 1,
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: '2%',
        justifyContent: 'flex-start',
        alignContent: 'space-around',
        alignSelf: 'stretch',
        textAlignVertical: 'top'
    },
    subtitle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        fontFamily: 'BarlowCondensed_400Regular'
    },
    title: {
        // fontSize: 28,
        fontSize: RFPercentage(3.8),
        paddingLeft: '5%',
        paddingRight: '2%',
        fontFamily: 'barlow-condensed-bold',
        alignSelf: 'flex-start'
    },
    titleContainer: {
        paddingLeft: '4%',
        paddingTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        // fontSize: 15,
        fontSize: RFPercentage(2.3),
        alignSelf: 'flex-start',
        color: '#9FB3D3',
        fontFamily: 'BarlowCondensed_400Regular'
    },
    userHeader: {
        // fontSize: 15,
        fontSize: RFPercentage(2.3),
        alignSelf: 'center',
        color: '#9FB3D3',
        fontFamily: 'BarlowCondensed_400Regular'
    },
    back: {
        paddingTop: '1%',
        alignSelf: 'center',
        fontSize: RFPercentage(3.8),
    },
    info: {
        paddingTop: '1%',
        fontSize: RFPercentage(3),
        alignSelf: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    row: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        paddingLeft: '2%',
        paddingRight: '5%',
        paddingVertical: '1%',
        marginTop: '2%'
    },
    itemRow: {
        flex: 0,
        width: '96%%',
        height: 'auto',
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
        marginVertical: '1%',
        marginHorizontal:'4%',
        borderRadius:20,
    },
    self: {
        backgroundColor: '#91AF51B5'
    },
    first: {
        backgroundColor: '#FFD700'
    },
    second: {
        backgroundColor: '#D7D7D7'
    },
    third: {
        backgroundColor: '#AD8A56'
    },
    regularUser: {
        backgroundColor: 'transparent'
    },
    colRank: {
        width: '10%',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginHorizontal: '1%',
        alignSelf: 'center'
    },
    colUser: {
        width: '45%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'stretch',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: '1%',
    },
    colBadge: {
        width: '15%',
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
        marginHorizontal: '1%',
        alignSelf: 'center'
    },
    colPoints: {
        width: '20%',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        marginHorizontal: '1%',
        alignSelf: 'center'
    },
    rank: {
        // fontSize: 23,
        fontSize: RFPercentage(3),
        alignSelf: 'flex-start',
        fontFamily: 'BarlowCondensed_600SemiBold',
        color: '#9FB3D3',
        textAlignVertical: 'center',

    },
    rankSpecial: {
        // fontSize: 23,
        fontSize: RFPercentage(3),
        alignSelf: 'flex-start',
        fontFamily: 'BarlowCondensed_600SemiBold',
        color: 'white',
        textAlignVertical: 'center'
    },
    avatar: {
        height: '100%',
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom: 0,
        backgroundColor: 'transparent',
        flex: 1,
        minHeight: 60,
        overflow: 'hidden',
        flexDirection: 'row'

    },
    user: {
        // fontSize: 20,
        fontSize: RFPercentage(2.7),
        alignSelf: 'flex-start',
        fontFamily: 'BarlowCondensed_600SemiBold',
    },
    badge: {
        height: 35,
        width: 35,
        alignSelf: 'flex-start'
    },
    points: {
        // fontSize: 22,
        fontSize: RFPercentage(3),
        alignSelf: 'flex-start',
        fontFamily: 'barlow-condensed-bold',
    },
    name: {
        width: '30%',
        flexDirection: 'column',
        alignSelf: 'center',
        alignContent: 'stretch',
        backgroundColor: 'transparent',
        marginLeft: '1%',
        marginTop: '2%',
        marginBottom: '2%'
    },
    avatarIcon: {
        width: '15%',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        marginRight: '1%',
        overflow: 'hidden',
        alignSelf: 'center'
    }
});

export default styles;