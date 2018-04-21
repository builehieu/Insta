import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { human, systemWeights, material } from 'react-native-typography';

const styles = StyleSheet.create({
    root: {
        //minHeight: 1000,
        paddingBottom: 10
    },
    Img: {
        flex: 1,
        minHeight: 150,
        

    },
    commentWrapper: {
        height: 50,
        paddingHorizontal: 16,
    },
    commentViewAll: {
        ...material.body1Object,
        color: 'gray'
    },
    timeStampWrapper: {
        height: 70,
        paddingHorizontal: 16,
    },
    timeStamp: {
        paddingTop: 10,
        ...material.captionObject,
    }, 
    thumbnail: {
        height: 110,
        width: 110,
        //backgroundColor: 'blue',
        margin: 2,
        
    }

});


export default class Thumbnail extends Component {
    state = {}
    render() {
        return (
            <TouchableHighlight style={styles.thumbnail}>
                <Image style={styles.Img} source={{ uri: this.props.data.imageUrl }} /> 
            </TouchableHighlight>
        );
    }
}
