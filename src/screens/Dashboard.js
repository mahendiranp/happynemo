import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, Alert,   SafeAreaView,
  FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import LikeComponent from '../components/LikeComponent'
import CategoryComponent from '../components/CategoryComponent'



const Tab = createMaterialTopTabNavigator();

function TodayScreen() {

  const [activities, setActivities] = useState([])

  async function getResponse(){
  const usersCollection = database()
  .ref('activities')
  .on('value', snapshot => {
    setActivities(snapshot.val())
  });
  console.log(usersCollection)
  }

useEffect( () => {
  getResponse();
}, [])
  return (
        <SafeAreaView style={styles.container}>
      <FlatList
        data={activities.length ? activities : []}
        renderItem={({ item }) => <Item title={item.title} desc={item.description} skills={item.skills} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const Item = ({title, desc, skills}) => (
  <View style={styles.itemContainer} >
    <View style={styles.box1} >
      <Image 
        style={styles.tinyLogo}
        source={require('../assests/brain.png')}/>
    </View>
    <View style={styles.box2} >
      <Text style={styles.itemTitle} >{title}</Text>
      <Text style={styles.itemdesc} >{desc}</Text>
      <CategoryComponent categories={skills} />
    </View>
    <View style={styles.box3} >
      <LikeComponent isSaved={false} />
    </View>
  </View>
);

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
  },
  itemContainer:{
     flex: 1,
     flexDirection: 'row',
     marginLeft:20,
     marginRight:20,
     marginTop:10,
     marginBottom:10
  },
  box1: {
    flex: 1,
    width:50,
    padding:10
},
box2: {
    flex: 10,
    padding:10
},
box3: {
    flex: 1,
        display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
},
  tinyImages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
  },
  tinyLogo: {
    alignSelf: 'center',
    width:44,
    height:44,
  },
  itemTitle:{
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    paddingBottom:5
  },
  itemdesc: {
  color: '#000000',
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 0.03,
    lineHeight: 15,
  }
});
