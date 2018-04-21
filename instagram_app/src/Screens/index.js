import LoginScreen from './LoginScreen';
import FeedsScreen from './FeedsScreen';
import DiscoveryScreen from './DiscoveryScreen';
import UserScreen from './UserScreen';
import NotiScreen from './NotiScreen';
import { StackNavigator } from 'react-navigation';
import WithProvider from '../components/WithProvider';
//import MainScreen from '../Nav';

const  Login = WithProvider(LoginScreen);
const Feeds = WithProvider(FeedsScreen);
const Discovery = WithProvider(DiscoveryScreen);
const User = WithProvider(UserScreen);
const Noti = WithProvider(NotiScreen);

export{
    Login,
    Feeds,
    Discovery,
    User,
    Noti,
};
