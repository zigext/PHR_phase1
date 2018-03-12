import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import OtherAdvicesSwiper from '../components/OtherAdvicesSwiper'
import Orientation from 'react-native-orientation'

export default class OtherAdvices extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        Orientation.lockToLandscape();
    }
    render() {
        return (
            <View style={styles.container}>
                <OtherAdvicesSwiper />
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