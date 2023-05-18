import * as React from 'react';
import { Divider} from 'react-native-elements';
import { ScrollView, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import darkModeStyles from './darkModeStyles';
import { Text, View } from '../../components/Themed';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons'; 
import { JournalContext } from '../../context';
import { useEffect, useState } from 'react';
import {Appearance} from 'react-native';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';

interface HappyProps {
    auth: any;
}

const mapStateToProps = (state: HappyProps) => ({
    auth: state.auth,
});

const Happy: React.FC<HappyProps> = (props: HappyProps) => {
    const navigation = useNavigation();

    const [theme, setTheme] = useState(Appearance.getColorScheme());
  
    // handles light/dark mode appearance
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
        });
       return () => subscription.remove();
    }, []);

    const [entry, setEntry] = React.useState('');
    const handlePress = () => {
        const entryToAdd = {
            userId: props.auth.user._id,
            title: 'Feeling Happy',
            entry: entry,
        }
        JournalContext.addEntry(entryToAdd)
        navigation.navigate('Journal')
    }

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
      return () => {}
    }, [navigation]);

    return (
        <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>

      <View style={theme === 'light' ? styles.titleContainer : darkModeStyles.titleContainer}>
        <Text style={styles.titlePage}>{dictionnary.happy.Happy}</Text>
        <View style={theme === 'light' ? styles.backContainer : darkModeStyles.backContainer}>
          <AntDesign onPress={() => navigation.goBack()} name="close" size={32} 
          color={theme === 'light' ? 'black' : 'white'} />
        </View>
      </View>

      <View style={theme === 'light' ? styles.questionContainer : darkModeStyles.questionContainer}>
        <Text style={styles.title}>{dictionnary.happy.HappyPrompt}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}> 
        <TextInput
          style={theme === 'light' ? styles.input : darkModeStyles.input}
          placeholder={dictionnary.happy.StartWriting}
          multiline
          placeholderTextColor={'#525252'}
          onChangeText={entry => setEntry(entry)}
        />
      </ScrollView>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.bottomContainer}>
          <Divider style = { styles.dividerButton }/>
          <View style = {styles.buttonContainer}>
            <View style={theme === 'light' ? styles.button : darkModeStyles.button}>
              <Text style={styles.delete}></Text>
            </View>
            <TouchableOpacity style={theme === 'light' ? styles.button : darkModeStyles.button} onPress={() => handlePress()} >
              <Text style={styles.save}>{dictionnary.happy.Save}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    )

}

export default connect(mapStateToProps)(Happy);