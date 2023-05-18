import * as React from 'react';
import { Dimensions, Image } from 'react-native';

import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import { SvgUri } from 'react-native-svg';

import { Text, View } from '../../components/Themed';
import styles from './styles';
import Points from '../../constants/Points';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native'
import darkModeStyles from './darkModeStyles';


//interface for an element of the leaderboard 
interface LeaderboardItemProps {
    rank: any,
    user: String,
    points: any,
    avatar: any,
    self: Boolean
}
const LeaderboardItem: React.FC<LeaderboardItemProps> = (props: LeaderboardItemProps) => {
    // Badge images based on points system
    const badges = '../../../assets/images/badges';

    const [theme, setTheme] = useState(Appearance.getColorScheme());

    // handles light/dark mode appearance
    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
      });
     return () => subscription.remove();
    }, []);
    
    let dim = Dimensions.get('window').width*0.13
    let badgeSize = Dimensions.get('window').width*0.09
    
    return (
        <>
            {/* Special cell background if in Top 3 overall or the user's  */}
            <View style={[styles.itemRow, props.self ? styles.self : props.rank === 1 ? (theme === 'light' ? styles.first : darkModeStyles.first) : 
                props.rank === 2 ? (theme === 'light' ? styles.second : darkModeStyles.second): props.rank === 3 ? (theme === 'light' ? styles.third : darkModeStyles.third) : styles.regularUser]}>
                {/* If highlighted cell then use different style so text is visible in darker background */}
                <View style={styles.colRank}><Text style={props.self || props.rank === 1 || props.rank === 2 || props.rank === 3 ? styles.rankSpecial : styles.rank}>{props.rank}</Text></View>
                <View style={styles.avatarIcon}>
                    <SvgUri
                        width={dim}
                        height={dim}
                        uri={props.avatar}
                    />
                </View>
                <View style={styles.name}><Text style={styles.user}>{props.user}</Text></View>
                <View style={styles.colBadge}>
                    {/* Checking points means to pass 1 less variable to frontend from the backend */}
                    {
                        props.points >= Points.diamond ? <Image style={{width: badgeSize, height: badgeSize, alignSelf: 'flex-start'}} source={require(badges + '/diamond.png')} /> :
                            props.points >= Points.platinum ? <Image style={{width: badgeSize, height: badgeSize, alignSelf: 'flex-start'}} source={require(badges + '/platinum.png')} /> :
                                props.points >= Points.gold ? <Image style={{width: badgeSize, height: badgeSize, alignSelf: 'flex-start'}} source={require(badges + '/gold.png')} /> :
                                    props.points >= Points.silver ? <Image style={{width: badgeSize, height: badgeSize, alignSelf: 'flex-start'}} source={require(badges + '/silver.png')} /> :
                                        props.points >= Points.bronze ? <Image style={{width: badgeSize, height: badgeSize, alignSelf: 'flex-start'}} source={require(badges + '/bronze.png')} /> :
                                            <Text />
                    }
                </View>
                <View style={styles.colPoints}><Text style={styles.points}>{props.points}</Text></View>
            </View>
            <Divider />
        </>
    );
};

LeaderboardItem.propTypes = { rank: PropTypes.any.isRequired, user: PropTypes.string.isRequired, points: PropTypes.any.isRequired, avatar: PropTypes.string.isRequired, self: PropTypes.any }

export default LeaderboardItem;
