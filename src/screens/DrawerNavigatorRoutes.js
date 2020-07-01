import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform, Image, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

function Main() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <Text>Hi {user && user.email}!</Text>
      <View>
        <Button title="Log out" onPress={handleLogout} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
