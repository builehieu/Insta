import React, { Component } from 'react';
import { Login } from './src/Screens'
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/Screens/MainScreen';
import { AsyncStorage } from 'react-native';
import { authToken } from './src/utils/constants';


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
class MainApp extends Component {
  state = {
    display: 'home',
  }
  async componentWillMount() {
    const token = await AsyncStorage.getItem(authToken);
    if (!token) {
      this.setState({ display: 'login' });
    } else {
      this.setState({ display: 'home' });
    }
    // console.log('====================================');
    // console.log('display', this.state.display);
    // console.log('token', token);
    // console.log('====================================');
  }
  render() {
    // this.componentWillMount()
    const { display } = this.state
    let screen = display === 'home'? <MainScreen /> : <Login />
    return screen
    //this.state.display == 'home' ? <MainScreen /> : <Login />
  }
}
export default MainApp;