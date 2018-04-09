import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { FeedsScreen, DiscoveryScreen, UserScreen, NotiScreen, LoginScreen } from './Screens'
import { Platform, Text, View, } from 'react-native';
import { TabNavigator, TabBarBottom, } from 'react-navigation';

import WithProvider from './components/WithProvider';


export default TabNavigator({
  Home: { screen: WithProvider(FeedsScreen) },
  Discovery: { screen: WithProvider(DiscoveryScreen) },
  Noti: { screen: WithProvider(NotiScreen) },
  User: { screen: WithProvider(UserScreen) },

},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `apps`;
        } else if (routeName === 'Discovery') {
          iconName = `search`;
        }
        else if (routeName === 'User') {
          iconName = `person`;
        }
        else if (routeName === 'Noti') {
          iconName = `favorite`;
        }
        return <MaterialIcons name={iconName} size={27} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: '#d6d6d6',

    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

