import React, { Component, } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ActivityAdvicesButton from '../components/ActivityAdvicesButton'
import AdvicesForHomeButton from '../components/AdvicesForHomeButton'
import Orientation from 'react-native-orientation'

export default class MainAdvices extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    onActivityPress = () => {
        Actions.tab_advices_activity()
    }

    onAdvicesHomePress = () => {
        Actions.tab_advices_home()
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityAdvicesButton onActivityPress={this.onActivityPress} />
                <AdvicesForHomeButton onAdvicesHomePress={this.onAdvicesHomePress} />
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