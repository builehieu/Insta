import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, CameraRoll, AsyncStorage, List, TouchableOpacity, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  CaptionScreen  from '../CaptionScreen';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const MAX_PHOTOS = 20;
const PADDING = 10;
const MARGIN = 2;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center'
        // backgroundColor: 'blue',
    },
    imageWrapper: {
        height: (width - PADDING * 2 - MARGIN * 2) / 4,
        width: (width - PADDING * 2 - MARGIN * 2) / 4,
        // 
        margin: MARGIN,

    },
    image: {
        flex: 1,
        borderRadius: 3,
    },
    imageReview: {
        height: width - (width - PADDING * 2 - MARGIN * 2) / 4,
        borderRadius: 3,
        backgroundColor: 'red'
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageHover: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'red'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        margin: 10,

    },
    headerWrapper: {
        flex: 0.1,

        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',

    },
})



class CreatePhotoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: false,
            selected: null,
            hasNextPage: false,
            endCursor: '',
            firstQuery: true
        };
    }


    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Pinstagram Camera Permission',
                    'message': 'Pinstagram needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.requestCameraPermission();
        this._getPhotos();
    }

    _getPhotos = async (after) => {
        if (this.state.firstQuery) {
            this.setState({ loading: true });
        }
        const res = await CameraRoll.getPhotos({
            first: MAX_PHOTOS,
            after,
        });

        this.setState({
            images: [...this.state.images, ...res.edges],
            loading: false,
            hasNextPage: res.page_info.has_next_page,
            endCursor: res.page_info.end_cursor,
            firstQuery: false,
            //selected: res.edges[0],
        });

        console.log('====================================');
        console.log('res', res);
        console.log('====================================');
    };

    _onSelect = (item) => {

        this.setState({ selected: item });

    }

    _renderItems = ({ item }) => {
        const isSelected = this.state.selected &&
            this.state.selected.node.image.filename === item.node.image.filename;

        return (
            <TouchableOpacity
                disabled={isSelected}
                onPress={() => this._onSelect(item)}
                style={styles.imageWrapper}
            >
                <Image source={{ uri: item.node.image.uri }} style={styles.image} />
                {/* {isSelected && <View style={styles.imageHover} />} */}
            </TouchableOpacity>
        );
    };

    _keyExtractor = (item, index) => index + 'sd';
    _onEndReached = () => {
        if (this.state.hasNextPage) {
            this._getPhotos(this.state.endCursor);
        }
    };

    render() {
        console.log('====================================');
        console.log('state', this.state);
        console.log('====================================');
        if (this.state.loading) {
            return (
                <View style={styles.root} >
                    <ActivityIndicator size="large" color="#318DEE" />
                </View>
            )
        }
        return (

            <View>
                <View style={styles.headerWrapper}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Feather name="x" size={27} color="black" />
                        </TouchableOpacity>
                        <Text>Pinstagram</Text>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Feather name="arrow-right" size={27} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.imageReview}>
                    {
                        this.state.selected ?
                            <Image style={styles.imageHover} source={{ uri: this.state.selected.node.image.uri }} /> : null
                    }
                </View>
                <FlatList
                    data={this.state.images}
                    renderItem={this._renderItems}
                    numColumns={4}
                    keyExtractor={this._keyExtractor}
                    //extraData={this.state}
                    onEndReached={this._onEndReached}
                />

            </View>
        );
    }
}

export default CreatePhotoScreen;

// export default StackNavigator({
//     Home: { screen: CreatePhotoScreen },
//     PostPage: { screen: CaptionScreen },
// },
//     {
//         headerMode: 'none',
//         mode: 'modal',
//         navigationOptions: {
//             gesturesEnabled: false,
//         },
//     }
// );