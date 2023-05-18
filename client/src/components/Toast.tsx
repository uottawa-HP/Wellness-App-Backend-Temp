import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import Toast from "react-native-toast-notifications"
import { FontAwesome } from '@expo/vector-icons'; 
import { Card } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
export default function CustomToast() {
  return (
    <Toast 
        type = "custom_type"
        renderType={{
            custom_type: (toast) => (
            <Card containerStyle={styles.cardTip}>
                <View style = {styles.container}>
                    <FontAwesome name="trophy" color="gold" style={{fontSize: RFPercentage(3)}} />
                    <Text style={styles.cardTitleText}>{toast.message}</Text>
                </View>
            </Card>
            )
        }}
        ref={(ref) => global['toast'] = ref} />
    );
}

const styles = StyleSheet.create({
  cardTitleText: {
    // fontSize: 18,
    fontSize: RFPercentage(2.4),
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#019347',
    // height: 25,
    borderRadius: 16,
    paddingLeft:'3%',
    fontFamily: 'BarlowCondensed_400Regular'
  },
  cardTip: {
    backgroundColor: '#C7FFE2',
    borderRadius: 16
  },
  container:{
    backgroundColor: '#C7FFE2',
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'flex-start',
  }
})