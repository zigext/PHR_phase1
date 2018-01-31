import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import common from '../styles/common'
import Sound from 'react-native-sound'

export default class ExerciseAdvicesSwiper extends React.Component {
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
                const sound = new Sound(require('../../assets/sound/exercise1.wav'), error => callback(error, sound))
                break
            }
            case 'slide2': {
                const sound = new Sound(require('../../assets/sound/exercise2.wav'), error => callback(error, sound))
                break
            }
            case 'slide3': {
                const sound = new Sound(require('../../assets/sound/exercise3.wav'), error => callback(error, sound))
                break
            }
            case 'slide4': {
                const sound = new Sound(require('../../assets/sound/exercise4.wav'), error => callback(error, sound))
                break
            }
            case 'slide5': {
                const sound = new Sound(require('../../assets/sound/exercise5.wav'), error => callback(error, sound))
                break
            }
            case 'slide6': {
                const sound = new Sound(require('../../assets/sound/exercise6.wav'), error => callback(error, sound))
                break
            }
            case 'slide7': {
                const sound = new Sound(require('../../assets/sound/exercise7.wav'), error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/exercise1.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide1')} />
                    <Text style={_styles.text}>รูปแบบการออกกําลังกาย ใช้การเดินและการออกกําลังแบบไอโซโทนิค คือการออกกําลังกายชนิดที่มีการยืด/หดตัวของกล้ามเนื้อ และอวัยวะมีการเคลื่อนไหวขณะออกกําลัง</Text>
                </View>
                <View style={_styles.slide}>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={_styles.text}>ผู้ป่วยโรคกล้ามเนื้อหัวใจตายเฉียบพลัน ควรออกกําลังกายโดยชีพจรขณะออกกําลังกายมากกว่าขณะพักไม่เกิน 20 ครั้งต่อนาที</Text>
                </View>
                <View style={_styles.slide}>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                    <Text style={_styles.text}>ผู้ป่วยหลังผ่าตัดหัวใจ หรือรักษาโดยการขยายหลอดเลือดหัวใจด้วยบอลลูน ควรออกกําลังกายโดยชีพจรขณะออกกําลังกายมากกว่าขณะพักไม่เกิน 30 ครั้งต่อนาที</Text>
                </View>
                <View style={_styles.slide}>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={_styles.text}>ระยะเวลา เริ่มจาก 5-10 นาที และเพิ่มเป็น 20-30 นาที ให้รู้สึกเหนื่อยเล็กน้อยหรือปานกลาง (RPE 9-12)</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/exercise2.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide5')} />
                    <Text style={_styles.text}>ความถี่ วันละ 2 ครั้ง ขึ้นกับสภาพร่างกาย</Text>
                </View>
                <View style={_styles.slide}>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide6')} />
                    <Text style={_styles.text}>ค่อยๆเพิ่มความหนักในการออกกําลังกาย เริ่มเคลื่อนไหวจากข้อเล็กไปยังข้อใหญ่ ทําอย่างต่อเนื่อง ไม่เกร็งค้าง และไม่กลั้นหายใจขณะทํา อาจมีคนช่วยในช่วงแรก จากนั้นก็ทําด้วยตนเอง ค่อยๆเปลี่ยนท่าจากนอน ไปนั่ง และยืน</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/walking.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide7')} />
                    <Text style={_styles.text}>การเดินทําได้ง่าย ช่วยให้ผู้ป่วยทำกิจวัตรประจําวันได้ดีขึ้น โดยพยายามเดินให้ระยะทางไกลขึ้นในครั้งต่อไป  และสามารถเดินได้เร็วขึ้นถ้าไม่มีอาการไม่พึงประสงค์ เช่น มึนงง เซ ซีด หายใจลําบาก คลื่นไส้ เจ็บหน้าอก</Text>
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
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    },
    text: {
        color: common.grey,
        fontSize: 22,
        letterSpacing: 4,
        lineHeight: 45
    }
})