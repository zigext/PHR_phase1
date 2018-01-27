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
        preHr: {
            label: 'อัตราการเต้นหัวใจ (หน่วย bpm)'
        },
        preBp: {
            label: 'ความดันเลือด (Systolic/Diastolic)'
        },
    }
}
// let defaultValue = {
//     hr: this.props.hr,
//     bp: this.props.bp
// }

//Heart rate condition
//heart rate > 0 && < 200
let preHr = t.refinement(t.Number, function (n) { return n > 0 && n < 250 })
// if you define a getValidationErrorMessage function, it will be called on validation errors
preHr.getValidationErrorMessage = function (value, path, context) {
    return 'อัตราการเต้นหัวใจไม่ถูกต้อง'
}

//Blood pressure condition
//bp will come in systolic/diastolic format as string
//bpArray[0] = systolic, bpArray[1] = diastolic
let preBp = t.refinement(t.String, function (n) {
    let bpArray = split(n, '/')
    if (bpArray[0] > 0 && bpArray[0] < 300 && bpArray[1] > 0 && bpArray[1] < 300) {
        return n !== null
    }

})
preBp.getValidationErrorMessage = function (value, path, context) {
    return 'ความดันเลือดไม่ถูกต้อง ex. 80/120'
}

let input = t.struct({
    preHr: preHr,
    preBp: preBp
})

export default class Step1Pre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onPress = () => {
        let value = this.refs.form.getValue()
        if (value) {
            let bp = split(value.bp, '/')
            // if (value.hr < 60 || value.hr > 100 || bp[0] > 180 || bp[1] > 110) {
            //     if (value.hr < 60 || value.hr > 100) {
            //         Alert.alert(
            //             'คำเตือน',
            //             'ไม่ควรทำกิจกรรมเนื่องจากมีอัตราการเต้นหัวใจที่ผิดปกติ',
            //             [{ text: 'ตกลง', style: 'cancel' }]
            //         )
            //     }
            //     if (bp[0] > 180 || bp[1] > 110) {
            //         Alert.alert(
            //             'คำเตือน',
            //             'ไม่ควรทำกิจกรรมเนื่องจากมีความดันเลือดที่ผิดปกติ',
            //             [{ text: 'ตกลง', style: 'cancel' }]
            //         )
            //     }
            // }
            // else {
            //     this.props.onSubmitPreActivity(value)
            // }
            console.log("VALUE = ", value, bp)
        }
    }

    onStepChange = () => {
        let value = this.refs.form.getValue()
        if (value) {
            let bp = split(value.bp, '/')
            this.props.onStepChange(this.props.step + 1)
            this.props.onDataChange('preHr', value.preHr)
            this.props.onDataChange('preBp', value.preBp)
            this.props.setTimeStart()
        }
        else {
            ToastAndroid.showWithGravity('กรุณากรอกข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    getHeartrate = async (name, value) => {
        await this.setState({ [name]: value })
    }

    render() {
         ToastAndroid.showWithGravity('กรุณารออัตราการเต้นหัวใจจากอุปกรณ์ Bluetooth สักครู่', ToastAndroid.SHORT, ToastAndroid.CENTER)
        let defaultValue = {}
        if (this.props.preHr && this.props.preBp) {
            let { preHr: preHr, preBp: preBp } = this.props
            defaultValue = { preHr, preBp }
        }
        let dataFromBLE = {}
        if (this.state.preHr) {
            let { preHr: preHr } = this.state
            dataFromBLE = { preHr }
            if (this.props.preBp) {
                let { preBp: preBp } = this.props
                dataFromBLE = { preHr, preBp }
            }
        }
        return (
            <View style={_styles.container}>
                <Heartrate state="preActivity" getHeartrate={this.getHeartrate} />
                <Text style={_styles.text}>ทดสอบก่อนทำกิจกรรม</Text>
                {dataFromBLE ? <Form ref='form' type={input} options={options} value={dataFromBLE} /> : <Form ref='form' type={input} options={options} />}
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