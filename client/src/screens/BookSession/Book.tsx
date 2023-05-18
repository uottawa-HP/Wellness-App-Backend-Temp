import * as React from 'react';
import { WebView } from 'react-native-webview';

//the URL could change in the future 
export default function Book() {
  return (
    <WebView source={{uri: 'https://sassit.uottawa.ca/ventus/counselling/intake-form.php' }} />
  );
};
