import * as React from 'react';
import { ScrollView, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import { Text, View } from '../../components/Themed';
import styles from './styles';
import Colors from '../../constants/Colors';
import CoolIcons from '../../../assets/CoolIcons';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native-appearance';
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function Contact() {
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  //phone numbers 
  const ont = 18669255454;
  const can = 18336285589;
  const int = 12159428478;

  const urlSession = 'https://sassit.uottawa.ca/ventus/counselling/intake-form.php';

  //boolean value to expand the accordion list on touch of the user
  const handlePress = () => setExpanded(!expanded);

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
  // handles light/dark mode appearance
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Reach Out</Text>

        <Card containerStyle={theme === 'light' ? styles.cardEmerg : darkModeStyles.cardEmerg}>

          <List.Accordion
            title="Emergency Contacts"
            expanded={expanded}
            onPress={handlePress}
            theme={{ colors: { background: Colors.blueSecondary } }}
            titleStyle={styles.titleEcall}>
            <List.Item onPress={() => Linking.openURL(`tel:${ont}`)} title="Ontario - Good2Talk" titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone" color={"black"} style={{fontSize: RFPercentage(1.8)}}/></View>} />
            <List.Item onPress={() => Linking.openURL(`tel:${can}`)} title="Canada - EmpowerMe" titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone"  color={"black"} style={{fontSize: RFPercentage(1.8)}}/></View>} />
            <List.Item onPress={() => Linking.openURL(`tel:${int}`)} title="Outside Canada - International SOS" titleStyle={styles.callText} left={props => <View style={styles.ddIcon}><CoolIcons name="phone" color={"black"} style={{fontSize: RFPercentage(1.8)}}/></View>} />
          </List.Accordion>
        </Card>

        <TouchableOpacity onPress={() => navigation.navigate('BookSession')} activeOpacity={0.7}>
          <Card containerStyle={theme === 'light' ? styles.cardSession : darkModeStyles.cardSession}>
            <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style={theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../../../assets/images/illustration_4.png')} />
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={theme === 'light' ? styles.featureDesc : darkModeStyles.featureDesc}>Book a session to talk to a counsellor or a mental health specialist.</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" color={Colors.bluePrimary} style={{fontSize: RFPercentage(3)}}/></View>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SocialIntents')} activeOpacity={0.7}>
          <Card containerStyle={theme === 'light' ? styles.cardSession : darkModeStyles.cardSession}>
            <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style={theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../../../assets/images/illustration_3.png')} />
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={theme === 'light' ? styles.featureDesc : darkModeStyles.featureDesc}>Chat with a peer expert or a mentor through the Wellness Chat.</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" color={Colors.bluePrimary} style={{fontSize: RFPercentage(3)}}/></View>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://bywardfht.ca/our-clinic/registration-and-appointments/')} activeOpacity={0.7}>
          <Card containerStyle={theme === 'light' ? styles.cardSession : darkModeStyles.cardSession}>
            <View style={theme === 'light' ? styles.element : darkModeStyles.element}>
              <View style={theme === 'light' ? styles.imageContainer : darkModeStyles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../../../assets/images/illustration_2.png')} />
              </View>
              <View style={theme === 'light' ? styles.contentContainer : darkModeStyles.contentContainer}>
                <Text style={theme === 'light' ? styles.featureDesc : darkModeStyles.featureDesc}>Need to see a doctor? Book an appoitment with the Byward Family Health Team.</Text>
              </View>
              <View style={theme === 'light' ? styles.iconContainer : darkModeStyles.iconContainer}><CoolIcons name="chevron_big_right" color={Colors.bluePrimary} style={{fontSize: RFPercentage(3)}}/></View>
            </View>
          </Card>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
}
