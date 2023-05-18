import * as React from 'react';
import { View,Text, SafeAreaView, Image, FlatList, Animated } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import styles from './styles';
import ConfettiCannon from 'react-native-confetti-cannon';
import Points from '../../constants/Points';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native'
import darkModeStyles from './darkModeStyles';
import LanguageActions from '../../store/language/actions';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';


export default function PointSystem() {

  const navigation = useNavigation();

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

  //loading images 
  const badges = [
    { id:1,nameEN: 'Bronze',nameFR: 'Bronze',icon:require('../../../assets/images/badges/bronze.png'),points:Points.bronze},
    { id:2,nameEN: 'Silver',nameFR: 'Argent',icon:require('../../../assets/images/badges/silver.png'),points:Points.silver},
    { id:3,nameEN: 'Gold',nameFR: 'Or',icon:require('../../../assets/images/badges/gold.png'),points:Points.gold},
    { id:4,nameEN: 'Platinum',nameFR: 'Platine', icon:require('../../../assets/images/badges/platinum.png'),points:Points.platinum},
    { id:5,nameEN: 'Diamond',nameFR: 'Diamant', icon:require('../../../assets/images/badges/diamond.png'),points:Points.diamond}, 
  ];

  //actiosn that can be performed to earn points 
  const actions = [
    { id:1,nameEN: 'Creating account', nameFR: 'Creer un compte',frequencyEN:'One-time', frequencyFR:'Une seule fois',reward:Points.accountCreatedPoints},
    { id:2,nameEN: 'Sharing Wellness Tip',nameFR: 'Partager le conseil du jour',frequencyEN:'Daily',frequencyFR:'Chaque jour', reward:Points.shareWellnessTipPoints},
    { id:3,nameEN: 'Share an event',nameFR: 'Partager un évènement', frequencyEN:'Daily',frequencyFR:'Chaque jour',reward:Points.shareEventPoints},
    { id:4,nameEN: 'Create an avatar',nameFR: 'Creer un avatar', frequencyEN:'One-time',frequencyFR:'Une seule fois',reward:Points.createAvatarPoints},
    { id:5,nameEN: 'Enable notifications',nameFR: 'Activer les notifications',frequencyEN:'One-time', frequencyFR:'Une seule fois',reward:Points.notificationActivated},
    { id:6,nameEN: 'Complete daily mission',nameFR: 'Compléter une mission',frequencyEN:'Daily',frequencyFR:'Chaque jour', reward:Points.dailyMissionCompletedPoints},
    // { id: 'Book a service',frequency:'Daily', reward:Points.serviceBookedPoints}

  ]

  

  return (
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>  
      
      <ScrollView >

        {/* <Text style={styles.title}>How to earn points ?</Text> */}
        <View style={styles.titleContainer}>
                    <Ionicons onPress={() => navigation.goBack()} name="chevron-back-outline"
                    color={theme === 'light' ? 'black' : 'white'} style={styles.back} />
                    <Text style={theme === 'light' ? styles.title : darkModeStyles.title}>{dictionnary.pointSystem.Title}</Text>
        </View>
        <Text style={styles.subtitle}>{dictionnary.pointSystem.Explanation}</Text>
        <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.pointSystem.Introduction} </Text>
        <Text> </Text>
        <Image style={styles.image} source={{uri:'https://www2.uottawa.ca/campus-life/sites/g/files/bhrskd281/files/styles/max_width_xl_5120px/public/2021-08/Wellness%20Lounge-getting-involved.jpg?itok=uc2u4xMX'}}/>
        <Text style={styles.subtitle}>{dictionnary.pointSystem.Actions}</Text>
        <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.pointSystem.ActionsList}</Text>
        <FlatList
          data= {actions}
          renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={theme === 'light' ? styles.listitem : darkModeStyles.listitem}>{language==='english' ? item.nameEN : item.nameFR}</Text>
            <Text style={[styles.listitem,{color:'#104291'}]}>{item.reward} points</Text>
            <Text style={[styles.listitem,{color:'#91af51'}]}>{language==='english' ? item.frequencyEN : item.frequencyFR} </Text>
          </View>  
          )}
        /> 
        <Text></Text>
        <Text></Text>

        <Text style={styles.subtitle}>{dictionnary.pointSystem.Badges}</Text>

        <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.pointSystem.BadgeDescription}</Text>
        <FlatGrid
          itemDimension={115}
          data= {badges}
          style={styles.gridView}
          renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity>
              <Image style={styles.itemImage} source={item.icon}></Image>
            </TouchableOpacity>
            
            <Text style={theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{language==='english' ? item.nameEN : item.nameFR}</Text>
            <Text style={theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{item.points}</Text>
          </View>  
          )}
        /> 

        <Text style={styles.subtitle}>{dictionnary.pointSystem.Streaks}</Text>
        <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.pointSystem.StreaksDescription}</Text>

        <Image  style = {styles.image} source = {require('../../../assets/images/streak.png')} ></Image>
        {/* <Text style={[styles.body,{textAlign: 'center',alignContent: 'center',}]}>The streak icon.</Text> */}
        <Text/>
        

        <Text style={styles.subtitle}>{dictionnary.pointSystem.Leaderboard} </Text>
        <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.pointSystem.LeaderboardDescription}</Text>
        <Text/>
        <Text/>
        <Text style={styles.subtitle}>{dictionnary.pointSystem.Rewards}  </Text>
        <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.pointSystem.RewardsDescription}</Text>
        <Image style={styles.image} source={{uri:'https://www.tekportal.net/wp-content/uploads/2018/11/reward.png'}}/>

      </ScrollView>
    </SafeAreaView>
  );
};
