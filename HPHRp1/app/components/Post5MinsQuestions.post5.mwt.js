import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { split } from 'lodash'
import Heartrate from './Heartrate'

let Form = t.form.Form
let options = {
    fields: {
        hr: {
            label: 'อัตราการเต้นหัวใจ (หน่วย bpm)'
        },
        bp: {
            label: 'ความดันเลือด (Systolic/Diastolic)'
        },
        o2sat: {
            label: 'ความอิ่มตัวของออกซิเจนในเลือด (%)'
        }
    }
}

//Heart rate condition
//heart rate > 0 && < 250
let hr = t.refinement(t.Number, function (n) { return n > 0 && n < 250 })
hr.getValidationErrorMessage = function (value, path, context) {
    return 'อัตราการเต้นหัวใจไม่ถูกต้อง'
}

let hrmax = t.refinement(t.Number, function (n) { return n > 0 && n < 250 })
hrmax.getValidationErrorMessage = function (value, path, context) {
    return 'อัตราการเต้นหัวใจไม่ถูกต้อง'
}

//Blood pressure condition
//bp will come in systolic/diastolic format as string
//bpArray[0] = systolic, bpArray[1] = diastolic
let bp = t.refinement(t.String, function (n) {
    let bpArray = split(n, '/')
    if (bpArray[0] > 0 && bpArray[0] < 300 && bpArray[1] > 0 && bpArray[1] < 300) {
        return n !== null
    }

})
bp.getValidationErrorMessage = function (value, path, context) {
    return 'ความดันเลือดไม่ถูกต้อง ex. 80/120'
}

let o2sat = t.refinement(t.Number, function (n) { return n >= 1 && n <= 100 })
o2sat.getValidationErrorMessage = function (value, path, context) {
    return 'ความอิ่มตัวของออกซิเจนในเลือดไม่ถูกต้อง กรุณากรอกตัวเลขในช่วง 1-100'
}

let input = t.struct({
    hr: hr,
    bp: bp,
    o2sat: o2sat,
})

export default class Post5MinsQuestions extends React.Component {
    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            Alert.alert(
                'ทดสอบเดินบนพื้นราบ 6 นาที',
                'ต้องการบันทึกผลการทำแบบทดสอบหรือไม่? กรุณาตรวจสอบความถูกต้องของข้อมูล',
                [
                    {
                        text: 'ใช่', onPress: async () => {
                            await this.props.onDataChange('hr', value.hr)
                            await this.props.onDataChange('bp', value.bp)
                            await this.props.onDataChange('o2sat', value.o2sat)

                            this.props.onPost5MinsQuestionsDone()
                            this.props.onMwtResultDone()
                        }
                    },
                    { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                ]
            )
        }
        else {
            ToastAndroid.showWithGravity('กรุณากรอกข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={_styles.text}>บันทึกผลหลังทดสอบ 5 นาที</Text>
                    <Form ref='form' type={input} options={options} />
                    <View style={_styles.buttonContainer}>
                        <Icon
                            raised
                            reverse
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={common.accentColor}
                            size={35}
                            onPress={this.onForward}

                        />
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
        alignSelf: 'stretch',
        padding: 20,
        paddingHorizontal: 50,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: common.grey,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
})