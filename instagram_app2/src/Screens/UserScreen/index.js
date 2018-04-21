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
import { authToken } from '../../utils/constants';

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


class UserScreen extends React.Component {
    state = { loading: false }
    onPressBtnLogOut = async () => {
        this.setState({ loading: true });
        await AsyncStorage.removeItem(authToken);
        this.setState({ loading: false });
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
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <TouchableOpacity style={styles.button}
                    onPress={this.onPressBtnLogOut}>
                    <Text style={styles.buttonLable}>Log out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default UserScreen;