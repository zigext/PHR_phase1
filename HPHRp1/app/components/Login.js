import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Button } from 'react-native'
import t from 'tcomb-form-native'
import styles from '../styles/index'


let Form = t.form.Form
let options = {
    // auto: 'placeholders',
    fields: {
        password: {
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: true,
            password: true
        }
    }
}
let value = {
    email: 'abc@gmail.com',
    password: '123456'
}

// here we are: define your domain model
let Person = t.struct({
    email: t.String, // a required string
    password: t.String // an optional string
})

export default class Login extends React.Component {
    state = {
        loading: false
    }
    onPress = () => {
        this.setState({ loading: true })
        var { email, password } = this.refs.form.getValue() || {}
        if (!email || !password) {
            this.setState({ loading: false })
            ToastAndroid.showWithGravity('อีเมลหรือรหัสผ่านไม่ถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            this.props.onLoginPress(email, password, (err, user) => {
                this.setState({ loading: false })
                
                if (err !== null) {
                    ToastAndroid.showWithGravity('อีเมลหรือรหัสผ่านไม่ถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
                    console.log("error = ", err)
                }
                ToastAndroid.showWithGravity('เข้าสู่ระบบสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)
                Keyboard.dismiss()
            })
        }
    }

    //   toastWrongPassword = (err) => {
    //     console.log(err)
    //     ToastAndroid.showWithGravity('Email or password is incorrect', ToastAndroid.SHORT, ToastAndroid.CENTER)
    // }

    onForgotPasswordPress = () => {
        this.props.onForgotPasswordPress()
    }

    render() {
        // const { inputStyle, labelStyle, containerStyle } = styles
        return (
            <View style={_styles.container}>

                <Form ref='form' type={Person} options={options} />
                <TouchableHighlight
                    style={this.state.loading ? _styles.disabledButton : _styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                    disabled={this.state.loading}
                >
                    <Text style={_styles.buttonText}>เข้าสู่ระบบ</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={_styles.forgotPasswordButton}
                    onPress={this.onForgotPasswordPress}
                    underlayColor='#99d9f4'
                >
                    <Text style={_styles.forgotPasswordText}>ลืมรหัสผ่าน</Text>
                </TouchableHighlight>

            </View>
        )
    }
}


var _styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 20,
        paddingHorizontal: 50,
        backgroundColor: '#FFFDF9'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    forgotPasswordText: {
        fontSize: 18,
        color: '#48BBEC',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    disabledButton: {
        height: 36,
        backgroundColor: '#bdc3c7',
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    forgotPasswordButton: {
        height: 36,
        backgroundColor: 'transparent',
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
})