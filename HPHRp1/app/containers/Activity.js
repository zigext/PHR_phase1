import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import firebase from '../config/Firebase'
import ActivityProgress from '../components/ActivityProgress'
import Timer from '../components/Timer'
import PreActivity from './PreActivity'
import PreActivityForm from '../components/PreActivityForm'
import Instructions from '../components/Instructions'
import Stepper from '../components/Stepper'
import Borg from '../components/Borg'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'

class Activity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: 'pre activity',
            level: 0,
            progress: 0,
            timeStart: new Date(),
            timeStop: '',
            duration: '',
            preActivity: {},
        }
    }
    componentDidMount() {
        Orientation.lockToLandscape()
    }

    //calculate duration from local time (new Date())
    calculateDuration = (timeStart, timeStop) => {
        let stop = moment(timeStop)
        let duration = moment.duration(stop.diff(timeStart))
        return duration.asMilliseconds()
    }

    onPreActivityDone = (value) => {
        this.setState({
            state: 'doing activity'
        })
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
          <PreActivity onPreActivityDone={this.onPreActivityDone} />
        // <View style={styles.container}>
        //     <Instructions />
        //     <PreActivityForm onSubmitPreActivity={this.onSubmitPreActivity} />
            
        // </View>
        )
    }

    renderDoingActivity = () => {
        let str = ''
        switch (this.state.level) {
            case 0: {
                str = 'ระดับ 1 นั่งบนเตียง ออกกำลังกายบนเตียง'
                break
            }
            case 1: {
                str = 'ระดับ 2 มีผู้ช่วยเหลือผู้ป่วยมานั่งบนเก้าอี้ (ไม่ยืน)'
                break
            }
            case 2: {
                str = 'ระดับ 3 นั่งที่ขอบเตียง'
                break
            }
            case 3: {
                str = 'ระดับ 4 ยืนที่ข้างเตียง'
                break
            }
            case 4: {
                str = 'ระดับ 5 สามารถย้ายจากเตียงไปนั่งที่เก้าอี้ได้'
                break
            }
            case 5: {
                str = 'ระดับ 6 ก้าวขา ย่ำเท้าที่ข้างเตียงได้'
                break
            }
            case 6: {
                str = 'ระดับ 7 สามารถเดินได้โดยมีผู้ช่วยเหลือ 2 คนหรือมากกว่า'
                break
            }
            case 7: {
                str = 'ระดับ 8 สามารถเดินได้โดยมีผู้ช่วยเหลือ 1 คน'
                break
            }
            case 8: {
                str = 'ระดับ 9 สามารถเดินได้เองโดยมีอุปกรณ์ช่วย'
                break
            }
            case 9: {
                str = 'ระดับ 10 สามารถเดินได้เอง'
                break
            }
            case 10: {
                str = 'สิ้นสุด'
                break
            }
            default: str = ''
        }
        return (<View style={[styles.container, { alignSelf: 'stretch', padding: 20, paddingHorizontal: 50 }]}>
            <View style={{ flexDirection: 'column' }}>
                <ActivityProgress onLevelChanged={this.onLevelChanged} progress={this.state.progress} />
                <Button
                    raised
                    title='ระดับก่อนหน้า'
                    fontSize={22}
                    onPress={this.levelDown} />
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Timer />
                <Text style={{ fontSize: 24, alignSelf: 'center' }}>ถัดไป : {str}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                        raised
                        backgroundColor='#118929'
                        title='ระดับถัดไป'
                        fontSize={22}
                        onPress={this.levelUp} />
                    <Button
                        raised
                        backgroundColor='#f49842'
                        title='สิ้นสุด'
                        fontSize={22}
                        onPress={this.finish} />
                </View>
            </View>
        </View>
        )
    }

    renderBorgScale = () => {
        return (<View style={[styles.container, {flexDirection: 'column'}]}>
            <Text style={{ fontSize: 24, alignSelf: 'center' }}>รู้สึกเหนื่อยไหม?</Text>
            <Borg></Borg>
        </View>
        )
    }

    render() {
        if (this.state.state === 'pre activity') {
            return this.renderPreActivity()
        }
        else if (this.state.state === 'doing activity') {
            return this.renderDoingActivity()
        }
        else if (this.state.state === 'borg scale') {
            return this.renderBorgScale()
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