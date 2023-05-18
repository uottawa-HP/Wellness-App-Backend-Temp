import React, { JSXElementConstructor } from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { GestureHandlerGestureEvent } from "react-native-gesture-handler";

export default function CustomButton({title, onPress}: {title: string, onPress: any}) {

    return (
        <TouchableOpacity style = { styles.button } onPress={onPress}>
            <Text style = { styles.text }> {title} </Text> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create( {
    button: {
        backgroundColor: "#1D5F71",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        marginVertical: 15,
        shadowOffset: {
            width: 0.2,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowColor: 'black',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    }
})