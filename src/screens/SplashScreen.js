/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, {useState, useEffect} from 'react';

//Import all required component
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const SplashScreen = (props) => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user)
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setAnimating(false);
    //   //Check if user_id is set or not
    //   //If not then send for Authentication
    //   //else send to Home Screen
    //   AsyncStorage.getItem('user_id').then(value =>
    //     props.navigation.navigate(
    //       value === null ? 'Login' : 'DrawerNavigationRoutes'
    //     )
    //   );
    // }, 5000);
  }, []);

  useEffect(() => {
    //const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //return subscriber; // unsubscribe on unmount

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  console.log(user)

  if (!user) {
    //props.navigation.navigate('Login');
    props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Login'
              },
            ],
          })
  } else {
    //props.navigation.navigate('RegisterScreen');
    //props.navigation.navigate('HomeScreen');
    props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'HomeScreen'
              },
            ],
          })
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/nemo_splash_bg.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
