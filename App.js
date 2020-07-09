/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux'
import store from './src/store'

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import IndividualActivity from './src/screens/IndividualActivity';
import DrawerNavigationRoutes from './src/screens/DrawerNavigatorRoutes';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import ResetPasswordScreen from './src/screens/ResetPassword'

import Icon from 'react-native-vector-icons/FontAwesome';



const Stack = createStackNavigator();

const App =  ({navigation}) => {
  console.log(navigation)
  return (
    <>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="IndividualActivity"
            component={IndividualActivity}
          />
          
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerLeft: (props) => (
                <Image
                  style={{width: 67, height: 32, margin: 10}}
                  source={require('./src/assests/Logo_White.png')}
                />
              ),
              headerStyle: {
                backgroundColor: '#f39924',
              },
              headerTitle: null,
            }}
          />

          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              headerLeft: (props) => (
                <Image
                  style={{width: 67, height: 32, margin: 10}}
                  source={require('./src/assests/Logo_White.png')}
                />
              ),
              headerStyle: {
                backgroundColor: '#f39924',
              },
              headerTitle: null,
            }}
          />

          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{
              headerLeft: (props) => (
                <Image
                  style={{width: 67, height: 32, margin: 10}}
                  source={require('./src/assests/Logo_White.png')}
                />
              ),
              headerStyle: {
                backgroundColor: '#f39924',
              },
              headerTitle: null,
            }}
          />

          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            options={{
              headerLeft: (props) => (
                <Image
                  style={{width: 67, height: 32, margin: 10}}
                  source={require('./src/assests/Logo_White.png')}
                />
              ),
              headerStyle: {
                backgroundColor: '#f39924',
              },
              headerTitle: null,
            }}
          />

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerLeft: (props) => (
                <Image
                  style={{width: 67, height: 32, margin: 10}}
                  source={require('./src/assests/Logo_White.png')}
                />
              ),
              headerStyle: {
                backgroundColor: '#f39924',
              },
              headerTitle: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
