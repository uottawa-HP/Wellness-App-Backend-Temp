import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const darkModeStyles = StyleSheet.create({
    body: {
      width: '100%',
      height: '100%',
      backgroundColor: "#171717",
      marginBottom: 0,
      paddingBottom: 0,
      // marginTop: 50,
      flex: 1,
    },
    contentContainer: {
      // marginTop: '3%',
      paddingTop: '2%',
      paddingBottom: '5%',
      marginBottom: '2%',
      height: '85%',
      backgroundColor: '#171717',
    },
    title: {
      // fontSize: 33,
      fontSize: RFPercentage(5),
      color: 'white',
      fontFamily: 'BarlowCondensed_600SemiBold',
      marginBottom: '5%'
    },
    descriptionTitle: {
      // fontSize: 23,
      fontSize: RFPercentage(3.1),
      marginBottom: '2%',
      fontFamily: 'BarlowCondensed_600SemiBold',
      color: 'white'
    },
    buttonShare: {
      backgroundColor: '#171717',
      borderRadius: 7,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: "#104291",
      width: '90%',
      marginHorizontal: '5%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      marginVertical: '2%',
      paddingVertical: '2%'
    },
    iconText: {
      color: '#f9f9f9',
      // fontSize: 20,
      fontSize: RFPercentage(2.9),
      fontFamily: 'BarlowCondensed_400Regular',
      marginVertical: '3%',
      marginHorizontal: '3%',
      paddingHorizontal: '3%'
    },
    headerContainer: {
      paddingLeft: '4%',
      paddingTop: '10%',
      flexDirection: 'row',
      backgroundColor: '#171717'
    },
    backContainer:{
      // flex: 1,
      alignSelf: 'flex-end',
      marginRight: '10%',
      backgroundColor: '#171717'
    },
    wellnessContainer: {
      flexDirection: 'row',
      marginHorizontal: '1%',
      flexWrap: 'wrap',
      marginVertical: '2%',
    },
    wellnessPillar: {
      backgroundColor: '#ffc2b0',
      marginRight: '4%',
      marginBottom: '2%',
      paddingVertical: '1%',
      paddingHorizontal: '5%',
      borderRadius: 5,
    },
    wellnessPillarText: {
      color: '#e36540',
      fontFamily: 'BarlowCondensed_400Regular',
      // fontSize: 18
      fontSize: RFPercentage(2.6)
    },
});

export default darkModeStyles;