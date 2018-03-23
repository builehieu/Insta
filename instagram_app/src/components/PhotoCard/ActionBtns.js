import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    root: {
        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        borderTopWidth: 0.8,
        borderColor: '#eaeaea'
        
    },
    actionWrapper: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
      //  justifyContent: 'flex-start',        
    },
    actionBtn: {
        flex:1,
        justifyContent: 'center', 
         
    },
    fakeView:{
        flex: 1.4,
    },
    bookmarkWrapper:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'flex-end',
        
    }

})

class ActionBtns extends Component {
    state = {}
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.actionWrapper}>
                    <TouchableOpacity  style={styles.actionBtn}>
                        <Feather name="heart" size={27} color="black"/>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="message-circle" size={27} color="black" />
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="zap" size={27} color="black" />
                     </TouchableOpacity>
                </View>
                <View style={styles.fakeView}></View>
                <TouchableOpacity  style={styles.bookmarkWrapper}>
                  <Feather name="bookmark" size={27} color="black"/>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ActionBtns;