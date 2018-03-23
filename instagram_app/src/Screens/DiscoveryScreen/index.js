import React, { Component } from 'react';
import {
    FlatList,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    View,
    RefreshControl
} from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Thumbnail from '../../components/Thumbnail';


const styles = StyleSheet.create({
    root: {
        margin: 10,
        alignItems: 'center',
        
    },

    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class DiscoveryScreen extends React.Component {
    state = { isRefreshing: false };
    _keyExtractor = (item) => item.id

    _renderItem = ({ item }) => <Thumbnail data={item} />

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
            
            <FlatList 
                contentContainerStyle={styles.root}
                numColumns = {3}
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
            
            
        );
    }
}

const getPhotos = gql`
    query{
        photos{
            id
            imageUrl
        }
    }
`

export default graphql(getPhotos)(DiscoveryScreen);