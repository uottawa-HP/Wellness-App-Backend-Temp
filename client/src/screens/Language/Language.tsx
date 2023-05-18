import * as React from 'react';
import { Dimensions, View } from 'react-native';

import { SafeAreaView} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/Themed';
import styles from './styles';

import { useEffect, useState } from 'react';
import darkModeStyles from './darkModeStyles';
import { Appearance } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import { connect,useSelector,useDispatch } from 'react-redux'
import LanguageActions from "../../store/language/actions";
import { store } from '../../store/reduxStore';



interface LanguageProps {
  language:any;
}

const mapStateToProps = (state:LanguageProps) => {
  return { 
    language: state.language,
  }
}

const Language: React.FC<LanguageProps> = (props: LanguageProps) => {
  
  const dispatch = useDispatch();
  //handles the language of the app
  const [language, setLanguage] = useState(props.language.label)
  const [dictionnary,setDictionnary] = useState(language=='english' ? dictionnaryEN : dictionnaryFR)
  
  const changeLanguage = (newLanguage:String) =>{
    
    if (newLanguage=='english'){
      //First we dipatch the new language to the store 
      dispatch(LanguageActions.setLanguage('english'));
      //Second we update the dictionnary for the language screen
      setDictionnary(dictionnaryEN)
      //Thrid, we set the language value to the new one
      setLanguage('english')
      navigation.navigate('Home')
    }
    else{
      //First we dipatch the new language to the store 
      dispatch(LanguageActions.setLanguage('french'))
      //Second we update the dictionnary for the language screen
      setDictionnary(dictionnaryFR)
      //Thrid, we set the language value to the new one
      setLanguage('french')
      navigation.navigate('Home')
    }
    
  }

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
    return;
  }, []);
  
  const navigation = useNavigation();
  

  let dim = Dimensions.get('window').width*0.21

  return (
      <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
        
        <View style={styles.titleContainer}>
                    <Ionicons onPress={() => navigation.goBack()} name="chevron-back-outline"
                    color={theme === 'light' ? 'black' : 'white'} style={styles.back} />
                    <Text style={theme === 'light' ? styles.title : darkModeStyles.title}>{dictionnary.language.Language}</Text>
        </View>

        <TouchableOpacity onPress={ () => changeLanguage('french')} >
        <View style={theme === 'light' ? styles.languageOptionContainer : darkModeStyles.languageOptionContainer}>
          <Text style= {theme ==='light' ? styles.languageOption : darkModeStyles.languageOption} >{dictionnary.language.French}</Text>
          <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
              {language==='french' ? 
              <Ionicons name="checkmark" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} /> 
              : null}
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => changeLanguage("english")} >
        <View style={theme === 'light' ? styles.languageOptionContainer : darkModeStyles.languageOptionContainer}>
          <Text style= {theme ==='light' ? styles.languageOption : darkModeStyles.languageOption} >{dictionnary.language.English}</Text>
          <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}>
          {language==='english' ? 
              <Ionicons name="checkmark" style={{fontSize: RFPercentage(3)}} color={theme === 'light' ? Colors.darkBlue : 'white'} /> 
              : null}
          </View>
        </View>
        </TouchableOpacity>

        
       
      </SafeAreaView>
  );
}

export default connect(mapStateToProps, {})(Language);
