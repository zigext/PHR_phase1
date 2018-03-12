import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import common from '../styles/common'

export default class Instructions extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={[styles.text, styles.topic]}>คำแนะนำในการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ</Text>
                    <Text style={[styles.text, styles.subTopic]}>คืออะไร?</Text>
                    <Text style={styles.text}>คือการให้ความรู้ ให้คำแนะนำ กระตุ้น ให้ผู้ป่วยทำกิจกรรมการเคลื่อนไหวร่างกาย การหายใจบริหารปอด และการทำกิจวัตรประจำวันอย่างต่อเนื่อง</Text>
                    <Text style={[styles.text, styles.subTopic]}>สำคัญอย่างไร?</Text>
                    <Text style={styles.text}>ช่วยฟื้นฟูประสิทธิภาพการทำงานของหัวใจและปอดหลังผ่าตัด ป้องกันภาวะแทรกซ้อนที่จะเป็นสาเหตุทำให้อยู่โรงพยาบาลนานขึ้น</Text>
                    <Text style={[styles.text, styles.subTopic]}>หลักการ</Text>
                    <Text style={styles.text}>▪ ทำทันทีหลังผ่าตัด เมื่อผ่านเกณฑ์ประเมินว่ามีความพร้อม ทุกวันตามความเหมาะสม</Text>
                    <Text style={styles.text}>▪ มีการดูแลอย่างใกล้ชิดตลอดเวลา และจะหยุดทันทีเมื่อผู้ป่วยมีอาการข้างเคียงได้แก่ สัญญาณชีพผิดปกติ หัวใจเต้นเร็วขึ้น รู้สึกเหนื่อยขึ้นเล็กน้อย โดยที่ยังพูดคุยสื่อสารได้ มึนศีรษะ หรือคลื่นไส้ อาเจียน เป็นต้น</Text>
                    <Text style={styles.text}>▪ การทำกิจกรรมในแต่ละวันจะต้องเริ่มต้นจากขั้นที่ 1 และเป็นไปตามลำดับเสมอ</Text>
                    <Text style={[styles.text, styles.subTopic]}>เป้าหมาย</Text>
                    <Text style={styles.text}>กิจกรรมต่างๆ จะทำให้หัวใจของผู้ป่วยค่อยๆทำงานมากขึ้นเป็นลำดับ กำหนดไว้ 7 ขั้นตอน จนผู้ป่วยสามารถเดินขึ้น-ลงบันไดได้ ก่อนออกจากโรงพยาบาล (ประมาณวันที่ 7 หลังผ่าตัด)</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 40
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        color: common.grey
    },
    topic: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 22,
    },
    subTopic: {
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20
    }
})