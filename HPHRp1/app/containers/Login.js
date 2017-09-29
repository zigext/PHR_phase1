import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet } from 'react-native'
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

    componentWillMount = async () => {
        const currentUser = firebase.auth().currentUser
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
                callback(null, user)
                console.log('User successfully logged in', user)
                this.props.dispatchLogIn(email, uid)

                this.saveUserToFirebase(uid, email)
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
                dispatch({ type: "FULFILLED" })
            }).
            catch((err) => {
                console.log("add user to Firebase failed")
                dispatch({ type: "REJECTED" })
            });
    }

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
        return (
            <View>
                <LogInForm onLoginPress={this.onLoginPress} onForgotPasswordPress={this.onForgotPasswordPress} />
                 {/*<ActionButton buttonColor="rgba(231,76,60,1)" onPress={() =>  Actions.addSurgery()}>
                  
                </ActionButton>*/}
                {/*<Icon name='home' type='font-awesome' />
                <Icon name='bar-graph' type='entypo' />
                <Icon name='file-document-box' type='material-community' />
                <Icon name='heartbeat' type='font-awesome' />*/}
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