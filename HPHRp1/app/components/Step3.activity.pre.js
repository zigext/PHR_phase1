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
// t.form.Form.templates = templates;
// t.form.Form.i18n = i18n
const myCustomStylesheet = cloneDeep(t.form.Form.stylesheet)
// overriding the text color
myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'

let options = {
    fields: {
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
        }
    },
    stylesheet: myCustomStylesheet
}

let input = t.struct({
    st: t.Boolean,
    pvc: t.Boolean,
    af: t.Boolean,
    svt: t.Boolean,
    bradycardia: t.Boolean,
    stSegment: t.Boolean
})

export default class Step3Pre extends React.Component {
    constructor(props) {
        super(props)

    }

    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            this.props.onStepChange(this.props.step + 1)
            this.props.onDataChange('st', value.st)
            this.props.onDataChange('pvc', value.pvc)
            this.props.onDataChange('af', value.af)
            this.props.onDataChange('svt', value.svt)
            this.props.onDataChange('bradycardia', value.bradycardia)
            this.props.onDataChange('stSegment', value.stSegment)
        }
        else {

        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    render() {
        let defaultValue = {}
        if (this.props.st || this.props.pvc || this.props.af || this.props.svt || this.props.bradycardia || this.props.stSegment) {
            let { st: st, pvc: pvc, af: af, svt: svt, bradycardia: bradycardia, stSegment: stSegment } = this.props
            defaultValue = { st, pvc, af, svt, bradycardia, stSegment }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={_styles.text}>เกิดภาวะหัวใจเต้นผิดจังหวะ (กรณีมีมอนิเตอร์)</Text>
                    <View style={_styles.formContainer}>
                        {defaultValue ? <Form ref='form' type={input} options={options} value={defaultValue} /> : <Form ref='form' type={input} options={options} />}
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