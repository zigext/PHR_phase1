import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { split } from 'lodash'

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
        },
    }
}

//Heart rate condition
//heart rate > 0 && < 200
let hr = t.refinement(t.Number, function (n) { return n >= 30 && n <= 250 })
// if you define a getValidationErrorMessage function, it will be called on validation errors
hr.getValidationErrorMessage = function (value, path, context) {
    return 'อัตราการเต้นหัวใจไม่ถูกต้อง กรุณากรอกตัวเลขในช่วง 30-250'
}

//Blood pressure condition
//bp will come in systolic/diastolic format as string
//bpArray[0] = systolic, bpArray[1] = diastolic
let bp = t.refinement(t.String, function (n) {
    let bpArray = split(n, '/')
    if (bpArray[0] >= 30 && bpArray[0] <= 250 && bpArray[1] >= 30 && bpArray[1] <= 250) {
        return n !== null
    }

})
bp.getValidationErrorMessage = function (value, path, context) {
    return 'ความดันเลือดไม่ถูกต้อง กรุณากรอกตัวเลขในช่วง 30-250 ex. 80/120'
}

let o2sat = t.refinement(t.Number, function (n) { return n >= 1 && n <= 100 })
o2sat.getValidationErrorMessage = function (value, path, context) {
    return 'ความอิ่มตัวของออกซิเจนในเลือดไม่ถูกต้อง กรุณากรอกตัวเลขในช่วง 1-100'
}

let input = t.struct({
    hr: hr,
    bp: bp,
    o2sat: o2sat
})

export default class PreQuestions extends React.Component {
    onStepChange = async () => {
        let value = this.refs.form.getValue()
        if (value) {
            let bp = split(value.bp, '/')
            await this.props.onDataChange('hr', value.hr)
            await this.props.onDataChange('bp', value.bp)
            await this.props.onDataChange('o2sat', value.o2sat)
            await this.props.onPreQuestionsDone()
            this.props.onStatusChange('doing')
            
        }
        else {
            ToastAndroid.showWithGravity('กรุณากรอกข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    render() {
        return (
            <View style={_styles.container}>
                <Text style={_styles.text}>ทดสอบก่อนเดิน 6 นาที</Text>
                <Form ref='form' type={input} options={options} />
                <Icon
                    raised
                    reverse
                    name='ios-arrow-forward'
                    type='ionicon'
                    color={common.accentColor}
                    size={35}
                    onPress={this.onStepChange}
                    containerStyle={{ alignSelf: 'flex-end' }}
                />
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
    }
})