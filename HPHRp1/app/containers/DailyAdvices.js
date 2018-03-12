import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DailyAdvicesSwiper from '../components/DailyAdvicesSwiper'
import Orientation from 'react-native-orientation'

export default class DailyAdvices extends React.Component {
    componentDidMount() {
        Orientation.lockToLandscape();
    }
    render() {
        return (
            <View style={styles.container}>
                <DailyAdvicesSwiper />
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