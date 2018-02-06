import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import Sound from 'react-native-sound'
import common from '../styles/common'

export default class FoodAdvicesSwiper extends React.Component {
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
            case 'slide5': {
                const sound = new Sound('food5.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
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
                    <Text style={_styles.text}>ควรหลีกเลี่ยงอาหารที่ทำให้คลอเลสเตอรอลในเลือดสูง เช่น ไข่แดง เครื่องในสัตว์ อาหารทะเล</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food2.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={_styles.text}>ควรงดชา กาแฟ น้ำอัดลม เครื่องดื่มที่มีแอลกอฮอล์ และควรงดสูบบุหรี่</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food3.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                    <Text style={_styles.text}>หลีกเลี่ยงอาหารที่ทำให้น้ำตาลในเลือดสูง เช่น ข้าวเหนียวทุเรียน ขนมหวาน มะม่วง ลำไย</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food4.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={_styles.text}>ถ้าต้องใช้น้ำมันปรุงอาหารควรเลือกใช้น้ำมันพืช แทนเนยหรือน้ำมันจากสัตว์ หรือใช้การลวก ต้ม นึ่ง และอบแทนการทอด</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food5.jpg')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide5')} />
                    <Text style={_styles.text}>ควรรับประทานผักทุกชนิด ผลไม้ที่ไม่มีรสหวานจัด เช่น มะละกอ แอปเปิ้ล ฝรั่ง</Text>
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