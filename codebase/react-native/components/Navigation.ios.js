import React from 'react';
import {Platform} from 'react-native';

import Show from './Show';
import Home from './Home';
import Search from './Search';
import Icon from 'react-native-vector-icons/MaterialIcons';

let {createBottomTabNavigator} = require('@react-navigation/bottom-tabs');

const Nav = createBottomTabNavigator();

const Navigation = () => {
  const insertIcons = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;

      iconName = focused;

      if (route.name == 'Home') iconName = 'home';
      else if (route.name == 'Search') iconName = 'search';
      else if (route.name == 'Show') iconName = 'tv';

      return <Icon name={iconName} size={24} color={color} />;
    }
  });

  return (
    <Nav.Navigator
      initialRouteName="Home"
      NavBarOptions={{
        labelStyle: {fontSize: 15},
        NavStyle: {alignContent: 'center'}
      }}>
      <Nav.Screen name="Home" component={Home} style={{fontSize: 14}} />
      <Nav.Screen name="Search" component={Search} />
      <Nav.Screen name="Show" component={Show} />
    </Nav.Navigator>
  );
};

export default Navigation;
