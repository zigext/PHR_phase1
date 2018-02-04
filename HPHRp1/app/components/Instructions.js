import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import common from '../styles/common'

export default class Instructions extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <Text style={[styles.text, styles.topic]}>คำแนะนำในการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ</Text>
                <Text style={styles.text}>เริ่มทำกิจกรรมทันทีเมื่อมีอาการคงที่</Text>
                <Text style={styles.text}>ทำกิจกรรมที่ใช้ระดับพลังงานจากต่ำไปสูง</Text>
                <Text style={styles.text}>ทำกิจกรรมจนกว่าจะไม่สามารถทำต่อไปได้ หรือมีอาการแทรกซ้อน</Text>
                <Text style={styles.text}>มีผู้ดูแลขณะทำกิจกรรมเสมอ</Text>
                <Text style={styles.text}>กิจกรรมฟื้นฟูสมรรถภาพหัวใจ ช่วยให้ร่างกายแข็งแรง กลับบ้านได้เร็วขึ้น</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        marginBottom: 10,
        color: common.grey
    },
    topic: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    }
})