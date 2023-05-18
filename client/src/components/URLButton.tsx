import * as React from 'react';
import { Linking, Alert } from 'react-native';
import {Button} from 'react-native-elements';
/*
This button can be used to redirect the user to a webpage using a URL
It has all the properties of a regular react-native-elements button
*/ 
export interface URLButtonProps {
    url: string,
    title: string,
    buttonStyle: any
}
const URLButton = (props: URLButtonProps) => {
    const handlePress = React.useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(props.url);
        if (supported) {
            await Linking.openURL(props.url);
        } else {
            Alert.alert(`ERROR: Cannot open webpage`);
        }
    }, [props.url]);

    return <Button title={props.title} buttonStyle={props.buttonStyle} onPress={handlePress} />;
};

export default URLButton;
