import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, PixelRatio } from 'react-native'

const navIconSize = (__DEV__=== false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(25) : 25

const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const icons ={
    home: [navIconSize, Entypo],
    'ios-search': [navIconSize,Ionicons]  
}

const iconsMap= {};

/* const iconsLoaded = new Promise ((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName =>  {
            const Provider = icons[iconName][1]
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                iconName[iconName][0],
            );
        }),
    ).then(sources => {
        Object.keys(icons).forEach(
            (iconName, i) => (iconsMap[iconName]= sources[i]),
        );
        resolve(true);
    });
});

export {iconsMap, iconsLoaded}; */