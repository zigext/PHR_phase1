import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
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
                    <Text style={styles.text}>รูปแบบการออกกําลังกาย ใช้การเดินและการออกกําลังกายแบบไอโซโทนิคเป็นหลัก คือการออกกําลังกายชนิดที่มีการยืด/หดตัวของกล้ามเนื้อ และอวัยวะมีการเคลื่อนไหวขณะออกกําลัง</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food2.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={styles.text}>ผู้ป่วยโรคกล้ามเนื้อหัวใจตายเฉียบพลันควรออกกําลังกายโดยชีพจรขณะออกกําลังกายมากกว่าชีพจรขณะพักไม่เกิน 20 ครั้งต่อนาที ส่วนผู้ป่วยหลังผ่าตัดหัวใจหรือการรักษาโดยการขยายหลอดเลือดหัวใจด้วยบอลลูน ควรออกกําลังกายโดยชีพจรขณะออกกําลังกายมากกว่าชีพจรขณะพักไม่เกิน 30 ครั้งต่อนาที</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food3.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                    <Text style={styles.text}>ระยะเวลา เริ่มจาก 5-10 นาที และเพิ่มเป็น 20-30 นาที ให้รู้สึกเหนื่อยเล็กน้อยหรือปานกลาง (RPE 9-12)</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food4.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={styles.text}>ความถี่ วันละ 2 ครั้ง ขึ้นกับสภาพร่างกาย</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food5.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide5')} />
                    <Text style={styles.text}>ค่อยๆเพิ่มความหนักในการออกกําลังกาย เริ่มจากเคลื่อนไหวข้อจากข้อเล็กๆ เช่น ข้อมือ ข้อเท้า ไปยังข้อที่ใหญ่ เช่น คอ ไหล่ กระทําอย่างต่อเนื่อง ไม่เกร็งค้าง และไม่กลั้นหายใจขณะทํา อาจมีคนช่วยทําหลังจากนั้นก็ทําด้วยตนเอง ค่อยๆเปลี่ยนท่าจากนอน ไปนั่ง และยืน</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food5.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide5')} />
                    <Text style={styles.text}>การเดิน เป็นการออกกําลังกายทําได้ง่ายและช่วยเสริมให้ผู้ป่วยประกอบกิจวัตรประจําวันได้ดียิ่งขึ้น โดยพยายามเดินให้ระยะทางไกลขึ้นในครั้งต่อไป  และสามารถเดินได้เร็วขึ้นถ้าไม่มีอาการไม่พึงประสงค์ เช่น มึนงง เซ ซีด เขียว หายใจลําบาก คลื่นไส้ เจ็บหน้าอก</Text>
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