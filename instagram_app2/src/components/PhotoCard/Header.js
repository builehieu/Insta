import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Touchable from '@appandflow/touchable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { human, systemWeights, material} from 'react-native-typography';

import { makeCircle, makeHitSlop } from '../../utils/themes'
import { fakeAvatar } from '../../utils/constants'

const styles = StyleSheet.create({
    root: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: '#eaeaea'
        
    },
    userMetaWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    btnWrapper: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
       
    },
    avatarWrapper: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImg: {
        ... makeCircle (38),
    },
    InforWrapper: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 10
    }, 
    username: {
        ... material.subheadingObject,
        ... systemWeights.bold,

    },
    location: {
        ... material.subheadingObject,
        
    }

})

export default function Header({
    avatar = fakeAvatar,
    username = 'ddlovato',
    location = 'Can tho, Vietnam '
}) {
    return (
        <View style={styles.root}>
            <View style={styles.userMetaWrapper}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: avatar }} style={styles.avatarImg} />
                </View>
                <View style={styles.InforWrapper}>
                    <Text style={styles.username}> {username} </Text>
                    <Text style={styles.location}> {location}</Text>
                </View>
            </View>
            <TouchableOpacity  style={ styles.btnWrapper }  >
                <MaterialCommunityIcons name="dots-vertical" size={25} color="black" />
            </TouchableOpacity>
        </View>
    );
}