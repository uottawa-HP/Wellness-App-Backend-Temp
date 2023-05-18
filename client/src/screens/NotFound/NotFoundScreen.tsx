import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../../types';
import styles from './styles';
import darkModeStyles from './darkModeStyles';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native'

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);
  
  return (
    <View style={theme === 'light' ? styles.container : darkModeStyles.container}>
      <Text style={theme === 'light' ? styles.title : darkModeStyles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
