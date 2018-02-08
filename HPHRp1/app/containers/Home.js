import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, BackHandler, DeviceEventEmitter, NetInfo, ToastAndroid } from 'react-native'
import firebase from '../config/Firebase'
import PushNotification from '../config/PushNotification'
import * as notifications from '../config/Notifications'
import LogInForm from '../components/Login'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import ActivityButton from '../components/ActivityButton'
import AdvicesButton from '../components/AdvicesButton'
import ProgressButton from '../components/ProgressButton'
import Orientation from 'react-native-orientation'
import moment from 'moment'
import { last, isEmpty } from 'lodash'

let scene

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            test: false,

        }
    }

    //Handle notification actions
    componentWillMount() {
        PushNotification.registerNotificationActions(['Yes', 'No']);
        DeviceEventEmitter.addListener('notificationActionReceived', function (action) {
            console.log('Notification action received: ' + action);
            const info = JSON.parse(action.dataJSON);
            if (info.action == 'Yes') {
                Actions.tab_activity()
            }
        });
    }

    componentDidMount() {
        // this locks the view to Portrait Mode
        // const initial = Orientation.getInitialOrientation()

        //Check for internet connection
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({ isConnected })
            if (!isConnected) {
                ToastAndroid.showWithGravity('โปรดเชื่อมต่ออินเตอร์เน็ต', ToastAndroid.LONG, ToastAndroid.CENTER)
            }
        })
        NetInfo.isConnected.addEventListener('change', (isConnected) => {
            if (!isConnected) ToastAndroid.showWithGravity('โปรดเชื่อมต่ออินเตอร์เน็ต', ToastAndroid.LONG, ToastAndroid.CENTER)
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        Orientation.lockToLandscape();
        scene = this.props.title
        console.log("route ", Actions.currentScene)
        console.log("focus ", this.props.focused)

        this.setNotifications()

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    //Set notifications for patients with extra conditions
    componentWillReceiveProps(nextProps) {
        console.log("receive props", this.props.userReducer.user.profile)
        this.setNotificationsByConditions()
    }

    setNotifications() {
        console.log("set notifications")
        console.log("dailyActivityReminder = ", notifications.dailyActivityReminder.hasOwnProperty("date"))
        console.log("dailyImportanceReminder = ", notifications.dailyImportanceReminder.hasOwnProperty("date"))
        console.log("reminderForDailyLife = ", notifications.reminderForDailyLife.hasOwnProperty("date"))
        //Schedule notifications for every patients

        //if it's localNotificationSchedule
        //Bugs when log out then log in again, it cannot getTime from undefined 
        //property date is missing from notifications
        if (notifications.dailyActivityReminder.hasOwnProperty("date") || notifications.dailyImportanceReminder.hasOwnProperty("date") || notifications.reminderForDailyLife.hasOwnProperty("date")) {
            PushNotification.localNotificationSchedule(notifications.dailyActivityReminder)
            PushNotification.localNotificationSchedule(notifications.dailyImportanceReminder)
            PushNotification.localNotificationSchedule(notifications.reminderForDailyLife)
        }

        //But if it's localNotification, there will be no bugs
        //has to remove repeatType and date property from notifications
        // PushNotification.localNotification(notifications.dailyActivityReminder)
        // PushNotification.localNotification(notifications.dailyImportanceReminder)
        // PushNotification.localNotification(notifications.reminderForDailyLife)

    }

    setNotificationsByConditions() {
        // PushNotification.localNotificationSchedule(notifications.dailyImportanceReminder)
        if (this.props.userReducer.user.hasOwnProperty("profile")) {
            let { is_smoking, nyha_class, ejection_fraction, medical_condition, surgery_sapheneous_vein, level } = this.props.userReducer.user.profile

            console.log("dailyReminderForBreathing = ", notifications.dailyReminderForBreathing.hasOwnProperty("date"))
            console.log("reminderForSapheneousVeinPatient = ", notifications.reminderForSapheneousVeinPatient.hasOwnProperty("date"))
            console.log("reminderForHighRiskPatient = ", notifications.reminderForHighRiskPatient.hasOwnProperty("date"))

            //Smoking
            //What's about lung disease??????????????????
            // if (is_smoking === 'true' && notifications.dailyReminderForBreathing.hasOwnProperty("date"))
            //     PushNotification.localNotificationSchedule(notifications.dailyReminderForBreathing)
            // //Use sapheneous veins from leg
            // if (surgery_sapheneous_vein === '1' || surgery_sapheneous_vein === '2' || surgery_sapheneous_vein === '3' || surgery_sapheneous_vein === '4' && notifications.reminderForSapheneousVeinPatient.hasOwnProperty("date"))
            //     PushNotification.localNotificationSchedule(notifications.reminderForSapheneousVeinPatient)
            // //High risk
            // //What's about EF??????????????????
            // if (nyha_class >= 3 || ejection_fraction === '1' && notifications.reminderForHighRiskPatient.hasOwnProperty("date"))
            //     PushNotification.localNotificationSchedule(notifications.reminderForHighRiskPatient)
            
            //Reminder for daily life's activity
            // if(level >= 2)
            //     PushNotification.localNotificationSchedule(notifications.reminderForDailyLife)
            //Set notifications when patient reaches goal level at Activity scene
            if (level === '4')
                PushNotification.localNotification(notifications.reachLevel4)
            else if (level === '6')
                PushNotification.localNotification(notifications.reachLevel6)
            else if (level === '7')
                PushNotification.localNotification(notifications.reachLevel7)
        }


        //If patient hasn't done any activity in the last 6 hours
        let hr = (new Date()).getHours()
        //If it's day, notify patient
        if (hr >= 6 && hr <= 20) {
            if (!isEmpty(this.props.userReducer.activity)) {
                console.log("if ", this.props.userReducer.activity)
                let timeOfLastActivity = last(this.props.userReducer.activity).results.timeStart
                let timeNow = moment()
                let duration = moment.duration(timeNow.diff(timeOfLastActivity)).asHours()
                console.log("duration between last activity = ", duration)
                if (duration >= 6) {
                    PushNotification.localNotification(notifications.reminderForNotDoingActivityYet)
                }
            }

        }
        //If it's night, does nothing
        else {

        }
    }

    //if focus on Home screen then disable back button
    //Unable to go back to Login page
    handleBackButton() {
        if (Actions.currentScene === 'tab_home_1') {
            return true
        }
        else {
            return false
        }
    }

    onActivityPress = (callback) => {
        Actions.tab_activity()
    }

    onAdvicesPress = (callback) => {
        // PushNotification.cancelLocalNotifications({id: '1'})
        PushNotification.cancelAllLocalNotifications() //Cancle all notifications
        Actions.tab_advices()
    }

    onProgressPress = (callback) => {
        Actions.tab_progress()
    }


    render() {
        return (
            <View style={styles.container}>
                <AdvicesButton onAdvicesPress={this.onAdvicesPress} />
                <ActivityButton onActivityPress={this.onActivityPress} />
                <ProgressButton onProgressPress={this.onProgressPress} />
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps in Home", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchStartActivity: () => dispatch(startActivity())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    },
    container1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue'
    },
    container2: {
        flexDirection: 'column',
        flex: 0.3,
        backgroundColor: 'red'
    },
    container3: {
        flexDirection: 'column',
        flex: 0.7,
        backgroundColor: 'green'
    }
})