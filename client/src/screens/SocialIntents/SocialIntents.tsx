import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Appearance } from 'react-native'
import { DotIndicator } from 'react-native-indicators';


import { WebView } from 'react-native-webview';
import styles from '../Home/styles';
import darkModeStyles from '../Home/darkModeStyles';
import { useNavigation } from '@react-navigation/native';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';
import { store } from '../../store/reduxStore';

export default function Socialintents() {
    //INFO : url for the social intent live chat provided by uOttawa Health promotion 

    const navigation = useNavigation();

    //handles the language changes 
    const [language,setLanguage]=useState('english');
    const [dictionnary,setDictionnary] = useState(dictionnaryEN);
    useEffect(() => {
      const unsubscribe = () => {
        navigation.addListener('focus', (e) => {
          setLanguage(LanguageActions.getLanguage());
          setDictionnary(LanguageActions.getLanguage()==='english' ? dictionnaryEN : dictionnaryFR)
          navigation.setOptions({title: LanguageActions.getLanguage()==='english' ? dictionnary.socialIntent.Chat : dictionnary.socialIntent.Chat})
        });
      }
      unsubscribe();
      return () => {}
    }, [navigation]);

    //retriveing the theme
    const [theme,setTheme] =  useState(Appearance.getColorScheme())

    // handles light/dark mode appearance
    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
      });
     return () => subscription.remove();
    }, []);

    const ActivityIndicatorElement = () => {
      return (
        <DotIndicator size={10} color='#EA7754'/>
      );
    };
    return (
      
      <View style={theme === 'light' ? styles.container : darkModeStyles.container}>
        <WebView 
        style={theme === 'light' ? styles.container : darkModeStyles.container}  
        renderLoading={ActivityIndicatorElement}
        startInLoadingState={true}
        source={{ uri: language==='english' ? 'https://www.socialintents.com/chatWidget.1.0.jsp?s=undefined&wid=2c9faa357418a9da0174300a5a3b1f09&hp=false&t=1602957044246&uid=1599574196171&v=3&cp=null&p=https%3A//www.uottawa.ca/wellness/lounge&r=https%3A//www.uottawa.ca/wellness/students/peer-experts-and-mentors#': 'https://www.socialintents.com/chatWidget.1.0.jsp?s=undefined&wid=2c9faa357418a9da01743014f1411f1d&hp=false&t=1657115365312&uid=1651522618050&v=5&cp=null&si_group=Mieux-être%20%2F%20Wellness%7C19%3A750a179c3a83459e8218d8d3d0534fdd%40thread.tacv2&si_setinfo=true&p=https%3A%2F%2Fwww2.uottawa.ca%2Fvie-campus%2Fsante-mieux-etre&r=https%3A%2F%2Fwww2.uottawa.ca%2Fcampus-life%2Fhealth-wellness#' }} 
      />

      </View>

    );
}
  