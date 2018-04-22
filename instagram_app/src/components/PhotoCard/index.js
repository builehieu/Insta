import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { human, systemWeights, material } from 'react-native-typography';
import { graphql } from "react-apollo";
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

import Header from './Header';
import ActionBtns from './ActionBtns';
import Meta from './Meta';
import CommentInput from '../CommentInput';
import { likePhotoMutation } from '../../graphql/mutations';
import { FeedsPhotoFragment } from '../../Screens/FeedsScreen/fragments'


const styles = StyleSheet.create({
    root: {
        //minHeight: 1000,
        paddingBottom: 10
    },
    Img: {
        flex: 1,
        minHeight: 300,

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
        height: 100,
        width: 100,
    }

});


class PhotoCard extends Component {
    state = {}
    
    onPressBtnLike = async () => {
        this.props.onLikePhotoMutation();
    };
    render() {
        return (
            <View style={styles.root}>
                <Header />
                <Image style={styles.Img} source={{ uri: this.props.data.imageUrl }} />
                <ActionBtns viewerLike={this.props.data.viewerLike} onPressBtnLike={this.onPressBtnLike} />
                <Meta caption={this.props.data.caption} />
                <View style={styles.commentWrapper} >
                    <TouchableOpacity>
                        <Text style={styles.commentViewAll} > View all 13 comments </Text>
                    </TouchableOpacity>
                    <CommentInput />
                </View>
                <View style={styles.timeStampWrapper}>
                    <Text style={styles.timeStamp}>5 HOURS AGO</Text>
                </View>
            </View>

        );
    }
}
export default graphql(likePhotoMutation, {
    props: ({ mutate, ownProps }) => ({
        onLikePhotoMutation: () => mutate({
            variables: { photoId: ownProps.data.id },
            update: (store, { data: { likePhoto } }) => {
                const id = defaultDataIdFromObject({
                    __typename: 'Photo',
                    id: ownProps.data.id,
                });
                

                const photo = store.readFragment({
                    id,
                    fragment: FeedsPhotoFragment,
                });

                store.writeFragment({
                    id,
                    fragment: FeedsPhotoFragment,
                    data: {
                        ... photo,
                        viewerLike: likePhoto,
                        

                    }
                })
                console.log('====================================');
                console.log('photo', photo);
                console.log('====================================');
            }
        }),
    }),
})(PhotoCard);

