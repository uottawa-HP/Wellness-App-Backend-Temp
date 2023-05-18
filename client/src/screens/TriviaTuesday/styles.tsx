import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '700',
        paddingHorizontal: '7%',
        textAlign:'center',
      },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    image: {
        width: '50%',
        alignSelf: 'center',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
      },
});

export default styles;
