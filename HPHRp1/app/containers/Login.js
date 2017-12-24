import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet, AsyncStorage } from 'react-native'
import firebase from '../config/Firebase'
import LogInForm from '../components/Login'
import { Icon } from 'react-native-elements'
import ActionButton from 'react-native-action-button'
// import Icon from 'react-native-vector-icons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { logIn } from '../actions/userAction'
import Timer from '../components/Timer'
import Stepper from '../components/Stepper'

class LogIn extends React.Component {
    constructor() {
        super()

    }

    componentDidMount = async () => {
        console.log("XXXXXXXXXXX")
        const currentUser = firebase.auth().currentUser

        // let auth = await this.getAuthenticationFromAsyncStorage()
        // console.log("auth in login = ", auth)
        // if (auth) {
        //     Actions.drawer()
        // }
        // if (currentUser) {
        //     Actions.homePage()
        // }
        let auth = this.props.default.isLoggedIn
        if (auth) {
            Actions.drawer()
        }
        // if (currentUser) {
        //     Actions.homePage()
        // }
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
                // this.setUserToAsyncStorage(userTmp)
                // this.props.dispatchLogIn({
                //     user
                // })
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
                // dispatch({ type: "FULFILLED" })
            }).
            catch((err) => {
                console.log("add user to Firebase failed")
                // dispatch({ type: "REJECTED" })
            });
    }

    // setUserToAsyncStorage = async (userTmp) => {
    //     await AsyncStorage.setItem('user', JSON.stringify({ ...userTmp }))
    //     await AsyncStorage.setItem('authentication', JSON.stringify({ isLoggedIn: true }))
    // }

    // getAuthenticationFromAsyncStorage = async () => {
    //     const value = await AsyncStorage.getItem('authentication')
    //     if (value !== null) {
    //         if (value === 'null') {
    //             console.log("return null")
    //             return null
    //         }
    //         else {
    //             const auth = JSON.parse(value)
    //             console.log("Auth");
    //             console.log(auth)
    //             return auth
    //         }
    //     }
    //     return
    // }

    onForgotPasswordPress = () => {
        Actions.forgotPassword()
    }

    onPressActionButton = () => {
        Actions.addSurgery()
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
                {/*<Timer start={Date.now()} />*/}
                {/*<Icon name='home' type='font-awesome' />
                <Icon name='bar-graph' type='entypo' />
                <Icon name='file-document-box' type='material-community' />
                <Icon name='heartbeat' type='font-awesome' />*/}
                <Stepper></Stepper>
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
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        fontWeight: 'bold'
    },
    actionButtonIcon: {


    }
})