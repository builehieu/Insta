import React, { Component } from 'react';
import { LoginScreen } from './src/Screens'
import { View, StyleSheet } from 'react-native';
import Nav from './src/Nav';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

class MainApp extends Component {
  state = { display: 'home' }
  renderForm() {
    this.appInitialized();
    switch (this.state.display) {
      case 'login':
        return <LoginScreen />
        break;
      case 'home':
        return <Nav />
        break;
    }
  }
  async appInitialized() {
    const token = await AsyncStorage.getItem('@instagram_app/token');

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