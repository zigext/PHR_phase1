import React from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import Sound from 'react-native-sound'
import common from '../styles/common'

export default class FoodAdvicesSwiper extends React.Component {
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
                const sound = new Sound('food1.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                // const sound = new Sound(require('../../assets/sound/food1.wav'), error => callback(error, sound))
                break
            }
            case 'slide2': {
                const sound = new Sound('food2.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide3': {
                const sound = new Sound('food3.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide4': {
                const sound = new Sound('food4.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/food1.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide1')} />
                    <Text style={_styles.text}>หลีกเลี่ยงอาหารที่มีคลอเลสเตอรอลสูง ไขมันสูง อาหารหมักดอง และอาหารที่มีรสชาติเค็ม  เช่น ไข่แดง เครื่องในสัตว์ อาหารทะเล</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/food2.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={_styles.text}>งดชา กาแฟ น้ำอัดลม เครื่องดื่มที่มีแอลกอฮอล์ และควรงดสูบบุหรี่</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/food3.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                    <Text style={_styles.text}>ควรรับประทานผักทุกชนิด ผลไม้ที่ไม่มีรสหวานจัด ได้เท่าที่ต้องการ ไม่ควรน้อยกว่าวันละ 2 มื้อ</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/food4.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={_styles.text}>การรับประทานยา แนะนำให้ผู้ป่วยรับประทานยาหรือฉีดยา ถูกต้องตามวิธี ขนาดและเวลา ไม่ควรเพิ่มหรือหยุดยาเอง และควรสังเกตอาการข้างเคียงของยาที่ได้รับ </Text>
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