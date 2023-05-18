import * as React from 'react';
import {TouchableOpacity, SafeAreaView, ScrollView, TextInput} from 'react-native';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

import AuthActions from "../../store/auth/actions";
import { useState , useEffect } from 'react';
import { SvgUri } from 'react-native-svg';
import { Appearance } from 'react-native'
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions} from 'react-native';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';

interface EditProfileProps {
  auth: any;
}

const mapStateToProps = (state: EditProfileProps) => ({
  auth: state.auth,
});

const EditProfile: React.FC<EditProfileProps> = (props: EditProfileProps) => {



  //The dimension for the avatar 
  let dim = Dimensions.get('window').width*0.35

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('focus', (e) => {
        if (AuthActions.isUserLoggedIn()){
          AuthActions.updateStore();
        }
        
      });
    }
    unsubscribe();
    return () => {
      
    }
  }, [navigation]);


  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [firstName, setFirstName] = React.useState(props.auth.user.name.firstName);
  const [lastName, setLastName] = React.useState(props.auth.user.name.lastName);
  
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);

  const handleConfirm = () =>{

    //checking if the first name was modified 
    let updatedUser = props.auth.user;
    if (props.auth.user.name.firstName!=firstName){
      props.auth.user.name.firstName=firstName;
    }
    if (props.auth.user.name.lastName!=lastName){
      props.auth.user.name.lastName=lastName;
    }
    AuthActions.updateUser(updatedUser);
    navigation.goBack();
    
    
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
    return () => {
    }
  }, [navigation]);

  return (
    <View style={theme === 'light' ? styles.itemContainer : darkModeStyles.itemContainer}>
       <ScrollView scrollEnabled={true} style={{marginTop: '8%'}}>

            {/* if a user is connected, the profile screen will be different than if no user is connected  */}
            <SafeAreaView style={props.auth.user.name ? (theme === 'light' ? styles.container : darkModeStyles.container) 
              : (theme === 'light' ? styles.guestContainer : darkModeStyles.guestContainer)}>
                <View style={theme === 'light' ? styles.titleContainer : darkModeStyles.titleContainer }>
                  <Ionicons onPress={() => navigation.goBack()} name="chevron-back-outline" color='black' 
                  style={[theme === 'light' ? styles.back : {color:'white', fontSize: RFPercentage(3.8), paddingTop: '1%'} ]} />
                  <Text style={[styles.title,{ fontSize: RFPercentage(3.8)}]}>{dictionnary.editProfile.EditProfile}</Text>
              </View>
            </SafeAreaView>

        <View style={[theme === 'light' ? styles.backgroundColor : darkModeStyles.backgroundColor, styles.avatarContainer]}>
                <SvgUri
                width={dim}
                height={dim}
                uri={"https://avataaars.io/?avatarStyle=Circle&topType=" + props.auth.user.avatar.top + "&accessoriesType=" + props.auth.user.avatar.accessories + "&hairColor=" + props.auth.user.avatar.hairColor + "&facialHairType=" + props.auth.user.avatar.facialHair + "&facialHairColor=Brown&clotheType=" + props.auth.user.avatar.clothes + "&clotheColor=Blue03&eyeType=" + props.auth.user.avatar.eyes + "&eyebrowType=" + props.auth.user.avatar.eyebrows + "&mouthType=" + props.auth.user.avatar.mouth + "&skinColor=" + props.auth.user.avatar.skin}
                />
        </View>

     

      <TouchableOpacity style={theme === 'light' ? styles.editAvatarContainer : darkModeStyles.editAvatarContainer} onPress={() => navigation.navigate("CreateAvatar")}>
        <Text style={[styles.buttonEditAvatar,{ fontSize: RFPercentage(2.5)}]}>{dictionnary.editProfile.ChangeAvatar}</Text>
      </TouchableOpacity>

      <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
        <Text style={[theme === 'light' ? styles.titleElem : darkModeStyles.titleElem, ,{ fontSize: RFPercentage(2.5)}]}>{dictionnary.editProfile.FirstName}</Text>
      </View>

      <TextInput
        style={[theme === 'light' ? styles.input: darkModeStyles.input,{ fontSize: RFPercentage(2.5)}]}        
        onChangeText={setFirstName}
        placeholder={props.auth.user.name.firstName}
      />

      <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
        <Text style={[theme === 'light' ? styles.titleElem : darkModeStyles.titleElem,{ fontSize: RFPercentage(2.5)}]}>{dictionnary.editProfile.LastName}</Text>
      </View>

      <TextInput
        style={[theme === 'light' ? styles.input: darkModeStyles.input,{ fontSize: RFPercentage(2.5)}]}
        onChangeText={setLastName}
        placeholder={props.auth.user.name.lastName}
      />
      

      <TouchableOpacity style={styles.confirmContainer} onPress={() => { handleConfirm() }}>
        <Text style={[styles.buttonConfirm,{ fontSize: RFPercentage(2.5)}]}>{dictionnary.editProfile.Confirm}</Text>
      </TouchableOpacity>


    </ScrollView>
   
    </View>

  );
}

export default connect(mapStateToProps)(EditProfile);

