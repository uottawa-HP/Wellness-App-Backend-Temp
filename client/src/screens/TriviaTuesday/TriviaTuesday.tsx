import * as React from 'react';
import { useEffect } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';




//A LIST OF ALL THE SURVEYS (PROVIDED BY THE CLIENT), will be stored online in the future and fetched weekly to reduce risks of error 
const links = [{date:new Date("2021/09/21"),link:'https://www.surveymonkey.ca/r/TRV-FS-2'},
{date:new Date("2021/09/28"),link:'https://www.surveymonkey.ca/r/TRV-FS-3'},
{date:new Date("2021/10/5"),link:'https://www.surveymonkey.ca/r/TRV-FS-4'},
{date:new Date("2021/10/12"),link:'https://www.surveymonkey.ca/r/TRV-FS-5'},
{date:new Date("2021/10/19"),link:'https://www.surveymonkey.ca/r/TRV-FS-6'},
{date:new Date("2021/11/2"),link:'https://www.surveymonkey.ca/r/TRV-FS-7'},
{date:new Date("2021/11/9"),link:'https://www.surveymonkey.ca/r/TRV-FS-8'},
{date:new Date("2021/11/16"),link:'https://www.surveymonkey.ca/r/TRV-FS-9'},
{date:new Date("2021/11/23"),link:'https://www.surveymonkey.ca/r/TRV-FS-10'},
{date:new Date("2021/11/30"),link:'https://www.surveymonkey.ca/r/TRV-FS-11'},
{date:new Date("2021/12/7"),link:'https://www.surveymonkey.ca/r/TRV-FS-12]'},
{date:new Date("2022/1/11"),link:'https://www.surveymonkey.ca/r/TRV-WS-1]'},
{date:new Date("2022/1/18"),link:'https://www.surveymonkey.ca/r/TRV-WS-2]'},
{date:new Date("2022/1/25"),link:'https://www.surveymonkey.ca/r/TRV-WS-3]'},
{date:new Date("2022/2/1"),link:'https://www.surveymonkey.ca/r/TRV-WS-4]'},
{date:new Date("2022/2/8"),link:'https://www.surveymonkey.ca/r/TRV-WS-5]'},
{date:new Date("2022/2/15"),link:'https://www.surveymonkey.ca/r/TRV-WS-6]'},
{date:new Date("2022/2/22"),link:'https://www.surveymonkey.ca/r/TRV-WS-7]'},
{date:new Date("2022/3/1"),link:'https://www.surveymonkey.ca/r/TRV-WS-8]'},
{date:new Date("2022/3/8"),link:'https://www.surveymonkey.ca/r/TRV-WS-9]'},
{date:new Date("2022/3/15"),link:'https://www.surveymonkey.ca/r/TRV-WS-10]'},
{date:new Date("2022/3/22"),link:'https://www.surveymonkey.ca/r/TRV-WS-11]'},
{date:new Date("2022/3/29"),link:'https://www.surveymonkey.ca/r/TRV-WS-12]'},
];


export default function TriviaTuesday() {
		const navigation = useNavigation();

		const [weekLink,setWeekLink] =React.useState('https://www2.uottawa.ca/campus-life/health-wellness/trivia-tuesday');
		useEffect(() => {
				setWeekLink(getWeekLink());
		}, []);

		//RETURN THE WEEKLY LINK FOR THE SURVEY 
		const getWeekLink = () => {

			let todayDate = new Date();
			let todayLink = 'https://www2.uottawa.ca/campus-life/health-wellness/trivia-tuesday'
			
			for (let i =0;i<links.length;i++){
					if (links[i].date<=todayDate ){
							todayLink=links[i].link;
					}
					
			}

			return todayLink;
		}

		//handles if a user already answered the survey and displays an alert for it 
		const handleChange = (state:WebViewNavigation) =>{

			//if the survey has already been taken
			if (state.url.substring(0,42)=="https://www.surveymonkey.ca/survey-taken/?"){
				Alert.alert("You have already answered this survey !");
				navigation.navigate("Self-Help");
			}
			//if the user clicked on "DONE" to answer the survey for the first time
			else if (state.url.substring(0,43)=="https://www.surveymonkey.ca/r/quiz/results?" || state.url.substring(0,43)=="https://www.surveymonkey.ca/survey-thanks/?"){
				Alert.alert("Thank you for answering the survey !");
				navigation.navigate("Self-Help");
			}
		}
		return (
				<WebView  onNavigationStateChange={(state)=>handleChange(state)}   source={{uri: weekLink}} />
		);
};
