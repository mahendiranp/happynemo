import React from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeComponent = ({isSaved}) => {
    return (
        <View>
            <Icon name={isSaved ? "heart": "heart-o"} size={20} color={'black'} />
        </View>
    )
}

export default LikeComponent