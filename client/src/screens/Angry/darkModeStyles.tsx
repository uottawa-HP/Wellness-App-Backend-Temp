import { StyleSheet } from 'react-native';

const darkModeStyles = StyleSheet.create({
  input: {
    marginTop: 10,
    fontSize: 19,
    padding: 20,
    paddingHorizontal: '5%',
    fontFamily: 'BarlowCondensed_400Regular',
    color: '#f9f9f9' 
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#1c1c1c',
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#1c1c1c',
    width: '50%',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '12%',
    paddingBottom: '2%',
  },
  titleContainer: {
    paddingLeft: '4%',
    paddingTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#1c1c1c'
  },
  backContainer:{
    // flex: 1,
    alignSelf: 'flex-end',
    marginRight: '10%',
    backgroundColor: '#1c1c1c'
  },
  questionContainer: {
    paddingLeft: '4%',
    marginTop: '5%',
    backgroundColor: '#1c1c1c',
    width: '95%',
    paddingBottom: '2%'
  },
});

export default darkModeStyles;