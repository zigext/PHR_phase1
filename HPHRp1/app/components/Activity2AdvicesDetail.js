import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import common from '../styles/common'

export default class Activity2AdvicesDetail extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={[_styles.text, { fontWeight: 'bold', textAlign: 'center' }]}>การเดิน</Text>
                    <View style={_styles.contentContainer}>
                        <Text style={_styles.text}>เป็นกิจกรรมที่ทำได้ง่าย และช่วยให้ผู้ป่วยทำกิจวัตรประจำวันได้ดียิ่งขึ้น</Text>
                        <Text style={_styles.text}>โดยพยายามเดินให้ได้ระยะทางที่ไกลขึ้น ในการเดินครั้งต่อไป </Text>
                        <Image source={require('../../assets/images/advices/exercise1.jpg')} style={_styles.image}></Image>
                    </View>
                </ScrollView>
            </View>
        )

    }
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 20,
        marginHorizontal: 50,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 22,
        color: common.grey,
        marginBottom: 25,
        marginTop: 20,
    },
    image: {
        resizeMode: 'center',
        alignSelf: 'center',
        margin: 10,
        flex: 1,
        height: 350,
        width: 500
    }
})