import React, { Component } from 'react';
import { LoginScreen, Login } from './src/Screens'
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Nav from './src/Nav';
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
    token: ''
  }
  renderForm() {
    this.appInitialized();
    switch (this.state.display) {
      case 'login':
        return <Login />
        break;
      case 'home':
        return <Nav />
        break;
    }
  }
  async appInitialized() {
    const token = await AsyncStorage.getItem(authToken);
    if (!token) {
      this.setState({ display: 'login' })
    } else {
      this.setState({ display: 'home' })
    }
  }
  render() {
    return (
      <View style={styles.root}>
        {this.renderForm()}
      </View>
    );
  }
}

export default MainApp;