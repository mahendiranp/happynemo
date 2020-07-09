
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
  TouchableWithoutFeedback
} from 'react-native';
import { Link } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const scale = 375; 
const scaleFontSize = (fontSize) => {
    const ratio = fontSize / scale; // get ratio based on your standard scale
    const newSize = Math.round(ratio * deviceWidth);
    return newSize;
}


const age = [
  { label: '1', value: '1'},
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' }
]

const months = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11'},
  { label: '12', value: '12' }
]


const period = [
      {
        key: 1,
        name : '1 Month',
        value : 1,

      },
      {
        key : 2,
        name : '12 Month',
        value : 12,

      }
    ];




const ChildInfo = (props) => {
    console.log(props)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date)
  const [childName, setChildName] = useState("")
  const [childeGender, setChildGender] =useState("")
    
const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [filledData, setFilledData] = useState({
      name:"",
      age:"",
      month:"",
      gender:""
  })
 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
 
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
 
  const showDatepicker = () => {
    showMode('date');
  };
 
  const showTimepicker = () => {
    showMode('time');
  };  


const handleRemove = () => {
    props.removeIndex(props.childIndex)
}

const handleChildName = (name) => {
    setChildName(name)
    let newdata = {
        ...filledData,
        name:name
    }
    setFilledData(newdata)
    props.filledData(props.childIndex, newdata)
}

const handleAge = (age) => {
    setChildName(age)
    let newdata = {
        ...filledData,
        age:age
    }
    setFilledData(newdata)
    props.filledData(props.childIndex, newdata)
}

const handleMonth = (value) => {
    setChildName(value)
    let newdata = {
        ...filledData,
        month:value
    }
    setFilledData(newdata)
    props.filledData(props.childIndex, newdata)
}

const onPressHandleRadio = (value) => {
     setChildGender(value)
    let newdata = {
        ...filledData,
        gender:value
    }
    setFilledData(newdata)
    props.filledData(props.childIndex, newdata)
}


    return(
        <View>
        <View style={styles.container}>
                 <View style={styles.fullWidth}>
                  <View style={styles.childSection}>
                   <View style={styles.sectionOne}>
                    <Text>Child Name</Text>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={handleChildName}
                      underlineColorAndroid="#FFFFFF"
                      placeholder="" //12345
                      placeholderTextColor="#000000"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      blurOnSubmit={false}
                    />
                   </View>
                   <View style={styles.sectionTwo}>
                    <Text>Age</Text>
                    <View style={styles.inline}>
                     <View style={styles.selectBox}>
                        <RNPickerSelect
                        placeholder={{label: 'Age'}}
                        items={age}
                        onValueChange={handleAge}
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
                        placeholder={{label: 'Month'}}
                        items={months}
                        onValueChange={handleMonth}
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
                   <View style={styles.sectionThree}>
                    <Text>Gender</Text>
                    <View style={styles.radioInline}>
                         <TouchableOpacity
                            style= {[styles.radioButton, childeGender === 'M' ? styles.radioActive : styles.radioButton]}
                            onPress={()=> onPressHandleRadio('F')}
                        >
                            <Text style={styles.radioText}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.radioButton, childeGender === 'F' ? styles.radioActive : styles.radioButton]}
                            onPress={()=> onPressHandleRadio('M')}
                        >
                            <Text style={styles.radioText}>F</Text>
                        </TouchableOpacity>
                    </View>
                   </View>
                   <View style={styles.sectionFour}>{props.enableRemove && <TouchableOpacity onPress={handleRemove}><Text>X</Text></TouchableOpacity>}</View>
                  </View>
                 </View>
                 </View>
        </View>
    )
}

export default ChildInfo


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
      marginHorizontal:5,
      width:100
    },
    sectionTwo:{
      marginHorizontal:5,
      width:100
    },
    sectionThree: {
      marginHorizontal:5,
      width:100
    }, 
    sectionFour: {
        width:10
    },
    radioInline:{
    padding:0,
    margin:5,
    display:'flex',
    flexDirection:'row'
    },
    radioButton:{
        width: 35,
        height: 35,
        backgroundColor: '#f39924',
        borderRadius:35,
        marginRight:5
    },
    radioActive:{
        width: 35,
        height: 35,
        backgroundColor: '#fff',
        borderRadius:35,
        marginRight:5,
        borderWidth:1,
        borderColor:'#f39924'
    },
    radioText:{
        fontSize:12,
        lineHeight:35,
        color:'#ffffff',
        textAlign:'center'
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