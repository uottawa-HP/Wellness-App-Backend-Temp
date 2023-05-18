import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'baseline',
        //backgroundColor: '#f2ede2'
        backgroundColor: Colors.backgroundClr,
      },
      title: {
        // fontSize: 28,
        fontSize: RFPercentage(3.8),
        paddingLeft: '5%',
        paddingRight: '2%',
        fontFamily: 'barlow-condensed-bold',
        alignSelf: 'flex-start'
      },
      subtitle: {
        // fontSize: 24,
        fontSize: RFPercentage(3.3),
        paddingHorizontal: '7%',
        marginBottom:20,
        color: '#ea7754',
        fontFamily: 'BarlowCondensed_500Medium',
      },
      body: {
        // fontSize: 18,
        fontSize: RFPercentage(2.6),
        paddingHorizontal: '7%',
        fontFamily: 'BarlowCondensed_400Regular',
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
      //to control the FlatList
      listcontainer: {
        flex: 1,
        paddingTop: 22
        
       },
      listitem: {
        // fontSize: 18,
        fontSize: RFPercentage(2.6),
        paddingHorizontal: '7%',
        fontFamily: 'BarlowCondensed_500Medium',
        
      },
      //to controle the FlatGrid
      gridView: {
        marginTop: 15,
        flex: 1,
        marginHorizontal: '2%',
        alignContent: 'center',
        alignSelf: 'center'
      },
      itemContainer: {
        justifyContent: 'space-around',
        borderRadius: 15,
        padding: '5%',
        
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
        color: 'black',
      },
      itemImage: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'flex-start',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      },
      titleContainer: {
        paddingLeft: '4%',
        paddingTop: Platform.OS == 'ios' ? '10%' : '15%',
        flexDirection: 'row',
        paddingBottom: '8%',
      },
      back: {
        paddingTop: '1%',
        fontSize: RFPercentage(3.8)
      },
      info: {
        paddingTop: '4%'
      },
});

export default styles;
