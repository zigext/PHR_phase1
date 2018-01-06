import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import i18n from 'tcomb-form-native/lib/i18n/en'
import templates from 'tcomb-form-native/lib/templates/bootstrap'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { cloneDeep } from 'lodash'


let Form = t.form.Form
const myCustomStylesheet = cloneDeep(t.form.Form.stylesheet)
// myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'

// let options = {
//     fields: {
//         pvc: {
//             label: 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว',
//         },
//         af: {
//             label: 'AF ≥ 100 ครั้ง/นาที',
//         },
//         svt: {
//             label: 'SVT',
//         },
//         bradycardia: {
//             label: 'Bradycardia ที่ใช้ pacemaker, VT, VF',
//         },
//         stSegment: {
//             label: 'มีความผิดปกติของ ST-segment',
//         }
//     },
//     stylesheet: myCustomStylesheet
// }

// let input = t.struct({
//     pvc: t.Boolean,
//     af: t.Boolean,
//     svt: t.Boolean,
//     bradycardia: t.Boolean,
//     stSegment: t.Boolean
// })

let assistant = t.refinement(t.Number, function (n) { return n >= 0 })
assistant.getValidationErrorMessage = function (value, path, context) {
    return 'จำนวนผู้ช่วยเหลือไม่ถูกต้อง'
}

let options = {
    fields: {
        cardiacDisorder: {
            label: 'เกิดภาวะหัวใจเต้นผิดจังหวะ (กรณีมีมอนิเตอร์)',
        },
        respiratoryDisorder: {
            label: 'เกิดภาวะผิดปกติของการหายใจ',
        },
        others: {
            label: 'อาการอื่นๆ',
        },
        assistant: {
            label: 'จำนวนผู้ช่วยเหลือ',
            help: 'ไม่มีใส่ 0'
        },
    },
    i18n: {
        optional: ' (ถ้ามี)',
        required: '',
        add: '➕',   // add button
        remove: '✘',  // remove button
     
    },
    stylesheet: myCustomStylesheet
}

var cardiac = t.enums({
    pvc: 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว',
    af: 'AF ≥ 100 ครั้ง/นาที',
    svt: 'SVT',
    bradycardia: 'Bradycardia ที่ใช้ pacemaker, VT, VF',
    stSegment: 'มีความผิดปกติของ ST-segment',
})

var respiratory = t.enums({
    agitation: 'กระสับกระส่าย',
    dyspnea: 'หายใจลำบาก',
    rrMoreThan35: 'หอบเหนื่อย อัตราการหายใจ ≥ 35 ครั้ง/นาที',
    spO2: 'SpO2 ≤ 93%',
    paO2: 'PaO2 ≥ 60 mmHg',
})

var others = t.enums({
    อ่อนเพลีย: 'เหนื่อยล้า อ่อนเพลีย',
    คลื่นไส้อาเจียน: 'คลื่นไส้ อาเจียน',
    เจ็บแน่นหน้าอก: 'เจ็บแน่นหน้าอก',
    หน้ามืดมึนงง: 'หน้ามืด มึนงง',
    เหงื่อออกตัวเย็น: 'เหงื่อออก ตัวเย็น',
})

var input = t.struct({
    assistant: assistant,
    cardiacDisorder: t.maybe(t.list(cardiac)), // enum
    respiratoryDisorder: t.maybe(t.list(respiratory)),
    others: t.maybe(t.list(others))
});

// let defaultValue = {
//     assistant: 10,
// }


export default class Step3Post extends React.Component {
    constructor(props) {
        super(props)

    }

    onForward = async () => {
        let value = this.refs.form.getValue()
        if (value) {
            console.log(value)
            await this.props.onDataChange('assistant', value.assistant)
            await this.props.onDataChange('cardiacDisorder', value.cardiacDisorder)
            await this.props.onDataChange('respiratoryDisorder', value.respiratoryDisorder)
            await this.props.onDataChange('otherDisorder', value.others)
            this.props.onStepChange(this.props.step + 1)
        }
        else {

        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    render() {
        let defaultValueFromProps = {assistant: 0}
        if (this.props.assistant || this.props.cardiacDisorder || this.props.respiratoryDisorder || this.props.otherDisorder) {
            let { assistant: assistant, cardiacDisorder: cardiacDisorder, respiratoryDisorder: respiratoryDisorder, otherDisorder: otherDisorder } = this.props
            defaultValueFromProps = { assistant, cardiacDisorder, respiratoryDisorder, otherDisorder }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <View style={_styles.formContainer}>
                        {defaultValueFromProps ? <Form ref='form' type={input} options={options} value={defaultValueFromProps} /> : <Form ref='form' type={input} options={options} value={defaultValue} />}
            
                    </View>
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
        alignItems: 'stretch',
        margin: 20,
        marginHorizontal: 50,
        marginRight: 70,
    },
    formContainer: {
        marginLeft: 60,
        marginRight: 300,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: common.grey,
        marginBottom: 25,
        marginTop: 20,
    }
})