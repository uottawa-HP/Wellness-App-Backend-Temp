import React, { PureComponent, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Image, Appearance } from 'react-native';
import { IEvent } from '../interfaces';
import { getFullDate } from '../screens/EventDetails/utils';
import { Card } from 'react-native-elements';
import { Icon } from 'native-base';
import { RFPercentage } from 'react-native-responsive-fontsize';
import dictionnaryEN from '../constants/dictionnaryEN';
import dictionnaryFR from '../constants/dictionnaryFR';
import LanguageActions from '../store/language/actions';
import { useNavigation } from '@react-navigation/native';

const imageSource = {
    financial: require('../../assets/images/wellnessPillarsLogos/financial.png'),
    intellectual: require('../../assets/images/wellnessPillarsLogos/intellectual.png'),
    social: require('../../assets/images/wellnessPillarsLogos/social.png'),
    environmental: require('../../assets/images/wellnessPillarsLogos/environmental.png'),
    physical: require('../../assets/images/wellnessPillarsLogos/physical.png'),
    spiritual: require('../../assets/images/wellnessPillarsLogos/spiritual.png'),
    emotional: require('../../assets/images/wellnessPillarsLogos/emotional.png'),
    noPillar: require('../../assets/images/Employee-Assistance-Circle.jpg')
}

const currentDate = new Date();
const current = currentDate.toLocaleDateString();
const currentTime = currentDate.toLocaleTimeString();

class ListItem extends PureComponent<{item: IEvent, onPress: any, margin: string, width: string }> {
     
   
   
    render() {
        
        const theme = Appearance.getColorScheme();
        
         
        const fullTime = getFullDate(this.props.item.startDate).split(" ");
        const eventDate = this.props.item.startDate.toDateString().split(" ");
        const eventEnd = this.props.item.endDate.toDateString().split(" ");

        const getDate = () => {
            let date;
            if (fullTime.length===3){
                date = fullTime[0] + " " + this.props.item.startDate.getDate() + " " + eventDate[1];
            }            
            else if (eventDate[1]===eventEnd[1] && eventDate[2]===eventEnd[2] && eventDate[3]===eventEnd[3]) {
                date = this.props.item.startDate.getDate() + " " + eventDate[1];
            }
            else {
                date = this.props.item.startDate.getDate() + " " + eventDate[1] + " - " + this.props.item.endDate.getDate() + " " + eventEnd[1];
            }
            const eventTime = this.props.item.time;
            if(eventTime===undefined || eventTime==="NA" || eventTime==="N/A"){
                date = date;
            } else if (eventTime.toLowerCase()==="every day") {
                date += ", Every day";
            }
            else {
                date += " at " + fullTime[fullTime.length-1];
            }
            return date;
        }

        const getPillar = () => {
            const pillarList = this.props.item.pillar.split(",");
            
            for (let i = 0; i < pillarList.length; i++) {
                pillarList[i] = pillarList[i].trim();   
            }
            if (pillarList.length > 1) {
                //if there are mutliple pillars we return the first one for the picture
                return pillarList[0].toLowerCase();
            }  else {
                return pillarList[0].toLowerCase();
            }
        }

        const getTimeEvent = () => {

            
            const startTime = this.props.item.startDate.toLocaleTimeString();
            const endTime = this.props.item.endDate.toLocaleTimeString();
            const start = this.props.item.startDate.toLocaleDateString();
            const end = this.props.item.endDate.toLocaleDateString();
            if(this.props.item.time === undefined || this.props.item.time==="NA" || this.props.item.time==="NA"
            || this.props.item.time==="Every day"){
                return start <= current && current <= end;
            }
            return startTime < currentTime && currentTime < endTime &&
            start <= current && current <= end;
        }
        
        return (
            <TouchableHighlight 
            underlayColor = {theme === 'light' ? "#f8f4f4" : '#1a1a1a'}
            onPress = {this.props.onPress} style={{marginBottom: '2%'}}>
                <Card containerStyle={theme=== 'light' ? styles.row : styles.rowDark}>
                    <View style= {theme === 'light' ? styles.element : styles.elementDark}>
                        <View style= {theme === 'light' ? styles.imageContainer : styles.imageContainerDark}> 
                            <Image style={ styles.image } resizeMethod='scale' resizeMode='contain'
                            source = {this.props.item.pillar === undefined ? imageSource.noPillar :
                            getPillar() === "social" ? imageSource.social :
                            getPillar() === "intellectual" ? imageSource.intellectual :
                            getPillar() === "environmental" ? imageSource.environmental :
                            getPillar() === "physical" ? imageSource.physical :
                            getPillar() === "spiritual" ? imageSource.spiritual :
                            imageSource.emotional} />
                        </View>
                        <View style={theme === 'light' ? styles.contentContainer : styles.contentContainerDark}>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text style={styles.date}> {getDate()} </Text>
                            {getTimeEvent() ? <Text style={styles.live}>{LanguageActions.getLanguage()==='english' ? 'Live' : 'En cours'}</Text> 
                            : null}
                            </View>
                            <Text numberOfLines={1} style = {theme === 'light' ? styles.title : styles.titleDark}>{LanguageActions.getLanguage()==='english' ? this.props.item.nameEN : this.props.item.nameFR}</Text>
                            <Text style = {styles.location}>
                            <Icon type="Ionicons" name="ios-location-sharp" style={theme === 'light' ? styles.locationIcon : styles.locationIconDark}/>
                                {this.props.item.location != undefined ? this.props.item.location : "N/A"}
                            </Text>
                        </View>
                    </View>
                 </Card>
        </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    event: {
        textAlign: 'left',
        alignContent: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        height: 110,
        marginVertical: '2%'
    },
    row: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-end',
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        paddingVertical: '1%',
        marginVertical: '2%',
        marginHorizontal: '6%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset:{  width: 1.5,  height: 1.5 },
        shadowOpacity: 0.3,
        elevation: 1,
        textAlign: 'left',
        width: '88%'
    },
    contentContainer: {
        paddingLeft: '1%',
        width: '75%',
        backgroundColor: 'white',
      },
    title: {
        fontSize: RFPercentage(3),
        fontFamily: 'BarlowCondensed_500Medium',
        color: '#202319',
        marginVertical: '1%',
        marginLeft: '1%'
    },
    location: {
        color: '#939393',
        fontSize: RFPercentage(2.5),
        fontFamily: 'BarlowCondensed_400Regular',
        marginVertical: '1%'
    }, 
    date: {
        color: '#EE9276',
        fontFamily: 'BarlowCondensed_400Regular',
        fontSize: RFPercentage(2.5),
        marginVertical: '1%',
        textAlign: 'right',
    },
    imageContainer: {
        width: '25%',
        backgroundColor: 'white',
    },
    image: {
        width: '65%',
        height: '65%',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: '10%',
        marginLeft: '5%'
    }, 
    locationIcon: {
        color: '#939393',
        fontSize: RFPercentage(2.5)
    },
    live: {
        fontFamily: 'BarlowCondensed_600SemiBold',
        fontSize: RFPercentage(2.5),
        color: '#B9CA83',
        marginLeft: '70%',
        marginRight: '5%',
        position: 'absolute'
    }, 
    element: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 10,
    },
    // darkModeStyle
    rowDark: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-end',
        alignSelf: 'stretch',
        backgroundColor: '#0d0d0d',
        paddingVertical: '1%',
        marginVertical: '2%',
        marginHorizontal: '6%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        borderWidth: 0,
        shadowOffset:{  width: 1.5,  height: 1.5 },
        shadowOpacity: 0.5,
        shadowColor: '#2e2e2e',
        elevation: 1,
        textAlign: 'left',
        width: '88%'
    },
    elementDark: {
        flexDirection: 'row',
        backgroundColor: '#0d0d0d',
        marginVertical: 10,
    },
    imageContainerDark: {
        width: '25%',
        backgroundColor: '#0d0d0d',
    },
    contentContainerDark: {
        paddingLeft: '1%',
        width: '75%',
        backgroundColor: '#0d0d0d',
    },
    titleDark: {
        fontSize: RFPercentage(3),
        fontFamily: 'BarlowCondensed_500Medium',
        color: 'white',
        marginVertical: '1%',
        marginLeft: '1%'
    },
    locationIconDark: {
        color: '#adadad',
        fontSize: RFPercentage(2.5)
    },
})

export default ListItem;