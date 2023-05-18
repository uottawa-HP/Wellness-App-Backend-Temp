import * as React from 'react';


import { Component, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import styles from './styles';
import WebView from 'react-native-webview';

import { List, Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { connect, useDispatch } from 'react-redux';

import AuthActions from '../../store/auth/actions';
import Points from '../../constants/Points';
import { Appearance } from 'react-native'
import darkModeStyles from './darkModeStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';

interface CreateAvatarProps extends Component {
  auth: any,
  errors: any
}

interface CreateAvatar {
  email: String,
  password: String
}

const mapStateToProps = (state: CreateAvatarProps) => ({
  auth: state.auth,
  errors: state.errors
});
//this screen has access to the props values
const CreateAvatar: React.FC<CreateAvatarProps> = (props: CreateAvatarProps) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  //Create Avatar on first load
  useEffect(() => {
    //url used to fetch the avatar
    setcurrentHtml("<center><img width='400' height='400' src='https://avataaars.io/?avatarStyle=Circle&topType=" + props.auth.user.avatar.top + "&accessoriesType=" + props.auth.user.avatar.accessories + "&hairColor=" + props.auth.user.avatar.hairColor + "&facialHairType=" + props.auth.user.avatar.facialHair + "&facialHairColor=Brown&clotheType=" + props.auth.user.avatar.clothes + "&clotheColor=Blue03&eyeType=" + props.auth.user.avatar.eyes + "&eyebrowType=" + props.auth.user.avatar.eyebrows + "&mouthType=" + props.auth.user.avatar.mouth + "&skinColor=" + props.auth.user.avatar.skin + "'/><center>");
  }, []);

  //Refresh tip when screen goes out of focus
  useEffect(() => {
    const unsubscribe = () => {
      navigation.addListener('blur', (e) => {
        AuthActions.updateUser(props.auth.user);
      });
    }
    unsubscribe();
  }, [navigation]);

  //updating the URL that refresh the webview

  const [currentHtml, setcurrentHtml] = useState("<center><img width='400' height='400' src='https://avataaars.io/?avatarStyle=Circle&topType=" + props.auth.user.avatar.top + "&accessoriesType=" + props.auth.user.avatar.accessories + "&hairColor=" + props.auth.user.avatar.hairColor + "&facialHairType=" + props.auth.user.avatar.facialHair + "&facialHairColor=Brown&clotheType=" + props.auth.user.avatar.clothes + "&clotheColor=Blue03&eyeType=" + props.auth.user.avatar.eyes + "&eyebrowType=" + props.auth.user.avatar.eyebrows + "&mouthType=" + props.auth.user.avatar.mouth + "&skinColor=" + props.auth.user.avatar.skin + "'/><center>");

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


  //Array containing all the options for the 
  const topOptions = [
    { value: "NoHair", label: dictionnary.createAvatar.NoHair },
    { value: "Eyepatch", label: dictionnary.createAvatar.Eyepatch },
    { value: "Hat", label: dictionnary.createAvatar.Hat },
    { value: "Hijab", label: dictionnary.createAvatar.Hijab },
    { value: "Turban", label: dictionnary.createAvatar.Turban },
    { value: "WinterHat1", label: dictionnary.createAvatar.WinterHat1 },
    { value: "WinterHat2", label: dictionnary.createAvatar.WinterHat2 },
    { value: "WinterHat3", label: dictionnary.createAvatar.WinterHat3 },
    { value: "WinterHat4", label: dictionnary.createAvatar.WinterHat4 },
    { value: "LongHairBigHair", label: dictionnary.createAvatar.LongandBigHair },
    { value: "LongHairBob", label: dictionnary.createAvatar.LongHairBun },
    { value: "LongHairBun", label: dictionnary.createAvatar.LongHairBun },
    { value: "LongHairCurly", label: dictionnary.createAvatar.LongHairCurly },
    { value: "LongHairCurvy", label: dictionnary.createAvatar.LongHairCurvy },
    { value: "LongHairDreads", label: dictionnary.createAvatar.LongHairDreads },
    { value: "LongHairFrida", label: dictionnary.createAvatar.LongHairFrida },
    { value: "LongHairFro", label: dictionnary.createAvatar.LongHairFro },
    { value: "LongHairFroBand", label: dictionnary.createAvatar.LongHairFroBand },
    { value: "LongHairNotTooLong", label: dictionnary.createAvatar.SemiLongHair },
    { value: "LongHairMiaWallace", label: dictionnary.createAvatar.LongMiaWallace },
    { value: "LongHairStraight", label: dictionnary.createAvatar.LongHairStraight1 },
    { value: "LongHairStraight2", label: dictionnary.createAvatar.LongHairStraight2 },
    { value: "LongHairStraightStrand", label: dictionnary.createAvatar.LongStraightStrand },
    { value: "ShortHairDreads01", label: dictionnary.createAvatar.ShortDreads1 },
    { value: "ShortHairDreads02", label: dictionnary.createAvatar.ShortDreads2 },
    { value: "ShortHairFrizzle", label: dictionnary.createAvatar.ShortHairFrizzle },
    { value: "ShortHairShaggyMullet", label: dictionnary.createAvatar.ShortShaggyMullet },
    { value: "ShortHairShortCurly", label: dictionnary.createAvatar.ShortCurly },
    { value: "ShortHairShortFlat", label: dictionnary.createAvatar.ShortFlat },
    { value: "ShortHairShortRound", label: dictionnary.createAvatar.ShortFlat },
    { value: "ShortHairShortWaved", label: dictionnary.createAvatar.ShortWaved },
    { value: "ShortHairSides", label: dictionnary.createAvatar.ShortHairSides },
    { value: "ShortHairTheCaesar", label: dictionnary.createAvatar.TheCaesar},
    { value: "ShortHairTheCaesarSidePart", label: dictionnary.createAvatar.CaesarSidePart }
  ];
  //Array containing all the options for the accesories
  const accesoriesOptions = [
    { value: "Blank", label: dictionnary.createAvatar.Blank },
    { value: "Kurt", label: dictionnary.createAvatar.Kurt },
    { value: "Prescription01", label: dictionnary.createAvatar.Prescription1 },
    { value: "Prescription02", label: dictionnary.createAvatar.Prescription2 },
    { value: "Round", label: dictionnary.createAvatar.Round },
    { value: "Sunglasses", label: dictionnary.createAvatar.Sunglasses },
    { value: "Wayfarers", label: dictionnary.createAvatar.Wayfarers }
  ];
  //Array containing all the options for the hairColor
  const hairColorOptions = [
    { value: "Auburn", label: dictionnary.createAvatar.Auburn },
    { value: "Black", label: dictionnary.createAvatar.Black },
    { value: "Blonde", label: dictionnary.createAvatar.Blonde },
    { value: "BlondeGolden", label: dictionnary.createAvatar.BlondeGolden },
    { value: "Brown", label: dictionnary.createAvatar.Brown },
    { value: "BrownDark", label: dictionnary.createAvatar.BrownDark },
    { value: "PastelPink", label: dictionnary.createAvatar.PastelPink },
    { value: "Platinum", label: dictionnary.createAvatar.Platinum },
    { value: "Red", label: dictionnary.createAvatar.Red },
    { value: "SilverGray", label: dictionnary.createAvatar.SilverGray },
  ];
  //Array containing all the options for the facial hair
  const facialHairOptions = [
    { value: "Blank", label: dictionnary.createAvatar.Blank },
    { value: "BeardMedium", label: dictionnary.createAvatar.BeardMedium },
    { value: "BeardLight", label: dictionnary.createAvatar.BeardLight },
    { value: "BeardMajestic", label: dictionnary.createAvatar.BeardMajestic },
    { value: "MoustacheFancy", label: dictionnary.createAvatar.MoustacheFancy },
    { value: "MoustacheMagnum", label: dictionnary.createAvatar.MoustacheMagnum },
  ];
  //Array containing all the options for the clothes
  const clothesOptions = [
    { value: "BlazerShirt", label: dictionnary.createAvatar.BlazerShirt },
    { value: "BlazerSweater", label: dictionnary.createAvatar.BlazerSweater },
    { value: "CollarSweater", label: dictionnary.createAvatar.CollarSweater },
    { value: "GraphicShirt", label: dictionnary.createAvatar.GraphicShirt },
    { value: "Hoodie", label: dictionnary.createAvatar.Hoodie },
    { value: "Overall", label: dictionnary.createAvatar.Overall },
    { value: "ShirtCrewNeck", label: dictionnary.createAvatar.ShirtCrewNeck },
    { value: "ShirtScoopNeck", label: dictionnary.createAvatar.ShirtScoopNeck },
    { value: "ShirtVNeck", label: dictionnary.createAvatar.ShirtVNeck },
  ];
  //Array containing all the options for the eyes
  const eyesOptions = [
    { value: "Close", label: dictionnary.createAvatar.Close },
    { value: "Cry", label: dictionnary.createAvatar.Cry },
    { value: "Default", label: dictionnary.createAvatar.Default },
    { value: "Dizzy", label: dictionnary.createAvatar.Dizzy },
    { value: "EyeRoll", label: dictionnary.createAvatar.EyeRoll },
    { value: "Happy", label: dictionnary.createAvatar.Happy },
    { value: "Hearts", label: dictionnary.createAvatar.Hearts },
    { value: "Side", label: dictionnary.createAvatar.Side },
    { value: "Squint", label: dictionnary.createAvatar.Squint },
    { value: "Surprised", label: dictionnary.createAvatar.Surprised },
    { value: "Wink", label: dictionnary.createAvatar.Wink },
    { value: "WinkWacky", label: dictionnary.createAvatar.WinkWacky },
  ];
  //Array containing all the options for the mouth
  const mouthOptions = [
    { value: "Concerned", label: dictionnary.createAvatar.Concerned },
    { value: "Default", label: dictionnary.createAvatar.Default },
    { value: "Disbelief", label: dictionnary.createAvatar.Disbelief },
    { value: "Eating", label: dictionnary.createAvatar.Eating },
    { value: "Grimace", label: dictionnary.createAvatar.Grimace },
    { value: "Sad", label: dictionnary.createAvatar.Sad },
    { value: "ScreamOpen", label: dictionnary.createAvatar.ScreamOpen },
    { value: "Serious", label: dictionnary.createAvatar.Serious },
    { value: "Smile", label: dictionnary.createAvatar.Smile },
    { value: "Tongue", label: dictionnary.createAvatar.Tongue },
    { value: "Twinkle", label: dictionnary.createAvatar.Twinkle },
    { value: "Vomit", label: dictionnary.createAvatar.Vomit },
  ];
  //Array containing all the options for the skin
  const skinOptions = [
    { value: "Tanned", label: dictionnary.createAvatar.Tanned },
    { value: "Yellow", label: dictionnary.createAvatar.Yellow },
    { value: "Pale", label: dictionnary.createAvatar.Pale },
    { value: "Light", label: dictionnary.createAvatar.Light },
    { value: "Brown", label: dictionnary.createAvatar.Brown },
    { value: "DarkBrown", label: dictionnary.createAvatar.DarkBrown },
    { value: "Black", label: dictionnary.createAvatar.Black },
  ];
  //Array containing all the options for the eyebrows
  const eyebrowOptions = [
    { value: "Angry", label:dictionnary.createAvatar.Angry },
    { value: "AngryNatural", label: dictionnary.createAvatar.AngryNatural },
    { value: "Default", label: dictionnary.createAvatar.Default },
    { value: "DefaultNatural", label: dictionnary.createAvatar.DefaultNatural },
    { value: "FlatNatural", label: dictionnary.createAvatar.FlatNatural },
    { value: "RaisedExcited", label: dictionnary.createAvatar.RaisedExcited },
    { value: "RaisedExcitedNatural", label: dictionnary.createAvatar.RaisedExcitedNatural },
    { value: "SadConcerned", label: dictionnary.createAvatar.SadConcerned },
    { value: "SadConcernedNatural", label: dictionnary.createAvatar.SadConcernedNatural },
    { value: "UnibrowNatural", label: dictionnary.createAvatar.UnibrowNatural },
    { value: "UpDown", label: dictionnary.createAvatar.UpDown },
    { value: "UpDownNatural", label: dictionnary.createAvatar.UpDownNatural },
  ];

  //these methods will avoid to have all the dropdown list expending at the same time 
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const [expanded5, setExpanded5] = React.useState(false);
  const [expanded6, setExpanded6] = React.useState(false);
  const [expanded7, setExpanded7] = React.useState(false);
  const [expanded8, setExpanded8] = React.useState(false);
  const [expanded9, setExpanded9] = React.useState(false);

  //manage the expanded sections
  function handleAccordionPressed(num: number) {
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(false);
    setExpanded4(false);
    setExpanded5(false);
    setExpanded6(false);
    setExpanded7(false);
    setExpanded8(false);
    setExpanded9(false);

    switch (num) {
      case 1:
        setExpanded1(!expanded1);
        break;
      case 2:
        setExpanded2(!expanded2);
        break;
      case 3:
        setExpanded3(!expanded3);
        break;
      case 4:
        setExpanded4(!expanded4);
        break;
      case 5:
        setExpanded5(!expanded5);
        break;
      case 6:
        setExpanded6(!expanded6);
        break;
      case 7:
        setExpanded7(!expanded7);
        break;
      case 8:
        setExpanded8(!expanded8);
        break;
      case 9:
        setExpanded9(!expanded9);
        break;

    }
  }


  //update the HTML that will be rendered in the webview
  //called everytime the user click on a button 

  function updateHTML(type: string, item: string) {

    //depending on the 'type' argument we change it

    if (type == "top") {
      props.auth.user.avatar.top = item;
    }
    if (type == "accessories") {
      props.auth.user.avatar.accessories = item;
    }
    if (type == "hairColor") {
      props.auth.user.avatar.hairColor = item;
    }
    if (type == "facialHair") {
      props.auth.user.avatar.facialHair = item;
    }
    if (type == "clothes") {
      props.auth.user.avatar.clothes = item;
    }
    if (type == "eyes") {
      props.auth.user.avatar.eyes = item;
    }
    if (type == "eyebrows") {
      props.auth.user.avatar.eyebrows = item;
    }
    if (type == "mouth") {
      props.auth.user.avatar.mouth = item;
    }
    if (type == "skin") {
      props.auth.user.avatar.skin = item;
    }

    //then we insert all the values inside the html
    let updatedHTML = "<center><img width='400' height='400' src='https://avataaars.io/?avatarStyle=Circle&topType=" + props.auth.user.avatar.top + "&accessoriesType=" + props.auth.user.avatar.accessories + "&hairColor=" + props.auth.user.avatar.hairColor + "&facialHairType=" + props.auth.user.avatar.facialHair + "&facialHairColor=Brown&clotheType=" + props.auth.user.avatar.clothes + "&clotheColor=Blue03&eyeType=" + props.auth.user.avatar.eyes + "&eyebrowType=" + props.auth.user.avatar.eyebrows + "&mouthType=" + props.auth.user.avatar.mouth + "&skinColor=" + props.auth.user.avatar.skin + "'/><center>";
    setcurrentHtml(updatedHTML);

  }

  //saves the avatar in the redux store of the user
  function saveAvatar() {

    //updating the game collection
    if (props.auth.game.avatarCreated == false) {
      //if it is the first time a user created the avatar, they earn points
      AuthActions.addPoints(Points.createAvatarPoints);
      AuthActions.setBooleanValue('avatarCreated',true);
    }

    //Adding the new avatr to the DB
    let updatedUser = props.auth.user;
    AuthActions.updateUser(updatedUser);
    
    navigation.goBack();
  }

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  // handles light/dark mode appearance
  useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(Appearance.getColorScheme());
      });
      return () => subscription.remove();
  }, []);

  const {width} = Dimensions.get("window");
  
  return (
    <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={false} style={{height: '55%'}}>
        <Text style={styles.subtitle}>{dictionnary.createAvatar.CreateAvatar}</Text>
       
          <WebView
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{ backgroundColor: 'transparent', flex: 1, minHeight: 420 }}
            //style={{marginTop: 300, flex: 1, width:450, height:500}}
            source={{ html: currentHtml }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='blue'
                size='large'
                style={{ flex: 1 }}
              />)}
          />
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* The first selector for the Top element */}

        <List.Accordion
          title={dictionnary.createAvatar.Skin}
          expanded={expanded9}
          onPress={() => handleAccordionPressed(9)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={skinOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: theme === 'light' ? 'rgb(210,207,200)' : '#a19f9a'}]} onPress={() => updateHTML("skin", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </List.Accordion>
        <List.Accordion
          title={dictionnary.createAvatar.Eyes}
          expanded={expanded6}
          onPress={() => handleAccordionPressed(6)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={eyesOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: theme === 'light' ? '#f9ce62' : '#f7c136'}]} onPress={() => updateHTML("eyes", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

        </List.Accordion>

        <List.Accordion
          title={dictionnary.createAvatar.Eyebrows}
          expanded={expanded7}
          onPress={() => handleAccordionPressed(7)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={eyebrowOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#ea7754' }]} onPress={() => updateHTML("eyebrows", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </List.Accordion>

        <List.Accordion
          title={dictionnary.createAvatar.Mouth}
          expanded={expanded8}
          onPress={() => handleAccordionPressed(8)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
            text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={mouthOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#8f001a' }]} onPress={() => updateHTML("mouth", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </List.Accordion>

        <List.Accordion

          title={dictionnary.createAvatar.Top}
          expanded={expanded1}
          onPress={() => handleAccordionPressed(1)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={topOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#91af51' }]} onPress={() => updateHTML("top", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

        </List.Accordion>

        <List.Accordion
          title={dictionnary.createAvatar.HairColor}
          expanded={expanded3}
          onPress={() => handleAccordionPressed(3)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={hairColorOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: theme === 'light' ? '#4ac1c0' : '#2badab'}]} onPress={() => updateHTML("hairColor", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

        </List.Accordion>

        <List.Accordion
          title={dictionnary.createAvatar.FacialHair}
          expanded={expanded4}
          onPress={() => handleAccordionPressed(4)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={facialHairOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#9b65ba' }]} onPress={() => updateHTML("facialHair", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

        </List.Accordion>

        <List.Accordion
          title={dictionnary.createAvatar.Clothes}
          expanded={expanded5}
          onPress={() => handleAccordionPressed(5)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={clothesOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#7063ba' }]} onPress={() => updateHTML("clothes", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

        </List.Accordion>


        <List.Accordion
          title={dictionnary.createAvatar.Accessories}
          expanded={expanded2}
          onPress={() => handleAccordionPressed(2)}
          style={{backgroundColor: theme === 'light' ? '#f6f6f6' : '#262626'}}
          theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
              text: theme === 'light' ? 'black' : 'white' }}} 
          titleStyle={theme === 'light' ? styles.titleList : darkModeStyles.titleList}>
          <FlatGrid
            itemDimension={width/4}
            data={accesoriesOptions}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#104291' }]} onPress={() => updateHTML("accessories", item.value)}>
                <Text style={styles.itemName}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

        </List.Accordion>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme === 'light' ? 'white' : '#171717'}}>
          <Button
            mode='contained'
            icon="check"
            labelStyle={{fontFamily: 'BarlowCondensed_500Medium',fontSize:RFPercentage(2.5)}}
            style={styles.buttonSubmit}
            onPress={() => saveAvatar()}>
            {dictionnary.createAvatar.SaveAvatar}
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>

  );
}

export default connect(mapStateToProps)(CreateAvatar);