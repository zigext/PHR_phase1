import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, NativeEventEmitter, NativeModules, Platform, TouchableHighlight } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { SERVER_IP, PROFILE, ACTIVITY_RESULT_1 } from '../config/Const'
import ApiUtils from '../components/ApiUtils'
import PreActivity from './PreActivity'
import DoingActivity from './DoingActivity'
import PostActivity from './PostActivity'
import ScanBLE from './ScanBLE'
import { saveActivity, getProfile, editProfile } from '../actions/userAction'
import * as userActions from '../actions/userAction'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'
import { isEmpty, omit } from 'lodash'
import BleManager from 'react-native-ble-manager'

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

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
            exception: {},
            peripherals: new Map(),
            peripheral: {},
            connected: false,
            useBLE: null
        }
         this.baseState = omit(this.state, 'level', 'connected', 'useBLE', 'peripherals', 'peripheral')
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this)
    }
    componentDidMount = async () => {
        Orientation.lockToLandscape()
        //Always fetch new profile
        await this.fetchProfile()
        //fetch profile if empty
        // if (isEmpty(this.state.profile)) {
        //     console.log("empty")
        //     await this.fetchProfile()
        // }
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);

    }

    componentWillReceiveProps(nextProps) {
        console.log("receive props in Activity", this.props.userReducer.user.profile)
    }

    componentWillUnmount() {
        this.handlerDisconnect.remove()
    }

    handleDisconnectedPeripheral(data) {
        // let peripherals = this.state.peripherals;
        // let peripheral = peripherals.get(data.peripheral);
        // if (peripheral) {
        //     peripheral.connected = false;
        //     peripherals.set(peripheral.id, peripheral);
        //     this.setState({ peripherals });
        // }
        ToastAndroid.showWithGravity('ไม่ได้เชื่อมต่อกับอุปกรณ์ Bluetooth', ToastAndroid.SHORT, ToastAndroid.CENTER)
        this.setState({
            connected: false,
            useBLE: null
        })
        console.log('Disconnected from ' + data.peripheral);
    }

    setPeripheral = async (peripheral) => {
        await this.setState({ peripheral })
        console.log('peripheral = ' + this.state.peripheral)
    }

    setConnectToBLE = async (value) => {
        await this.setState({
            connected: value,
        })
    }

    disconnectBLE = () => {
        if (this.state.peripheral.connected) {
            BleManager.disconnect(this.state.peripheral.id)
        }
    }

    setUseBLE = async (value) => {
        await this.setState({
            useBLE: value
        })
    }

    fetchProfile = async () => {
        // const path = `${SERVER_IP}${PROFILE}?userid=1416382941765846&appid=PHRapp` //userid=${this.props.userReducer.user.uid}&appid=${this.props.userReducer.appId}  //userid=${this.props.UserReducer.user.uid}&appid=${this.props.UserReducer.appId}
        const path = `${SERVER_IP}${PROFILE}?userid=${this.props.userReducer.user.uid}&appid=${this.props.userReducer.appId}`
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                this.profile = responseData.data.profile
                this.setState({ profile: this.profile, level: parseInt(this.profile.level) })
                this.props.userActions.getProfile(this.state.profile)
                console.log("Fetch profile success")

            })
            .catch(error => {
                console.log("Error in fetchProfile = ", error)
            })
    }

    //Save next level to user's profile
    //Save only next level that greater than patient's current level
    saveProfile = async () => {
        if (this.state.result.nextLevel >= this.state.profile.level) {
            console.log("next level that equal or greater than patient's current level, next = ", this.state.result.nextLevel)
            const path = `${SERVER_IP}${PROFILE}`
            await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.props.userReducer.user.uid,
                    appid: this.props.userReducer.appId, 
                    profile: { level: this.state.result.nextLevel.toString() }
                })
            })
                .then(ApiUtils.checkStatus)
                .then(responseData => {
                    console.log("Save level in profile success")
                    this.setState({
                        level: this.state.result.nextLevel
                    })
                })
                .catch(error => {
                    console.log("Save level in profile failed = ", error)
                    ToastAndroid.showWithGravity('ผิดพลาด! บันทึกระดับการทำกิจกรรมในประวัติส่วนตัวล้มเหลว', ToastAndroid.SHORT, ToastAndroid.CENTER)
                })
        }
        else {
            return
        }
    }

    //Save activity's result to server
    saveActivity = async () => {
        let results = {}
        results.preActivity = this.state.preActivity
        results.result = this.state.result
        results.postActivity = this.state.postActivity
        results.timeStart = this.state.timeStart
        results.timeStop = this.state.timeStop
        results.durationMillis = this.state.durationMillis
        results.durationMinutes = this.state.durationMinutes
        results.timestamp = Math.floor(Date.now())
        results.date = moment(this.state.timeStart).format("YYYY-MM-DD")
        results.time = moment(this.state.timeStart).format("kk:mm:ss")
        let date = moment(this.state.timeStart).format("YYYY-MM-DD")
        let time = moment(this.state.timeStart).format("kk:mm:ss")
        console.log("results = ", results, date, time)

        const path = `${SERVER_IP}${ACTIVITY_RESULT_1}`
        await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.props.userReducer.user.uid, 
                appid: this.props.userReducer.appId, 
                results: results,
                date: date,
                time: time
            })
        })
            .then(ApiUtils.checkStatus)
            .then(async responseData => {
                console.log("Save activity success ")
                ToastAndroid.showWithGravity('บันทึกผลการทำกิจกรรมเสร็จสิ้น', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.userActions.saveActivity(results, date, time)
                //Clear patient's exception
                await this.setState({
                    exception: {}
                })

            })
            .catch(async error => {
                console.log("Error in saveActivity = ", error)
                ToastAndroid.showWithGravity('ผิดพลาด! ไม่สามารถบันทึกผลการทำกิจกรรม', ToastAndroid.SHORT, ToastAndroid.CENTER)
                await this.setState({
                    exception: {}
                })
            })
    }

    //Save only result of pre-activity test
    saveOnlyPreActivity = async (value) => {
        await this.setState({
            preActivity: value
        })
        let obj = {}
        obj.preActivity = Object.assign({}, this.state.preActivity)
        obj.result = {
            maxLevel: 0,
            levelTitle: 'ไม่ได้ทำกิจกรรม',
            physicalExercise: {},
            breathingExercise: {},
            completedAllPhysical: false,
            completedAllBreathing: false,
            completedLevel: false,
            reasonToStop: {}
        }
        obj.postActivity = {}
        let date = moment(this.state.timeStart).format("YYYY-MM-DD")
        let time = moment(this.state.timeStart).format("kk:mm:ss")

        const path = `${SERVER_IP}${ACTIVITY_RESULT_1}`
        await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // userid: '1416382941765846', //this.props.userReducer.user.uid
                // appid: 'PHRapp', //this.props.defalt.appId
                userid: this.props.userReducer.user.uid, 
                appid: this.props.userReducer.appId, 
                results: obj,
                date: date,
                time: time
            })
        })
            .then(ApiUtils.checkStatus)
            .then(responseData => {
                ToastAndroid.showWithGravity('บันทึกผลการทดสอบก่อนทำกิจกรรมเสร็จสิ้น', ToastAndroid.SHORT, ToastAndroid.CENTER)

            })
            .catch(error => {
                ToastAndroid.showWithGravity('ผิดพลาด! ไม่สามารถบันทึกผลการทดสอบก่อนทำกิจกรรม', ToastAndroid.SHORT, ToastAndroid.CENTER)
            })
    }

    setTimeStart = async () => {
        //ISO 
        await this.setState({ timeStart: new Date() })
    }

    setTimeStop = async () => {
        //ISO 
        await this.setState({ timeStop: new Date() })
        // Thu Jan 11 2018 21:11:30 GMT+0700 (Local Standard Time)
        // await this.setState({ timeStop: new Date(Math.floor(Date.now())).toString() })
    }

    setDuration = async () => {
        let durationMillis = this.calculateDuration(this.state.timeStart, this.state.timeStop, 'millis')
        let durationMinutes = this.calculateDuration(this.state.timeStart, this.state.timeStop, 'minutes')
        await this.setState({ durationMillis, durationMinutes })
    }

    //calculate duration from local time (new Date())
    calculateDuration = (timeStart, timeStop, format) => {
        let stop = moment(timeStop)
        let duration = moment.duration(stop.diff(timeStart))
        if (format === 'millis')
            return duration.asMilliseconds()
        else if (format === 'minutes')
            return duration.asMinutes().toFixed(2) //fixed to 2 decimal
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
            state: 'post activity', //cause warning
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
        await this.saveProfile()
        await this.saveActivity()
    }

    //In case of patient doesn't pass the pre-test, patient can select which activities to do
    onSelectActivity = async (selected, finalSystemLevel) => {
        await this.setState({
            exception: { ...selected, finalSystemLevel }
        })
        console.log("select = ", this.state.exception)
    }

    onCancelActivity = async () => {
        await this.setState(this.baseState)
        console.log("state in Activity = ", this.state)
    }

    renderScanBLE = () => {
        return (
            <ScanBLE setConnectToBLE={this.setConnectToBLE} setPeripheral={this.setPeripheral} setUseBLE={this.setUseBLE} />
        )
    }

    renderPreActivity = () => {
        return (

            <PreActivity useBLE={this.state.useBLE} setUseBLE={this.setUseBLE} setConnectToBLE={this.setConnectToBLE} peripheral={this.state.useBLE? this.state.peripheral: null} disconnectBLE={this.disconnectBLE} onPreActivityDone={this.onPreActivityDone} onSelectActivity={this.onSelectActivity} setTimeStart={this.setTimeStart} saveOnlyPreActivity={this.saveOnlyPreActivity} firstname={this.state.profile.firstname} lastname={this.state.profile.lastname} patientCode={this.state.profile.patient_code} pictureUri={this.state.profile.picture_uri} />
            // <PreActivity useBLE={this.state.useBLE} setUseBLE={this.setUseBLE} setConnectToBLE={this.setConnectToBLE} peripheral={this.state.useBLE? this.state.peripheral: null} disconnectBLE={this.disconnectBLE} onPreActivityDone={this.onPreActivityDone} onSelectActivity={this.onSelectActivity} setTimeStart={this.setTimeStart} saveOnlyPreActivity={this.saveOnlyPreActivity} firstname='John' lastname='Doe' patientCode='0001' pictureUri='http://profilepicturesdp.com/wp-content/uploads/2017/04/Best-images-for-Whtsapp-144.jpg' />
        )
    }

    renderDoingActivity = () => {
        return (
            <DoingActivity useBLE={this.state.useBLE} peripheral={this.state.useBLE? this.state.peripheral: null} exception={this.state.exception} preHr={this.state.preActivity.preHr} onDoingActivityDone={this.onDoingActivityDone} setTimeStop={this.setTimeStop} setDuration={this.setDuration} onCancelActivity={this.onCancelActivity} doingLevel={this.state.level} />
        )
    }

    renderPostActivity = () => {
        return (
            <PostActivity useBLE={this.state.useBLE} peripheral={this.state.useBLE? this.state.peripheral: null} onPostActivityDone={this.onPostActivityDone} preHr={this.state.preActivity.preHr} preBp={this.state.preActivity.preBp} firstname={this.state.profile.firstname} lastname={this.state.profile.lastname} patientCode={this.state.profile.patient_code} pictureUri={this.state.profile.picture_uri} result={this.state.result}/>
            // <PostActivity useBLE={this.state.useBLE} peripheral={this.state.useBLE? this.state.peripheral: null} onPostActivityDone={this.onPostActivityDone} preHr={this.state.preActivity.preHr} preBp={this.state.preActivity.preBp} firstname='John' lastname='Doe' patientCode='0001' pictureUri='http://profilepicturesdp.com/wp-content/uploads/2017/04/Best-images-for-Whtsapp-144.jpg' result={this.state.result} />
        )
    }


    render() {
        console.log("connect ble = ", this.state.connected, this.state.useBLE)
        //Hasn't connected to BLE or Hasn't choose wheter to use BLE or not 
        if (this.state.connected === false && this.state.useBLE === null) {
            return this.renderScanBLE()
        }
        //Connected to BLE or choose not to use BLE
        else if(this.state.connected === true || this.state.useBLE === false){
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
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps in Activity", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { userActions: bindActionCreators(userActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',

    }
})