import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { Feeds, Discovery, User, Noti, Login, Create } from '../Screens'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import CaptionScreen from './CaptionScreen'

const Tab = TabNavigator({
  Home: { screen: Feeds },
  Discovery: { screen: Discovery },
  Create: { screen: Create },
  Noti: { screen: Noti },
  User: { screen: User },
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
        else if (routeName === 'Create') {
          iconName = `control-point`;
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
    swipeEnabled: false,
  }
);


// const MainScreen = StackNavigator({
//   Home: { screen: Tab },
//   Login: { screen: Login },
//   Post: { screen: CaptionScreen }
// },
//   {
//     headerMode: 'none',
//     mode: 'modal',
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//   }
// );

export default Tab;