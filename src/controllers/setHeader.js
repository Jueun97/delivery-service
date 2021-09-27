import React from 'react';
import { Entypo } from '@expo/vector-icons';

const setHeader = (navigation, title, Emoji, emojiName) => {
    return (
        {
            title: title,
            headerStyle: {},
            headerTitleStyle: {
                fontSize: 20
            },
            headerTitleAlign: 'center',
            gestureEnabled: false,
            headerLeft: () => (
                <Entypo
                    name="home"
                    size={40}
                    color={'black'}
                    onPress={() => { navigation.navigate('home') }}
                    style={{ paddingLeft: 20 }}
                />
            ),
            headerRight: () => (
                <Emoji
                    name={emojiName ? emojiName : "arrow-bold-left"}
                    size={40}
                    color={'black'}
                    onPress={() => emojiName?navigation.navigate('UserPassword', { status:'user' }): navigation.goBack()}
                    style={{ paddingRight: 20 }}
                />
            )
        } 
    );
};
export default setHeader;