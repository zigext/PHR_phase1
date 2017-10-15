import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import PropTypes from 'prop-types'
import firebase from '../config/Firebase'



export default class SurgeryDetail extends React.Component {

    static propTypes = {
        surgery: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.ref = null
    }

    deleteSurgery = () => {
        Alert.alert(
            'ออกจากระบบ',
            'ต้องการลบรายการนี้หรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.ref = firebase.database().ref(`surgery`)
                        this.ref.child(`${this.props.uid}_${this.props.surgery.hospital}_${this.props.surgery.date}_${this.props.surgery.time}`).remove()
                        Actions.surgery()
                    }
                },
                { text: 'ไม่', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )

    }

    render() {
        console.log("uid ", this.props.uid, this.props.surgery)
        return (
            <View style={_styles.slide}>
                <ScrollView>
                    <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 25 }]}>วันที่ {this.props.surgery.date}  เวลา {this.props.surgery.time}  ประเภท {this.props.surgery.type}</Text>
                    <Text style={[styles.text, { marginBottom: 10 }]}>โรงพยาบาล: {this.props.surgery.hospital}</Text>
                    <Text style={[styles.text, { marginBottom: 10 }]}>แพทย์: {this.props.surgery.doctor}</Text>
                    <Text style={[styles.text, { marginBottom: 10 }]}>รายละเอียด: {this.props.surgery.note}</Text>
                    <Icon reverse name='delete' color='#f49842' onPress={this.deleteSurgery} />
                </ScrollView>
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