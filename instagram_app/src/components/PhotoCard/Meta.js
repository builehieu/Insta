import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Touchable from '@appandflow/touchable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { human, systemWeights, material} from 'react-native-typography';

import { makeHitSlop } from '../../utils/themes'

const styles = StyleSheet.create({
    root: {
        minHeight: 50,
//        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    wrapper: {
        flex: 1,
       
    },
    username: {
        ... material.TitleObject,
        ... systemWeights.bold,
    },
    text: {
        ... material.subheadingObject,
        
    }

})

export default function Meta({
    caption = 'this is a beatiful website',
    username = 'ddlovato'
}) {
    return (
        <View style={styles.root}>
            <View style={styles.wrapper}>
                <Text style={styles.text} >Like by <Text style={styles.username}>builehieu</Text> and <Text style={styles.username}>1,562 others</Text></Text>
            </View>
            <View style={styles.wrapper}>
                <Text numberOfLines={2} style={styles.text}><Text style={styles.username}>{username}</Text> {caption} </Text>
            </View>
        </View>
    )
}