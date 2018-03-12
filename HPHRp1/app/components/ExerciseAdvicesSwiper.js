import React from 'react'
import { StyleSheet, Text, View, Image, Alert, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import common from '../styles/common'
import Sound from 'react-native-sound'

export default class ExerciseAdvicesSwiper extends React.Component {

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
                const sound = new Sound('exercise1.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide2': {
                const sound = new Sound('exercise2.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                <View style={_styles.slide}>
                    <ScrollView>
                        <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide1')} />
                        <Text style={_styles.text}>การออกกำลังกาย จะต้องมีความต่อเนื่องจากที่อยู่โรงพยาบาล มีขั้นตอน คือ</Text>
                        <Text style={_styles.text}>▪ จับชีพจรและอบอุ่นร่างกายก่อนเดิน </Text>
                        <Text style={_styles.text}>▪ เดินด้วยความเร็วปานกลางอย่างต่อเนื่อง วันละ 10 นาที หลังจากนั้นเพิ่มเวลานานขึ้น จนถึงครั้งละ 20-30 นาที เดินอย่างน้อยสัปดาห์ละ 3-5 วัน</Text>
                        <Text style={_styles.text}>▪ เดินหลังจากรับประทานอาหาร อย่างน้อย 1-2 ชั่วโมง </Text>
                        <Text style={_styles.text}>▪ ควรจดบันทึกการเดิน ระยะเวลา ระยะเวลา อัตราการเต้นของหัวใจ และอาการผิดปกติต่างๆ (มี/ไม่มี อย่างไร)</Text>
                        <Image source={require('../../assets/images/advices/exercise1.jpg')} style={_styles.image}></Image>
                    </ScrollView>
                </View>
                <View style={_styles.slide}>
                    <ScrollView>
                        <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={_styles.text}>อาการที่ผิดปกติที่ควรหยุดเดิน </Text>
                            <Icon reverse raised name='warning' type='font-awesome' color='#c81837' size={23} />
                        </View>
                        <Text style={_styles.text}>▪ เจ็บแน่นหน้าอก </Text>
                        <Text style={_styles.text}>▪ เวียนศีรษะ มึนงง คลื่นไส้อาเจียน </Text>
                        <Text style={_styles.text}>▪ เหนื่อยหอบ หายใจไม่สะดวก  </Text>
                        <Text style={_styles.text}>▪ ใจสั่นมาก</Text>
                        <Text style={_styles.text}>▪ รู้สึกอ่อนแรงผิดปกติหรือเมื่อยล้า </Text>
                        <Text style={_styles.text}>▪ รู้สึกไม่สบายหรือมีไข้ </Text>
                    </ScrollView>
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
        alignItems: 'stretch',
        padding: 20,
        paddingHorizontal: 50,
        margin: 10
    },
    image: {
        resizeMode: 'center',
        alignSelf: 'center',
        margin: 10,
        flex: 1,
        height: 350,
        width: 500
    },
    text: {
        color: common.grey,
        fontSize: 20,
        letterSpacing: 4,
        lineHeight: 45
    }
})