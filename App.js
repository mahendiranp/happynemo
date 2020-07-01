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

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DrawerNavigationRoutes from './src/screens/DrawerNavigatorRoutes';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
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
    </>
  );
};

export default App;
