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
    },
    stylesheet: myCustomStylesheet
}

let input = t.struct({
    agitation: t.Boolean,
    dyspnea: t.Boolean,
    rr: t.Boolean,
    spO2: t.Boolean,
    paO2: t.Boolean,
})

export default class Step4Pre extends React.Component {
    constructor(props) {
        super(props)

    }

    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            this.props.onStepChange(this.props.step + 1)
            this.props.onDataChange('agitation', value.agitation)
            this.props.onDataChange('dyspnea', value.dyspnea)
            this.props.onDataChange('rr', value.rr)
            this.props.onDataChange('spO2', value.spO2)
            this.props.onDataChange('paO2', value.paO2)
        }
        else {

        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    render() {
        let defaultValue = {}
        if (this.props.agitation || this.props.dyspnea || this.props.rr || this.props.spO2 || this.props.paO2) {
            let { agitation: agitation, dyspnea: dyspnea, rr: rr, spO2: spO2, paO2: paO2 } = this.props
            defaultValue = { agitation, dyspnea, rr, spO2, paO2 }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={_styles.text}>เกิดภาวะผิดปกติของการหายใจ</Text>
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