import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  TouchableElement,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { Link } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '',
});
const LoginScreen = (props) => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [invalidpassword, setinvalidpassword] = useState(false)
  let [invalidpusername, setinvalidpusername] = useState(false)

  const handleSubmitPress = () => {
    // setErrortext('');
    // if (!userEmail) {
    //   setinvalidpusername(true)
    //   return;
    // }
    // if (!userPassword) {
    //   setinvalidpassword(true)
    //   return;
    // }

      try {
        auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch((error) => {
              console.log(error.code)
              switch(error.code) {
                case 'auth/invalid-email':
                      Alert.alert('Email already in use !')
                      break;
                case 'auth/wrong-password': 
                      Alert.alert('invalid password')
                      break;
                case 'auth/user-not-found':
                      Alert.alert('invalid user')
                      break;
            }
            });

      } catch (error){
        Alert.alert(error)
      }
  };

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
            <Text style={styles.headerStyle}>Sign in</Text>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#888888"
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
              {invalidpusername && <Text>Invalid </Text>}
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#888888"
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
            {invalidpassword && <Text>Invalid </Text>}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>- OR -</Text>
            <Text style={styles.signupText}>Sign in with</Text>
            <View style={styles.tinyImages}>
              <Image
                style={styles.tinyLogo}
                source={require('../assests/icon-fb.png')}
              />
              <Image
                style={styles.tinyLogo}
                source={require('../assests/icon-gmail.png')}
              />

              <Button
                title="Google Sign-In"
                onPress={() =>
                  onGoogleButtonPress().then(() =>
                    console.log('Signed in with Google!'),
                  )
                }
              />
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
              <Text>Don't have an account? </Text>
              <Link to="/RegisterScreen">Sign up</Link>
              <Text />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

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
  buttonStyle: {
    backgroundColor: '#f39924',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#f39924',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
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
    color: '#000000',
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
});
