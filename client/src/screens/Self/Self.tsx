import * as React from 'react';
import { Alert, Image, Linking, Dimensions } from 'react-native';

import { Button as ButtonElem, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import styles from './styles';

import CoolIcons from '../../../assets/CoolIcons';
import Colors from '../../constants/Colors';

import Journal from '../Journal';
import { Card } from 'react-native-elements';
import { List } from 'react-native-paper';
import { useEffect, useState } from 'react';
import darkModeStyles from './darkModeStyles';
import { Appearance } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import dictionnaryFR from '../../constants/dictionnaryFR';
import dictionnaryEN from '../../constants/dictionnaryEN';
import LanguageActions from '../../store/language/actions';


export default function Self() {


  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
  //handles the language changes 
  const [language,setLanguage]=useState('english');
  const [dictionnary,setDictionnary] = useState(dictionnaryEN);

  const navigation = useNavigation();

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


  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
    });
   return () => subscription.remove();
  }, []);
  
  const [expanded, setExpanded] = React.useState(false);

  //phone numbers 
  const ont = 18669255454;
  const can = 18336285589;
  const int = 12159428478;
  const pro = 16135625411;

  //boolean value to expand the accordion list on touch of the user
  const handlePress = () => setExpanded(!expanded);

  let dim = Dimensions.get('window').width*0.21

  return (
      <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>{dictionnary.selftHelp.SelfHelp}</Text>
          <Card containerStyle={[styles.cardEmerg, {borderColor: theme === 'light' ? '#f4f4f4' : 'grey'} ]}>
          <List.Accordion
            title={dictionnary.selftHelp.EmergencyContacts}
            expanded={expanded}
            onPress={handlePress}
            theme={{ colors: { background: Colors.blueSecondary } }}
            titleStyle={styles.titleEcall}>
            <List.Item onPress={() => Linking.openURL(`tel:${ont}`)} title={dictionnary.selftHelp.Ontario} titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone" color={"black"} style={{fontSize: RFPercentage(2.5)}}/></View>} />
            <List.Item onPress={() => Linking.openURL(`tel:${can}`)} title={dictionnary.selftHelp.Canada} titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone" color={"black"} style={{fontSize: RFPercentage(2.5)}}/></View>} />
            <List.Item onPress={() => Linking.openURL(`tel:${int}`)} title={dictionnary.selftHelp.International} titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone" color={"black"} style={{fontSize: RFPercentage(2.5)}}/></View>} />
            <List.Item onPress={() => Linking.openURL(`tel:${pro}`)} title={dictionnary.selftHelp.ProtectionEmergency} titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone" color={"black"} style={{fontSize: RFPercentage(2.5)}}/></View>} />
          </List.Accordion>
          </Card>
          {/* Navigate to journal screen */}
          <TouchableOpacity style= { styles.touchable } onPress={() => navigation.navigate('Journal')} activeOpacity={0.5}>
            <View style= {theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style= {theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}> 
                <Image style={[styles.imageStyle, {height: dim, width: dim}]} source = {require('../../../assets/images/illustration_3.png')} resizeMethod="scale" resizeMode='contain'/>
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={ styles.titleElem}>{dictionnary.selftHelp.MyJournal}</Text>
                <Text style={ styles.featureDesc}>{dictionnary.selftHelp.JournalDescription}</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3.8)}} color={Colors.bluePrimary} /></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style= { styles.touchable } onPress={() => Alert.alert("Coming Soon!")} activeOpacity={0.5}>
            <View style= {theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style= {theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}> 
                <Image style={[styles.imageStyle, {height: dim, width: dim}]} source = {require('../../../assets/images/illustration_2.png')} resizeMethod="scale" resizeMode='contain'/>
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={ styles.titleElem}>{dictionnary.selftHelp.WellnessNavigator}</Text>
                <Text style={ styles.featureDesc}>{dictionnary.selftHelp.WellnessNavigatorDescription}</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3.8)}} color={Colors.bluePrimary} /></View>
            </View>
          </TouchableOpacity>
          {/* Coming soon message */}
          {/* <TouchableOpacity onPress={() => {Alert.alert("Coming Soon!")}} activeOpacity={0.5}>
            <View style= {theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style= {theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}> 
                <Image style={[styles.imageStyle, {height: dim, width: dim}]} source = {require('../../../assets/images/illustration_2.png')} resizeMethod="scale" resizeMode='contain' />
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={ styles.titleElem}>Wellness Journey</Text>
                <Text style={ styles.featureDesc}>Learn about wellness and how to manage your mental health.</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3.8)}} color={Colors.bluePrimary} /></View>
            </View>
          </TouchableOpacity>   */}
          <TouchableOpacity onPress={() => {navigation.navigate("BookSession")}} activeOpacity={0.5}>
            <View style= {theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style= {theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}> 
                <Image style={[styles.imageStyle, {height: dim, width: dim}]} source = {require('../../../assets/images/wellnessCharacter/talk-counsellor-circe.jpg')} />
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={styles.titleElem}>{dictionnary.selftHelp.MentalHealthSupport}</Text>
                <Text style={ styles.featureDesc}>{dictionnary.selftHelp.BookSessionCounsellor}</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3.8)}} color={Colors.bluePrimary} /></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www2.uottawa.ca/campus-life/health-wellness/student-health-wellness-centre')} activeOpacity={0.5}>
            <View style= {theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style= {theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}> 
                <Image style={[styles.imageStyle, {height: dim, width: dim}]} source = {require('../../../assets/images/illustration_4.png')} />
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={styles.titleElem}>{dictionnary.selftHelp.SeeDoctor}</Text>
                <Text style={ styles.featureDesc}>{dictionnary.selftHelp.SWHC}</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" style={{fontSize: RFPercentage(3.8)}} color={Colors.bluePrimary} /></View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
}
