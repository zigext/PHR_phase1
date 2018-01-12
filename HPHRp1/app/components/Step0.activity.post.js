import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, ScrollView, TouchableHighlight } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { split } from 'lodash'


let Form = t.form.Form
let options = {
    fields: {
        recorder: {
            label: 'รหัสประจำตัวพยาบาล (PIN)',
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: true,
            password: true,
            recorder: null,
        },
    }
}

let input = t.struct({
    recorder: t.Number,
})

export default class Step1Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorized: false,
            loading: false,
        }
    }

    onForward = async () => {
        // await this.checkNursePin()
        // if (this.state.authorized === true) {
        //     this.props.onDataChange('recorder', this.state.recorder)
        //         this.props.onStepChange(this.props.step + 1)
        //     // if (this.state.authorized === true) {
        //     //     this.props.onDataChange('recorder', this.state.recorder)
        //     //     this.props.onStepChange(this.props.step + 1)
        //     // }
        //     // let value = this.refs.form.getValue()
        //     // if (value) {
        //     //     if (this.state.authorized === true) {
        //     //         this.props.onDataChange('recorder', value)
        //     //         this.props.onStepChange(this.props.step + 1)
        //     //     }
        //     // }
        // }
        // else {
        //     ToastAndroid.showWithGravity('กรุณาตรวจสอบรหัสประจำตัว', ToastAndroid.SHORT, ToastAndroid.CENTER)
        // }
        this.checkNursePin()
    }

    checkNursePin = () => {
        this.setState({ loading: true })
        var { recorder } = this.refs.form.getValue()
        //User doesn't input pin
        if (!recorder) {
            this.setState({ loading: false })
            ToastAndroid.showWithGravity('กรุณากรอกข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } 
        //User input pin
        else {
            this.props.checkNursePin(recorder, async (result, error) => {
                this.setState({ loading: false })
                if (error !== null) {
                    ToastAndroid.showWithGravity('ไม่สามารถติดต่อเซิร์ฟเวอร์', ToastAndroid.SHORT, ToastAndroid.CENTER)
                }
                else {
                    if (result === true) {
                        ToastAndroid.showWithGravity('รหัสประจำตัวถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
                        await this.setState({ authorized: true, recorder })
                        console.log("state = ", this.state)
                         this.props.onDataChange('recorder', this.state.recorder)
                         this.props.onStepChange(this.props.step + 1)
                    }
                    else {
                        ToastAndroid.showWithGravity('รหัสประจำตัวไม่ถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
                        await this.setState({ authorized: false, recorder: null})
                        
                    }
                }
            })
        }
    }

    onChange(recorder) {
        this.setState({ recorder })
  }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={_styles.text}>กรุณากรอกรหัสประจำตัวพยาบาลผู้บันทึกข้อมูล</Text>
                        {/*{this.state.recorder ? <Form ref='form' type={input} options={options} value={this.state.recorder} onChange={this.onChange.bind(this)} /> : <Form ref='form' type={input} options={options} onChange={this.onChange.bind(this)} value={this.state.recorder} />}*/}
                        <Form ref='form' type={input} options={options} value={this.state.recorder}/>
                    <Icon
                        raised
                        reverse
                        name='ios-arrow-forward'
                        type='ionicon'
                        color={common.accentColor}
                        size={35}
                        onPress={this.onForward}
                        containerStyle={{ alignSelf: 'flex-end' }}
                    />
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
        paddingHorizontal: 50,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: common.grey,
        marginBottom: 30,
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    disabledButton: {
        height: 36,
        backgroundColor: '#bdc3c7',
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    }
})