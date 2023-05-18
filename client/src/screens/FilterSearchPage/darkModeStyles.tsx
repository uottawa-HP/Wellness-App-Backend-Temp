import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const darkModeStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingTop: 40,
      backgroundColor: "#171717",
      marginBottom: 0,
      paddingBottom: 0,
    },
    titleContainer: {
      marginHorizontal: '10%',
      backgroundColor: "#171717"
    },
    itemContainer: {
      borderRadius: 70,
      paddingVertical: '2%',
      paddingHorizontal: '3%',
      marginHorizontal: '2%',
      marginVertical:'2%',
      backgroundColor: '#171717',
      borderWidth: 1,
      borderColor: 'white'
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
      color: '#ebebeb',
      fontFamily: 'BarlowCondensed_500Medium',
      //fontSize: 16,
      fontSize: RFPercentage(2.2),
      paddingHorizontal: '2%',
    },
    itemNamePressed: {
      textAlign: 'center',
      flexDirection: 'column',
      color: 'white',
      fontFamily: 'BarlowCondensed_500Medium',
      fontSize: 16,
      //fontSize: RFPercentage(2.2),
      paddingHorizontal: '2%'
    },
    listAccordian: {
        backgroundColor: "#171717",
        paddingHorizontal: '8%',
        paddingVertical: '3%',
        opacity: 1,
    },
    listAccordionTitle: {
      fontFamily: 'BarlowCondensed_500Medium',
      //fontSize: 20,
      color: '#f9f9f9',
      fontSize: RFPercentage(2.8), 
    },
    buttonsContainer: {
      marginTop: '15%',
      marginBottom: '10%' ,
      // position: 'relative',
      justifyContent: 'center',
      backgroundColor: '#171717'
    },
    clearBtn: {
      backgroundColor: '#171717',
      width: '90%',
      marginHorizontal: '5%',
      alignItems: 'center'
    },
    wellnessPillar: {
      fontFamily: 'BarlowCondensed_400Regular',
      // fontSize: 18,
      fontSize: RFPercentage(2.5),
      letterSpacing: 0.6,
      color: '#f9f9f9'
    },
    headerContainer: {
      paddingLeft: '4%',
      paddingTop: '3%',
      flexDirection: 'row',
      backgroundColor: '#171717',
      paddingBottom: '2%',
    },
    titlePage: {
      // fontSize: 30,
      paddingLeft: '6%',
      paddingRight: '2%',
      fontFamily: 'BarlowCondensed_600SemiBold',
      alignSelf: 'flex-start',
      flex: 1,
      color: 'white',
      fontSize: RFPercentage(4),
    },
    backContainer:{
      // flex: 1,
      alignSelf: 'flex-end',
      marginRight: '10%',
      backgroundColor: '#171717'
    },
});

export default darkModeStyles;