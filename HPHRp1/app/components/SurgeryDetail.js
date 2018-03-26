import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Alert, ToastAndroid } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import PropTypes from 'prop-types'
import firebase from '../config/Firebase'
import ApiUtils from './ApiUtils'
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
            'ข้อมูลการผ่าตัด',
            'ต้องการลบรายการนี้หรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.deleteSurgery()
                    }
                },
                { text: 'ไม่', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )

    }
    
    deleteSurgery = async () => {
        const path = `${SERVER_IP}${SURGERY}?userid=${this.props.uid}&hospitalid=${this.props.surgery.hospital}&date=${this.props.surgery.date}&time=${this.props.surgery.time}`
        await fetch(path, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                console.log("Delete surgery success", responseData)
                ToastAndroid.showWithGravity('ลบรายการสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)
                Actions.surgery()

            })
            .catch(error => {
                console.log("Delete surgery failed = ", error)
                ToastAndroid.showWithGravity('ผิดพลาด! ไม่สามารถลบรายการ', ToastAndroid.SHORT, ToastAndroid.CENTER)
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