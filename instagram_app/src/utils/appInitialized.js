import {AsyncStorage} from 'react-native';

import { startLogin, startMainApp } from '../Nav';

export default async function appInitialized() {
  const token =await AsyncStorage.getItem('@instagram_app/token');

  if(!token){
    startLogin();
  }else{
    startMainApp();
  }
  
}