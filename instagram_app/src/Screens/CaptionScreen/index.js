import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Keyboard,
    ActivityIndicator
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import gql from 'graphql-tag';
import { withApollo, graphql } from 'react-apollo';

import { uploadImageToS3 } from '../../utils/uploadimage';
import { createPhotoMutation } from '../../graphql/mutations';
import { FeedsPhotoFragment } from '../../Screens/FeedsScreen/fragments';

const signS3Query = gql`
  query{
    presignUrl{
      url 
      uploadUrl
    }
  }
`;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 150,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#c4c4c4',
    },
    imgWrapper: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
    },
    loadingWrapper: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 70,
        width: 70,
    },
    captionWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: 'yellow'
    },
    captionInput: {
        width: '100%',
        paddingVertical: 10,
        paddingRight: 10,
        height: 100
    }
    ,
    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,


    },
    headerWrapper: {
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#c4c4c4',

    },
    listItem: {
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#c4c4c4',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    link: {
        color: '#0c9eff',
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
})

class CaptionScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.navigation.state.params.selected,
            caption: '',
            loading: false,
        }
        this._onPressBtnShare = this._onPressBtnShare.bind(this);

    }

    componentDidMount() {

    }

    _onCaptionChange = (caption) => this.setState({ caption });
    _onPressBtnShare = async () => {
        this.setState({loading: true});
        const res = await this.props.client.query({ query: signS3Query });
        const resultFromS3 = await uploadImageToS3(
            this.state.selected.node.image.uri,
            res.data.presignUrl,
        );
        await this.props.onCreatePhoto({
            imageUrl: resultFromS3.remoteUrl,
            caption: this.state.caption,
        });
        this.setState({loading: false});
        this.props.navigation.navigate('Home');

    };
    render() {
        if ( this.state.loading){
            return(
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator size="large" />
                </View>
            )
        };
        return (
            <TouchableOpacity
                onPress={Keyboard.dismiss}
                style={styles.root}
            >
                <View style={styles.headerWrapper}>
                    <View style={styles.header2}>
                        <TouchableOpacity  >
                            <Feather name="x" size={27} color="black" onPress={() => this.props.navigation.navigate('Create')} />
                        </TouchableOpacity>
                        <Text>Pinstagram</Text>
                        <TouchableOpacity onPress={this._onPressBtnShare}>
                            <Text style={styles.link}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.header}>
                    <View style={styles.imgWrapper}>
                        <Image style={styles.img}
                            source={{ uri: this.state.selected.node.image.uri }}
                        />
                    </View>
                    <View style={styles.captionWrapper}>
                        <TextInput
                            style={styles.captionInput}
                            placeholder="Write a capption..."
                            multiline
                            underlineColorAndroid='transparent'
                            value={this.state.caption}
                            onChangeText={this._onCaptionChange}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.listItem}>
                    <View>
                        <Text>Tag</Text>
                        <Ionicons name="ios-arrow-forward" size={20} />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
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


export default graphql(createPhotoMutation, {
    props: ({ mutate }) => ({
        onCreatePhoto: variables =>
        mutate({
            variables,
            update: (store, {data: {createPhoto}}) =>{
                const query = store.readQuery({ query: getPhotos});

                store.writeData({
                    query: getPhotos,
                    data: {
                        photos: [createPhoto, ...query.photos],
                    },
                });
            },
        }),
    }),
})(withApollo(CaptionScreen));