import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Button } from 'react-native'
import t from 'tcomb-form-native'


var Form = t.form.Form
var options = {}

// here we are: define your domain model
var Person = t.struct({
    email: t.String, // a required string
})

export default class ForgotPassword extends React.Component {
    state = {
        loading: false
    }
    onPress = () => {
        this.setState({ loading: true })
        var { email } = this.refs.form.getValue() || {}
        if (!email) {
            this.setState({ loading: false })
            ToastAndroid.showWithGravity('Email is invalid', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            this.props.onForgotPasswordPress(email, (err) => {
                this.setState({ loading: false })
                
                if (err !== null) {
                    ToastAndroid.showWithGravity('Email is incorrect', ToastAndroid.SHORT, ToastAndroid.CENTER)
                }
                ToastAndroid.showWithGravity('Check your email to reset password', ToastAndroid.SHORT, ToastAndroid.CENTER)
                Keyboard.dismiss()
            })
        }
    }

    render() {
        const { inputStyle, labelStyle, containerStyle } = styles
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 18, alignSelf:'center'}}>กรุณากรอกอีเมล</Text>
                <Form ref='form' type={Person} options={options} />
                <TouchableHighlight
                    style={this.state.loading ? styles.disabledButton : styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                    disabled={this.state.loading}
                >
                    <Text style={styles.buttonText}>ส่ง</Text>
                </TouchableHighlight>

            </View>
        )
    }
}


var styles = StyleSheet.create({
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
    }
})