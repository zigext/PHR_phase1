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
        hrmax: {
            label: 'อัตราการเต้นหัวใจสูงสุด (หน่วย bpm)'
        },
        bp: {
            label: 'ความดันเลือด (Systolic/Diastolic)'
        },
        o2sat: {
            label: 'ความอิ่มตัวของออกซิเจนในเลือด (%)'
        },
        ekg: {
            label: 'ลักษณะของคลื่นไฟฟ้าหัวใจ (จังหวะ อัตรา และชนิด จาก EKG Monitor)'
        },
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
    hrmax: hrmax,
    bp: bp,
    o2sat: o2sat,
    ekg: t.maybe(t.String)
})

export default class Step2PostMwt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hr: '',
            hrmax: ''
        }
    }

    componentDidMount = () => {
        this.findMaxHeartrate()
    }

    onForward = () => {
        let value = this.refs.form.getValue()
        if (value) {
            let bp = split(value.postBp, '/')
            this.props.onStepChange(this.props.step + 1)
            this.props.onDataChangeTmp('hr', value.hr)
            this.props.onDataChangeTmp('hrmax', value.hrmax)
            this.props.onDataChange('hrmax', value.hrmax)
            this.props.onDataChangeTmp('bp', value.bp)
            this.props.onDataChangeTmp('o2sat', value.o2sat)
            this.props.onDataChangeTmp('ekg', value.ekg)
        }
        else {
            ToastAndroid.showWithGravity('กรุณากรอกข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    getHeartrate = async (name, value) => {
        await this.setState({ [name]: value })
    }

    findMaxHeartrate = async () => {
        let hrmax = Math.max(...this.props.hrArray)
        await this.setState({
            hrmax
        })
        console.log("hrmax = ", hrmax)
    }

    render() {
        let defaultValue = {}
        if (this.props.hr && this.props.hrmax && this.props.bp && this.props.o2sat && this.props.ekg) {
            let { hr: hr, hrmax: hrmax, bp: bp, o2sat: o2sat, ekg: ekg } = this.props
            defaultValue = { hr, hrmax, bp, o2sat, ekg }
        }
        let dataFromBLE = {}
        if (this.state.hr) {
            let { hr: hr, hrmax: hrmax } = this.state
            dataFromBLE = { hr, hrmax }
            //Every input value is required, except ekg
            if (this.props.ekg) {
                let { bp: bp, o2sat: o2sat, ekg: ekg } = this.props
                dataFromBLE = { hr, hrmax, bp, o2sat, ekg }
            }
            else {
                let { bp: bp, o2sat: o2sat } = this.props
                dataFromBLE = { hr, hrmax, bp, o2sat }
            }
        }

        return (
            <View style={_styles.container}>
                {this.props.useBLE ? <Heartrate state="postMwt" getHeartrate={this.getHeartrate} peripheral={this.props.peripheral} /> : null}
                <ScrollView>
                    <Text style={_styles.text}>บันทึกผลการทดสอบ</Text>
                    {dataFromBLE ? <Form ref='form' type={input} options={options} value={dataFromBLE} /> : <Form ref='form' type={input} options={options} />}
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