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
  Button,
  Dimensions,
  Alert
} from 'react-native';
import { Link } from '@react-navigation/native';
 import { Formik } from 'formik';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import StepIndicator from 'react-native-step-indicator';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';



import Stepper from '../components/Stepper'
import Loader from '../components/Loader'
import ChildInfo from '../components/ChildInfo'

GoogleSignin.configure({
  webClientId: '',
});

const languages = [
  { label: 'English', value: 'english' },
  { label: 'Hindi', value: 'hindi' },
  { label: 'Marathi', value: 'marathi' }
]




const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const scale = 375; 
const scaleFontSize = (fontSize) => {
    const ratio = fontSize / scale; // get ratio based on your standard scale
    const newSize = Math.round(ratio * deviceWidth);
    return newSize;
}

const RegisterScreen = props => {
  let [parentName, setParentName] = useState('');
  let [userAge, setUserAge] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  let [userEmail, setUserEmail] = useState('');
  let [parentEmail, setParentEmail] = useState('');
  let [parentphoneNumber, setParentPhoneNumber] = useState('');
  let [parentPassword, setParentPassword] = useState('');
  let [parentLang1, setparentLang1] = useState('');
  let [parentLang2, setparentLang2] = useState('');
  let [parentLang3, setparentLang3] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [invalidpassword, setinvalidpassword] = useState(false)
  const [step, setStep] = useState(0);
  const [kidsinfo, setKidsInfo] = useState([{
    name:null,
    age:null,
    month:null,
    gender:null
  }])


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
    if(step === 0) {
      setStep(1)
    } else if(step === 1) {

    try {
        auth().createUserWithEmailAndPassword(parentEmail, parentPassword)
            .then((res) => {
              console.log(res);
              console.log(res.user.uid)
              firestore()
              .collection('Users')
              .doc(res.user.uid)
              .set({
                name: parentName,
                email: parentEmail,
                phone: parentphoneNumber,
                lang1: parentLang1,
                lang2: parentLang2,
                lang3: parentLang3,
                kidsinfo: kidsinfo
              })
              .then(() => {
                console.log('User added!');
              });
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
    }
  };

  const handleBack = () => {
   props.navigation.navigate('LoginScreen')
  }

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };


const handleKidsList = () => {
  console.log(kidsinfo)
  let newData = {
    name:null,
    age:null,
    month:null,
    gender:null
  }
let data = ([...kidsinfo, newData])
setKidsInfo(data)
}

const removeHandler = (value) => {
  console.log(value)
    const list = [...kidsinfo];
    list.splice(value, 1);
    setKidsInfo(list);
}

const handleChildsData = (value1, value2) => {
  console.log(kidsinfo)
  const list = [...kidsinfo];
  list[value1] = value2;
  setKidsInfo(list)
}

console.log(kidsinfo)
  
  return (
     <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 40}}>
          <Stepper currentPage={step}/>
          <KeyboardAvoidingView enabled>
            <Text style={styles.headerStyle}>REGISTER</Text>
            {step === 0 && 
            <View>
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
                  onChangeText={(name) => setParentName(name)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter parent / guardian's name *" //dummy@abc.com
                  placeholderTextColor="#000000"
                  autoCapitalize="none"
                  keyboardType="default"
                  autoCompleteType="off"
                  textContentType="name"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(email) => setParentEmail(email)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter email address" //12345
                  autoCapitalize="none"
                  placeholderTextColor="#000000"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(number) => setParentPhoneNumber(number)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter phone number" //dummy@abc.com
                  placeholderTextColor="#000000"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  textContentType="telephoneNumber"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(password) => setParentPassword(password)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter password" //dummy@abc.com
                  placeholderTextColor="#000000"
                  autoCapitalize="none"
                  keyboardType="default"
                  textContentType="password"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />
              </View>
              <View  style={styles.langSelectArea}>
                  <View style={styles.languagText}><Text>Select preferred languages *</Text></View>
                  <View style={styles.langselect}>
                    <View style={styles.selectBox}>
                        <RNPickerSelect
                        placeholder={{label:'language 1'}}
                        items={languages}
                        onValueChange={value => {
                          setparentLang1(value)
                        }}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return (
                              <View
                                style={{
                                  backgroundColor: 'transparent',
                                  borderTopWidth: 5,
                                  borderTopColor: 'gray',
                                  borderRightWidth: 5,
                                  borderRightColor: 'transparent',
                                  borderLeftWidth: 5,
                                  borderLeftColor: 'transparent',
                                  width: 0,
                                  height: 0,
                                  marginTop:5
                                }}
                              />
                            );
                          }}
                        />
                    </View>
                    <View style={styles.selectBox}>
                      <RNPickerSelect
                        placeholder={{label:'language 2'}}
                        items={languages}
                        onValueChange={value => {
                          setparentLang2(value)
                        }}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return (
                              <View
                                style={{
                                  backgroundColor: 'transparent',
                                  borderTopWidth: 5,
                                  borderTopColor: 'gray',
                                  borderRightWidth: 5,
                                  borderRightColor: 'transparent',
                                  borderLeftWidth: 5,
                                  borderLeftColor: 'transparent',
                                  width: 0,
                                  height: 0,
                                  marginTop:5
                                }}
                              />
                            );
                          }}
                        />
                    </View>
                    <View style={styles.selectBox}>
                      <RNPickerSelect
                        placeholder={{label:'language 3'}}
                        items={languages}
                        onValueChange={value => {
                          setparentLang3(value)
                        }}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return (
                              <View
                                style={{
                                  backgroundColor: 'transparent',
                                  borderTopWidth: 5,
                                  borderTopColor: 'gray',
                                  borderRightWidth: 5,
                                  borderRightColor: 'transparent',
                                  borderLeftWidth: 5,
                                  borderLeftColor: 'transparent',
                                  width: 0,
                                  height: 0,
                                  marginTop:5
                                }}
                              />
                            );
                          }}
                        />
                    </View>
                  </View>
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
            </View> }
            {step === 1 && <View>
            <View>
               <Text style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flex: 1,
                  flexWrap: 'wrap',
                  margin: 20,
                  textAlign: 'center'
                }}>Enter your children's details ss</Text>
                 
                 <Text>{kidsinfo.length}</Text>

                 {kidsinfo && kidsinfo.map((data, index) => {
                   return(<ChildInfo childIndex={index} removeIndex={removeHandler} filledData={handleChildsData} enableRemove={kidsinfo.length > 1}/>)
                 })}
                 
                 <Button title='+' onPress={handleKidsList}/>
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
            </View> }
            {step === 2 && <View><Text>3</Text></View> }
            {step === 3 && <View><Text>4</Text></View> }
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
  container:{
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
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
    fontSize:9,
    marginLeft: 35,
    marginRight: 35,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },

  langSelectArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft:15,
    marginRight:15,
    marginTop:10
  },
  selectBox:{
    flex: 1,
    color: 'rgba(0, 0, 0, 0.38)',
    fontSize: 14,
    fontWeight: '400',
    borderBottomColor: '#f39924',
    borderBottomWidth: 2,
    marginLeft:5,
    marginRight:5,
    paddingTop:0,
    paddingBottom:0,
  },
  languagText:{
    color:'black',
    fontSize:14,
    flex: 1
  },
  langselect:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flex: 2
  },
    editIcon: {
      color: '#E14ED2',
      fontSize: 15,
    },
    fullWidth:{
      flex: 1,
      marginVertical:10
    },
    childSection:{
      flex:1,
      flexDirection: 'row',
      justifyContent:'space-evenly',
      marginHorizontal:15
    },
    sectionOne:{
      flexShrink: 1,
      marginHorizontal:5
    },
    sectionTwo:{
      flexShrink: 1,
      marginHorizontal:5
    },
    sectionThree: {
      flexShrink: 1,
      marginHorizontal:5
    }, 
    sectionFour: {
      flexShrink: 1,
    }


});



const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        fontSize: scaleFontSize(16),
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
        marginBottom: 5,
        fontSize:12,
    },
    inputAndroid: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        fontSize: scaleFontSize(16),
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
        marginBottom: 5,
        fontSize:12,
        top: 20,
        right: 10,
          ...Platform.select({
      android: {
        top: 0,
        right: 0,
        height:20,
        padding:0,
        margin:0
      },
    }),
    },
});