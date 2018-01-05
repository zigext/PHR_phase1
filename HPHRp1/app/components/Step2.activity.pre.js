import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
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
// myCustomStylesheet.fieldset.flexDirection = 'column'
// myCustomStylesheet.formGroup.normal.flex = 1
// myCustomStylesheet.formGroup.error.flex = 1
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
        },

        st: {
            label: 'ST ≥ 120 ครั้ง/นาที',
        },
        pvc: {
            label: 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว',
        },
        af: {
            label: 'AF ≥ 100 ครั้ง/นาที',
        },
        svt: {
            label: 'SVT',
        },
        bradycardia: {
            label: 'Bradycardia ที่ใช้ pacemaker, VT, VF',
        },
        stSegment: {
            label: 'มีความผิดปกติของ ST-segment',
        },

        agitation: {
            label: 'กระสับกระส่าย',
        },
        dyspnea: {
            label: 'หายใจลำบาก',
        },
        rr: {
            label: 'หอบเหนื่อย อัตราการหายใจ ≥ 35 ครั้ง/นาที',
        },
        spO2: {
            label: 'SpO2 ≥ 93% ',
        },
        paO2: {
            label: 'PaO2 ≥ 60 mmHg',
        },

        anemia: {
            label: 'ใบหน้าซีด หรือ Hb < 10 gm%',
        },
        fatigue: {
            label: 'เหนื่อยล้า อ่อนเพลีย',
        },
        nausea: {
            label: 'คลื่นไส้',
        },
        chestPain: {
            label: 'เจ็บแน่นหน้าอก',
        },
        dizziness: {
            label: 'หน้ามืด มึนงง',
        },
        pain: {
            label: 'ปวดแผล (pain score > 3)',
        },
    },
    stylesheet: myCustomStylesheet
}

let input1 = t.struct({
    sbpLowerThanNormal: t.Boolean,
    abnormalGlucose: t.Boolean,
    weakMuscle: t.Boolean,
})

let input2 = t.struct({
    st: t.Boolean,
    pvc: t.Boolean,
    af: t.Boolean,
    svt: t.Boolean,
    bradycardia: t.Boolean,
    stSegment: t.Boolean,
})

let input3 = t.struct({
    agitation: t.Boolean,
    dyspnea: t.Boolean,
    rr: t.Boolean,
    spO2: t.Boolean,
    paO2: t.Boolean,
})

let input4 = t.struct({
    anemia: t.Boolean,
    fatigue: t.Boolean,
    nausea: t.Boolean,
    chestPain: t.Boolean,
    dizziness: t.Boolean,
    pain: t.Boolean,
})

export default class Step2Pre extends React.Component {
    constructor(props) {
        super(props)

    }

    onForward = () => {
        let value1 = this.refs.form1.getValue()
        console.log("VALUE1 ", value1)
        let value2 = this.refs.form2.getValue()
        console.log("VALUE2 ", value2)
        let value3 = this.refs.form3.getValue()
        console.log("VALUE3 ", value3)
        let value4 = this.refs.form4.getValue()
        console.log("VALUE4 ", value4)
        if (value1 || value2 || value3 || value4) {
            // this.props.onStepChange(this.props.step + 1)
            // this.props.onDataChange('sbpLowerThanNormal', value.sbpLowerThanNormal)
            // this.props.onDataChange('abnormalGlucose', value.abnormalGlucose)
            // this.props.onDataChange('weakMuscle', value.weakMuscle)
            Alert.alert(
                'แบบทดสอบก่อนทำกิจกรรม',
                'ต้องการสิ้นสุดการทำแบบทดสอบหรือไม่? กรุณาตรวจสอบความถูกต้องของข้อมูล',
                [
                    {
                        text: 'ใช่', onPress: async () => {
                            this.props.onStepChange(this.props.step + 1)

                            await this.props.onDataChange('sbpLowerThanNormal', value1.sbpLowerThanNormal)
                            await this.props.onDataChange('abnormalGlucose', value1.abnormalGlucose)
                            await this.props.onDataChange('weakMuscle', value1.weakMuscle)

                            await this.props.onDataChange('st', value2.st)
                            await this.props.onDataChange('pvc', value2.pvc)
                            await this.props.onDataChange('af', value2.af)
                            await this.props.onDataChange('svt', value2.svt)
                            await this.props.onDataChange('bradycardia', value2.bradycardia)
                            await this.props.onDataChange('stSegment', value2.stSegment)

                            await this.props.onDataChange('agitation', value3.agitation)
                            await this.props.onDataChange('dyspnea', value3.dyspnea)
                            await this.props.onDataChange('rr', value3.rr)
                            await this.props.onDataChange('spO2', value3.spO2)
                            await this.props.onDataChange('paO2', value3.paO2)

                            await this.props.onDataChange('anemia', value4.anemia)
                            await this.props.onDataChange('fatigue', value4.fatigue)
                            await this.props.onDataChange('nausea', value4.nausea)
                            await this.props.onDataChange('chestPain', value4.chestPain)
                            await this.props.onDataChange('dizziness', value4.dizziness)
                            await this.props.onDataChange('pain', value4.pain)

                        }
                    },
                    { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                ]
            )
        }
        else {

        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    render() {
        let defaultValue = {}
        if (this.props.sbpLowerThanNormal || this.props.abnormalGlucose || this.props.weakMuscle
            || this.props.st || this.props.pvc || this.props.af || this.props.svt || this.props.bradycardia || this.props.stSegment
            || this.props.agitation || this.props.dyspnea || this.props.rr || this.props.spO2 || this.props.paO2
            || this.props.anemia || this.props.fatigue || this.props.nausea || this.props.chestPain || this.props.dizziness || this.props.pain) {

            let { sbpLowerThanNormal: sbpLowerThanNormal, abnormalGlucose: abnormalGlucose, weakMuscle: weakMuscle,
                st: st, pvc: pvc, af: af, svt: svt, bradycardia: bradycardia, stSegment: stSegment,
                agitation: agitation, dyspnea: dyspnea, rr: rr, spO2: spO2, paO2: paO2,
                anemia: anemia, fatigue: fatigue, nausea: nausea, chestPain: chestPain, dizziness: dizziness, pain: pain
                 } = this.props
            defaultValue = {
                sbpLowerThanNormal, abnormalGlucose, weakMuscle,
                st, pvc, af, svt, bradycardia, stSegment,
                agitation, dyspnea, rr, spO2, paO2,
                anemia, fatigue, nausea, chestPain, dizziness, pain
            }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <View style={_styles.formContainer}>
                        {defaultValue ? <Form ref='form1' type={input1} options={options} value={defaultValue} /> : <Form ref='form1' type={input1} options={options} />}
                        <Text style={_styles.text}>เกิดภาวะหัวใจเต้นผิดจังหวะ (กรณีมีมอนิเตอร์)</Text>
                        {defaultValue ? <Form ref='form2' type={input2} options={options} value={defaultValue} /> : <Form ref='form2' type={input2} options={options} />}
                        <Text style={_styles.text}>เกิดภาวะผิดปกติของการหายใจ</Text>
                        {defaultValue ? <Form ref='form3' type={input3} options={options} value={defaultValue} /> : <Form ref='form3' type={input3} options={options} />}
                        <Text style={_styles.text}>อาการผิดปกติอื่นๆ</Text>
                        {defaultValue ? <Form ref='form4' type={input4} options={options} value={defaultValue} /> : <Form ref='form4' type={input4} options={options} />}
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
        marginTop: 40,
    },
    formContainer: {
        marginLeft: 60,
        marginRight: 300
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
