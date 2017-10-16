import React from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import _ from 'lodash'

let Form = t.form.Form
let options = {
    fields: {
        hr: {
            label: 'อัตราการเต้นหัวใจ'
        },
        bp: {
            label: 'ความดันเลือด',
            help: 'Systolic/Diastolic'
        },
    }
}
//heart rate > 0 && < 200
let hr = t.refinement(t.Number, function (n) { return n > 0 && n < 200 })
// if you define a getValidationErrorMessage function, it will be called on validation errors
hr.getValidationErrorMessage = function (value, path, context) {
    return 'อัตราการเต้นหัวใจไม่ถูกต้อง'
}

//bp will come in systolic/diastolic format as string
//split[0] = systolic, split[1] = diastolic
let bp = t.refinement(t.String, function (n) {
    let split = _.split(n, '/')
    console.log("s ", split)
    if(split[0] > 0 && split[0] < 200 && split[1] > 0 && split[1] < 200){
        return n!== null
    }
    
})
bp.getValidationErrorMessage = function (value, path, context) {
    return 'ความดันเลือดไม่ถูกต้อง'
}

let pre = t.struct({
    hr: hr,
    bp: bp
})

export default class PreActivityForm extends React.Component {
  constructor(props){
      super(props)
  }
    onPress = () => {
        let value = this.refs.form.getValue()
        console.log(value)
        if(value){
            this.props.onSubmitPreActivity(value)
        }
        
        // var { email, password } = this.refs.form.getValue() || {}
        // if (!email || !password) {
        //     this.setState({ loading: false })
        //     ToastAndroid.showWithGravity('อีเมลหรือรหัสผ่านไม่ถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
        // } else {
        //     this.props.onLoginPress(email, password, (err, user) => {
        //         this.setState({ loading: false })

        //         if (err !== null) {
        //             ToastAndroid.showWithGravity('อีเมลหรือรหัสผ่านไม่ถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
        //         }
        //         ToastAndroid.showWithGravity('เข้าสู่ระบบสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)
        //         Keyboard.dismiss()
        //     })
        // }
    }

    render() {
        return (
            <View style={_styles.container}>
                <Form ref='form' type={pre} options={options} />
                <Icon raised reverse name='ios-arrow-forward' type='ionicon' color={common.accentColor} onPress={this.onPress}
                />

            </View>
        )
    }
}


var _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 20,
        paddingHorizontal: 50,
    }

})