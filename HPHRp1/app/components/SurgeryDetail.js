import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import Sound from 'react-native-sound'

export default class SurgeryDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <View style={_styles.slide}>
                <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 25 }]}>วันที่ {this.props.surgery.date}  เวลา {this.props.surgery.time}  ประเภท {this.props.surgery.type}</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>โรงพยาบาล: {this.props.surgery.hospital}</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>แพทย์: {this.props.surgery.doctor}</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>รายละเอียด: {this.props.surgery.note}</Text>

            </View>
        )
    }
}

const _styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingHorizontal: 50,
        margin: 10
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    }
})