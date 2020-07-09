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
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { Link } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '',
});
const ForgotPasswordScreen = (props) => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [invalidpassword, setinvalidpassword] = useState(false)
  let [invalidpusername, setinvalidpusername] = useState(false)

  const handleSubmitPress = (userEmail) => {
    console.log(userEmail)
  };

  const handleBack = () => {
      props.navigation.navigate('LoginScreen')
  }

  const LoginScheme = Yup.object().shape({
   email: Yup.string()
     .email('Invalid email')
     .required('Required'),
 });

  return (
    <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 100}}>
          <KeyboardAvoidingView enabled>
            <Formik
                initialValues={{ 
                  email: '',
                }}
                validationSchema={LoginScheme}
                onSubmit={values => handleSubmitPress(values.email)}
              >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <Text style={styles.headerStyle}>Forgot password</Text>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={handleChange('email')}
                      value={values.email}
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
                     {errors.email && touched.email ? (
                        <Text style={styles.errormessage}>{errors.email}</Text>
                      ) : null}
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
                  onPress={handleSubmit}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
            )}
            </Formik>
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
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  SectionStyle: {
    flexDirection: 'column',
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
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    padding: 5,
    borderBottomColor: '#f39924',
    borderBottomWidth: 2,
  },
  errormessage:{
    color:'red',
    paddingVertical:5
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
    inline:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
  },
    backButton: {
    color: '#333333',
    paddingVertical: 10,
    fontSize: 16,
  },
});
