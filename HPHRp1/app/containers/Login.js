import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet, NetInfo } from 'react-native'
import firebase from '../config/Firebase'
import LogInForm from '../components/Login'
import { Icon } from 'react-native-elements'
import ActionButton from 'react-native-action-button'
// import Icon from 'react-native-vector-icons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { logIn } from '../actions/userAction'

class LogIn extends React.Component {
    constructor() {
        super()
    }

    componentDidMount = async () => {
         NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({ isConnected })
            if(!isConnected){
                 ToastAndroid.showWithGravity('โปรดเชื่อมต่ออินเตอร์เน็ต', ToastAndroid.LONG, ToastAndroid.CENTER)
            }
        })
        const currentUser = firebase.auth().currentUser
        let auth = this.props.userReducer.isLoggedIn
        if (auth) {
            Actions.drawer()
        }
    }

    onLoginPress = (email, password, callback) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                const currentUser = firebase.auth().currentUser
                const uid = currentUser._user.uid
                let userTmp = {
                    uid,
                    email
                }
                callback(null, user)
                console.log('User successfully logged in', user)
                this.props.dispatchLogIn(email, uid)
                this.saveUserToFirebase(uid, email)
                Actions.drawer()
            })
            .catch(err => {
                callback(err)
            })
    }

    saveUserToFirebase = (uid, email) => {
        firebase.database().ref(`users/${uid}`).set({ email: email }).
            then((data) => {
                console.log("add user to Firebase success")
            }).
            catch((err) => {
                console.log("add user to Firebase failed")
            });
    }

    onForgotPasswordPress = () => {
        Actions.forgotPassword()
    }

    // createUsersDatabase (uid) {
    //   firebase.database().ref(`bookshelfs/${uid}`).set([{ '1455572101': 10 }])
    // }

    // componentWillMount = () => {
    //     firebase.database()
    //         .ref('profile/CCwKI2IuVCOVQY5AjOI9did024e2_HPHRp1')
    //         .on('value', (snapshot) => {
    //             const value = snapshot.val()
    //             let profile = { ...value }
    //             console.log("value ", profile)
    //         })
    // }


    render() {
        console.log("route ", this.props.currentScene)
        return (
            <View>
                <LogInForm onLoginPress={this.onLoginPress} onForgotPasswordPress={this.onForgotPasswordPress} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogIn: (email, uid) => dispatch(logIn(email, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

const styles = StyleSheet.create({
})