import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { authToken } from '../../utils/constants';
import { StackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
    },
    titileWrapper: {
        flex: 0.55,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'orange'
    },
    buttonsWrapper: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'cyan'
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#faf9f9',
        borderColor: '#e4e4e4',
        margin: 5,
        paddingLeft: 18,
        borderRadius: 30,
        width: '78%',
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonLable: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    link: {
        color: '#0c9eff',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    button: {
        backgroundColor: '#ffc107',
        padding: 10,
        width: '60%',
        margin: 5,
        borderRadius: 30,
    },
    smallButton: {
        alignSelf: 'center'
    }
})
class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
    }

    onPressBtnFBLogIn = async () => {
        this.setState({ loading: true });
        const res = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
        if (res.grantedPermissions && !res.isCancelled) {
            const data = await AccessToken.getCurrentAccessToken();
            if (data) {
                const serverResponse = await this.props.loginMutation({
                    variables: {
                        provider: 'FACEBOOK',
                        token: data.accessToken,
                    },
                });
                const { token } = serverResponse.data.login;
                await AsyncStorage.setItem(authToken, token);
                this.setState({ loading: false });
                //this.props.navigation.navigate('Home');

            }
        }
    };
    onPressBtnLogIn = () => {
        if (this.state.username === 'admin' && this.state.password === '123') {
            ToastAndroid.show('Welcome ', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Username or password incorrect!', ToastAndroid.SHORT);
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.root}>
                    <ActivityIndicator size="large" color="#318DEE" />
                </View>
            )
        }
        return (
            <KeyboardAvoidingView style={styles.root}>
                <View style={styles.titileWrapper}>
                    <Text style={styles.text} >Login</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        autoCapitalize='none'
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        ref={(input) => (this.usernameInput = input)}
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        returnKeyType="done"
                        ref={(input) => (this.passwordInput = input)}
                        onSubmitEditing={() => this.onPressBtnLogIn}
                        secureTextEntry
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <View style={styles.buttonsWrapper}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}> Forgot your login details? </Text>
                            <TouchableOpacity>
                                <Text style={styles.link}> Get help </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={this.onPressBtnLogIn}>
                            <Text style={styles.buttonLable}>Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.smallButton}
                            onPress={this.onPressBtnFBLogIn}
                        >
                            <Entypo size={45} name="facebook-with-circle" color="#318DEE" />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flex: 0.1, alignItems: 'center', backgroundColor: '#f2f2f2' }}>
                    <View style={{ flexDirection: 'row', top: 3 }}>
                        <Text style={styles.text}> Don't have an account? </Text>
                        <TouchableOpacity
                            underlayColor='#ffb951'
                            onPress={this.onPressBtnSignUp}
                        >
                            <Text style={styles.link}> Sign Up ! </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>

        );
    }
}

const loginMutation = gql`
    mutation($provider: Provider, $token: String){
        login(provider: $provider, token: $token){
            token
        }
    }
`;

export default graphql(loginMutation, { name: 'loginMutation' })(LoginScreen);