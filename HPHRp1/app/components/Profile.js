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
            
                <View style={_styles.container}>
                    <View style={_styles.pictureContainer}>
                        {/*user can upload picture and edit profile*/}
                        <Image source={require('../../assets/images/user.png')} style={_styles.image}></Image>
                    </View>
                    <ScrollView>
                    <View style={_styles.contentContainer}>
                        <Text style={[styles.text, {fontWeight: 'bold', marginBottom: 25, marginTop: 20}]}>ประวัติส่วนตัว</Text>
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
                        <Text style={_styles.text}>อาหารที่แพ้ : {this.props.profile.allergic_food ? this.changeArrayToString(this.props.profile.allergic_food) : '-'}</Text>
                        <Text style={_styles.text}>ยาที่แพ้ : {this.props.profile.allergic_medicine ? this.changeArrayToString(this.props.profile.allergic_medicine) : '-'}</Text>
                        <Text style={_styles.text}>ยาปัจจุบัน : {this.props.profile.current_medicine ? this.changeArrayToString(this.props.profile.current_medicine) : '-'}</Text>
                        <Text style={_styles.text}>ภาวะทางการแพทย์ : {this.props.profile.medical_condition ? this.changeArrayToString(this.props.profile.medical_condition) : '-'}</Text>
                    </View>
                    </ScrollView>

                </View>
            
        )
    }
}

const _styles = StyleSheet.create({
    wrapper: {
    },
    text: {
        color: '#474045',
        fontSize: 25,
        marginBottom: 10
    },
    image: {
        height: 200,
        borderRadius: 100,
        width: 200,
        margin: 10,
        alignSelf: 'center'
    },
    container: {
        flexDirection: 'row',
        flex: 1
    },
    contentContainer: {
        alignItems: 'stretch',
        borderColor: '#f49842',
        borderWidth: 3,
        borderRadius: 10,
        padding: 15,
        margin: 20,
        flex: 0.7
    },
    pictureContainer: {
        alignItems: 'stretch',
        flex: 0.3,
        opacity: 60
    }
})