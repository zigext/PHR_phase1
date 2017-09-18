import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from '../config/Firebase'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import { getProfile } from '../actions/userAction'
import ProfileContent from '../components/Profile'


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.ref = null
        this.profile = {}
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        this.ref = firebase.database().ref(`profile/${this.props.default.user.uid}_${this.props.default.appId}`)
        this.ref.on('value', this.handleProfileUpdate)
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleProfileUpdate)
        }
    }

    // Bind the method only once to keep the same reference
    handleProfileUpdate = (snapshot) => {
        this.profile = snapshot.val()
        console.log('Post Content', this.profile)
        this.props.dispatchProfile(this.profile)
    }


    render() {
        return (
            <View style={styles.container}>
                <ProfileContent profile={this.profile}></ProfileContent>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps in profile ", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchProfile: (profile) => dispatch(getProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})