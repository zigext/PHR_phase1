import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import Sound from 'react-native-sound'

export default class DailyAdvicesSwiper extends React.Component {
    constructor() {
        super()

    }

    playSound = (name) => {
        const callback = (error, sound) => {
            if (error) {
                Alert.alert('error', error.message)
                return
            }
            sound.play(() => {
                // // Success counts as getting to the end
                // setTestState(testInfo, component, 'win');
                // // Release when it's done so we're not using up resources
                sound.release()
            })
        }
        switch (name) {
            case 'slide1': {
                const sound = new Sound(require('../../assets/sound/food1.wav'), error => callback(error, sound))
                break
            }
            case 'slide2': {
                const sound = new Sound(require('../../assets/sound/food2.wav'), error => callback(error, sound))
                break
            }
            case 'slide3': {
                const sound = new Sound(require('../../assets/sound/food3.wav'), error => callback(error, sound))
                break
            }
            case 'slide4': {
                const sound = new Sound(require('../../assets/sound/food4.wav'), error => callback(error, sound))
                break
            }
            case 'slide5': {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food1.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide1')} />
                    <Text style={styles.text}>เมื่อแผลหายสนิทประมาณ 10 วันหลังผ่าตัด สามารถอาบน้ำได้ ถูบริเวณแผลเบาๆล้างออกด้วยน้ำและซับให้แห้ง ถ้ามีพลาสเตอร์ปิดแผลสามารถแกะออกได้</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food2.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={styles.text}>แผลผ่าตัดหน้าอกจะติดกันภายใน 7-10 วัน อาจมีแผลที่ขาและแขนจากการตัดหลอดเลือดไปทำทางเบี่ยงหลอดเลือดหัวใจ เนื้อนูนบริเวณแผลผ่าตัดจะค่อยๆยุบหายไป</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food3.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                    <Text style={styles.text}>ในกรณีที่แพทย์เลาะเส้นเลือดที่ขาไปทำทางเบี่ยงหลอดเลือดหัวใจตีบ ผู้ป่วยต้องใส่ถุงน่องเพื่อลดอาการบวมของขา ซึ่งจะช่วยทำให้การไหลเวียนโลหิตดีขึ้น</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food4.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={styles.text}>กิจวัตรประจำวันอาจทำไห้เหนื่อยได้ง่าย จึงควรพักผ่อนครั้งละ 20-30 นาที วันละ2ครั้ง อาจเป็นการนั่งพัก และควรนอนหลับ 8-10 ชั่วโมงต่อวัน</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food5.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide5')} />
                    <Text style={styles.text}> ไม่ควรยกของหนักเกิน 5กิโลกรัมในระยะ 4-6 สัปดาห์ เพราะจะกระเทือนต่อกระดูกกลางอก</Text>
                </View>
            </Swiper>
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
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    }
})