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
myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'

let options = {
    fields: {
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

let input = t.struct({
    anemia: t.Boolean,
    fatigue: t.Boolean,
    nausea: t.Boolean,
    chestPain: t.Boolean,
    dizziness: t.Boolean,
    pain: t.Boolean,
})

export default class Step5Pre extends React.Component {
    constructor(props) {
        super(props)

    }

    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            Alert.alert(
                'แบบทดสอบก่อนทำกิจกรรม',
                'ต้องการสิ้นสุดการทำแบบทดสอบหรือไม่? กรุณาตรวจสอบความถูกต้องของข้อมูล',
                [
                    {
                        text: 'ใช่', onPress: () => {
                            this.props.onStepChange(this.props.step + 1)
                            this.props.onDataChange('anemia', value.anemia)
                            this.props.onDataChange('fatigue', value.fatigue)
                            this.props.onDataChange('nausea', value.nausea)
                            this.props.onDataChange('chestPain', value.chestPain)
                            this.props.onDataChange('dizziness', value.dizziness)
                            this.props.onDataChange('pain', value.pain)
                            
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
        if (this.props.anemia || this.props.fatigue || this.props.nausea || this.props.chestPain || this.props.dizziness || this.props.pain) {
            let { anemia: anemia, fatigue: fatigue, nausea: nausea, chestPain: chestPain, dizziness: dizziness, pain: pain } = this.props
            defaultValue = { anemia, fatigue, nausea, chestPain, dizziness, pain }
        }
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={_styles.text}>อาการผิดปกติอื่นๆ</Text>
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
        alignItems: 'stretch',
        margin: 20,
        marginHorizontal: 50,
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