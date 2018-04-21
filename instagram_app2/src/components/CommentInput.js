import React, { Component } from 'react';
import { fakeAvatar } from '../utils/constants';
import { makeCircle } from '../utils/themes';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { iOSColors } from 'react-native-typography';

const styles = StyleSheet.create({
    root:{
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarWrapper: {
        flex: 0.10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    avatarImg: {
        ... makeCircle (28),
    },
    inputWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        width: '95%',
    }
})

class CommentInput extends Component {

    state = {};
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: fakeAvatar }} style={styles.avatarImg} />
                </View>
                <TouchableOpacity style={styles.inputWrapper}>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>
                            Add a comment ...
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CommentInput;