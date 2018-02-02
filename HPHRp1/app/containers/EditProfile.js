import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet } from 'react-native'
import firebase from '../config/Firebase'
import { SERVER_IP, PROFILE } from '../config/Const'
import EditProfileForm from '../components/EditProfileForm'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { editProfile } from '../actions/userAction'
import ApiUtils from '../components/ApiUtils'

class EditProfile extends React.Component {

    onEditProfilePress = (newProfile, pathStorage, filename, timestamp, callback) => {
        if(filename) {
        firebase
            .storage()
            .ref(`/images/${filename}+${timestamp}`)
            .putFile(pathStorage)
            .then(uploadedFile => {
                console.log('Upload complete: ', uploadedFile)
                let downloadUrl = uploadedFile.downloadUrl
                newProfile.picture_uri = downloadUrl 
                this.editProfile(newProfile, callback)
            })
            .catch(err => {
                console.log('Error in upload picture: ', err)
                callback(err)
            })
        }
        else {
            this.editProfile(newProfile, callback)
        }
        // this.editProfile(newProfile, callback)

        // console.log('Upload complete: ', uploadedFile)
        // firebase.database().ref(`profile/${this.props.userReducer.user.uid}_${this.props.userReducer.appId}`).update(newProfile).
        //     then((data) => {
        //         console.log("edit profile in database success")
        //         callback(null)
        //         this.props.dispatchEditProfile()
        //         Actions.profile()
        //     }).
        //     catch((err) => {
        //         console.log("edit profile in database failed")
        //         callback(err)
        //     })
    }
    //edit in server
    editProfile = async (newProfile, callback) => {
        const path = `${SERVER_IP}${PROFILE}`
        await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: '1416382941765846', //this.props.userReducer.user.uid
                appid: 'PHRapp', //this.props.userReducer.appId
                profile: newProfile
            })
        })
            .then(ApiUtils.checkStatus)
            .then(responseData => {
                console.log("Edit profile success ", newProfile)
                callback(null)
                this.props.dispatchEditProfile()
                Actions.profile()

            })
            .catch(error => {
                console.log("Error in editProfile = ", error)
                callback(error)
            })
    }

    render() {

        return (
            <EditProfileForm onEditProfilePress={this.onEditProfilePress} prevProfile={this.props.prevProfile} />
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

