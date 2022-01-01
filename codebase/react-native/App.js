import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import Nav from './components/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
