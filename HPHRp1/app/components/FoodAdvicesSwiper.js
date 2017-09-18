import React from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'

export default class FoodAdvices extends React.Component {
    constructor() {
        super()

    }


    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food1.png')} style={_styles.image}></Image>
                    <Text style={styles.text}>ควรหลีกเลี่ยงอาหารที่ทำให้คลอเลสเตอรอลในเลือดสูง เช่น ไข่แดง เครื่องในสัตว์ อาหารทะเล</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food2.jpg')} style={_styles.image}></Image>
                    <Text style={styles.text}>ควรงดชา กาแฟ และน้ำอัดลม เครื่องดื่มที่มีแอลกอฮอล์ และควรงดสูบบุหรี่</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food3.jpg')} style={_styles.image}></Image>
                    <Text style={styles.text}>หลีกเลี่ยงอาหารที่ทำให้น้ำตาลในเลือดสูง เช่น ข้าวเหนียวทุเรียน ทองหยิบ ทองหยอด   ทุเรียน ลำไย</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food4.jpg')} style={_styles.image}></Image>
                    <Text style={styles.text}>ถ้าต้องใช้น้ำมันปรุงอาหารควรเลือกใช้น้ำมันพืช แทนเนยหรือน้ำมันจากสัตว์ หรือให้วิธีลวก ต้ม นึ่ง และอบแทนการทอด</Text>
                </View>
                <View style={_styles.slide}>
                    <Image source={require('../../assets/images/food5.jpg')} style={_styles.image}></Image>
                    <Text style={styles.text}>ควรรับประทานผักทุกชนิด ผลไม้ที่ไม่มีรสหวานจัด เช่น มะละกอ พุทรา แอปเปิ้ล ฝรั่ง</Text>
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
        flex:1
    }
})