import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import i18n from 'tcomb-form-native/lib/i18n/en'
import templates from 'tcomb-form-native/lib/templates/bootstrap'
// var stylesheet = require('tcomb-form-native/lib/stylesheets/bootstrap');
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { cloneDeep } from 'lodash'


let Form = t.form.Form
// t.form.Form.templates = templates;
// t.form.Form.i18n = i18n
const myCustomStylesheet = cloneDeep(t.form.Form.stylesheet)
// overriding the text color
myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'

let options = {
    fields: {
        sbpLowerThanNormal: {
            label: 'SBP ต่ำกว่าค่าปกติของผู้ป่วย ≥ 20 mmHg',
        },
        abnormalGlucose: {
            label: 'ระดับน้ำตาลในเลือดผิดปกติ (≥ 80 mg% หรือ ≤ 300 mg%)',
        },
        weakMuscle: {
            label: 'กล้ามเนื้อไม่แข็งแรง (Muscle power grade < 3)',
        }
    },
    stylesheet: myCustomStylesheet
}

let input = t.struct({
    sbpLowerThanNormal: t.Boolean,
    abnormalGlucose: t.Boolean,
    weakMuscle: t.Boolean
})

export default class Step2Pre extends React.Component {
    constructor(props) {
        super(props)

    }

    onPress = () => {
        let value = this.refs.form.getValue()
        if (value) {
            console.log("VALUE = ", value)
        }
    }

    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            this.props.onStepChange(this.props.step + 1)
            this.props.onDataChange('sbpLowerThanNormal', value.sbpLowerThanNormal)
            this.props.onDataChange('abnormalGlucose', value.abnormalGlucose)
            this.props.onDataChange('weakMuscle', value.weakMuscle)
        }
        else {

        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    render() {
        let defaultValue = {}
        if (this.props.sbpLowerThanNormal || this.props.abnormalGlucose || this.props.weakMuscle) {
            console.log("IF")
            let { sbpLowerThanNormal: sbpLowerThanNormal, abnormalGlucose: abnormalGlucose, weakMuscle: weakMuscle } = this.props
            defaultValue = { sbpLowerThanNormal, abnormalGlucose, weakMuscle }
            console.log(defaultValue)
        }
        return (
            <View style={_styles.container}>
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
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    }
})
