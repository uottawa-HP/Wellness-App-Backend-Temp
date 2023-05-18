import * as React from 'react';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import styles from './styles';

import LeaderboardItem from './LeaderboardItem';
import LeaderboardContext from '../../context/leaderboardContext/leaderboardContext';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { DotIndicator } from 'react-native-indicators';
import LanguageActions from '../../store/language/actions';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';


// this file does not link to a stylesheet darkModeStyles.tsx,
// because only few changes were needed to support dark mode

interface LeaderboardItemProps {
    rank: any,
    user: String,
    points: any,
    avatar: any,
    self: Boolean
}

const Leaderboard: React.FC = () => {
    const navigation = useNavigation();
    //default element for the leaderboard
    const [leaderboard, setleaderboard] = React.useState([{
        rank: 0,
        user: "default",
        points: -1,
        avatar: "https://avataaars.io/?avatarStyle=Circle&topType=undefined&accessoriesType=undefined&hairColor=undefined&facialHairType=undefined&clotheType=undefined&eyeType=undefined&eyebrowType=undefined&mouthType=undefined&skinColor=undefined",
        self: false
    }]);

    //refresh the leaderboard on load 
    useEffect(() => {
        //retrieve the results from the backend 
        LeaderboardContext.buildList().then((result) => {
            // Update results and store in leaderboard react state variable
            setDisplayLoadingIconLeaderboard(false);
            setleaderboard(result);
        }).catch((error) => {
            // Log error - probably will never happen but used for debugging
            console.log(error);
        });
    }, []);

    const [theme, setTheme] = useState(Appearance.getColorScheme());
    const [displayLoadingIconLeaderboard,setDisplayLoadingIconLeaderboard] = useState(true);
  
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
  
    return (
        <View style={styles.itemContainer}>
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.titleContainer}>
                    <Ionicons onPress={() => navigation.goBack()} name="chevron-back-outline"  color='black' 
                        style={theme === 'light' ? styles.back : {color:'white', fontSize: RFPercentage(3.8),alignSelf: 'center'}} />
                    <Text style={styles.title}>{dictionnary.leaderboard.Leaderboard}</Text>
                    <Ionicons onPress={() => navigation.navigate("PointSystem")} name="information-circle" color='#9FB3D3' style={styles.info} />
                </View>
                <View style={styles.row}>
                    <View style={styles.colRank}><Text style={styles.header}>{dictionnary.leaderboard.Rank}</Text></View>
                    <View style={styles.colUser}><Text style={styles.userHeader}>{dictionnary.leaderboard.User}</Text></View>
                    <View style={styles.colBadge}><Text style={styles.header}>{dictionnary.leaderboard.Badge}</Text></View>
                    <View style={styles.colPoints}><Text style={styles.header}>{dictionnary.leaderboard.Points}</Text></View>
                </View>
            </SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {displayLoadingIconLeaderboard ? <DotIndicator color='#EA7754' size={7}/> :
                <>
                    {leaderboard.length > 1 && leaderboard.map((leader: LeaderboardItemProps, i: any) => {
                        return (
                            <LeaderboardItem
                                key={i}
                                rank={leader.rank}
                                user={leader.user}
                                avatar={leader.avatar}
                                points={leader.points}
                                self={leader.self}
                            />)
                    })}
                </>}
            </ScrollView>
        </View>
    );
}

export default connect()(Leaderboard);
