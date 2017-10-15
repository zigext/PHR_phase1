import React from 'react'
import { AppRegistry, Text, View, Button, TextInput, ToastAndroid, StyleSheet } from 'react-native'
import firebase from '../config/Firebase'
import AddSurgeryForm from '../components/AddSurgeryForm'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { addNewSurgery } from '../actions/userAction'

// *******ERROR*******
// child keys in firebase have correct time and date
// but when show in list time and date is not formatted

class AddSurgery extends React.Component {

    onAddSurgeryPress = (newSurgery, date, time, doctor, hospital, type, note, callback) => {
       
        firebase.database().ref(`surgery/${this.props.default.user.uid}_${hospital}_${date}_${time}`).set(newSurgery).
            then((data) => {
                console.log("add new surgery to database success")
                this.props.dispatchAddNewSurgery()
                callback(null)
                Actions.surgery()
            }).
            catch((err) => {
                console.log("add new surgery to database failed")
                callback(err)
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

