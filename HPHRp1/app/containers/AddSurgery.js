import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet } from 'react-native'
import firebase from '../config/Firebase'
import AddSurgeryForm from '../components/AddSurgeryForm'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { addNewSurgery } from '../actions/userAction'
import ApiUtils from '../components/ApiUtils'
import { SERVER_IP, SURGERY } from '../config/Const'

// *******ERROR*******
// child keys in firebase have correct time and date
// but when show in list time and date is not formatted

class AddSurgery extends React.Component {

    onAddSurgeryPress = (newSurgery, date, time, doctor, hospital, type, note, callback) => {
        this.addSurgery(newSurgery, hospital, date, time, callback)
    }

    addSurgery = async (newSurgery, hospital, date, time, callback) => {
        const path = `${SERVER_IP}${SURGERY}`
        await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // userid: '1416382941765846', //this.props.UserReducer.user.uid
                userid: this.props.userReducer.user.uid,
                hospitalid: hospital, 
                date: date,
                time: time,
                information: newSurgery
            })
        })
            .then(ApiUtils.checkStatus)
            .then(responseData => {
                console.log("Add surgery success")
                console.log("response ", responseData)
                this.props.dispatchAddNewSurgery()
                callback(null)
                Actions.surgery()

            })
            .catch(error => {
                console.log("Add surgery failed = ", error)
                callback(error)
            })
    }

    render() {
        return (
            <AddSurgeryForm onAddSurgeryPress={this.onAddSurgeryPress} />
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddNewSurgery: () => dispatch(addNewSurgery())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSurgery)

