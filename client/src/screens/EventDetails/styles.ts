import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    body: {
      width: '100%',
      height: '100%',
      backgroundColor: "#ffffff",
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
      backgroundColor: '#FFFFFF',
    },
    titleContainer: {
      paddingHorizontal: '8%',
    },
    title: {
      // fontSize: 33,
      fontSize: RFPercentage(5),
      fontFamily: 'BarlowCondensed_600SemiBold',
      marginBottom: '5%'
    },
    eventLead: {
      // fontSize: 19,
      fontSize: RFPercentage(3)
    },
    dividerContainer: {
      justifyContent: 'center',
      paddingVertical: '2.5%',
      paddingHorizontal: '7%'
    },  
    buttonContainer: {
      position: 'relative',
      justifyContent: 'center',
      paddingBottom: '5%',
      paddingTop: '7%'
    },
    descriptionContainer: {
      marginHorizontal: '8%',
      marginVertical: '2%'
    },
    descriptionTitle: {
      // fontSize: 23,
      fontSize: RFPercentage(3.1),
      marginBottom: '2%',
      fontFamily: 'BarlowCondensed_600SemiBold',
      color: '#202319'
    },
    descriptionDetails: {
      // fontSize: 21,
      fontSize: RFPercentage(2.9),
      fontFamily: 'BarlowCondensed_400Regular',
      color: '#808080',
      paddingVertical: '1%'
    },
    buttonAdd: {
      backgroundColor: '#104291',
      borderRadius: 7,
      width: '90%',
      marginHorizontal: '5%',
      // height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      marginVertical: '2%',
      paddingVertical: '2%'
    },
    buttonShare: {
      backgroundColor: 'white',
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
    btnText: {
      textAlign: 'center',
      justifyContent: 'center',
      color: 'white',
      paddingVertical: 2,
      fontFamily: 'BarlowCondensed_500Medium',
      // fontSize: 22
      fontSize: RFPercentage(3.2)
    },
    containerInfo: {
      flexDirection: 'row',
      alignContent: 'center'
    },
    iconText: {
      color: '#232323',
      // fontSize: 20,
      fontSize: RFPercentage(2.9),
      fontFamily: 'BarlowCondensed_400Regular',
      marginVertical: '3%',
      marginHorizontal: '3%',
      paddingHorizontal: '3%'
    },
    icon: {
      color: '#8F001A',
      // fontSize: 20,
      fontSize: RFPercentage(2.8),
      margin: '1%',
      paddingTop: '3%'
    },
    wellnessContainer: {
      flexDirection: 'row',
      marginHorizontal: '1%',
      flexWrap: 'wrap',
      marginVertical: '2%',
    },
    wellnessPillar: {
      backgroundColor: '#FBE4DD',
      marginRight: '4%',
      marginBottom: '2%',
      paddingVertical: '1%',
      paddingHorizontal: '5%',
      borderRadius: 5,
    },
    wellnessPillarText: {
      color: '#EA7754',
      fontFamily: 'BarlowCondensed_400Regular',
      // fontSize: 18
      fontSize: RFPercentage(2.6)
    },
    headerContainer: {
      paddingLeft: '4%',
      paddingTop: '10%',
      flexDirection: 'row',
      backgroundColor: 'white'
    },
    titlePage: {
      paddingLeft: '5%',
      paddingRight: '2%',
      fontFamily: 'BarlowCondensed_600SemiBold',
      alignSelf: 'flex-start',
      flex: 1,
    },
    backContainer:{
      // flex: 1,
      alignSelf: 'flex-end',
      // backgroundColor: 'orange',
      marginRight: '10%',
      backgroundColor: 'white'
    },
});

export default styles;