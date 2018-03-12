import React from 'react'
import { StyleSheet, Text, View, Image, Alert, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import Sound from 'react-native-sound'
import common from '../styles/common'

export default class OtherAdvicesSwiper extends React.Component {
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
                const sound = new Sound('other1.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                // const sound = new Sound(require('../../assets/sound/food1.wav'), error => callback(error, sound))
                break
            }
            case 'slide2': {
                const sound = new Sound('other2.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide3': {
                const sound = new Sound('other3.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
                break
            }
            case 'slide4': {
                const sound = new Sound('other4.wav', Sound.MAIN_BUNDLE, error => callback(error, sound))
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
                        <Text style={_styles.text}>การดูแลแผลผ่าตัดกระดูกหน้าอก ซึ่งรอยเย็บจะสมานปิดสนิทภายใน 4-12 สัปดาห์ ระหว่างนี้ผู้ป่วยจะต้อง </Text>
                        <Text style={_styles.text}>▪ หลีกเลี่ยงกิจกรรมที่ต้องออกแรงยกของหนักมากกว่า 5 กิโลกรัม ออกแรงผลักวัตถุหนัก และหลีกเลี่ยงการขับรถเพื่อป้องกันแรงกระแทกจากอุบัติเหตุต่างๆ</Text>
                        <Text style={_styles.text}>▪ เช็ดแผลผ่าตัดทุกวันอย่างแผ่วเบาด้วยน้ำอุ่นและสบู่อ่อนๆ แล้วซับให้แห้ง ไม่ทายา ครีม โลชั่น หรือผงยาใดๆบนรอยแผล</Text>
                        <Text style={_styles.text}>▪ สังเกตแผลทุกวันเกี่ยวกับอาการเจ็บตึงรอบแผลเพิ่มขึ้น แผลบวม แดง ร้อน มีน้ำเหลือง เลือด หรือน้ำหนองออกจากแผล ถ้ามีอาการดังกล่าวให้รีบมาพบแพทย์ทันที   </Text>
                    </ScrollView>
                </View>
                <View style={_styles.slide}>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide2')} />
                    <Text style={_styles.text}>เมื่อกลับไปอยู่บ้าน สามารถทำกิจกรรมต่างๆได้เท่ากับขณะอยู่โรงพยาบาล ต่อเนื่องอีก 2 สัปดาห์ แล้วค่อยๆ เพิ่มกิจกรรมขึ้นตามความเหมาะสม</Text>
                </View>
                <View style={_styles.slide}>
                    <ScrollView>
                        <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide3')} />
                        <View style={{flexDirection: 'row'}}>
                            <Text style={_styles.text}>อาการผิดปกติที่ควรรีบมาพบแพทย์ </Text>
                            <Icon reverse raised name='warning' type='font-awesome' color='#c81837' size={23} />
                        </View>
                        <Text style={_styles.text}>▪ ใจสั่น มึนงง เป็นลม เหงื่อออกมากกว่าปกติ </Text>
                        <Text style={_styles.text}>▪ คลำชีพจร พบจังหวะเปลี่ยนไป ไม่สม่ำเสมอ </Text>
                        <Text style={_styles.text}>▪ เจ็บปวดที่แผลหน้าอกมากขึ้น เจ็บหน้าอก เจ็บร้าวไปที่ไหล่ แขน คอ </Text>
                        <Text style={_styles.text}>▪ ปวดบวมขาที่เลาะเส้นเลือดไปใช้ แผลบวม แดงร้อน </Text>
                        <Text style={_styles.text}>▪ เลือดออกง่าย หยุดยาก อุจจาระสีดำ ปัสสาวะสีแดง มีรอยจ้ำเลือดตามผิวหนัง ประจำเดือนมานานและมากกว่าปกติ</Text>
                    </ScrollView>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/advices/other1.png')} style={_styles.image}></Image>
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound('slide4')} />
                    <Text style={_styles.text}>การมาตรวจตามนัด ผู้ป่วยควรมาตรวจตามนัดทุกครั้งและนำยาที่เหลือมาด้วย เพื่อติดตามผลการรักษา </Text>
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