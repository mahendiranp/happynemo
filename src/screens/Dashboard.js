import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TodayScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SavedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const saved = `Hello (${5})`

export default function Dashboard() {
  return (
     <Tab.Navigator tabBarOptions={{
            labelStyle: { fontSize: 12, fontWeight:'bold' },
            style: { backgroundColor: '#fff' },
                activeTintColor: 'black',
    inactiveTintColor: 'black',
        indicatorStyle: {
      borderBottomColor: '#f39924',
      borderBottomWidth: 3,
    },
        }}>
        <Tab.Screen  name="Today" component={TodayScreen} />
        <Tab.Screen  name={saved} component={SavedScreen} />
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
  }
});
