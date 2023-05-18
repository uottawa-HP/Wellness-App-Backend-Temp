import { Platform, StyleSheet } from 'react-native';

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  touchable: {
    marginTop: 15,
  },
  element: {
    // padding: 10,
    marginHorizontal:15,
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: '#171717',
  },
  imageContainer: {
    // flex:1,
    width: '25%',
    backgroundColor: '#171717',
  },
  contentContainer: {
    paddingLeft: 12,
    width: '65%',
    // flex:2,
    backgroundColor: '#171717',
    alignSelf: 'center'
  },
  iconContainer: {
    width: '10%',
    flex:1,
    backgroundColor: '#171717',
    justifyContent: 'center', 
    alignItems: 'center', 
  }  
});

export default darkModeStyles;
