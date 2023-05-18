import * as Linking from 'expo-linking';
import DailyMission from '../screens/DailyMission';

// Hierarchy of local screens within each page on bottom navigation bar
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'home',
              BookService: 'bookService',
              DailyMission:"dailyMission"
            },
          },
          Events: {
            screens: {
              Events: 'events',
            },
          },
          'Self-Help': {
            screens: {
              'Self-Help': 'self-help',
            },
          },
          Profile: {
            screens: {
              Profile: 'profile',
              Register: 'register',
              Login: 'login',
              Language: 'language',
              LoginAzure:'LoginAzure'
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
