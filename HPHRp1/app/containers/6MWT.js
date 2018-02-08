import React from 'react'
import { StyleSheet, Text, View, Button, AsyncStorage, BackAndroid } from 'react-native'
import { SERVER_IP, PROFILE } from '../config/Const'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ActionButton from 'react-native-action-button'
import { Icon } from 'react-native-elements'
import { getProfile } from '../actions/userAction'
import ApiUtils from '../components/ApiUtils'
import ScanBLE from './ScanBLE'


class MWT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'initial'
        }
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    fetchMWTResult = () => {

    }

    saveMWTResult = () => {

    }
    // fetchProfile = async () => {
    //     const path = `${SERVER_IP}${PROFILE}?userid=1416382941765846&appid=PHRapp` //userid=${this.props.userReducer.user.uid}&appid=${this.props.userReducer.appId}  //userid=${this.props.UserReducer.user.uid}&appid=${this.props.UserReducer.appId}
    //     await fetch(path)
    //         .then(ApiUtils.checkStatus)
    //         .then(response => response.json())
    //         .then(responseData => {
    //             this.profile = responseData.data.profile
    //             this.setState({ profile: this.profile })
    //             this.props.dispatchProfile(this.state.profile)
    //             console.log("Fetch profile success")
    //         })
    //         .catch(error => {
    //             console.log("Error in fetchProfile = ", error)
    //             console.log(path)
    //         })
    // }


    render() {
        // switch(this.state.status) {
        //     case "initial":
        //         return
        // }
        return (
            <View style={styles.container}>
                <Text>6MWT</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchProfile: (profile) => dispatch(getProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MWT)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})