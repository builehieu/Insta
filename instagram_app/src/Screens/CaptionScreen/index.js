import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class CaptionScreen extends React.Component {
    render() {
        return (
            <View style={{flexDirection:'row'}}>
                <Image
                    style={{height:150,width:150,backgroundColor:'red'}}
                />
            </View>
        );
    }
}

export default CaptionScreen;