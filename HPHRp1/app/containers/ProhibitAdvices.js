import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import _ from 'lodash'
import ProhibitInfo from '../components/ProhibitInfo'
import ProhibitAdvicesList from '../components/ProhibitAdvicesList'


export default class ProhibitAdvices extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <ProhibitAdvicesList></ProhibitAdvicesList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'white',
        // justifyContent: 'center'
    }
});