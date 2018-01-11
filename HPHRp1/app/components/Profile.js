import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import { join, compact, replace, trim } from 'lodash'
import moment from 'moment'

//replace in String
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    //string comes in [u'something1', u'something2', u'something3'] format
    formatString = (string) => {
        // let compactArr = compact(arr)
        // let str = join(compactArr, ', ')
        let formattedStr1 = string.replaceAll("u'", "")
        let formattedStr2 = formattedStr1.replaceAll("'", "")
        let formattedStr3 = formattedStr2.replaceAll("]", "")
        let formattedStr4 = formattedStr3.replaceAll("[", "")
        return formattedStr4
    }

    splitBirthdayStr = (birthday) => {
        let str = birthday.split('T1')[0]
        return str
    }

    //Change duration from ms to hr:min
    formatDuration = (ms) => {
        let hm = moment.utc(ms).format('HH:mm:ss')
        return hm
    }

    formatDate = (date) => {
        return moment(date).format(" DD MMM YYYY")
    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                {/*general information*/}
                <View style={_styles.container}>
                    <View style={_styles.pictureContainer}>
                        <Image source={{ uri: this.props.profile.picture_uri }} style={_styles.image}></Image>
                    </View>
                    <ScrollView>

                        <View style={_styles.contentContainer}>
                            <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 25, marginTop: 20 }]}>ข้อมูลทั่วไป</Text>
                            <Text style={_styles.text}>ชื่อ : {this.props.profile.firstname} {this.props.profile.lastname}</Text>
                            <Text style={_styles.text}>รหัสผู้ป่วย : {this.props.profile.patient_code}</Text>
                            <Text style={_styles.text}>รหัสบัตรประชาชน : {this.props.profile.id_card}</Text>
                            <Text style={_styles.text}>เพศ : {this.props.profile.gender}</Text>
                            <Text style={_styles.text}>ส่วนสูง : {this.props.profile.height} เซนติเมตร</Text>
                            <Text style={_styles.text}>น้ำหนัก : {this.props.profile.weight} กิโลกรัม</Text>
                            <Text style={_styles.text}>หมู่เลือด : {this.props.profile.blood_type}</Text>
                            <Text style={_styles.text}>วันเกิด : {this.props.profile.birthdate ? this.formatDate(this.props.profile.birthdate) : '-'}</Text>
                            <Text style={_styles.text}>ที่อยู่ : {this.props.profile.address}</Text>
                            <Text style={_styles.text}>เบอร์โทรศัพท์ : {this.props.profile.phone}</Text>
                            <Text style={_styles.text}>ชื่อญาติ : {this.props.profile.cousin_name}</Text>
                            <Text style={_styles.text}>เบอร์โทรศัพท์ญาติ : {this.props.profile.cousin_phone}</Text>
                            <Text style={_styles.text}>อาหารที่แพ้ : {this.props.profile.allergic_food ? this.props.profile.allergic_food : '-'}</Text>
                            <Text style={_styles.text}>ยาที่แพ้ : {this.props.profile.allergic_medicine ? this.props.profile.allergic_medicine : '-'}</Text>
                            <Text style={_styles.text}>ยาปัจจุบัน : {this.props.profile.current_medicine ? this.props.profile.current_medicine : '-'}</Text>
                        </View>


                    </ScrollView>

                </View>

                {/*medical information*/}
                <View style={_styles.container}>
                    <View style={_styles.pictureContainer}>
                        <Image source={{ uri: this.props.profile.picture_uri }} style={_styles.image}></Image>
                    </View>
                    <ScrollView>

                        <View style={_styles.contentContainer}>
                            <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 25, marginTop: 20 }]}>ข้อมูลการรักษา</Text>
                            <Text style={_styles.text}>วันที่รับเข้าโรงพยาบาล : {this.props.profile.admit_date ? this.formatDate(this.props.profile.admit_date) : '-'}</Text>
                            <Text style={_styles.text}>ดัชนีมวลกาย : {this.props.profile.bmi}</Text>
                            <Text style={_styles.text}>ระดับความรุนแรงของหัวใจตามเกณฑ์สมาคมโรคหัวใจนิวยอร์ก  : {this.props.profile.nyha_class}</Text>
                            <Text style={_styles.text}>ประสิทธิภาพการบีบตัวของกล้ามเนื้อหัวใจ  : {this.props.profile.ejection_fraction}</Text>
                            <Text style={_styles.text}>โรคประจำตัว : {this.props.profile.medical_condition ? this.props.profile.medical_condition : '-'}</Text>
                            <Text style={_styles.text}>ประวัติการสูบบุหรี่ : {this.props.profile.is_smoking ? 'สูบบุหรี่' : 'ไม่สูบบุหรี่'}</Text>
                            <Text style={_styles.text}>ประเภทโรคหัวใจ : {this.props.profile.cardiac_type}</Text>
                            <Text style={_styles.text}>ประเภทผ่าตัดหัวใจ : {this.props.profile.surgery_type}</Text>
                            <Text style={_styles.text}>วันที่ผ่าตัดหัวใจ : {this.props.profile.surgery_date}</Text>
                            <Text style={_styles.text}>เวลาที่ผ่าตัดหัวใจ : {this.props.profile.surgery_time}</Text>
                            <Text style={_styles.text}>ระยะเวลาในการผ่าตัด : {this.formatDuration(this.props.profile.surgery_duration)}</Text>
                            <Text style={_styles.text}>ระยะเวลาที่ใส่ท่อช่วยหายใจ  : {this.formatDuration(this.props.profile.surgery_breathing_tube_time)}</Text>
                            <Text style={_styles.text}>ระยะเวลาที่ใช้เครื่องปอดและหัวใจเทียม : {this.formatDuration(this.props.profile.surgery_cpb_time)}</Text>
                            <Text style={_styles.text}>ระยะเวลาในการหนีบหลอดเลือด Aorta : {this.formatDuration(this.props.surgery_aorta_time)}</Text>
                            <Text style={_styles.text}>ปริมาณเลือดที่เสียระหว่างผ่าตัด : {this.props.profile.surgery_blood_loss}</Text>
                            <Text style={_styles.text}>จำนวนของเส้นเลือดทั้งหมดที่ทำทางเบี่ยง : {this.props.profile.surgery_number_vessel}</Text>
                            <Text style={_styles.text}>จำนวนเส้นเลือด Sapheneous vein ที่ทำทางเบี่ยง : {this.props.profile.surgery_sapheneous_vein}</Text>
                            <Text style={_styles.text}>จำนวนเส้นเลือด Radial artery ที่ทำทางเบี่ยง : {this.props.profile.surgery_radial_artery}</Text>
                            <Text style={_styles.text}>จำนวนเส้นเลือด Internal mammary artery ที่ทำทางเบี่ยง : {this.props.profile.surgery_mammary_artery}</Text>
                        </View>


                    </ScrollView>

                </View>
            </Swiper>

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