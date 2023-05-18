import * as React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';

export default function BookService({route}: {route: any} ) {
  /* Get the param */
  const navigation = useNavigation();
  const {service} = route.params;

  //handles the language changes 
  const [language,setLanguage]=React.useState('english');
  const [dictionnary,setDictionnary] = React.useState(dictionnaryEN);
  React.useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('focus', (e) => {
        setLanguage(LanguageActions.getLanguage());
        setDictionnary(LanguageActions.getLanguage()==='english' ? dictionnaryEN : dictionnaryFR)
      });
    }
    unsubscribe();
    return () => {}
  }, [navigation]);

  /* updating header title, refer to the 'BottomTabNavigator' for more info */
  
  navigation.setOptions({ title: language==='english' ? service.descriptionEN : service.descriptionFR })

  return (
    <WebView
      scrollEnabled={true}
      startInLoadingState={true}
      source={{ uri: service.urlEN }}
    />
  );
}
