/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Divider} from 'react-native-elements';
import { ScrollView, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons'; 
import { JournalContext } from '../../context';
import { Appearance } from 'react-native'
import { useEffect, useState } from 'react';
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';


const LoadEntry = ({route}: {route:any}) => {
  const navigation = useNavigation();

  const loadEntry = route.params.entry;
  
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);

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

  // Use entries to access user's current journal entries. setEntries() sets user's entries upon navigating to this page
 
  // Gets all of user's entries at the beginning and stores in array called entries init above. No need to touch this
  
  const [title, setTitle] = React.useState(loadEntry.title);
  const [entry, setEntry] = React.useState(loadEntry.entry);
  
  //The components to book the different services 
  

  const handlePress = () => {
    const entryToUpdate = {
        
      title: title,
      entry: entry
    }
    JournalContext.updateEntry(entryToUpdate, loadEntry._id)
    navigation.navigate('Journal')
    
    
    
  };

  const handleDelete = () => {
    JournalContext.deleteEntry(loadEntry._id)
    
    navigation.navigate('Journal')
  };
  
  return (
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
      <View style={theme === 'light' ? styles.titleContainer : darkModeStyles.titleContainer}>
        <Text style={styles.titlePage}>{dictionnary.loadEntry.Edit}</Text>
        <View style={theme === 'light' ? styles.backContainer : darkModeStyles.backContainer}>
          <AntDesign onPress={() => navigation.goBack()} name="close" style={{fontSize: RFPercentage(3.8)}}
            color={theme === 'light' ? 'black' : 'white'} />
        </View>
      </View>

      <TextInput
        style={theme === 'light' ? styles.title : darkModeStyles.title}
        placeholder="Title"
        value={title}
        placeholderTextColor={'#525252'}
        onChangeText={title => setTitle(title)}
      />
      
      <Divider style = { styles.divider } color={theme === 'light' ? 'black' : 'white'}/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TextInput
        style={theme === 'light' ? styles.input : darkModeStyles.input}
        placeholder="Start writing..."
        multiline
        placeholderTextColor={'#525252'}
        value={entry}
        onChangeText={entry => setEntry(entry)}
      />
      </ScrollView>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={theme === 'light' ? styles.bottomContainer : darkModeStyles.bottomContainer}>
      <Divider style = { styles.dividerButton } />
      <View style = {styles.buttonContainer}>
        <TouchableOpacity style={theme === 'light' ? styles.deleteButton : darkModeStyles.deleteButton} onPress={() => handleDelete()} >
            <Text style={styles.delete}>{dictionnary.loadEntry.Delete}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={theme === 'light' ? styles.saveButton : darkModeStyles.saveButton} onPress={() => handlePress()} >
            <Text style={theme === 'light' ? styles.save : darkModeStyles.save}>{dictionnary.loadEntry.Save}</Text>
        </TouchableOpacity>
      </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
}
export default LoadEntry;