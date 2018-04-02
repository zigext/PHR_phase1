import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Alert, ToastAndroid } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import PropTypes from 'prop-types'
import ApiUtils from './ApiUtils'
import { SERVER_IP, MWT6 } from '../config/Const'
import moment from 'moment'

export default class MWTDetail extends React.Component {

    static propTypes = {
        pre: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired,
        post5Mins: PropTypes.object.isRequired,
        result: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
    }

    delete6MwtPress = () => {
        Alert.alert(
            'ทดสอบเดินบนพื้นราบ 6 นาที',
            'ต้องการลบรายการนี้หรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.delete6Mwt()
                    }
                },
                { text: 'ไม่', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )

    }

    delete6Mwt = async () => {
        const path = `${SERVER_IP}${MWT6}?userid=${this.props.uid}&appid=${this.props.appId}&date=${this.props.date}&time=${this.props.time}`
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
                console.log("Delete 6mwt success", responseData)
                ToastAndroid.showWithGravity('ลบรายการสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)
                Actions.mwt()

            })
            .catch(error => {
                console.log("Delete 6mwt failed = ", error)
                ToastAndroid.showWithGravity('ผิดพลาด! ไม่สามารถลบรายการ', ToastAndroid.SHORT, ToastAndroid.CENTER)
            })
    }

    millisToMinutesAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000)
        let seconds = ((millis % 60000) / 1000).toFixed(0)
        return minutes + "." + (seconds < 10 ? '0' : '') + seconds
    }

    formatMoment = (date, format) => {
        return moment(date).format(format)
    }

    checkPostMwt = (postMwt) => {
        let str = ''
        if (postMwt.dizziness === true)
            str = str + 'หน้ามืด มึนงง'
        if (postMwt.anemia === true)
            str = str + ', ' + 'ริมฝีปากหรือใบหน้าซีด'
        if (postMwt.dyspnea === true)
            str = str + ', ' + 'หายใจลำบาก/หอบ'
        if (postMwt.vomitting === true)
            str = str + ', ' + 'อาเจียน'
        if (postMwt.perspireation === true)
            str = str + ', ' + 'เหงื่อออก ตัวเย็น'
        if (postMwt.chestPain === true)
            str = str + ', ' + 'เจ็บแน่นหน้าอก'
        if (postMwt.nausea === true)
            str = str + ', ' + 'คลื่นไส้'
        if (postMwt.palpitation === true)
            str = str + ', ' + 'ใจสั่น'
        if (postMwt.fatigue === true)
            str = str + ', ' + 'อ่อนเพลีย'
        if (postMwt.note)
            str = str + ', ' + postMwt.note
        if (str === '') str = 'ไม่มี'

        return str
    }


    render() {
        return (
            <View style={_styles.slide}>
                <ScrollView>
                    <Text style={[styles.text, _styles.topicText]}>ผลการทดสอบ</Text>
                    <Text style={[styles.text, _styles.detailText]}>วันที่: {this.formatMoment(this.props.result.date, "DD/MM/YYYY")}</Text>
                    <Text style={[styles.text, _styles.detailText]}>เวลา: {this.props.result.timeStart}</Text>
                    <Text style={[styles.text, _styles.detailText]}>ระยะทางที่เดินได้: {this.props.result.distance} เมตร</Text>
                    <Text style={[styles.text, _styles.detailText]}>ใช้เวลา: {this.millisToMinutesAndSeconds(this.props.result.duration)} นาที</Text>
                    <Text style={[styles.text, _styles.detailText]}>ระดับความเหนื่อย (Borg scale): {this.props.result.borg}</Text>
                    <Text style={[styles.text, _styles.detailText]}>อัตราการเต้นหัวใจหัวใจสูงสุด: {this.props.result.hrmax} bpm</Text>
                    <Text style={[styles.text, _styles.detailText, {marginBottom: 30}]}>อาการหลังทดสอบ: {this.checkPostMwt(this.props.post)}</Text>
                    <Icon raised reverse name='delete' color='#f49842' onPress={this.delete6MwtPress} />
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
    },
    topicText: {
        marginBottom: 25,
        fontWeight: 'bold'
    },
    detailText: {
        marginBottom: 10
    }
})