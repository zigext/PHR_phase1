import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import Timer from '../components/Timer'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'
import common from '../styles/common'
import TimerCountdown from 'react-native-timer-countdown'

let breathingExercise = {}

export default class Doing6MWT extends React.Component {

    onCancel = () => {
        Alert.alert(
            'ทดสอบเดินบนพื้นราบ 6 นาที',
            'ต้องการยกเลิกการทดสอบหรือไม่? ผลการทดสอบที่ทำอยู่จะสูญหาย',
            [
                {
                    text: 'ใช่', onPress: () => {
                        // this.resetState()
                        this.props.onCancel()
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }

    onFinish = () => {
        Alert.alert(
            'ทดสอบเดินบนพื้นราบ 6 นาที',
            'ต้องการสิ้นสุดการทดสอบหรือไม่? ผลการทดสอบจะถูกบันทึก',
            [
                {
                    text: 'ใช่', onPress: async () => {
                        await this.props.toggleIsDoing6Mwt()
                        this.props.onStatusChange('post')
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Timer fontSize={100} sixMinsWalk={true} onDataChange={this.props.onDataChange} isDoing6Mwt={this.props.isDoing6Mwt} />
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            title='ยกเลิกการทดสอบ'
                            raised
                            rounded
                            textStyle={styles.buttonText}
                            buttonStyle={styles.buttonCancel}
                            containerViewStyle={styles.buttonContainer}
                            onPress={this.onCancel}
                        />
                        <Button
                            title='สิ้นสุดการทดสอบ'
                            raised
                            rounded
                            textStyle={styles.buttonText}
                            buttonStyle={styles.buttonFinish}
                            containerViewStyle={styles.buttonContainer}
                            onPress={this.onFinish}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    buttonFinish: {
        backgroundColor: common.accentColor,
        borderColor: "transparent",
        borderWidth: 0,
    },
    buttonCancel: {
        backgroundColor: common.grey,
        borderColor: "transparent",
        borderWidth: 0,
    },
    buttonContainer: {
        borderWidth: 0,
        borderRadius: 50,
        marginVertical: 35,
        marginHorizontal: 35
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },

})