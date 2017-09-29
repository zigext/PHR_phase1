import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet } from 'react-native'
import firebase from '../config/Firebase'
import EditProfileForm from '../components/EditProfileForm'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { editProfile } from '../actions/userAction'

class EditProfile extends React.Component {

    onEditProfilePress = (newProfile, callback) => {
        firebase.database().ref(`profile/${this.props.default.user.uid}_${this.props.default.appId}`).update(newProfile).
            then((data) => {
                console.log("edit profile in database success")
                callback(null)
                this.props.dispatchEditProfile()
                Actions.profile()
            }).
            catch((err) => {
                console.log("edit profile in database failed")
                callback(err)
            })
    }

    render() {
        return (
            <EditProfileForm onEditProfilePress={this.onEditProfilePress} />
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchEditProfile: () => dispatch(editProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

