import React from 'react'
import { StyleSheet, Text, View, Button, AsyncStorage, BackAndroid } from 'react-native'
import firebase from '../config/Firebase'
import { SERVER_IP, PROFILE } from '../config/Const'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ActionButton from 'react-native-action-button'
import { Icon } from 'react-native-elements'
import { getProfile } from '../actions/userAction'
import ProfileContent from '../components/Profile'
import ApiUtils from '../components/ApiUtils'


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.ref = null
        this.profile = {}
        this.state = {
            profile: {}
        }
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        this.fetchProfile()
        // this.ref = firebase.database().ref(`profile/${this.props.default.user.uid}_${this.props.default.appId}`)
        // this.ref.on('value', this.handleProfileUpdate)
    }

    // componentWillUnmount() {
    //     if (this.ref) {
    //         this.ref.off('value', this.handleProfileUpdate)
    //     }
    // }

    // // Bind the method only once to keep the same reference
    // handleProfileUpdate = (snapshot) => {
    //     this.profile = snapshot.val()
    //     this.props.dispatchProfile(this.profile)
    // }

    fetchProfile = async () => {
        const path = `${SERVER_IP}${PROFILE}?userid=1416382941765846&appid=PHRapp` //userid=${this.props.default.user.uid}&appid=${this.props.default.appId}  //userid=${this.props.UserReducer.user.uid}&appid=${this.props.UserReducer.appId}
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                this.profile = responseData.data.profile
                this.setState({ profile: this.profile })
                this.props.dispatchProfile(this.state.profile)
                console.log("Fetch profile success")
            })
            .catch(error => {
                console.log("Error in fetchProfile = ", error)
                console.log(path)
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <ProfileContent profile={this.state.profile}></ProfileContent>

                <ActionButton buttonColor="#f49842" onPress={() => Actions.editProfile({ prevProfile: this.profile })} />
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