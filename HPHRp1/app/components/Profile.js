import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import { join, compact } from 'lodash'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

    }

    changeArrayToString = (arr) => {
        let compactArr = compact(arr)
        let str = join(compactArr, ', ')
        return str
    }

    render() {
        console.log("str ", this.changeArrayToString(this.props.profile.allergic_food))
        return (
            <ScrollView>
            <View style={_styles.container}>
                <View style={_styles.pictureContainer}>
                    <Text>Profile picture</Text>
                </View>
                
                <View style={_styles.contentContainer}>
                            <Text style={styles.text}>ประวัติส่วนตัว</Text>
                            <Text style={_styles.text}>ชื่อ : {this.props.profile.firstname} {this.props.profile.lastname}</Text>
                            <Text style={_styles.text}>รหัสผู้ป่วย : {this.props.profile.patient_code}</Text>
                            <Text style={_styles.text}>เพศ : {this.props.profile.gender}</Text>
                            <Text style={_styles.text}>ส่วนสูง : {this.props.profile.height} เซนติเมตร</Text>
                            <Text style={_styles.text}>น้ำหนัก : {this.props.profile.weight} กิโลกรัม</Text>
                            <Text style={_styles.text}>หมู่เลือด : {this.props.profile.blood_type}</Text>
                            <Text style={_styles.text}>วันเกิด : {this.props.profile.birthday}</Text>
                            <Text style={_styles.text}>ที่อยู่ : {this.props.profile.address}</Text>
                            <Text style={_styles.text}>เบอร์โทรศัพท์ : {this.props.profile.phone}</Text>
                            <Text style={_styles.text}>เบอร์โทรศัพท์ญาติ : {this.props.profile.kin_phone}</Text>
                            <Text style={_styles.text}>อาหารที่แพ้ : {this.props.profile.allergic_food? this.changeArrayToString(this.props.profile.allergic_food): '-'}</Text>
                            <Text style={_styles.text}>ยาที่แพ้ : {this.props.profile.allergic_medicine? this.changeArrayToString(this.props.profile.allergic_medicine): '-'}</Text>
                            <Text style={_styles.text}>ยาปัจจุบัน : {this.props.profile.current_medicine? this.changeArrayToString(this.props.profile.current_medicine): '-'}</Text>
                            <Text style={_styles.text}>ภาวะทางการแพทย์ : {this.props.profile.medical_condition? this.changeArrayToString(this.props.profile.medical_condition): '-'}</Text>
                </View>
                
                
            </View>
            </ScrollView>
        )
    }
}

const _styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 50,
        margin: 10
    },
    text: {
        color: '#474045',
        fontSize: 25
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
    contentContainer: {
        alignItems: 'stretch'
    },
    pictureContainer: {
        alignItems: 'stretch',
        backgroundColor: '#0ccbf2'
    }
})