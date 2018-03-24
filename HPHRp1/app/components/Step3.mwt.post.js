import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
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
        distance: {
            label: 'ระยะทางที่เดินได้ (เมตร)',
        },
        dyspnea: {
            label: 'หายใจลำบาก/หอบ',
        },
        anemia: {
            label: 'ริมฝีปากหรือใบหน้าซีด',
        },
        fatigue: {
            label: 'อ่อนเพลีย',
        },
        nausea: {
            label: 'คลื่นไส้',
        },
        vomitting: {
            label: 'อาเจียน',
        },
        perspiration: {
            label: 'เหงื่อออก ตัวเย็น',
        },
        chestPain: {
            label: 'เจ็บแน่นหน้าอก',
        },
        dizziness: {
            label: 'หน้ามืด มึนงง',
        },
        palpitation: {
            label: 'ใจสั่น',
        },
        note: {
            label: 'อาการอื่นๆ (ถ้ามี)',
        },
    },
    stylesheet: myCustomStylesheet
}

let input = t.struct({
    distance: t.Number,
    dizziness: t.Boolean,
    anemia: t.Boolean,
    dyspnea: t.Boolean,
    vomitting: t.Boolean,
    perspiration: t.Boolean,
    chestPain: t.Boolean,
    nausea: t.Boolean,
    palpitation: t.Boolean,
    fatigue: t.Boolean,
    note: t.maybe(t.String)
})

export default class Step3PostMwt extends React.Component {
    constructor(props) {
        super(props)
    }

    onForward = () => {
        let value = this.refs.form.getValue()

        if (value) {
            Alert.alert(
                'ทดสอบเดินบนพื้นราบ 6 นาที',
                'ต้องการสิ้นสุดการทำแบบทดสอบหรือไม่? กรุณาตรวจสอบความถูกต้องของข้อมูล',
                [
                    {
                        text: 'ใช่', onPress: async () => {
                            this.props.onStepChange(this.props.step + 1)
                            await this.props.onDataChange('distance', value.distance)
                            await this.props.onDataChangeTmp('distance', value.distance)
                            await this.props.onDataChangeTmp('dyspnea', value.dyspnea)
                            await this.props.onDataChangeTmp('anemia', value.anemia)
                            await this.props.onDataChangeTmp('fatigue', value.fatigue)
                            await this.props.onDataChangeTmp('vomitting', value.vomitting)
                            await this.props.onDataChangeTmp('perspiration', value.perspiration)
                            await this.props.onDataChangeTmp('palpitation', value.palpitation)
                            await this.props.onDataChangeTmp('nausea', value.nausea)
                            await this.props.onDataChangeTmp('chestPain', value.chestPain)
                            await this.props.onDataChangeTmp('dizziness', value.dizziness)
                            await this.props.onDataChangeTmp('note', value.note)

                            await this.props.onPostQuestionsDone()
                            await this.props.resetState() //reset tmp states
                            this.props.onStatusChange('post5mins')
                        }
                    },
                    { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                ]
            )
        }
        else {

        }
    }

    onBackward = async () => {
        this.props.onStepChange(this.props.step - 1)
        await this.props.onDataChange('distance', value.distance)
        await this.props.onDataChangeTmp('distance', value.distance)
        await this.props.onDataChangeTmp('dyspnea', value.dyspnea)
        await this.props.onDataChangeTmp('anemia', value.anemia)
        await this.props.onDataChangeTmp('fatigue', value.fatigue)
        await this.props.onDataChangeTmp('vomitting', value.vomitting)
        await this.props.onDataChangeTmp('perspiration', value.perspiration)
        await this.props.onDataChangeTmp('palpitation', value.palpitation)
        await this.props.onDataChangeTmp('nausea', value.nausea)
        await this.props.onDataChangeTmp('chestPain', value.chestPain)
        await this.props.onDataChangeTmp('dizziness', value.dizziness)
        await this.props.onDataChangeTmp('note', value.note)
    }

    render() {
        let defaultValue = {}
        if (this.props.distance || this.props.dizziness || this.props.anemia || this.props.dyspnea || this.props.vomitting ||
            this.props.perspiration || this.props.chestPain || this.props.fatigue || this.props.nausea || this.props.palpitation || this.props.note) {

            let { distance: distance, dizziness: dizziness, anemia: anemia, dyspnea: dyspnea, vomitting: vomitting,
                perspiration: perspiration, chestPain: chestPain, fatigue: fatigue, nausea: nausea, palpitation: palpitation } = this.props
            defaultValue = {
                distance, dizziness, anemia, dyspnea, vomitting, perspiration, chestPain, fatigue, nausea, palpitation
            }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <View style={_styles.formContainer}>
                        {defaultValue ? <Form ref='form' type={input} options={options} value={defaultValue} /> : <Form ref='form1' type={input1} options={options} />}
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
