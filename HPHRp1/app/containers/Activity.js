import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { SERVER_IP, PROFILE, ACTIVITY_RESULT_1 } from '../config/Const'
import ApiUtils from '../components/ApiUtils'
import PreActivity from './PreActivity'
import DoingActivity from './DoingActivity'
import PostActivity from './PostActivity'
import Borg from '../components/Borg'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'
import { isEmpty } from 'lodash'

class Activity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: 'pre activity',
            level: 0,
            profile: {},
            preActivity: {},
            postActivity: {},
            result: {},
        }
    }
    componentDidMount = async () => {
        Orientation.lockToLandscape()
        if (isEmpty(this.state.profile)) {
            console.log("empty")
            // await this.fetchProfile()
        }

    }

    fetchProfile = async () => {
        const path = `${SERVER_IP}${PROFILE}?userid=1416382941765846&appid=PHRapp` //userid=${this.props.default.user.uid}&appid=${this.props.default.appId}  //userid=${this.props.UserReducer.user.uid}&appid=${this.props.UserReducer.appId}
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                this.profile = responseData.data.profile
                this.setState({ profile: this.profile })
                // this.props.dispatchProfile(this.state.profile)
                console.log("Fetch profile success")

            })
            .catch(error => {
                console.log("Error in fetchProfile = ", error)
            })
    }

    //Save max level to user's profile
    saveProfile = async (newProfile) => {
        // const path = `${SERVER_IP}${PROFILE}`
        // await fetch(path, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userid: '1416382941765846', //this.props.default.user.uid
        //         appid: 'PHRapp', //this.props.defalt.appId
        //         profile: newProfile //this.state.result.maxLevel
        //     })
        // })
        //     .then(ApiUtils.checkStatus)
        //     .then(responseData => {
        //         callback(null)
        //     })
        //     .catch(error => {
        //         callback(error)
        //     })
    }

    //Save activity's result to server
    saveActivity = async () => {
        ToastAndroid.showWithGravity('บันทึกผลการทำกิจกรรมเสร็จสิ้น', ToastAndroid.SHORT, ToastAndroid.CENTER)

        // const path = `${SERVER_IP}${ACTIVITY_RESULT_1}`
        // await fetch(path, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userid: '1416382941765846', //this.props.default.user.uid
        //         appid: 'PHRapp', //this.props.defalt.appId
        //         results: newProfile
        //     })
        // })
        //     .then(ApiUtils.checkStatus)
        //     .then(responseData => {
        //         console.log("Save activity success ")
        //         callback(null)
        //         this.props.dispatchEditProfile()

        //     })
        //     .catch(error => {
        //         console.log("Error in saveActivity = ", error)
        //         callback(error)
        //     })
    }

    setTimeStart = async () => {
        await this.setState({ timeStart: new Date() })
        console.log("Time start = ", this.state.timeStart)
    }

    setTimeStop = async () => {
        await this.setState({ timeStop: new Date() })
        console.log("Time stop = ", this.state.timeStop)
    }

    setDuration = async () => {
        let duration = this.calculateDuration(this.state.timeStart, this.state.timeStop)
        await this.setState({ duration })
        console.log("duration = ", this.state.duration)
    }

    //calculate duration from local time (new Date())
    calculateDuration = (timeStart, timeStop) => {
        let stop = moment(timeStop)
        let duration = moment.duration(stop.diff(timeStart))
        return duration.asMilliseconds()
    }

    onPreActivityDone = async (value) => {
        await this.setState({
            state: 'doing activity',
            preActivity: value,
        })
        console.log("PRE TEST = ", this.state.preActivity)
    }

    onDoingActivityDone = async (value) => {
        await this.setState({
            state: 'post activity',
            result: value,
        })
        console.log("RESULT = ", this.state.result)
    }

    onPostActivityDone = async (value) => {
        await this.setState({
            state: 'pre activity',
            postActivity: value,
        })
        console.log("POST TEST = ", this.state.postActivity)
        console.log("ALL = ", this.state)
        // this.saveProfile()
        this.saveActivity()
    }

    // onLevelChanged = (level) => {
    //     this.setState({ level })
    // }
    // levelUp = async () => {
    //     let progress = this.state.progress
    //     progress += 0.1
    //     if (progress >= 1) {
    //         progress = 1
    //     }
    //     let level = this.state.level
    //     level += 1
    //     if (progress >= 10) {
    //         progress = 10
    //     }
    //     await this.setState({ progress, level })
    //     // this.props.onLevelChanged(this.state.level)
    // }

    // levelDown = async () => {
    //     let progress = this.state.progress
    //     progress -= 0.1
    //     if (progress <= 0) {
    //         progress = 0
    //     }
    //     let level = this.state.level
    //     level -= 1
    //     if (progress <= 0) {
    //         progress = 0
    //     }
    //     await this.setState({ progress, level })
    //     // this.props.onLevelChanged(this.state.level)
    // }

    // finish = () => {
    //     Alert.alert(
    //         'สิ้นสุดการทำกิจกรรม',
    //         'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่?',
    //         [
    //             {
    //                 text: 'ใช่', onPress: () => {
    //                     this.setState({ timeStop: new Date() })
    //                     let duration = this.calculateDuration(this.state.timeStart, this.state.timeStop)
    //                     this.setState({ duration })
    //                 }
    //             },
    //             { text: 'ไม่', style: 'cancel' }
    //         ]
    //     )
    // }

    renderPreActivity = () => {
        return (
            // <PreActivity onPreActivityDone={this.onPreActivityDone} setTimeStart={this.setTimeStart} firstname={this.state.profile.firstname} lastname={this.state.profile.lastname} patientCode={this.state.profile.patient_code} pictureUri={this.props.profile.picture_uri} />
            <PreActivity onPreActivityDone={this.onPreActivityDone} setTimeStart={this.setTimeStart} firstname='John' lastname='Doe' patientCode='0001' pictureUri='http://profilepicturesdp.com/wp-content/uploads/2017/04/Best-images-for-Whtsapp-144.jpg' />
        )
    }

    renderDoingActivity = () => {
        return (
            <DoingActivity onDoingActivityDone={this.onDoingActivityDone} setTimeStop={this.setTimeStop} setDuration={this.setDuration} doingLevel={this.state.profile.level} />
        )
    }

    renderPostActivity = () => {
        return (
            // <PostActivity onPostActivityDone={this.onPostActivityDone} firstname={this.state.profile.firstname} lastname={this.state.profile.lastname} patientCode={this.state.profile.patient_code} pictureUri={this.props.profile.picture_uri} />
            <PostActivity onPostActivityDone={this.onPostActivityDone} firstname='John' lastname='Doe' patientCode='0001' pictureUri='http://profilepicturesdp.com/wp-content/uploads/2017/04/Best-images-for-Whtsapp-144.jpg' />
        )
    }

    render() {
        if (this.state.state === 'pre activity') {
            return this.renderPreActivity()
        }
        else if (this.state.state === 'doing activity') {
            return this.renderDoingActivity()
        }
        else if (this.state.state === 'post activity') {
            return this.renderPostActivity()
        }

    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchLogIn: (email, uid) => dispatch(logIn(email, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',

    }
})