/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Divider} from 'react-native-elements';
import { ScrollView, TouchableOpacity, SafeAreaView, TextInput, Platform, KeyboardAvoidingView} from 'react-native';
import { connect} from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import styles from './styles';
import { JournalContext } from '../../context';
import { AntDesign } from '@expo/vector-icons';
import { Appearance } from 'react-native'
import { useEffect, useState } from 'react';
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import LanguageActions from '../../store/language/actions';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';

interface JournalEntryProps {

  auth: any;
  
}

const mapStateToProps = (state: JournalEntryProps) => ({
  auth: state.auth,
});

const JournalEntry: React.FC<JournalEntryProps> = (props: JournalEntryProps) => {
  const navigation = useNavigation();

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);

  // Gets all of user's entries at the beginning and stores in array called entries init above. No need to touch this
  
  const [title, setTitle] = React.useState('');
  const [entry, setEntry] = React.useState('');
  const handlePress = () => {
    if(title == ''){
      const entryToAdd = {
        userId: props.auth.user._id,
        entry: entry
      }
      JournalContext.addEntry(entryToAdd)
    } else {
      const entryToAdd = {
        userId: props.auth.user._id,
        title: title,
        entry: entry
      }
      JournalContext.addEntry(entryToAdd)
    }
    console.log("Saving entry for : "+props.auth.user._id)
    navigation.navigate('Journal')
    
    
    
  };
  //The components to book the different services 
  
  //handles the language changes 
  const [language,setLanguage]=useState('english');
  const [dictionnary,setDictionnary] = useState(dictionnaryEN);
  useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('focus', (e) => {
        setLanguage(LanguageActions.getLanguage());
        setDictionnary(LanguageActions.getLanguage()==='english' ? dictionnaryEN : dictionnaryFR)
    });
    }
    unsubscribe();
    return () => {
    }
  }, [navigation]);

  
  return (
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
      <View style={theme === 'light' ? styles.titleContainer : darkModeStyles.titleContainer}>
        <Text style={styles.titlePage}>{dictionnary.journalEntry.NewEntry}</Text>
        <View style={theme === 'light' ? styles.backContainer : darkModeStyles.backContainer}>
          <AntDesign onPress={() => navigation.goBack()} name="close" style={{fontSize: RFPercentage(3.8)}} 
          color={theme === 'light' ? 'black' : 'white'} />
        </View>
      </View>
        
      <TextInput
        style={theme === 'light' ? styles.title : darkModeStyles.title}
        placeholder={dictionnary.journalEntry.Title}
        placeholderTextColor={'#525252'}
        onChangeText={title => setTitle(title)}
      />
      <Divider style = { styles.divider }/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TextInput
        style={theme === 'light' ? styles.input : darkModeStyles.input}
        placeholder={dictionnary.journalEntry.StartWriting}
        multiline
        placeholderTextColor={'#525252'}
        onChangeText={entry => setEntry(entry)}
      />
      </ScrollView>
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={theme === 'light' ? styles.bottomContainer : darkModeStyles.bottomContainer}>
      <Divider style = { styles.dividerButton }/>
      <View style = {styles.buttonContainer}>
      <View style={theme === 'light' ? styles.button : darkModeStyles.button}>
          <Text style={styles.delete}></Text>
      </View>
      <TouchableOpacity style={theme === 'light' ? styles.button : darkModeStyles.button} onPress={() => handlePress()} >
          <Text style={styles.save}>{dictionnary.journalEntry.Save}</Text>
      </TouchableOpacity>
      </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
}
export default connect(mapStateToProps)(JournalEntry);