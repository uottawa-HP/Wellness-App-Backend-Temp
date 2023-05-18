import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingTop: 40,
      backgroundColor: "#ffffff",
      marginBottom: 0,
      paddingBottom: 0,
    },
    titleContainer: {
      marginHorizontal: '10%',
      backgroundColor: "#ffffff"
    },
    gridView: {
      marginTop: '4%',
      marginBottom: '2%',
      marginHorizontal: '4%',
      flex: 1,
    },
    itemContainer: {
      borderRadius: 70,
      paddingVertical: '2%',
      paddingHorizontal: '3%',
      marginHorizontal: '2%',
      marginVertical:'2%',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#404040'
    },
    itemContainerPressed: {
      borderRadius: 70,
      paddingVertical: '2%',
      paddingHorizontal: '3%',
      marginHorizontal: '2%',
      marginVertical:'2%',
      backgroundColor: '#104291',
      borderWidth: 1,
      borderColor: '#104291'
    },
    itemName: {
      textAlign: 'center',
      flexDirection: 'column',
      color: '#404040',
      fontFamily: 'BarlowCondensed_500Medium',
      // fontSize: 16,
      fontSize: RFPercentage(2.2),
      paddingHorizontal: '2%'
    },
    itemNamePressed: {
      textAlign: 'center',
      flexDirection: 'column',
      color: 'white',
      fontFamily: 'BarlowCondensed_500Medium',
      // fontSize: 16,
      fontSize: RFPercentage(2.2),
      paddingHorizontal: '2%'
    },
    listAccordian: {
        backgroundColor: "#ffffff",
        paddingHorizontal: '8%',
        paddingVertical: '3%',
    },
    listAccordionTitle: {
      fontFamily: 'BarlowCondensed_500Medium',
      // fontSize: 20,
      fontSize: RFPercentage(2.8), 
    },
    optionContainer: {
      marginTop: '5%'
    },
    buttonsContainer: {
      marginTop: '15%',
      marginBottom: '10%' ,
      // position: 'relative',
      justifyContent: 'center',
      backgroundColor: '#ffffff'
    },
    applyBtn: {
      backgroundColor: '#104291',
      borderRadius: 5,
      width: '90%',
      marginHorizontal: '5%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      paddingVertical: '2%'
    },
    applyText: {
      textAlign: 'center',
      justifyContent: 'center',
      color: 'white',
      paddingVertical: 2,
      fontFamily: 'BarlowCondensed_500Medium',
      // fontSize: 25
      fontSize: RFPercentage(3.3)
    },
    clearBtn: {
      backgroundColor: '#ffffff',
      width: '90%',
      marginHorizontal: '5%',
      alignItems: 'center'
    },
    clearText: {
      textAlign: 'center',
      justifyContent: 'center',
      paddingVertical: '3%',
      color: '#104291',
      fontFamily: 'BarlowCondensed_500Medium',
      // fontSize: 25
      fontSize: RFPercentage(3.3)
    },
    checkboxContainer: {
      marginTop: 5,
      marginLeft: '7%',
      marginRight: '7%',
      width:'100%',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
    },
    wellnessPillar: {
      fontFamily: 'BarlowCondensed_400Regular',
      // fontSize: 18,
      fontSize: RFPercentage(2.5),
      letterSpacing: 0.6
    },
    filterContainer: {
      marginVertical: '5%',
      marginHorizontal: '6%'
    },
    dataContainer: {
      marginVertical: '3%',
      flexDirection: 'row',
      width: '100%',
      flexWrap: 'wrap'
    },
    headerContainer: {
      paddingLeft: '4%',
      paddingTop: '3%',
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingBottom: '2%',
    },
    titlePage: {
      // fontSize: 30,
      paddingLeft: '6%',
      paddingRight: '2%',
      fontFamily: 'BarlowCondensed_600SemiBold',
      alignSelf: 'flex-start',
      flex: 1,
      fontSize: RFPercentage(4),
    },
    backContainer:{
      // flex: 1,
      alignSelf: 'flex-end',
      marginRight: '10%',
      backgroundColor: 'white'
    },
});

export default styles;