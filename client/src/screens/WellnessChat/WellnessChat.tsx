// import React, { Component } from 'react';
// import { Alert, ScrollView } from 'react-native';
// import { Button } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import { Hoshi } from 'react-native-textinput-effects';
// import { Dropdown } from 'sharingan-rn-modal-dropdown';

// import { Text, View } from '../../components/Themed';
// import styles from './styles';


// export default class WellnessChat extends Component {
//   render() {
//     const dataMember = [
//       {
//         value: 'Mieux-être / Wellness',
//         label: 'Mieux-être / Wellness',
//       },
//     ];

//     const dataPronoun = [
//       {
//         value: 'He/Him',
//         label: 'He/Him',
//       },
//       {
//         value: 'She/Her',
//         label: 'She/Her',
//       },
//       {
//         value: 'They/Them',
//         label: 'They/Them',
//       },
//     ];

//     var initialValues = {
//       firstName: '',
//       email: '',
//       pronouns: '',
//       wellnessMember: '',
//       message: ''
//     };

//     const validationSchema = yup.object().shape({
//       firstName: yup
//         .string()
//         .required('Please provide your name!'),
//       email: yup
//         .string()
//         .email()
//         .required('Please provide your email!'),
//       wellnessMember: yup
//         .string()
//         .required(),
//     })

//     return (
//       <View style={styles.container} >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={values => Alert.alert(JSON.stringify(values))}
//             validationSchema={validationSchema}
//           >
//             {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
//               <View style={styles.formContainer}>
//                 <Hoshi
//                   label={'First Name'}
//                   style={styles.input}
//                   inputStyle={styles.inputText}
//                   borderColor={'#019347'}
//                   value={values.firstName}
//                   onChangeText={handleChange('firstName')}
//                   onBlur={() => setFieldTouched('firstName')}
//                   height={40}
//                   autoCompleteType={'name'}
//                   importantForAutofill={'yes'}
//                 />
//                 {touched.firstName && errors.firstName &&
//                   <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.firstName}</Text>
//                 }
//                 <Hoshi
//                   label={'Email'}
//                   style={styles.input}
//                   inputStyle={styles.inputText}
//                   borderColor={'#1D5F71'}
//                   value={values.email}
//                   onChangeText={handleChange('email')}
//                   onBlur={() => setFieldTouched('email')}
//                   height={40}
//                   autoCompleteType={'email'}
//                   importantForAutofill={'yes'}
//                 />
//                 {touched.email && errors.email &&
//                   <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
//                 }
//                 <Dropdown
//                   label='Pronouns'
//                   data={dataPronoun}
//                   mainContainerStyle={styles.dropdown}
//                   itemTextStyle={styles.dropdownText}
//                   textInputStyle={styles.dropdownText}
//                   value={values.pronouns}
//                   onChange={handleChange('pronouns')}
//                   animationIn='fadeIn'
//                   animationOut='fadeOut'
//                   underlineColor={"grey"}
//                   borderRadius={16}
//                   selectedItemTextStyle={{ 'color': '#019347' }}
//                   animationInTiming={100}
//                   animationOutTiming={25}
//                 />
//                 <Dropdown
//                   label='Who do you want to chat with?'
//                   data={dataMember}
//                   required
//                   mainContainerStyle={styles.dropdown}
//                   itemTextStyle={styles.dropdownText}
//                   textInputStyle={styles.dropdownText}
//                   error={errors.wellnessMember ? true : false}
//                   value={values.wellnessMember}
//                   onChange={handleChange('wellnessMember')}
//                   animationIn='fadeIn'
//                   animationOut='fadeOut'
//                   underlineColor={"grey"}
//                   borderRadius={16}
//                   selectedItemTextStyle={{ 'color': '#8F001A' }}
//                   animationInTiming={100}
//                   animationOutTiming={25}
//                 />
//                 <Hoshi
//                   multiline={true}
//                   label={'Message'}
//                   style={styles.input}
//                   inputStyle={styles.inputText}
//                   borderColor={'#E16226'}
//                   spellCheck={true}
//                   autoCorrect={true}
//                   value={values.message}
//                   onChangeText={handleChange('message')}
//                   onBlur={() => setFieldTouched('message')}
//                   height={80}
//                   numberOfLines={5}
//                   clearButtonMode={'while-editing'}
//                   autoCapitalize={'sentences'}
//                 />
//                 <Button
//                   icon={<Ionicons name='checkmark' size={25} color='white' />}
//                   onPress={() => { handleSubmit }}
//                   disabled={!isValid}
//                   title='Submit'
//                   buttonStyle={styles.submit}
//                 />
//               </View>
//             )}
//           </Formik>
//         </ScrollView>
//       </View>
//     );
//   }
// }
