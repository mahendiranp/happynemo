import React, {useState} from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';



import Icon from 'react-native-vector-icons/FontAwesome';


import Dashboard from './Dashboard'


function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function WatchTutorial() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>WatchTutorial!</Text>
    </View>
  );
}



function FAQ() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>FAQ!</Text>
    </View>
  );
}


const HomeScreen = () => (
  <View style={styles.container}>
      <Text>Home Screen!</Text>
  </View>
);


const ProfileScreen = () => (
  <View style={styles.container}>
      <Text>Profile Screen!</Text>
  </View>
);


const SettingsScreen = () => (
  <View style={styles.container}>
      <Text>Settings Screen!</Text>
  </View>
);




const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function LeftDrawer() {
  return (
    <Drawer.Navigator initialRouteName="RightDrawer" drawerPosition="left">
      <Drawer.Screen name="MyTabs" component={MyTabs} />
      <Drawer.Screen name="Help" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'WatchTutorial') {
              return (
                <Icon name="tv" size={size} color={color} />
              );
            } else if (route.name === 'Dashboard') {
              return (
                <Icon name="home" size={size} color={color} />
              );
            } else if (route.name === 'FAQ') {
              return (
                <Icon name="question-circle" size={size} color={color} />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
      <Tab.Screen name="WatchTutorial" component={WatchTutorial} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="FAQ" component={FAQ} />
    </Tab.Navigator>
  );
}

function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', border:'red' }}>
    <Image
      style={{ width: 67, height: 32, }}
      source={require('../assests/Logo_White.png')}
    />
    </View>
  );
}



const  HomeScreeen = ({ navigation }) => {

    const [selectionCount, setSelectionCount] = React.useState(0);

    React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => <LogoTitle {...props} />,
      headerTitleAlign: 'left',
      headerLeft: (props) => (
        <View style={styles.header}>
        <Icon name="bars" size={20} color={'white'} onPress={() =>  navigation.dispatch(DrawerActions.toggleDrawer())} />
        </View>
      ),
      headerStyle: {
        backgroundColor: '#f39924',
      },
    });
  }, [navigation, selectionCount]);
    return (
      <LeftDrawer />
    );
  }

export default HomeScreeen


const styles = StyleSheet.create({
  tinyIcon: {
    width: 25,
    resizeMode: 'contain',
    color: 'red'
  },
  header:{
    width:25,
    flex: 1,
    justifyContent: 'center',
    marginLeft:20
  }
})
