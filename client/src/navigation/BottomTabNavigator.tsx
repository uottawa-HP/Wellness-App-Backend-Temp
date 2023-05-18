/* eslint-disable prettier/prettier */
import { Entypo, Ionicons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';

import Home from '../screens/Home';
import Events from '../screens/Events';
import Self from '../screens/Self';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import EventDetails from '../screens/EventDetails';
import SocialIntents from '../screens/SocialIntents';
import DailyMission from '../screens/DailyMission';

import BookSession from '../screens/BookSession';
import BookService from '../screens/BookService';

import CreateAvatar from '../screens/CreateAvatar';
import PointSystem from '../screens/PointSystem';
import Leaderboard from '../screens/Leaderboard';
import TriviaTuesday from '../screens/TriviaTuesday';
import FilterSearchPage from '../screens/FilterSearchPage';
import CoolIcons from '../../assets/CoolIcons';
import Colors from '../constants/Colors';

import LoadPrompt from '../screens/LoadPrompt'
import LoadEntry from '../screens/LoadEntry'
import Journal from '../screens/Journal';
import JournalEntry from '../screens/JournalEntry';
import Gratitude from '../screens/Gratitude';
import Anxiety from '../screens/Anxiety';
import Lonely from '../screens/Lonely';
import Insecure from '../screens/Insecure';
import Happy from '../screens/Happy';
import Angry from '../screens/Angry/Angry';

import Language from '../screens/Language';
import LoginAzure from '../screens/Login Azure';

import { RFPercentage } from 'react-native-responsive-fontsize';

import LanguageActions from '../store/language/actions';



const BottomTab = createBottomTabNavigator();

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

// Screens on homepage
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <HomeStack.Screen
        name="BookService"
        component={BookService}
        options={{ 
          
          title: 'Book a service',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'BarlowCondensed_600SemiBold',
            // fontSize: 21
            fontSize: RFPercentage(2.8),
          }
        }}
      />
      <HomeStack.Screen
        name="EventDetails"
        component={EventDetails}
        options={() => ({
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTintColor: 'transparent',
          headerLeft: () => null,
        })}/>
      <HomeStack.Screen
        name="DailyMission"
        component={DailyMission}
        options={() => ({
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTintColor: 'transparent',
          headerLeft: () => null,
        })}/>

    </HomeStack.Navigator>

  );
};

const EventsStack = createStackNavigator();
// Screens on events page
function EventsNavigator() {
  return (
    <EventsStack.Navigator mode="modal">
      <EventsStack.Screen
        name="Events"
        component={Events}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <EventsStack.Screen
        name="EventDetails"
        component={EventDetails}
        options={() => ({
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTintColor: 'transparent',
          headerLeft: () => null,
          // headerBackImage: () => ( <AntDesign name='close' size= {30} style={ {marginLeft: 20, marginTop: 20} }/>)
        })}
      />
      <EventsStack.Screen
        name="FilterSearchPage"
        component={FilterSearchPage}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => null,
          // headerBackImage: () => (<AntDesign name='close' size= {30} style={ {marginLeft: 30, marginTop: 20} }/>)
        }}
      />
    </EventsStack.Navigator>
  );
};

const SelfHelpStack = createStackNavigator();
// Screens on self help page
function SelfNavigator() {
  return (
    <SelfHelpStack.Navigator>
      <SelfHelpStack.Screen
        name="Self-Help"
        component={Self}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <SelfHelpStack.Screen
        name="TriviaTuesday"
        component={TriviaTuesday}
        options={{ 
          headerTitle: "", 
          headerTransparent: true, 
          headerBackTitleStyle: {
            fontFamily: 'BarlowCondensed_400Regular',
            // fontSize: 20
            fontSize: RFPercentage(2.7),
          },
        }}
      />
      <SelfHelpStack.Screen
        name="Journal"
        component={Journal}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
          // headerBackImage: () => <Ionicons name="chevron-back" size={30} style={{marginTop: 20, marginLeft: 15}}/>
        }}
      />
      <SelfHelpStack.Screen
        name="JournalEntry"
        component={JournalEntry}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />

      <SelfHelpStack.Screen
        name="Gratitude"
        component={Gratitude}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="Anxiety"
        component={Anxiety}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="LoadEntry"
        component={LoadEntry}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="LoadPrompt"
        component={LoadPrompt}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="Lonely"
        component={Lonely}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="Insecure"
        component={Insecure}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="Happy"
        component={Happy}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <SelfHelpStack.Screen
        name="Angry"
        component={Angry}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
        />
        <SelfHelpStack.Screen
        name="BookSession"
        component={BookSession}
        options={{ headerTitle: 'Book a Session', 
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'BarlowCondensed_600SemiBold',
          // fontSize: 21
          fontSize: RFPercentage(2.8),
        } }}
      />

      {/* <SelfHelpStack.Screen
        name="JournalEntry"
        component={JournalEntry}
        options={() => ({
          headerBackTitleVisible: false,
          headerBackVisible: false, 
          headerTitle:  'New Entry',
          headerTransparent: true,
          headerTintColor: '#000000',
          headerStyle: { backgroundColor: '#f5fffa' },
          
          headerBackImage: () => ( <AntDesign name='close' size= {28} style={ {marginLeft: 350, marginTop: 5,} }/>)
        })}
      />
      <SelfHelpStack.Screen
        name="Gratitude"
        component={Gratitude}
        options={() => ({
          headerBackTitleVisible: false,
          headerBackVisible: false, 
          headerTitle:  'Gratitude',
          headerTransparent: false,
          headerTintColor: '#000000',
          headerStyle: { backgroundColor: '#f5fffa' },
          
          headerBackImage: () => ( <AntDesign name='close' size= {28} style={ {marginLeft: 350, marginTop: 5,} }/>)
        })}
      /> */}


    </SelfHelpStack.Navigator>
  );
};

const ContactStack = createStackNavigator();
// Screens on contact page
function ContactNavigator() {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="SocialIntents"
        component={SocialIntents}
        options={{ 
          title: "Chat", 
          headerTransparent: false,
          headerTitleStyle: {
            fontFamily: 'BarlowCondensed_600SemiBold',
            // fontSize: 25,
            fontSize: RFPercentage(3),
            paddingBottom: 5
          },
        }}
      />

    </ContactStack.Navigator>
  );
};
const ProfileStack = createStackNavigator();
// Screens on profile page
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: "", headerTransparent: true }}
      />
       <HomeStack.Screen
        name="LoginAzure"
        component={LoginAzure}
        options={{ 
          
          title: 'Log in',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'BarlowCondensed_600SemiBold',
            // fontSize: 21
            fontSize: RFPercentage(2.8),
          }
        }}
      />
      
      <ProfileStack.Screen
        name="CreateAvatar"
        component={CreateAvatar}
        options={{ 
          headerTransparent: true, 
          headerTitle: "", 
          headerBackTitleStyle: {
            fontFamily: 'BarlowCondensed_400Regular',
            // fontSize: 20
            fontSize: RFPercentage(2.7),
          },
        }}
      />
      <ProfileStack.Screen
        name="PointSystem"
        component={PointSystem}
        options={{ headerBackTitleVisible: false, headerTransparent: true, headerTitle: "", headerLeft: () => null }}
      />
      <ProfileStack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ headerBackTitleVisible: false, headerTransparent: true, headerTitle: "", headerLeft: () => null }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerBackTitleVisible:true, headerTransparent: true, headerTitle: "", headerLeft: () => null }}
      />
      <ProfileStack.Screen
        name="Language"
        component={Language}
        options={{ headerBackTitleVisible:true, headerTransparent: true, headerTitle: "", headerLeft: () => null }}
      />
    </ProfileStack.Navigator>
  );
};
// Pages displayed on the bottom navigation menu, correspond to stack navigator above
export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.orangePrimary, labelPosition: "below-icon", inactiveTintColor: Colors.tabIconNotSelected,
        // tabStyle: { height: 49, paddingTop: 10 },
        tabStyle: { height: '100%', paddingBottom: '5%' },
        style: {
          height: Platform.OS === 'ios' ? '13%' : '10%',
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          borderTopColor: '#002E16',
          borderTopWidth: 0,
          shadowRadius: 30,
          shadowOpacity: 0.05,
        },
        labelStyle: {
          fontFamily: 'BarlowCondensed_500Medium',
          // fontSize: 12,
          fontSize: RFPercentage(2),
          backgroundColor: 'transparent',
        }
      }}>
      <BottomTab.Screen
        name={LanguageActions.getLanguage()=='english' ? 'Home' : "Menu"}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <CoolIcons name="home_fill" color={color} style={{fontSize: RFPercentage(3.8)}}/>,
        }}
      />
      <BottomTab.Screen
        name={LanguageActions.getLanguage()=='english' ? 'Events' : "Évènements"}
        component={EventsNavigator}
        options={{
          tabBarIcon: ({ color }) => <CoolIcons name="calendar" color={color} style={{fontSize: RFPercentage(3.8)}}/>,
        }}
      />
      <BottomTab.Screen
        name={LanguageActions.getLanguage()=='english' ? 'Self-Help' : "Aide"}
        component={SelfNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="flower-tulip" color={color} style={{fontSize: RFPercentage(3.8)}}/>,
        }}
      />
      <BottomTab.Screen
        name={LanguageActions.getLanguage()=='english' ? 'Chat' : "Clavardage"}
        component={ContactNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-chatbubbles-sharp" color={color} style={{fontSize: RFPercentage(3.8)}}/>,
        }}
      />
      <BottomTab.Screen
        name={LanguageActions.getLanguage()=='english' ? 'Profile' : "Profil"}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <CoolIcons name="user" color={color} style={{fontSize: RFPercentage(3.8)}} />,
        }}
      />

    </BottomTab.Navigator>
  );
};
