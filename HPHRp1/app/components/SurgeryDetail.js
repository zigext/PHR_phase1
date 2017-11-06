import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import PropTypes from 'prop-types'
import firebase from '../config/Firebase'
import ApiUtils from '../components/ApiUtils'
import { SERVER_IP, SURGERY } from '../config/Const'



export default class SurgeryDetail extends React.Component {

    static propTypes = {
        surgery: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.ref = null
    }

    deleteSurgeryPress = () => {
        Alert.alert(
            'ออกจากระบบ',
            'ต้องการลบรายการนี้หรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        // this.ref = firebase.database().ref(`surgery`)
                        // this.ref.child(`${this.props.uid}_${this.props.surgery.hospital}_${this.props.surgery.date}_${this.props.surgery.time}`).remove()
                        // Actions.surgery()
                        this.deleteSurgery()
                    }
                },
                { text: 'ไม่', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )

    }
    //Have not tested yet
    deleteSurgery = () => {
        const path = `${SERVER_IP}${SURGERY}`
        await fetch(path, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: '1416382941765846', //this.props.uid
                hospitalid: this.props.surgery.hospital,
                date: this.props.surgery.date,
                time: this.props.surgery.time,
            })
        })
            .then(ApiUtils.checkStatus)
            .then(responseData => {
                console.log("Delete surgery success")
                Actions.surgery()

            })
            .catch(error => {
                console.log("Delete surgery failed = ", error)
            })
    }


render() {
    return (
        <View style={_styles.slide}>
            <ScrollView>
                <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 25 }]}>วันที่ {this.props.surgery.date}  เวลา {this.props.surgery.time}  ประเภท {this.props.surgery.type}</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>โรงพยาบาล: {this.props.surgery.hospital}</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>แพทย์: {this.props.surgery.doctor}</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>รายละเอียด: {this.props.surgery.note}</Text>
                <Icon raised reverse name='delete' color='#f49842' onPress={this.deleteSurgeryPress} />
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