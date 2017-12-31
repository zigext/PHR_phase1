import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
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
            result: {},
            
            
        }
    }
    componentDidMount() {
        Orientation.lockToLandscape()
        if (isEmpty(this.state.profile)) {
            // this.fetchProfile()
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

    onLevelChanged = (level) => {
        this.setState({ level })
    }
    levelUp = async () => {
        let progress = this.state.progress
        progress += 0.1
        if (progress >= 1) {
            progress = 1
        }
        let level = this.state.level
        level += 1
        if (progress >= 10) {
            progress = 10
        }
        await this.setState({ progress, level })
        // this.props.onLevelChanged(this.state.level)
    }

    levelDown = async () => {
        let progress = this.state.progress
        progress -= 0.1
        if (progress <= 0) {
            progress = 0
        }
        let level = this.state.level
        level -= 1
        if (progress <= 0) {
            progress = 0
        }
        await this.setState({ progress, level })
        // this.props.onLevelChanged(this.state.level)
    }

    finish = () => {
        Alert.alert(
            'สิ้นสุดการทำกิจกรรม',
            'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.setState({ timeStop: new Date() })
                        let duration = this.calculateDuration(this.state.timeStart, this.state.timeStop)
                        this.setState({ duration })
                    }
                },
                { text: 'ไม่', style: 'cancel' }
            ]
        )
    }

    renderPreActivity = () => {
        return (
            <PreActivity onPreActivityDone={this.onPreActivityDone} setTimeStart={this.setTimeStart} firstname={this.state.profile.firstname} lastname={this.state.profile.lastname} patientCode={this.state.profile.patient_code} />
            // <View style={styles.container}>
            //     <Instructions />
            //     <PreActivityForm onSubmitPreActivity={this.onSubmitPreActivity} />

            // </View>
        )
    }

    renderDoingActivity = () => {
        return (
            <DoingActivity onDoingActivityDone={this.onDoingActivityDone} setTimeStop={this.setTimeStop} setDuration={this.setDuration}/>
        )
    }

    renderPostActivity = () => {
        return (
            <PostActivity firstname={this.state.profile.firstname} lastname={this.state.profile.lastname} patientCode={this.state.profile.patient_code}/>
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
    console.log("mapStateToProps in Activity", state)
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