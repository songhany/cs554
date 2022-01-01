import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({route}) => {
  return (
    <View style={styles.header}>
      <Text style={{textAlign: 'center', color: 'white'}}>
        {' '}
        Hello world {route.params ? <>{route.params.id}</> : null}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    padding: 15,
    backgroundColor: 'darkslateblue'
  }
});

export default Header;
