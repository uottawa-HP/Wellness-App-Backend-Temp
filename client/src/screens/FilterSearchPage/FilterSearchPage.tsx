import React, {useState, useEffect} from "react";
import { Text } from 'native-base';
import { View, TouchableOpacity, ScrollView} from "react-native";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import { CheckBox } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import darkModeStyles from "./darkModeStyles";
import { Appearance } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import dictionnaryFR from "../../constants/dictionnaryFR";
import dictionnaryEN from "../../constants/dictionnaryEN";
import LanguageActions from "../../store/language/actions";


export default function FilterSearchPage({route}: {route:any}) {
    
    const navigation = useNavigation();

    const [theme, setTheme] = useState(Appearance.getColorScheme());
    // handles light/dark mode appearance
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
        });
       return () => subscription.remove();
        return;
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
    
    // stores the filters chosen on the main Events page
    let filtersChosen = route.params;

    // handles the list accordion
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    // set the state of the buttons when entering the page
    const initialFilter = () => {
        for (let i = 0; i < filtersChosen.length; i++) {
            if (filtersChosen[i] === "this week") setIsThisWeek(true);
            else if (filtersChosen[i] === "next week") setIsNextWeek(true);
            else if (filtersChosen[i] === "this month") setIsThisMonth(true);
            else if (filtersChosen[i] === 'virtual') setIsVirtual(true);
            else if (filtersChosen[i] === 'in-person') setIsInPerson(true);
            else if (filtersChosen[i] === 'financial') setIsFinancial(true);
            else if (filtersChosen[i] === 'intellectual') setIsIntellectual(true);
            else if (filtersChosen[i] === 'social') setIsSocial(true);
            else if (filtersChosen[i] === 'environmental') setIsEnvironmental(true);
            else if (filtersChosen[i] === 'physical') setIsPhysical(true);
            else if (filtersChosen[i] === 'spiritual') setIsSpiritual(true);
            else if (filtersChosen[i] === 'emotional') setIsEmotional(true);
        }
    }

    //filters for date
    const [isThisWeek, setIsThisWeek] = useState(false);
    const [isNextWeek, setIsNextWeek] = useState(false);
    const [isThisMonth, setIsThisMonth] = useState(false);
    
    //filters for mode
    const [isVirtual, setIsVirtual] = useState(false);
    const [isInPerson, setIsInPerson] = useState(false);

    // set state for the checkbox for the wellness pillars (true=checked, false=unchecked)
    const [isFinancial, setIsFinancial] = useState(false);
    const [isIntellectual, setIsIntellectual] = useState(false);
    const [isSocial, setIsSocial] = useState(false);
    const [isEnvironmental, setIsEnvironmental] = useState(false);
    const [isPhysical, setIsPhysical] = useState(false);
    const [isSpiritual, setIsSpiritual] = useState(false);
    const [isEmotional, setIsEmotional] = useState(false);
    const removeItem = (arr:string[], item:string) => {
        // Modifies the array in place instead of making a copy
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    // updates the filter array
    const filterSet = () => {
        if (isThisWeek && !filtersChosen.includes("this week")) {
            filtersChosen.push("this week");
        } else if (!isThisWeek && filtersChosen.includes("this week")) {
            removeItem(filtersChosen, "this week");
        }

        if (isNextWeek && !filtersChosen.includes("next week")) {
            filtersChosen.push("next week");
        } else if (!isNextWeek && filtersChosen.includes("next week")) {
            removeItem(filtersChosen, "next week");
        }

        if (isThisMonth && !filtersChosen.includes("this month")) {
            filtersChosen.push("this month");
        } else if (!isThisMonth && filtersChosen.includes("this month")) {
            removeItem(filtersChosen, "this month");
        }
        //if (isThisSemester) filtersChosen.push("this semester");

        if (isVirtual && !filtersChosen.includes("virtual")) {
            filtersChosen.push("virtual");
        } else if (!isVirtual && filtersChosen.includes("virtual")) {
            removeItem(filtersChosen, "virtual");
        }

        if (isInPerson && !filtersChosen.includes("in-person")) {
            filtersChosen.push("in-person");
        } else if (!isInPerson && filtersChosen.includes("in-person")) {
            removeItem(filtersChosen, "in-person");
        }

        if (isFinancial && !filtersChosen.includes("financial")) {
            filtersChosen.push("financial");
        } 
        else if (!isFinancial && filtersChosen.includes("financial")) {
            removeItem(filtersChosen, "financial");
        }
        if (isIntellectual && !filtersChosen.includes("intellectual")) {
            filtersChosen.push("intellectual");
        } 
        else if (!isIntellectual && filtersChosen.includes("intellectual")) {
            removeItem(filtersChosen, "intellectual");
        }

        if (isSocial && !filtersChosen.includes("social")) {
            filtersChosen.push("social");
        } else if (!isSocial && filtersChosen.includes("social")) {
            removeItem(filtersChosen, "social");
        }
        
        if (isEnvironmental && !filtersChosen.includes("environmental")) {
            filtersChosen.push("environmental");
        } 
        else if (!isEnvironmental && filtersChosen.includes("environmental")) {
            removeItem(filtersChosen, "environmental");
        }
       
        if (isPhysical && !filtersChosen.includes("physical")) {
            filtersChosen.push("physical");
        } else if (!isPhysical && filtersChosen.includes("physical")) {
            removeItem(filtersChosen, "physical");
        }
        
        if (isSpiritual && !filtersChosen.includes("spiritual")) {
            filtersChosen.push("spiritual");
        } 
        else if (!isSpiritual && filtersChosen.includes("spiritual")) {
            removeItem(filtersChosen, "spiritual");
        }

        if (isEmotional && !filtersChosen.includes("emotional")) {
            filtersChosen.push("emotional");
        } 
        else if (!isEmotional && filtersChosen.includes("emotional")) {
            removeItem(filtersChosen, "emotional");
        }
                // goes back to the main Events page and applies the filters
        navigation.navigate('Events', filtersChosen);
    }

    // reset all the filers selected
    const filterRemove = () => {
        setIsThisWeek(false);
        setIsNextWeek(false);
        setIsThisMonth(false);
        //setIsThisSemester(false);
        setIsVirtual(false);
        setIsInPerson(false);
        setIsFinancial(false);
        setIsIntellectual(false);
        setIsSocial(false);
        setIsEnvironmental(false);
        setIsPhysical(false);
        setIsSpiritual(false);
        setIsEmotional(false);
        removeItem(filtersChosen, "this week");
        removeItem(filtersChosen, "next week");
        removeItem(filtersChosen, "this month");
        removeItem(filtersChosen, "virtual");
        removeItem(filtersChosen, "in-person");
        removeItem(filtersChosen, "this week");
        removeItem(filtersChosen, "financial");
        removeItem(filtersChosen, "intellectual");
        removeItem(filtersChosen, "social");
        removeItem(filtersChosen, "environmental");
        removeItem(filtersChosen, "physical");
        removeItem(filtersChosen, "spiritual");
        removeItem(filtersChosen, "emotional");
        // goes back to the main Events page and clear all the filters
        navigation.navigate('Events', filtersChosen)
    }

    // preventing option from the same category to be chosen at the same time
    const changeState = (btnPressed: string) => {
        if (btnPressed === "this week") {
          if (isThisWeek === false) {
            setIsThisWeek(!isThisWeek);
            setIsNextWeek(false);
            setIsThisMonth(false);
          } else {
              setIsThisWeek(!isThisWeek);
          }
        }
        else if (btnPressed === "next week") {
            if (isNextWeek === false) {
              setIsNextWeek(!isNextWeek);
              setIsThisWeek(false);
              setIsThisMonth(false);
            } else {
                setIsNextWeek(!isNextWeek);
            }
        }
        else if (btnPressed === "this month") {
            if (isThisMonth === false) {
                setIsThisMonth(!isThisMonth);
                setIsNextWeek(false);
                setIsThisWeek(false);
            } else {
                setIsThisMonth(!isThisMonth);
            }
        } 
        else if (btnPressed === "virtual") {
            if (isVirtual === false) {
                setIsVirtual(!isVirtual);
                setIsInPerson(false);
            } else {
                setIsVirtual(!isVirtual);
            }
        }
        else if (btnPressed === "in-person") {
            if (isInPerson === false) {
                setIsInPerson(!isInPerson);
                setIsVirtual(false);
            } else {
                setIsInPerson(!isInPerson);
            }
        }
    };

    // call method to initialise filters on first load
    useEffect(() => {
      initialFilter();
    },[])

    return (
        <SafeAreaView style={theme === 'light' ? styles.container : darkModeStyles.container}>
            <View style={theme === 'light' ? styles.headerContainer : darkModeStyles.headerContainer}>
                <Text style={theme === 'light' ? styles.titlePage : darkModeStyles.titlePage}>{dictionnary.filterSearchPage.Filters}</Text>
                <View style={theme === 'light' ? styles.backContainer : darkModeStyles.backContainer}>
                    <AntDesign onPress={() => navigation.goBack()} name="close" style={{fontSize: RFPercentage(3.8)}} color={theme==='light' ? 'black' : 'white'} />
                </View>
            </View>
            <ScrollView>
            <View style={styles.optionContainer}>
                <List.Accordion 
                    title={dictionnary.filterSearchPage.Date}
                    style={[theme === 'light' ? styles.listAccordian : darkModeStyles.listAccordian,
                        {borderBottomWidth: 0.5, borderColor: theme === 'light' ? '#C9C9C9' : '#303030'}]}
                    theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
                    text: theme === 'light' ? 'black' : 'white' }}} 
                    titleStyle={theme === 'light' ? styles.listAccordionTitle : darkModeStyles.listAccordionTitle}>
                    <View style={styles.filterContainer}>
                        <View style={styles.dataContainer}>
                            <TouchableOpacity style={isThisWeek ? styles.itemContainerPressed : theme === 'light' ? 
                                styles.itemContainer : darkModeStyles.itemContainer} onPress={() => changeState("this week")}>
                                <Text style={isThisWeek ? styles.itemNamePressed : 
                                    theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{dictionnary.filterSearchPage.ThisWeek}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={isNextWeek ? styles.itemContainerPressed : theme === 'light' ? 
                                styles.itemContainer : darkModeStyles.itemContainer} onPress={() => changeState("next week")}>
                                <Text style={isNextWeek ? styles.itemNamePressed : 
                                    theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{dictionnary.filterSearchPage.NextWeek}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={isThisMonth ? styles.itemContainerPressed : theme === 'light' ? 
                                styles.itemContainer : darkModeStyles.itemContainer} onPress={() => changeState("this month")}>
                                <Text style={isThisMonth ? styles.itemNamePressed : 
                                    theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{dictionnary.filterSearchPage.ThisMonth}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </List.Accordion>
                <List.Accordion 
                    title={dictionnary.filterSearchPage.Mode}
                    style={[theme === 'light' ? styles.listAccordian : darkModeStyles.listAccordian,
                    {borderBottomWidth: 0.5, borderColor: theme === 'light' ? '#C9C9C9' : '#303030'}]}
                    theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
                        text: theme === 'light' ? 'black' : 'white'}}} 
                    titleStyle={theme === 'light' ? styles.listAccordionTitle : darkModeStyles.listAccordionTitle}>
                    <View style={styles.filterContainer}>
                        <View style={styles.dataContainer}>
                            <TouchableOpacity style={isVirtual ? styles.itemContainerPressed : theme === 'light' ? 
                                styles.itemContainer : darkModeStyles.itemContainer} onPress={() => changeState("virtual")}>
                                <Text style={isVirtual ? styles.itemNamePressed : 
                                    theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{dictionnary.filterSearchPage.Virtual}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={isInPerson ? styles.itemContainerPressed : theme === 'light' ? 
                                styles.itemContainer : darkModeStyles.itemContainer} onPress={() => changeState("in-person")}>
                                <Text style={isInPerson ? styles.itemNamePressed : 
                                    theme === 'light' ? styles.itemName : darkModeStyles.itemName}>{dictionnary.filterSearchPage.InPerson}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </List.Accordion>
                <List.Accordion 
                    title={dictionnary.filterSearchPage.WellnessPillars}
                    expanded={expanded}
                    onPress={handlePress}
                    style={[theme === 'light' ? styles.listAccordian : darkModeStyles.listAccordian,
                    {borderBottomWidth: 0.5, borderColor: theme === 'light' ? '#C9C9C9' : '#303030'}]}
                    theme={{ colors: { primary: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? '#fcfcfc' : 'black',
                    text: theme === 'light' ? 'black' : 'white',  }}}
                    titleStyle={theme === 'light' ? styles.listAccordionTitle : darkModeStyles.listAccordionTitle}>
                    
                    <View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox 
                                checked={isFinancial} 
                                onPress={() => setIsFinancial(!isFinancial)} />
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Financial}</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox checked={isIntellectual} onPress={() => setIsIntellectual(!isIntellectual)}/>
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Intellectual}</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox checked={isSocial} onPress={() => setIsSocial(!isSocial)}/>
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Social}</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox checked={isEnvironmental} onPress={() => setIsEnvironmental(!isEnvironmental)}/>
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Environmental}</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox checked={isPhysical} onPress={() => setIsPhysical(!isPhysical)}/>
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Physical}</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox checked={isSpiritual} onPress={() => setIsSpiritual(!isSpiritual)}/>
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Spiritual}</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox checked={isEmotional} onPress={() => setIsEmotional(!isEmotional)}/>
                            <Text style={theme === 'light' ? styles.wellnessPillar : darkModeStyles.wellnessPillar}>{dictionnary.filterSearchPage.Emotional}</Text>
                        </View>
                    </View>
                </List.Accordion>
            </View>
            <View style={theme === 'light' ? styles.buttonsContainer : darkModeStyles.buttonsContainer}>
                <TouchableOpacity style={styles.applyBtn} onPress={() => filterSet()}>
                    <Text style={styles.applyText}>{dictionnary.filterSearchPage.ApplyFilters} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={theme === 'light' ? styles.clearBtn : darkModeStyles.clearBtn} onPress={() => filterRemove()}>
                    <Text style={styles.clearText}>{dictionnary.filterSearchPage.ClearAll}</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
