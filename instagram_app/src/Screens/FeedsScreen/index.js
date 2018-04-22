import React, { Component } from 'react';
import {
    FlatList,
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PhotoCard from '../../components/PhotoCard';
import { StackNavigator } from 'react-navigation';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { FeedsPhotoFragment } from './fragments';


const styles = StyleSheet.create({
    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',

    },
    root: {
        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        borderTopWidth: 0.8,
        borderColor: '#eaeaea'

    },
    actionWrapper: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        //  justifyContent: 'flex-start',        
    },
    actionBtn: {
        padding: 10,

    },
    fakeView: {
        flex: 1.4,
    },
    bookmarkWrapper: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'flex-end',

    }

})

class FeedsScreen extends React.Component {
    state = { isRefreshing: false };
    _keyExtractor = (item) => item.id

    _renderItem = ({ item }) => <PhotoCard data={item} />

    _refreshRequest = async () => {
        this.setState({ isRefreshing: true })
        await this.props.data.refetch()
        this.setState({ isRefreshing: false })
    }
    render() {
        if (this.props.data.loading) {
            return (
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="video" size={27} color="black" />
                    </TouchableOpacity>
                    <Text>Pinstagram</Text>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="feather" size={27} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.data.photos}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._refreshRequest}
                        />
                    }
                />
            </View>

        );
    }
}


const getPhotos = gql`
    query{
        photos{
           ... feedsPhoto
        }
    }
    ${FeedsPhotoFragment}
`;

export default graphql(getPhotos)(FeedsScreen);
