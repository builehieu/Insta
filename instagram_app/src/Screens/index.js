import LoginScreen from './LoginScreen';
import FeedsScreen from './FeedsScreen';
import DiscoveryScreen from './DiscoveryScreen';
import UserScreen from './UserScreen';
import NotiScreen from './NotiScreen';
import CreatePhotoScreen from './CreatePhotoScreen';
import { StackNavigator } from 'react-navigation';
import WithProvider from '../components/WithProvider';
import CaptionScreen from './CaptionScreen';


const Login = WithProvider(LoginScreen);
const Feeds = WithProvider(FeedsScreen);
const Discovery = WithProvider(DiscoveryScreen);
const User = WithProvider(UserScreen);
const Noti = WithProvider(NotiScreen);
const Create = WithProvider(CreatePhotoScreen);
const Caption = WithProvider(CaptionScreen);
export{
    Login,
    Feeds,
    Discovery,
    User,
    Noti,
    Create,
    Caption,
};
