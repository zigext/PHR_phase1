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
        postHr: {
            label: 'อัตราการเต้นหัวใจ'
        },
        postBp: {
            label: 'ความดันเลือด',
            help: 'Systolic/Diastolic'
        },
    }
}

//Heart rate condition
//heart rate > 0 && < 200
let postHr = t.refinement(t.Number, function (n) { return n > 0 && n < 250 })
// if you define a getValidationErrorMessage function, it will be called on validation errors
postHr.getValidationErrorMessage = function (value, path, context) {
    return 'อัตราการเต้นหัวใจไม่ถูกต้อง'
}

//Blood pressure condition
//bp will come in systolic/diastolic format as string
//bpArray[0] = systolic, bpArray[1] = diastolic
let postBp = t.refinement(t.String, function (n) {
    let bpArray = split(n, '/')
    if (bpArray[0] > 0 && bpArray[0] < 300 && bpArray[1] > 0 && bpArray[1] < 300) {
        return n !== null
    }

})
postBp.getValidationErrorMessage = function (value, path, context) {
    return 'ความดันเลือดไม่ถูกต้อง'
}

let input = t.struct({
    postHr: postHr,
    postBp: postBp
})

export default class Step2Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            let bp = split(value.postBp, '/')
            this.props.onStepChange(this.props.step + 1)
            this.props.onDataChange('postHr', value.postHr)
            this.props.onDataChange('postBp', value.postBp)
        }
        else {
            ToastAndroid.showWithGravity('กรุณากรอกข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    render() {
        let defaultValue = {}
        if (this.props.postHr && this.props.postBp) {
            let { postHr: postHr, postBp: postBp } = this.props
            defaultValue = { postHr, postBp }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={_styles.text}>ทดสอบหลังทำกิจกรรม</Text>
                    {defaultValue ? <Form ref='form' type={input} options={options} value={defaultValue} /> : <Form ref='form' type={input} options={options} />}
                    <View style={_styles.buttonContainer}>
                        <Icon
                            raised
                            reverse
                            name='ios-arrow-back'
                            type='ionicon'
                            color={common.accentColor}
                            size={35}
                            onPress={this.onBackward}

                        />
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
        justifyContent: 'space-between',
    },
})