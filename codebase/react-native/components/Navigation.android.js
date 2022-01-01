import React from 'react';
import {Platform} from 'react-native';

import Show from './Show';
import Home from './Home';
import Search from './Search';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Nav = createMaterialBottomTabNavigator();

const Navigation = () => {
  const insertIcons = ({route}) => ({
    cardStyle: {
      backgroundColor: 'ghostwhite'
    },
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
      }}
      screenOptions={insertIcons}
      shifting={true}
      barStyle={{backgroundColor: 'ghostwhite'}}>
      <Nav.Screen
        name="Home"
        component={Home}
        style={{fontSize: 14}}
        options={{title: 'Home'}}
      />
      <Nav.Screen name="Search" component={Search} />
      <Nav.Screen name="Show" component={Show} />
    </Nav.Navigator>
  );
};

export default Navigation;
