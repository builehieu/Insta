import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { FeedsScreen, DiscoveryScreen, UserScreen, NotiScreen, LoginScreen } from './Screens'
import { Platform, Text, View, } from 'react-native';
import { TabNavigator, TabBarBottom, S } from 'react-navigation';
import appInitialized from './utils/appInitialized';
import { AppRegistry } from 'react-native';
import App from '../App' ;
import WithProvider from '../src/components/WithProvider';

export function startLogin() {
  return (
    <LoginScreen />
  );
}

export function startMainApp() {
  return (
    App
  );
}


export function init(){
    appInitialized();
}