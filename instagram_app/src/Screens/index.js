import LoginScreen from './LoginScreen';
import FeedsScreen from './FeedsScreen';
import DiscoveryScreen from './DiscoveryScreen';
import UserScreen from './UserScreen';
import NotiScreen from './NotiScreen';
import WithProvider from '../components/WithProvider';

const Login = WithProvider(LoginScreen);

export {
    Login,
    LoginScreen,
    FeedsScreen,
    DiscoveryScreen,
    UserScreen,
    NotiScreen
};