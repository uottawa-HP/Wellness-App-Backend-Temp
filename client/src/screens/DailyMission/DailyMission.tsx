import * as React from 'react';
import { connect, useDispatch } from "react-redux";
import { Button as ButtonElem, ScrollView, TouchableOpacity, SafeAreaView, Animated, PanResponder, Pressable, Image, Appearance, Button, Dimensions } from 'react-native';
import { Text, View } from '../../components/Themed';
import styles from './styles';

import Slider from '@react-native-community/slider';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { openURL } from 'expo-linking';

import {useEffect, useRef, useState } from 'react';

import AuthActions from '../../store/auth/actions';
import Points from '../../constants/Points';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import dictionnaryEN from '../../constants/dictionnaryEN';
import dictionnaryFR from '../../constants/dictionnaryFR';
import LanguageActions from '../../store/language/actions';
import darkModeStyles from '../DailyMission/darkModeStyles';
import { Ionicons } from '@expo/vector-icons';

// this file does not need darkModeStyles.tsx as a few changes were made to support dark mode


interface DailyMissionProps {
  auth: any;
}

const mapStateToProps = (state: DailyMissionProps) => ({
  auth: state.auth
});

//this screen has access to the redux values
const DailyMission: React.FC<DailyMissionProps> = (props: DailyMissionProps) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  //handles the language changes 
  const [language,setLanguage]=useState('english');
  const [dictionnary,setDictionnary] = useState(dictionnaryEN);

  // Retrieving dimensions of the window 
  let dim = Dimensions.get('window').width*0.5
  useEffect(() => {
    setLanguage(LanguageActions.getLanguage());
    setDictionnary(LanguageActions.getLanguage()==='english' ? dictionnaryEN : dictionnaryFR)
    //the daily mission for tuesdays are trivia question, we randomize them when openning the pop up screen
    if (new Date().getDay() == 2) {
      //if the day is tuesday, we randomise the quizz displayed
      randomQuizz();
    }
  }, []);

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  
    // handles light/dark mode appearance
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(Appearance.getColorScheme());
        });
        return () => subscription.remove();
    }, []);

  //handles the points to be added to the database 
  const gifts = { label : "You won "+Points.dailyMissionCompletedPoints+" points !",value : Points.dailyMissionCompletedPoints }

  //boolean value to keep track if the user completed the mission 
  const [dailyMissionCompleted,setDailyMissionCompleted] =useState(false);


  /* 
  Function called by all the daily missions when the user completed them. It will : 
   1) add the points to the redux store
   3) set the dailyStreakMission to true
   4) display to the screen "You won XX points"

  */
  const giveReward = () =>{

  //Adding points ot the user
  AuthActions.addPoints(Points.dailyMissionCompletedPoints);
  //SET DAILYMISSION COMPLETED IN REDUX STORE
  AuthActions.setBooleanValue('dailyStreakCompleted',true);
  //reset the last login date
  AuthActions.resetLastLoginDate(new Date())

  setDailyMissionCompleted(true);

  //displays the reward message 
  setCurrentRewardMessage(gifts.label.toString());
    
  }

  //for the one-time actions (trivia tuesday and the 3 doors )
  const onTimeMissionComplete = () => {
    AuthActions.setBooleanValue('dailyStreakCompleted',true);
  } 



  //controls the "Take one minute to breath"
  const [currentBreathImage, setCurrentBreathImage] = useState(require('../../../assets/images/dailyMissions/breathing2.gif'));
  const [timerVisible, setTimerVisible] = useState(true);
  const handleBreathingDone = () => {
    giveReward();
    setCurrentBreathImage(require('../../../assets/images/wellnessCharacter/squirrel.png'));
    setTimerVisible(false);
    setDailyMissionCompleted(true);
  }
  //controls for the gift 
  
  const [currentRewardMessage, setCurrentRewardMessage]=useState("");
  const [currentGiftImage, setCurrentGiftImage]= useState(require('../../../assets/images/dailyMissions/gift.png'));

  const handleGiftPressed = () => {
      setCurrentGiftImage(require('../../../assets/images/wellnessCharacter/squirrel.png'));
      giveReward();
  }
  //controls the quiz answers 

  //list of questions provided by the client
  const quizzQuestionsEN = [
    {question:"Marijuana is the most commonly used additictive drug after tobacco and alcohol.",explanation:"Indeed, its use is widespread among young people. In 2018, more than 11.8 million young adults used marijuana in the past year.",answer:true,source:"https://www.drugabuse.gov/publications/drugfacts/marijuana"},
    {question:"All uses of cocaine illegal?",explanation:"Cocaine can be used legally by health care providers as a local anesthetic for some surgeries. Recreational cocaine use is illegal.",answer:false,source:"https://www.drugabuse.gov/publications/drugfacts/cocaine"},
    {question:"Men battle substance abuse or dependency at rates about double those off women, 10.8% vs 5.8% respectively.",explanation:"Addiction is an individual disease that manifests differently for each person, and gender may play  a role in how addiction, treatment, and recovery are handled. The data in this question was collected by the National Survey on Drug Use and Health (NSDUH).",answer:true,source:"https://sunrisehouse.com/addiction-demographics/men/"},
    {question:"Cigarette smoke contains one chemical. That chemical is called nicotine.",explanation:"False! Cigarette smoke contains thousands of chemicals; 200 of them are known to be poisonous.",answer:false,source:"https://www.thelinkottawa.ca/en/alcohol-drugs-and-tobacco/tobacco.aspx"},
    {question:"Beverages with caffeine dehydrate you.",explanation:"Although this is true, healthy people who consume moderate amounts of caffeine don't lose more fluid than those who don't consume caffeine.",answer:true,source:"https://www.healthlinkbc.ca/health-topics/abk5466"},
    {question:"The human papillomavirus (HPV) is transmitted through intimate sexual contact between partners.",explanation:"The Human papillomavirus, or HPV, is the most common sexually transmitted infection in the world today. HPV is highly contagious and can spread by skin-to-skin contact in the genital area (penetration is not required) or during genital, anal or oral sex. Both men and women can be infected with HPV.",answer:true,source:"https://www.hpvinfo.ca/what-is-hpv/"},
    {question:"True or false: Marijuana is addictive.",explanation:"According to the National Institute on Drug Abuse and many other reputable/scientific sources, marijuana use can lead to the development of problem use, known as marijuana use disorder, which takes the form of addiction in severe cases. Please be cautious and mindful when consuming marijuana or any other recreational drug!",answer:true,source:"https://www.drugabuse.gov/publications/drugfacts/marijuana"},
    {question:"Youth Line offers confidential and non-judgemental peer support through their telephone, text and chat services.",explanation:"Youth Line offers confidential and non-judgemental peer support through their telephone (1-800-268-9688), text (647-694-4275) and chat services. Get in touch with a peer support volunteer from Sunday to Friday, 4:00PM to 9:30 PM.",answer:true,source:"https://www.youthline.ca "},
    {question:"Consent can be given by someone who is intoxicated.",explanation:"Consent for any sexual activity must be freely given. Consent cannot be given by someone who is intoxicated, unconscious, or otherwise considered incapable of giving their consent. Consent can also not be freely given if it follows from threats to personal safety, or threats to harm others.",answer:false,source:"https://www.sexandu.ca/consent/what-is-consent/"},
    {question:"Bacterial vaginosis (BV) is an infection that occurs when “harmful” bacteria outnumber the “good” bacteria that exist naturally in the vagina.",explanation:"It’s true! BV is the most common vaginal infection in women aged 15-44 and is the most common cause of vaginal discharge and odour.",answer:true,source:"https://www.sexandu.ca/your-body/bacterial-vaginosis/"},
    {question:"Opioids can be natural or fully/semisynthetic man-made drugs.",explanation:"Opioids are a class of drugs naturally found in the opium poppy plant. Some prescription opioids are made from the plant directly, and others are made by scientists in labs using the same chemical structure.",answer:true,source:"https://www.drugabuse.gov/publications/drugfacts/prescription-opioids  "},
    {question:"There are two types of the Herpes simplex virus (HSV).",explanation:"There are two types of the Herpes simplex virus (HSV). HSV-1 is primarily associated with oral infection, and the HSV-2 is primarily associated with genital infection. HSV-2 is present in about 20% of adults.",answer:true,source:"https://www.sexandu.ca/stis/herpes"},
    {question:"Herpes can be spread even when no symptoms are visible.",explanation:"Herpes is the most common cause of genital ulcerations, but the infection can be spread even when no symptoms are visible. ",answer:true,source:"https://www.sexandu.ca/stis/herpes"},
    {question:"You can create a dental dam from store bought condoms? ",explanation:"Store bought dental dams are available, or you can make one yourself out of a condom. Here's how: 1. Cut off the tip of the condom (closed end) 2. Cut off the ring of the condom (opened end) 3. Cut down the length of the condom Voila! You have a latex rectangle like a store-bought dental dam.",answer:true,source:"https://www.thelinkottawa.ca/en/sexual-health/condoms-and-dental-dams.aspx   "},
    {question:"True or false: inhalants are illegal.",explanation:"No, according to the National Institute on Drug Abuse, inhalants are often time solvents, aerosols, and gases found in household products such as spray paints, markers, glues, and cleaning fluids.",answer:false,source:"https://www.drugabuse.gov/publications/drugfacts/inhalants  "},
    {question:"Ancient Greek Olympians ran their races barefoot and naked.",explanation:"They sure did! From 776BC to 728BC, a 200m sprint called 'the stadion' was the only event in the games. There, they ran barefoot and naked.",answer:true,source:"https://www.historymuseum.ca/cmc/exhibitions/civil/greece/gr1090e.html  "},
    {question:"Giraffes and humans have the same number of neck vertebrae.",explanation:"It's true! Even though a giraffe's neck is much longer, they have the same number of vertebrae. It's the size of the bones that differ, with giraffes having vertebrae up to 10 inches long!",answer:true,source:"https://sciprogress.com/giraffe-vs-human-neck-bones/  "},
    {question:"Popcorn is a whole grain food.",explanation:"True! Popcorn is a whole grain food that packs in lots of fiber! It is a great, healthy snack.",answer:true,source:"https://www.healthline.com/nutrition/whole-grain-foods#TOC_TITLE_HDR_13 "},
    {question:"A fruit develops from the flower of a plant while vegetables come from the roots, stems and leaves.",explanation:"Fruits typically consist of seeds while vegetables consist of roots, stems, and leaves. Additionally, fruits and vegetables are often categorized by taste.",answer:true,source:"https://www.healthline.com/nutrition/fruits-vs-vegetables "},
    {question:"Diet does not influence energy production.",explanation:"Eating a balanced diet that includes a variety of unrefined carbohydrates, proteins, and fats, with an emphasis on vegetables, whole grains, and healthy oils can help in keeping your energy level high.",answer:false,source:"https://www.health.harvard.edu/healthbeat/eating-to-boost-energy"},
    {question:"Watermelon contains 65% water.",explanation:"Watermelon contains roughly 92% water. It is a great source of hydration, making it a great summer staple!",answer:false,source:"https://www.everydayhealth.com/diet-nutrition/diet/watermelon-nutrition-carbs-benefits-more-on-summer-staple/"},
    {question:"Small-scale farmers and agricultural workers are among the most marginalized by the global trade system.",explanation:"The global trading system has pushed small-scale farmers and agricultural labourers to the margins. Fairtrade is an organization that is developing a trade model that provides better prices, good working conditions, no child labour, excellent environmental standards, and solid business ties as a certification system that is 50 percent regulated by producers.",answer:true,source:"https://fairtrade.ca/what-is-fairtrade/  "},
    {question:"Air pollution kills an estimated two million people worldwide every year.",explanation:"Every year, an estimated seven million people die as a result of air pollution around the world. According to WHO data, nine out of ten people breathe air that exceeds WHO guideline limits and contains high levels of pollutants, with low- and middle-income nations bearing the brunt of the burden.",answer:false,source:"https://www.who.int/health-topics/air-pollution#tab=tab_1 "},
    {question:"Exposure to indoor air pollutants can lead to a wide range of adverse health outcomes including cancer.",explanation:"Exposure to indoor air pollutants can lead to a wide range of adverse health outcomes in both children and adults, from respiratory illnesses to cancer to eye problems. Members of households that rely on polluting fuels and devices also suffer a higher risk of burns, poisonings, musculoskeletal injuries and accidents.",answer:true,source:"https://www.who.int/health-topics/air-pollution#tab=tab_1 "},
    {question:"True or false: Bees have four wings.",explanation:" Although it may seem like they have 2 wings in total, they actually have two on each side! The two wings on each side hook together to form one larger pair when flying and then unhook when they’re not flying.",answer:true,source:"https://www.wwf.org.uk/learn/fascinating-facts/bees  "},
    {question:"The number one cause of death in Canada is cancer.",explanation:"Cancer is the leading cause of death in Canada - responsible for 30% of all deaths- followed by cardiovascular disease (heart disease and stroke), chronic respiratory diseases, and accidents.",answer:true,source:"https://www.canada.ca/en/public-health/services/chronic-diseases/cancer.html"},
    {question:"Air pollution kills an estimated seven million people worldwide every year.",explanation:"Air pollution kills an estimated seven million people worldwide every year. WHO data shows that 9 out of 10 people breathe air that exceeds WHO guideline limits containing high levels of pollutants, with low- and middle-income countries suffering from the highest exposures.",answer:true,source:"https://www.who.int/health-topics/air-pollution#tab=tab_1 "},
    {question:"Electronics consume energy when they are turned off?",explanation:"Unplug electronics or use a power strip and use the switch on the power strip to cut all power to the appliance to avoid 'vampire' loads. Many appliances continue to draw a small amount of power when they are switched off. ",answer:true,source:"https://www.energy.gov/energysaver/appliances-and-electronics/energy-efficient-computers-home-office-equipment-and  "},
    {question:"Social distancing during COVID-19 means that people can't stay socially connected.",explanation:"Staying apart doesn’t mean that we can’t spend time with our family and friends. Creative ways of staying in touch include talking virtually or having online game nights.",answer:false,source:"https://www.ottawapublichealth.ca/en/public-health-topics/protecting-your-mental-health.aspx#Staying-safe-while-staying-social  "},
    {question:"Lesbian, gay, bisexual, trans and queer identified (LGBTQ) individuals experience the same rate of mental health illnesses as the rest of the Canadian population.",explanation:"Although lesbian, gay, bisexual, trans and queer identified (LGBTQ) people are as diverse as the general Canadian population in their experiences of mental health and well-being, they face higher risks for some mental health issues due to the effects of discrimination and the social determinants of health.",answer:false,source:"https://ontario.cmha.ca/documents/lesbian-gay-bisexual-trans-queer-identified-people-and-mental-health/  "},
    {question:"Seasonal Affective Disorder (SAD) or seasonal depression impacts people both in the winter and in the summer.",explanation:"When we hear of Seasonal Affective Disorder (SAD), we tend to associate it with Winter Depression. The symptoms usually occur during the fall and/or early winter and they improve during spring and summer. Some people experience the opposite pattern whereby the symptoms of depression begin in spring or summer.",answer:true,source:"https://www.camh.ca/en/camh-news-and-stories/summer-depression"},
    {question:"Having a positive mindset and mental health means that you don't suffer from mental health conditions/ illnesses.",explanation:"Having positive mental health means that you are able to perform daily activities like waking up for school, eating well, and showering, you feel cared for, content, and happy with your life, you do things you like with your friends, family, at school, work, and in your community, you feel in control and hopeful about tomorrow, you are able to cope with day-to-day challenges and stress, you feel good about yourself.",answer:false,source:"https://www.thelinkottawa.ca/en/mental-health/mental-health.aspx "},
    {question:"Nearly two-thirds of all people with mental disorders do not seek treatment.",explanation:"It's important to remember that mental illnesses are like other health conditions; they need proper treatment and support. The sooner someone gets help, the better the outcome will be. ",answer:true,source:"https://www.thelinkottawa.ca/en/mental-health/reducing-stigma-.aspx  "},
    {question:"The same amount of alcohol will have a stronger effect on a person with a mental illness.",explanation:"People with mental illness are more sensitive than others to the harmful effects of psychoactive substances. Thus, all other things being equal, the same amount of alcohol will have a stronger effect on a person with a mental illness.",answer:true,source:"https://www.albertahealthservices.ca/assets/info/amh/if-amh-alcohol-and-mental-illness.pdf  "},
    {question:"Genetic predisposition to certain personality disorders (such as impulse control disorders or attention deficit disorders) may be exacerbated by prenatal exposure to alcohol.",explanation:"A genetic predisposition to certain personality disorders (such as impulse control disorders or attention deficit disorder—with or without hyperactivity) may be exacerbated by prenatal exposure to alcohol. ",answer:true,source:"https://www.albertahealthservices.ca/assets/info/amh/if-amh-alcohol-and-mental-illness.pdf  "},
    {question:"The cost of a disability leave for a mental illness is about double the cost of a leave due to a physical illness.",explanation:"Mental and physical health are linked. People with a long-term medical condition such as chronic pain are much more likely to also experience mood disorders. Conversely, people with a mood disorder are at much higher risk of developing a long-term medical condition. However, the cost of a disability leave for a mental illness is about double the cost of a leave due to a physical illness.",answer:true,source:"https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics  "},
    {question:"Mental illness and addiction can be associated with distress and/or impairment of functioning ",explanation:"The terms 'mental illness' and 'addiction' refer to a wide range of disorders that affect mood, thinking and behaviour. Examples include depression, anxiety disorders and schizophrenia, as well as substance use disorders and problem gambling. Mental illness and addiction can be associated with distress and/or impairment of functioning. ",answer:true,source:"https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics"},

  ];

   //liste des questions fournies par le client
   const quizzQuestionsFR = [
    {question : "La marijuana est la drogue addictive la plus utilisée après le tabac et l'alcool.",explanation : "En effet, sa consommation est très répandue chez les jeunes. En 2018, plus de 11,8 millions de jeunes adultes ont consommé de la marijuana au cours de l'année écoulée.",answer:true,source : "https://www.drugabuse.gov/publications/drugfacts/marijuana"},
    {question : "Toutes les utilisations de la cocaïne sont illégales ?",explanation : "La cocaïne peut être utilisée légalement par les prestataires de soins de santé comme anesthésique local pour certaines opérations chirurgicales. La consommation récréative de cocaïne est illégale.",answer:false,source : "https://www.drugabuse.gov/publications/drugfacts/cocaine"},
    {question : "Les hommes luttent contre l'abus de substances ou la dépendance à des taux environ deux fois plus élevés que ceux des femmes, 10,8 % contre 5,8 % respectivement.",explanation : "La dépendance est une maladie individuelle qui se manifeste différemment pour chaque personne, et le sexe peut jouer un rôle dans la façon dont la dépendance, le traitement et le rétablissement sont gérés. Les données de cette question ont été recueillies par la National Survey on Drug Use and Health (NSDUH).",answer:true,source : "https://sunrisehouse.com/addiction-demographics/men/"},
    {question : "La fumée de cigarette contient un produit chimique. Ce produit chimique s'appelle la nicotine.",explanation : "Faux ! La fumée de cigarette contient des milliers de substances chimiques, dont 200 sont connues pour être toxiques.",answer:false,source : "https://www.thelinkottawa.ca/en/alcohol-drugs-and-tobacco/tobacco.aspx"},
    {question : "Les boissons contenant de la caféine vous déshydratent.",explanation : "Bien que cela soit vrai, les personnes en bonne santé qui consomment des quantités modérées de caféine ne perdent pas plus de liquide que celles qui n'en consomment pas.",answer:true,source : "https://www.healthlinkbc.ca/health-topics/abk5466"},
    {question : "Le papillomavirus humain (HPV) se transmet par contact sexuel intime entre partenaires.",explanation : "Le papillomavirus humain, ou HPV, est l'infection sexuellement transmissible la plus courante dans le monde aujourd'hui. Le VPH est très contagieux et peut se transmettre par contact de peau à peau dans la zone génitale (la pénétration n'est pas nécessaire) ou lors de rapports sexuels génitaux, anaux ou oraux. Les hommes comme les femmes peuvent être infectés par le VPH.",answer:true,source : "https://www.hpvinfo.ca/what-is-hpv/"},
    {question : "Vrai ou faux : Marijuana is addictive.",explanation : "Selon le National Institute on Drug Abuse et de nombreuses autres sources réputées/scientifiques, la consommation de marijuana peut conduire au développement d'une consommation problématique, connue sous le nom de trouble de la consommation de marijuana, qui prend la forme d'une dépendance dans les cas graves. Veuillez être prudent et attentif lorsque vous consommez de la marijuana ou toute autre drogue récréative !",answer:true,source : "https://www.drugabuse.gov/publications/drugfacts/marijuana"},
    {question : "Youth Line offre un soutien par les pairs confidentiel et sans jugement par le biais de ses services de téléphone, de texte et de chat.",explanation : "Youth Line offre un soutien par les pairs confidentiel et sans jugement par le biais de ses services de téléphone (1-800-268-9688), de texte (647-694-4275) et de chat. Entrez en contact avec un bénévole de soutien par les pairs du dimanche au vendredi, de 16h00 à 21h30.",answer:true,source : "https://www.youthline.ca"},
    {question : "Le consentement peut être donné par une personne en état d'ébriété.",explanation : "Le consentement à toute activité sexuelle doit être donné librement. Le consentement ne peut être donné par une personne en état d'ébriété, inconsciente ou considérée comme incapable de donner son consentement. Le consentement ne peut pas non plus être donné librement s'il résulte de menaces pour la sécurité personnelle ou de menaces de nuire à autrui.",answer:false,source : "https://www.sexandu.ca/consent/what-is-consent/"},
    {question : "La vaginose bactérienne (VB) est une infection qui survient lorsque les bactéries 'nuisibles' sont plus nombreuses que les 'bonnes' bactéries qui existent naturellement dans le vagin.",explanation : "C'est vrai ! La VB est l'infection vaginale la plus courante chez les femmes âgées de 15 à 44 ans et la cause la plus fréquente de pertes et d'odeurs vaginales.",answer:true,source : "https://www.sexandu.ca/your-body/bacterial-vaginosis/"},
    {question : "Les opioïdes peuvent être des médicaments naturels ou entièrement synthétiques fabriqués par l'homme.",explanation : "Les opioïdes sont une classe de médicaments que l'on trouve naturellement dans le pavot à opium. Certains opioïdes sur ordonnance sont fabriqués directement à partir de la plante, et d'autres sont fabriqués par des scientifiques en laboratoire en utilisant la même structure chimique.",answer:true,source : "https://www.drugabuse.gov/publications/drugfacts/prescription-opioids"},
    {question : "Il existe deux types de virus de l'herpès simplex (HSV).",explanation : "Il existe deux types de virus de l'herpès simplex (HSV). Le HSV-1 est principalement associé à l'infection orale, et le HSV-2 est principalement associé à l'infection génitale. Le HSV-2 est présent chez environ 20 % des adultes.",answer:true,source : "https://www.sexandu.ca/stis/herpes"},
    {question : "L'herpès peut se propager même en l'absence de symptômes visibles.",explanation : "L'herpès est la cause la plus fréquente d'ulcérations génitales, mais l'infection peut se propager même en l'absence de symptômes visibles. ",answer:true,source : "https://www.sexandu.ca/stis/herpes"},
    {question : "Vous pouvez créer une digue dentaire à partir de préservatifs achetés en magasin ? ",explanation : "Il existe des digues dentaires achetées en magasin, ou vous pouvez en fabriquer une vous-même à partir d'un préservatif. Voici comment procéder : 1. Coupez le bout du préservatif (extrémité fermée) 2. Coupez l'anneau du préservatif (extrémité ouverte) 3. Coupez la longueur du préservatif Voila ! Vous avez un rectangle de latex comme une digue dentaire achetée en magasin.",answer:true,source : "https://www.thelinkottawa.ca/en/sexual-health/condoms-and-dental-dams.aspx"},
    {question : "Vrai ou faux : les substances inhalées sont illégales.",explanation : "Non, selon le National Institute on Drug Abuse, les substances inhalées sont souvent des solvants temporels, des aérosols et des gaz que l'on trouve dans les produits ménagers tels que les peintures en spray, les marqueurs, les colles et les liquides de nettoyage.",answer:false,source : "https://www.drugabuse.gov/publications/drugfacts/inhalants"},
    {question : "Les Olympiens de la Grèce antique couraient pieds nus et nus.",explanation : "C'est vrai ! De 776 à 728 avant J.-C., un sprint de 200 mètres appelé 'le stadion' était la seule épreuve des jeux. Ils y couraient pieds nus et nus.",answer:true,source : "https://www.historymuseum.ca/cmc/exhibitions/civil/greece/gr1090e.html"},
    {question : "Les girafes et les humains ont le même nombre de vertèbres cervicales.",explanation : "C'est vrai ! Même si le cou d'une girafe est beaucoup plus long, elles ont le même nombre de vertèbres. C'est la taille des os qui diffère, les girafes ayant des vertèbres de plus de 25 cm de long !",answer:true,source : "https://sciprogress.com/giraffe-vs-human-neck-bones/"},
    {question : "Le popcorn est un aliment complet.",explanation : "Vrai ! Le pop-corn est un aliment complet qui contient beaucoup de fibres ! C'est une excellente collation saine.",answer:true,source : "https://www.healthline.com/nutrition/whole-grain-foods#TOC_TITLE_HDR_13"},
    {question : "Un fruit se développe à partir de la fleur d'une plante tandis que les légumes proviennent des racines, des tiges et des feuilles.",explanation : "Les fruits sont généralement constitués de graines tandis que les légumes sont constitués de racines, de tiges et de feuilles. De plus, les fruits et les légumes sont souvent classés par goût.",answer:true,source : "https://www.healthline.com/nutrition/fruits-vs-vegetables"},
    {question : "Le régime alimentaire n'influe pas sur la production d'énergie.",explanation : "Une alimentation équilibrée comprenant une variété de glucides, de protéines et de graisses non raffinés, avec un accent sur les légumes, les céréales complètes et les huiles saines, peut contribuer à maintenir votre niveau d'énergie élevé.",answer:false,source : "https://www.health.harvard.edu/healthbeat/eating-to-boost-energy"},
    {question : "La pastèque contient 65% d'eau.",explanation : "La pastèque contient environ 92% d'eau. C'est une excellente source d'hydratation, ce qui en fait un aliment de base pour l'été !",answer:false,source : "https://www.everydayhealth.com/diet-nutrition/diet/watermelon-nutrition-carbs-benefits-more-on-summer-staple/"},
    {question : "Les petits agriculteurs et les travailleurs agricoles sont parmi les plus marginalisés par le système commercial mondial.",explanation : "Le système commercial mondial a poussé les petits agriculteurs et les travailleurs agricoles à la marge. Fairtrade est une organisation qui développe un modèle commercial offrant de meilleurs prix, de bonnes conditions de travail, l'absence de travail des enfants, d'excellentes normes environnementales et des liens commerciaux solides en tant que système de certification réglementé à 50 % par les producteurs.",answer:true,source : "https://fairtrade.ca/what-is-fairtrade/"},
    {question : "La pollution atmosphérique tue environ deux millions de personnes dans le monde chaque année.",explanation : "Chaque année, on estime que sept millions de personnes meurent des suites de la pollution atmosphérique dans le monde. Selon les données de l'OMS, neuf personnes sur dix respirent un air qui dépasse les limites fixées par les directives de l'OMS et qui contient des niveaux élevés de polluants, les pays à revenu faible ou intermédiaire supportant l'essentiel de la charge.",answer:false,source : "https://www.who.int/health-topics/air-pollution#tab=tab_1"},
    {question : "L'exposition aux polluants de l'air intérieur peut entraîner un large éventail d'effets néfastes sur la santé, notamment le cancer.",explanation : "L'exposition aux polluants de l'air intérieur peut entraîner un large éventail d'effets néfastes sur la santé, tant chez les enfants que chez les adultes, des maladies respiratoires au cancer en passant par les problèmes oculaires. Les membres des ménages qui utilisent des combustibles et des appareils polluants courent également un risque plus élevé de brûlures, d'empoisonnements, de blessures musculo-squelettiques et d'accidents.",answer:true,source : "https://www.who.int/health-topics/air-pollution#tab=tab_1"},
    {question : "Vrai ou faux : Les abeilles ont quatre ailes.",explanation :" Bien que l'on puisse penser qu'elles ont deux ailes au total, elles en ont en fait deux de chaque côté ! Les deux ailes de chaque côté s'accrochent ensemble pour former une paire plus grande lorsqu'elles volent et se décrochent lorsqu'elles ne volent pas.",answer:true,source : "https://www.wwf.org.uk/learn/fascinating-facts/bees"},
    {question : "La première cause de décès au Canada est le cancer.",explanation : "Le cancer est la principale cause de décès au Canada - responsable de 30 % de tous les décès - suivi des maladies cardiovasculaires (maladies du cœur et accidents vasculaires cérébraux), des maladies respiratoires chroniques et des accidents.",answer:true,source : "https://www.canada.ca/en/public-health/services/chronic-diseases/cancer.html"},
    {question : "La pollution atmosphérique tue environ sept millions de personnes dans le monde chaque année.",explanation : "La pollution atmosphérique tue environ sept millions de personnes dans le monde chaque année. Les données de l'OMS montrent que 9 personnes sur 10 respirent un air qui dépasse les limites fixées par les lignes directrices de l'OMS et qui contient des niveaux élevés de polluants, les pays à revenu faible ou intermédiaire étant les plus exposés.",answer:true,source : "https://www.who.int/health-topics/air-pollution#tab=tab_1"},
    {question : "L'exposition aux polluants de l'air intérieur peut entraîner un large éventail de conséquences néfastes pour la santé, notamment le cancer.",explanation : "L'exposition aux polluants de l'air intérieur peut entraîner un large éventail de conséquences néfastes pour la santé, tant chez les enfants que chez les adultes, allant des maladies respiratoires au cancer en passant par les problèmes oculaires. Les membres des ménages qui utilisent des combustibles et des appareils polluants courent également un risque plus élevé de brûlures, d'empoisonnements, de blessures musculo-squelettiques et d'accidents.",answer:true,source : "https://www.who.int/health-topics/air-pollution#tab=tab_1"},
    {question : "Les appareils électroniques consomment-ils de l'énergie lorsqu'ils sont éteints ?",explanation : "Débranchez les appareils électroniques ou utilisez une multiprise et utilisez l'interrupteur de la multiprise pour couper toute alimentation de l'appareil afin d'éviter les charges 'vampires'. De nombreux appareils continuent à consommer une petite quantité d'énergie lorsqu'ils sont éteints. ",answer:true,source : "https://www.energy.gov/energysaver/appliances-and-electronics/energy-efficient-computers-home-office-equipment-and"},
    {question : "La distanciation sociale pendant le COVID-19 signifie que les gens ne peuvent pas rester connectés socialement.",explanation : "Rester à l'écart ne signifie pas que nous ne pouvons pas passer du temps avec notre famille et nos amis. Des moyens créatifs de rester en contact consistent à parler virtuellement ou à organiser des soirées jeux en ligne.",answer:false,source : "https://www.ottawapublichealth.ca/en/public-health-topics/protecting-your-mental-health.aspx#Staying-safe-while-staying-social"},
    {question : "Les lesbiennes, les gays, les bisexuels, les transgenres et les homosexuels (LGBTQ) ont le même taux de maladies mentales que le reste de la population canadienne.",explanation : "Bien que les lesbiennes, les gays, les bisexuels, les transgenres et les homosexuels (LGBTQ) soient aussi diversifiés que la population canadienne dans leurs expériences de santé mentale et de bien-être, ils sont plus exposés à certains problèmes de santé mentale en raison des effets de la discrimination et des déterminants sociaux de la santé.",answer:false,source : "https://ontario.cmha.ca/documents/lesbian-gay-bisexual-trans-queer-identified-people-and-mental-health/"},
    {question : "Le trouble affectif saisonnier (TAS) ou dépression saisonnière touche les gens aussi bien en hiver qu'en été.",explanation : "Lorsque nous entendons parler du trouble affectif saisonnier (TAS), nous avons tendance à l'associer à la dépression hivernale. Les symptômes apparaissent généralement à l'automne et/ou au début de l'hiver et s'améliorent au printemps et en été. Certaines personnes connaissent le schéma inverse, les symptômes de la dépression commençant au printemps ou en été.",answer:true,source : "https://www.camh.ca/en/camh-news-and-stories/summer-depression"},
    {question : "Avoir un état d'esprit et une santé mentale positifs signifie que vous ne souffrez pas de troubles ou de maladies mentales. ",explanation : "Avoir une santé mentale positive signifie que vous êtes capable d'accomplir des activités quotidiennes comme vous réveiller pour aller à l'école, bien manger et prendre une douche, que vous vous sentez pris en charge, satisfait et heureux de votre vie, que vous faites des choses que vous aimez avec vos amis, votre famille, à l'école, au travail et dans votre communauté, que vous vous sentez en contrôle et plein d'espoir pour l'avenir, que vous êtes capable de faire face aux défis quotidiens et au stress, que vous êtes bien dans votre peau.",answer:false,source : "https://www.thelinkottawa.ca/en/mental-health/mental-health.aspx"},
    {question : "Près de deux tiers des personnes atteintes de troubles mentaux ne cherchent pas à se faire soigner.",explanation : "Il est important de se rappeler que les maladies mentales sont comme les autres problèmes de santé ; elles nécessitent un traitement et un soutien appropriés. Plus tôt une personne obtient de l'aide, meilleur sera le résultat. ",answer:true,source : "https://www.thelinkottawa.ca/en/mental-health/reducing-stigma-.aspx"},
    {question : "La même quantité d'alcool aura un effet plus fort sur une personne atteinte d'une maladie mentale.",explanation : "Les personnes atteintes d'une maladie mentale sont plus sensibles que les autres aux effets nocifs des substances psychoactives. Ainsi, toutes choses égales par ailleurs, la même quantité d'alcool aura un effet plus fort sur une personne atteinte d'une maladie mentale.",answer:true,source : "https://www.albertahealthservices.ca/assets/info/amh/if-amh-alcohol-and-mental-illness.pdf"},
    {question : "Une prédisposition génétique à certains troubles de la personnalité (comme les troubles du contrôle des impulsions ou les troubles de l'attention) peut être exacerbée par une exposition prénatale à l'alcool.",explanation : "Une prédisposition génétique à certains troubles de la personnalité (comme les troubles du contrôle des impulsions ou les troubles de l'attention avec ou sans hyperactivité) peut être exacerbée par une exposition prénatale à l'alcool. ",answer:true,source : "https://www.albertahealthservices.ca/assets/info/amh/if-amh-alcohol-and-mental-illness.pdf"},
    {question : "Le coût d'un congé d'invalidité pour une maladie mentale est environ le double du coût d'un congé dû à une maladie physique.",explanation : "La santé mentale et la santé physique sont liées. Les personnes souffrant d'une maladie de longue durée, telle qu'une douleur chronique, sont beaucoup plus susceptibles de souffrir également de troubles de l'humeur. Inversement, les personnes souffrant d'un trouble de l'humeur ont un risque beaucoup plus élevé de développer une affection médicale de longue durée. Cependant, le coût d'un congé d'invalidité pour une maladie mentale est environ le double du coût d'un congé dû à une maladie physique.",answer:true,source : "https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics"},
    {question : "La maladie mentale et la toxicomanie peuvent être associées à une détresse et/ou à une altération du fonctionnement",explanation : "Les termes 'maladie mentale' et 'toxicomanie' désignent un large éventail de troubles qui affectent l'humeur, la pensée et le comportement. Parmi les exemples, citons la dépression, les troubles anxieux et la schizophrénie, ainsi que les troubles liés à la consommation de substances et les problèmes de jeu. La maladie mentale et la dépendance peuvent être associées à une détresse et/ou à une altération du fonctionnement. ",answer:true,source : "https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics"},
  ];

  //we set the default question. If this shows up on the screen, there was an issue somewhere
  const [currentQuestion,setCurrentQuestion] = useState({question:"default question.",explanation:"Yes indeed ",answer:false,source:"https://www.uottawa.ca/wellness/"})

  //selects a random question from the list
  const randomQuizz = () =>{
    let quizzQuestions = LanguageActions.getLanguage()==='english' ? quizzQuestionsEN : quizzQuestionsFR
    var randomNumber = Math.floor((Math.random() * quizzQuestions.length));
    setCurrentQuestion(quizzQuestions[randomNumber]);
    
  }
  //we check the answer, if true -> reward , if false -> "thank you for participating"
  const handleQuizPressed = (answer:boolean) => {
    if (!dailyMissionCompleted){
      if (answer == currentQuestion.answer){
        setDailyMissionCompleted(true);
        giveReward();
		
      }
      else{
		setDailyMissionCompleted(true);
        onTimeMissionComplete();
        setCurrentRewardMessage(dictionnary.dailyMissions.BetterLuckNextTime);

      }
    }
  }

  //controld the dog 

  const [currentDogImageNumber, setDogImageNumber]   = useState(1);
  const [currentDogImage, setDogImage]   = useState(require('../../../assets/images/dailyMissions/dog/1.png'));

  const handleDogImagePressed = () => {
    if (!dailyMissionCompleted){
      if (currentDogImageNumber<5){
        if (currentDogImageNumber%2 == 0){
          setDogImageNumber(currentDogImageNumber+1);
          setDogImage(require('../../../assets/images/dailyMissions/dog/1.png'));
          
        }
        else{
          setDogImageNumber(currentDogImageNumber+1);
          setDogImage(require('../../../assets/images/dailyMissions/dog/2.png'));
          
        }
      }
      else if (currentDogImageNumber == 5){
        setDogImageNumber(currentDogImageNumber+1);
        setDogImage(require('../../../assets/images/dailyMissions/dog/3.png'));
        
      }
      else{
        setDogImage(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDailyMissionCompleted(true);
        giveReward();
      }
    }
  }

  //controls the image of the apple
  const appleImageSource = [
    require('../../../assets/images/dailyMissions/apple/1.png'),
    require('../../../assets/images/dailyMissions/apple/2.png'),
    require('../../../assets/images/dailyMissions/apple/3.png'),
    require('../../../assets/images/dailyMissions/apple/4.png'),
    require('../../../assets/images/dailyMissions/apple/5.png'),
    require('../../../assets/images/dailyMissions/apple/6.png')
  ];

  const [currentAppleImageNumber, setAppleImageNumber]   = useState(1);
  const [currentAppleImage, setAppleImage]   = useState(appleImageSource[0]);

  //we will change the picure of the apple, after 6 times, we give the reard to the user
  const handleAppleImagePressed = () => {
    setAppleImageNumber(currentAppleImageNumber+1);

    if (!dailyMissionCompleted){
      if (currentAppleImageNumber>=6){
        setAppleImage(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDailyMissionCompleted(true);
        giveReward();
      }
      else {
        setAppleImage(appleImageSource[currentAppleImageNumber]);
      }
    }
  }
  
  
  //controls the slider 
  const handleSlidingComplete = () =>{

    if (!dailyMissionCompleted){
      giveReward();
      setDailyMissionCompleted(true);
      
    }
  }

  //controls the sunday mission 
  const [door1, setDoor1] = useState(require('../../../assets/images/dailyMissions/door.png'));
  const [door2, setDoor2] = useState(require('../../../assets/images/dailyMissions/door.png'));
  const [door3, setDoor3] = useState(require('../../../assets/images/dailyMissions/door.png'));

  //checking if the door pressed is the right one. The door will change randomly each week.
  const handleDoorPressed = (doorClicked:number) =>{

    //generate a random number between 1 and 3 deciing what door is the good one 
    var randomNumber = Math.floor((Math.random() * 3));
    if (!dailyMissionCompleted) {

      if (randomNumber == 0 && doorClicked == 1) {
        setDoor1(require('../../../assets/images/wellnessCharacter/owl.png'));
        setDoor2(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDoor3(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDailyMissionCompleted(true);
        giveReward();
      }
      else if (randomNumber == 1 && doorClicked == 2) {
        setDoor1(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDoor2(require('../../../assets/images/wellnessCharacter/owl.png'));
        setDoor3(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDailyMissionCompleted(true);
        giveReward();
      }
      else if (randomNumber == 2 && doorClicked == 3) {
        setDoor1(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDoor2(require('../../../assets/images/wellnessCharacter/squirrel.png'));
        setDoor3(require('../../../assets/images/wellnessCharacter/owl.png'));
        setDailyMissionCompleted(true);
        giveReward();
      }
      //if the user didn't win 
      else {
        if (randomNumber == 0) {
          setDoor1(require('../../../assets/images/wellnessCharacter/owl.png'));
          setDoor2(require('../../../assets/images/wellnessCharacter/squirrel.png'));
          setDoor3(require('../../../assets/images/wellnessCharacter/squirrel.png'));
          setDailyMissionCompleted(true);
          onTimeMissionComplete();
          setCurrentRewardMessage(dictionnary.dailyMissions.BetterLuckNextTime);
        }
        else if (randomNumber == 1 ) {
          setDoor1(require('../../../assets/images/wellnessCharacter/squirrel.png'));
          setDoor2(require('../../../assets/images/wellnessCharacter/owl.png'));
          setDoor3(require('../../../assets/images/wellnessCharacter/squirrel.png'));
          setDailyMissionCompleted(true);
          onTimeMissionComplete();
          setCurrentRewardMessage(dictionnary.dailyMissions.BetterLuckNextTime); 
        }
        else if (randomNumber == 2 ){
          setDoor1(require('../../../assets/images/wellnessCharacter/squirrel.png'));
          setDoor2(require('../../../assets/images/wellnessCharacter/squirrel.png'));
          setDoor3(require('../../../assets/images/wellnessCharacter/owl.png'));
          setDailyMissionCompleted(true);
          onTimeMissionComplete();
          setCurrentRewardMessage(dictionnary.dailyMissions.BetterLuckNextTime);  
        }

      }
    }
  }

  //the follwing code will render different components depending on the day of the week 
  const day = new Date().getDay();
  return (
    <View style={theme==='light'? styles.itemContainer : darkModeStyles.itemContainer}>
        <SafeAreaView style={theme==='light'? styles.container : darkModeStyles.container}>
            <View style={theme==='light'? styles.titleContainer : darkModeStyles.titleContainer}>
                <Ionicons onPress={() => navigation.goBack()} name="chevron-back-outline"  color='black' 
                    style={theme === 'light' ? styles.back : {color:'white', fontSize: RFPercentage(3.8),alignSelf: 'center'}} />
                <Text style={theme==='light'? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.title}</Text>
                {/* <Ionicons onPress={() => navigation.navigate("PointSystem")} name="information-circle" color='#9FB3D3' style={styles.info} /> */}
            </View>
            {/* <Text style={styles.subtitle}>{dictionnary.pointSystem.Streaks}</Text> */}
            <Text style={theme === 'light' ? styles.body : darkModeStyles.body}>{dictionnary.dailyMissions.description}</Text>
            
            
        </SafeAreaView>
        <View style={theme === 'light' ? styles.bottomView : darkModeStyles.bottomView}>
          <Image style={[styles.imageStyle, {height: dim, width: dim}]} source = {require('../../../assets/images/wellnessCharacter/squirrel-waving.png')} resizeMethod="scale" resizeMode='contain'/>
        </View>
        
      {/* monday's misson */}
      {day=== 1 ? 
        <View style={theme==='light'? styles.modal : darkModeStyles.modal} >  
          <Text style={theme==='light' ? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.Gift}</Text>
          <TouchableOpacity onPress={() => handleGiftPressed()}>
            <Image style={styles.modalImage} resizeMode ='contain' source={currentGiftImage} ></Image>
          </TouchableOpacity> 
          <Text style={styles.modalRewardText}>{currentRewardMessage}</Text>
        </View>
      : null}
      {day=== 2 ? 
        
        <View style={theme==='light' ? styles.modal : darkModeStyles.modal} >
          {!dailyMissionCompleted ? (
            <View style={theme==='light' ? styles.modal : darkModeStyles.modal}>
              <Text style={theme==='light' ? styles.questionTitle : darkModeStyles.questionTitle}>{currentQuestion.question}</Text>
              <Pressable style={styles.buttonTrue} onPress={() => handleQuizPressed(true) }>
                <Text style={{color: 'black', fontSize: RFPercentage(2.5), fontFamily: 'BarlowCondensed_400Regular'}}>{dictionnary.dailyMissions.True}</Text>
              </Pressable>
              <Pressable style={[styles.buttonFalse]} onPress={() => handleQuizPressed(false) }>
                <Text style={{color: 'black', fontSize: RFPercentage(2.5), fontFamily: 'BarlowCondensed_400Regular'}}>{dictionnary.dailyMissions.False}</Text>
              </Pressable>
            </View>
          ):null }
          {dailyMissionCompleted ? (
            <View style={theme==='light' ? styles.modal : darkModeStyles.modal}>
              <Text style={theme==='light' ? styles.modalExplanationText : darkModeStyles.modalExplanationText}>{currentQuestion.explanation}</Text>
              <Pressable style={theme==='light' ? styles.buttonSource : darkModeStyles.buttonSource} onPress={() => openURL(currentQuestion.source) }>
                <Text style={theme==='light' ? styles.buttonSourceText : darkModeStyles.buttonSourceText}>Source</Text>
              </Pressable>
            </View>
          ):null }
        </View>
      : null}
    {/* wedenesday's mission */}
    {day=== 3 ? 
			<View style={theme==='light' ? styles.modal : darkModeStyles.modal} >
				<Text style={theme==='light' ? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.PetDog}</Text>
					<TouchableOpacity onPress={() => {handleDogImagePressed()}}>
						<Image style={styles.modalImage} resizeMode ='contain' source={currentDogImage} ></Image>
					</TouchableOpacity>
				<Text style={styles.modalRewardText}>{currentRewardMessage}</Text>
			</View>
		: null}
    {/* thursday's mission */}
    {day=== 4 ? 
			<View style={theme==='light' ? styles.modal : darkModeStyles.modal} >
				<Text style={theme==='light' ? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.EatApple}</Text>
				<TouchableOpacity onPress={() => {handleAppleImagePressed()}}>
					<Image  style={styles.modalImage} resizeMode ='contain' source={currentAppleImage} ></Image>
				</TouchableOpacity>
				<Text style={styles.modalRewardText}>{currentRewardMessage}</Text>
			</View>
    : null }
    {/* friday's mission  */}
    {day=== 5 ? 
			<View style={theme==='light' ? styles.modal : darkModeStyles.modal} >
				<Text style={theme==='light' ? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.Breath}</Text>

				{timerVisible ? (
					<CountdownCircleTimer
					isPlaying
					duration={60}
					size={200}
          strokeWidth={20}
          trailStrokeWidth={15}
					colors={[
						['#55CBCD', 0.4],
						['#97C1A9', 0.4],
						['#CBAACB', 0.2],
					]}
					onComplete={() => handleBreathingDone()}
					>
					{({ remainingTime, animatedColor }) => (
						<Animated.Text style={{ color: animatedColor, fontFamily: 'BarlowCondensed_400Regular', fontSize: RFPercentage(2.5) }}>
							{remainingTime}
						</Animated.Text>
					)}
				</CountdownCircleTimer>
				): 
        <Image  style={styles.modalImage} resizeMode ='contain' source={require('../../../assets/images/wellnessCharacter/squirrel.png')} />
         }
				<Text style={styles.modalRewardText}>{currentRewardMessage}</Text>
			</View>
    : null }
    {/* saturday's mission */}
    {day=== 6 ?
        <View style={theme==='light' ? styles.modal : darkModeStyles.modal} >
              	<Text style={theme==='light' ? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.HowAreYouFeeling}</Text>
              	<Image style={styles.modalImage} resizeMode ='contain' source= {require('../../../assets/images/wellnessCharacter/squirrel.png')} ></Image>
              	<Slider
					style={{width: 200, height: 40}}
					minimumValue={0}
					maximumValue={100}
					minimumTrackTintColor="green"
					maximumTrackTintColor="blue"
					onSlidingComplete = {() => handleSlidingComplete()}
				/>
              	<Text style={styles.modalRewardText}>{currentRewardMessage}</Text> 
        	</View>
    : null }
    {/* sunday's mission  */}
    {day=== 7 ?
    	<View style={theme==='light' ? styles.modal : darkModeStyles.modal} >
          	<Text style={theme==='light' ? styles.title : darkModeStyles.title}>{dictionnary.dailyMissions.FindOwl}</Text>
           	<View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
              	<View style={theme==='light' ? styles.doorContainer : darkModeStyles.doorContainer}>
                	<TouchableOpacity onPress={() => {handleDoorPressed(1)}}>
                  		<Image  style={styles.doorImage} resizeMode ='contain' source={door1} ></Image>
                	</TouchableOpacity>
              	</View>
              	<View style={theme==='light' ? styles.doorContainer : darkModeStyles.doorContainer}>
                	<TouchableOpacity onPress={() => {handleDoorPressed(2)}}>
                  		<Image  style={styles.doorImage} resizeMode ='contain' source={door2} ></Image>
                	</TouchableOpacity>
              	</View>
              	<View style={theme==='light' ? styles.doorContainer : darkModeStyles.doorContainer}>
                	<TouchableOpacity onPress={() => {handleDoorPressed(3)}}>
                  		<Image  style={styles.doorImage} resizeMode ='contain' source={door3} ></Image>
                	</TouchableOpacity>
              	</View>
            </View>
          	<Text style={styles.modalRewardText}>{currentRewardMessage}</Text>
        </View>
    : null}
  {/* // //  ADDITIONNAL MISSION (CAN BE USED IN THE FUTURE) 
  // //   else if (day == 3){
  // //     return(
  // //   <View style={styles.modal} >
  // //     <Text style={theme==='light' ? styles.title : darkModeStyles.title}>Give us a High Five ! </Text>
  // //     <TouchableOpacity onPress={() => {handleHighFivePressed()}}>
  // //       <Image  style={styles.modalImage} resizeMode ='contain' source={currentHighFiveImage} ></Image>
  // //       </TouchableOpacity>
  // //     <Text style={styles.modalRewardText}>{currentRewardMessage}</Text>
  // //   </View>
  // // )
  // // }

  // //if none of the missions were found, we display a blank screen
  //   else{
  //     return(
  //      	<View>
  //        	<Text>Page not found !</Text>
  //       </View>
  //     )
 // } */}
    </View>
  );
}



export default connect(mapStateToProps)(DailyMission);


