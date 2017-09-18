import React from 'react'
import { Text, View, Button, TextInput, ToastAndroid } from 'react-native'
import firebase from '../config/Firebase'
import ForgotPasswordForm from '../components/ForgotPassword'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'


class ForgotPassword extends React.Component {
    constructor() {
        super()

    }

    onForgotPasswordPress = (email, callback) => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                console.log('Password reset email sent')
                callback(null)
                 Actions.launch()
            })
            .catch((error) => {
                callback(error)
                console.error('Unable to send password reset email', error);
            })
    }


    render() {
        console.log("navigation ", this.props.navigation)
        console.log("goBack ", this.props.navigation.goBack)
        return (
            <View>
                <ForgotPasswordForm onForgotPasswordPress={this.onForgotPasswordPress} />
               
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchLogIn: (email, uid) => dispatch(logIn(email, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)