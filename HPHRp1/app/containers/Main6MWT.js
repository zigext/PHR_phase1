import React from 'react'
import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SERVER_IP, PIN_CODE, MWT6 } from '../config/Const'
import { Actions } from 'react-native-router-flux'
import ApiUtils from '../components/ApiUtils'
import common from '../styles/common'
import NursePin from '../components/NursePin.mwt'
import PreQuestions from '../components/PreQuestions.pre.mwt'
import PostQuestions from '../components/PostQuestions.post.mwt'
import Post5MinsQuestions from '../components/Post5MinsQuestions.post5.mwt'
import Doing6MWT from '../components/6MWT.doing.mwt'
import { connect } from 'react-redux'
import { split, pick } from 'lodash'

let dataStore = {}

class Do6MWT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'pin',
            timeStart: null,
            pre: {},
            post: {},
            post5Mins: {},
            result: {},
            isDoing6Mwt: true
        }
        this.baseState = this.state
    }

    toggleIsDoing6Mwt = () => {
        this.setState({ isDoing6Mwt: !this.state.isDoing6Mwt })
    }

    resetState = () => {
        this.setState(this.baseState)
    }

    onStepChange = async (step) => {
        await this.setState({ step })
    }

    onStatusChange = async (status) => {
        await this.setState({ status })
    }

    onDataChange = async (name, value) => {
        await this.setState({ [name]: value })
        dataStore[name] = value
        console.log(name, value)
    }

    onPreQuestionsDone = async () => {
        let pre = pick(dataStore, ['hr', 'bp', 'o2sat'])
        await this.setState({ pre })
        console.log("pre 6mwt = ", this.state.pre)
    }

    onPostQuestionsDone = async (post) => {
        await this.setState({ post })
        console.log("post 6mwt = ", this.state.post)
    }

    onPost5MinsQuestionsDone = async () => {
        let post5Mins = pick(dataStore, ['hr', 'bp', 'o2sat'])
        await this.setState({ post5Mins })
        console.log("post5mins 6mwt = ", this.state.post5Mins)
    }

    onMwtResultDone = async () => {
        let result = pick(dataStore, ['hrmax', 'borg', 'distance', 'duration', 'date', 'timeStart', 'recorder'])
        await this.setState({ result })
        console.log("result 6mwt = ", this.state.result)

        await this.saveMWTResult()
        this.props.toggleIsView()
    }

    onCancel = async () => {
        await this.setState(this.baseState)
    }

    //Check nurse pin with server
    checkNursePin = async (pin, callback) => {
        if (pin === 1234)
            callback(true, null)
        else
            callback(false, null)
        // const path = `${SERVER_IP}${PIN_CODE}?pin_code=${pin}&appid=${this.props.appId}` //pin_code=${pin}&appid=${this.props.userReducer.appId}  //appid=${this.props.UserReducer.appId}
        // await fetch(path)
        //     .then(ApiUtils.checkStatus)
        //     .then(response => response.json())
        //     .then(responseData => {
        //         let success = responseData.success
        //         console.log("Check pin success = ", success)
        //         if (success === 'true')
        //             callback(true, null)
        //         else
        //             callback(false, null)
        //     })
        //     .catch(error => {
        //         console.log("Error in checkNursePin = ", error)
        //         callback(false, error)
        //     })
    }

    saveMWTResult = async () => {
        let results = {}
        results.pre = this.state.pre
        results.post = this.state.post
        results.post5Mins = this.state.post5Mins
        results.result = this.state.result
        console.log("save mwt", results, dataStore.date, dataStore.timeStart)

        const path = `${SERVER_IP}${MWT6}`
        await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.props.uid,
                appid: this.props.appId,
                results: results,
                date: dataStore.date,
                time: dataStore.timeStart
            })
        })
            .then(ApiUtils.checkStatus)
            .then(async responseData => {
                console.log("Save 6mwt success ")
                ToastAndroid.showWithGravity('บันทึกผลการทดสอบเดิน 6 นาทีเสร็จสิ้น', ToastAndroid.SHORT, ToastAndroid.CENTER)
            })
            .catch(async error => {
                console.log("Error in save6Mwt = ", error)
                ToastAndroid.showWithGravity('ผิดพลาด! ไม่สามารถบันทึกผลการทดสอบเดิน 6 นาที', ToastAndroid.SHORT, ToastAndroid.CENTER)
            })
    }

    renderPinInput = () => {
        return (
            <NursePin checkNursePin={this.checkNursePin} onDataChange={this.onDataChange} onStatusChange={this.onStatusChange} />
        )
    }

    renderPre6Mwt = () => {
        return (
            <PreQuestions onDataChange={this.onDataChange} onStatusChange={this.onStatusChange} onPreQuestionsDone={this.onPreQuestionsDone} />
        )
    }

    renderDoing6Mwt = () => {
        return (
            <Doing6MWT onDataChange={this.onDataChange} onStatusChange={this.onStatusChange} onCancel={this.onCancel} isDoing6Mwt={this.state.isDoing6Mwt} toggleIsDoing6Mwt={this.toggleIsDoing6Mwt}/>
        )
    }

    renderPost6Mwt = () => {
        return (
            <PostQuestions onDataChange={this.onDataChange} onStatusChange={this.onStatusChange} onPostQuestionsDone={this.onPostQuestionsDone} borg={this.state.borg} />
        )
    }

    renderPost5Mins6Mwt = () => {
        return (
            <Post5MinsQuestions onDataChange={this.onDataChange} onStatusChange={this.onStatusChange} onPost5MinsQuestionsDone={this.onPost5MinsQuestionsDone} onMwtResultDone={this.onMwtResultDone} />
        )
    }

    renderBody() {
        switch (this.state.status) {
            case 'pin':
                return this.renderPinInput()
            case 'pre':
                return this.renderPre6Mwt()
            case 'doing':
                return this.renderDoing6Mwt()
            case 'post':
                return this.renderPost6Mwt()
            case 'post5mins':
                return this.renderPost5Mins6Mwt()
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <View style={styles.patientInfoContainer}>
                        <Text style={styles.text}>{this.props.profile.firstname} {this.props.profile.lastname} รหัสผู้ป่วย {this.props.profile.patient_code}</Text>
                        <Image source={{ uri: this.props.profile.picture_uri }} style={styles.image}></Image>
                    </View>
                    <View style={styles.bodyContainer}>
                        {this.renderBody()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Do6MWT)

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        marginTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    patientInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: 20,
        color: common.grey,
        textAlign: 'right',
        marginTop: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        margin: 10,
        alignSelf: 'center'
    }
})