import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props: any) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#BCBCBC',
    shadowOffset: { width: 1, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 3,
    marginVertical: 2,
  },
  cardContent: {
    marginHorizontal: 180,
    marginVertical: 5,
  }
});
