/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
import { Link } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import StepIndicator from 'react-native-step-indicator';


import Loader from '../components/Loader';

GoogleSignin.configure({
  webClientId: '',
});



const RegisterScreen = props => {
  let [userName, setUserName] = useState('');
  let [userAge, setUserAge] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
   let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [invalidpassword, setinvalidpassword] = useState(false)
  const [state, setState] = useState({language: 'java'})

  const handleSubmitPress = () => {
    setErrortext('');
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!userPassword) {
    //   alert('Please fill Password');
    //   return;
    // }
  };

  const handleBack = () => {
   //props.navigation.navigate('LoginScreen')
  }

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  
  return (
     <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 100}}>
          <KeyboardAvoidingView enabled>
            <Text style={styles.headerStyle}>REGISTER</Text>
            <Text style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
                flexWrap: 'wrap',
                margin: 20,
                textAlign: 'center'
              }}>Enter your details</Text>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter parent / guardian's name *" //dummy@abc.com
                placeholderTextColor="#000000"
                autoCapitalize="none"
                keyboardType="email-address"
                ref={(ref) => {
                  this._emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
              {invalidpassword && <Text>Invalid </Text>}
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter email address" //12345
                placeholderTextColor="#000000"
                keyboardType="default"
                ref={(ref) => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter phone number" //dummy@abc.com
                placeholderTextColor="#000000"
                autoCapitalize="none"
                keyboardType="email-address"
                ref={(ref) => {
                  this._emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
              {invalidpassword && <Text>Invalid </Text>}
            </View>
            <View  style={styles.languagSelect}>
            <Text>Select preferred languages *</Text>
            </View>

            <View style={styles.inline}>
              <TouchableOpacity
                style={styles.buttonStyleSecondary}
                activeOpacity={0.5}
                onPress={handleBack}>
                <Text style={styles.backButton}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStylePrimary}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tinyImages}>
              <Text style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
                flexWrap: 'wrap',
                margin: 20,
                textAlign: 'center'
              }}>
              Select up to 3 languages in which
you can experience Nappy Nemo's Nest
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
                flexWrap: 'wrap',
                margin: 10,
              }}>
              <Text />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStylePrimary: {
    backgroundColor: '#f39924',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#f39924',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft:5,
    marginRight:5,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 2 ,
    shadowOffset : { width: 2, height: 0}
  },
  buttonStyleSecondary: {
    backgroundColor: '#f8f8f8',
    color: '#FFFFFF',
    borderColor: '#f39924',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft:5,
    marginRight:5,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 2 ,
    shadowOffset : { width: 2, height: 0}
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  headerStyle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  inputStyle: {
    flex: 1,
    color: 'rgba(0, 0, 0, 0.38)',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    padding: 5,
    borderBottomColor: '#f39924',
    borderBottomWidth: 2,
    },
  registerTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 14,
    paddingTop: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  signupText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  orText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    padding: 30,
  },
  tinyImages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
  },
  tinyLogo: {
    padding: 10,
    alignSelf: 'center',
  },
  signupLink: {
    color: '#f39924',
  },
  backButton: {
    color: '#333333',
    paddingVertical: 10,
    fontSize: 16,
  },
  inline:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
  },
  languagSelect:{

  }
});