import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import FoodAdvicesSwiper from '../components/FoodAdvicesSwiper'
import Orientation from 'react-native-orientation'

export default class FoodAdvices extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        Orientation.lockToLandscape();
    }
    render() {
        return (
            <View style={styles.container}>
                <FoodAdvicesSwiper />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})