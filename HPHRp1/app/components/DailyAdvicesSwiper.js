import React from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import Sound from 'react-native-sound'
import common from '../styles/common'

export default class DailyAdvicesSwiper extends React.Component {

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
                const sound = new Sound('daily1.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide2': {
                const sound = new Sound('daily2.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide3': {
                const sound = new Sound('daily3.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide4': {
                const sound = new Sound('daily4.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/daily1.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide1')} />
                    <Text style={_styles.text}>การอาบน้ำ ควรหลีกเลี่ยงน้ำอุ่นจัดหรือเย็นจัด</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/daily2.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={_styles.text}>กิจกรรมทางเพศสามารถทำได้หลังผ่าตัด 4-6 สัปดาห์ หรือเมื่อสามารถเดินขึ้นบันได 2 ชั้นติดต่อกันโดยไม่รู้สึกเหนื่อย ให้หลีกเลี่ยงท่าที่จะกระทบกระเทือนกระดูกหน้าอก   </Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/daily4.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                    <Text style={_styles.text}>การพักผ่อนนอนหลับ กลางคืนควรนอนประมาณ 8-10 ชั่วโมง กลางวัน 1-2 ชั่วโมง</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/daily5.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={_styles.text}> ไม่ควรยกของหนักเกิน 5กิโลกรัมในระยะ 4-6 สัปดาห์ เพราะจะกระเทือนต่อกระดูกกลางอก</Text>
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
        color: common.grey,
        fontSize: 22,
        letterSpacing: 4,
        lineHeight: 45
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    }
})