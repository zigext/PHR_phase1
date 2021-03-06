import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import Tts from 'react-native-tts'
import Voice from 'react-native-voice'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { cloneDeep } from 'lodash'

Tts.setDefaultLanguage('th-TH')
Tts.setDefaultVoice('th-TH-language')

let Form = t.form.Form
const myCustomStylesheet = cloneDeep(t.form.Form.stylesheet)
myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'
myCustomStylesheet.controlLabel.normal.fontSize = 20
let options = {
    fields: {
        amount: {
            label: 'จำนวนครั้งที่ทำได้'
        }
    },
    stylesheet: myCustomStylesheet
}

//amount must be positive value
let amount = t.refinement(t.Number, function (n) { return n >= 0 })
amount.getValidationErrorMessage = function (value, path, context) {
    return 'จำนวนไม่ถูกต้อง'
}

let input = t.struct({
    amount: amount
})

const LEVEL = 13

export default class SLevel13 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            doingLevel: this.props.doingLevel,
            completedLevel: false
        }
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this)
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this)
        // Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this)
    }

    componentDidMount = () => {
        Voice.start('th-TH')
        //If patient can't do this activity
        if (typeof this.props.exception === 'boolean' && this.props.exception === false) {
            //This is the last activity, end doing activity state and save the result
            this.props.onDoingActivityDone(this.props.resultForPassedOn)
        }
    }

    componentWillUnmount() {
        // Voice.destroy().then(Voice.removeAllListeners)
        Tts.stop() //Call only in the last step
    }

    onSpeechStartHandler(e) {
        console.log("Speech start")
    }
    onSpeechEndHandler(e) {
        console.log("Speech end")
    }

    onStartButtonPress(e) {
        Voice.start('en')
    }

    // onSystemLevelChange = () => {
    //     this.props.onSystemLevelChange(this.props.systemLevel + 1)
    //     this.props.onActivityLevelChange(this.props.activityLevel + 1)
    // }

    onActivityDone = () => {
        Alert.alert(
            'กิจกรรมฟื้นฟูสมรรถภาพหัวใจ',
            'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        Alert.alert(
                            'กิจกรรมฟื้นฟูสมรรถภาพหัวใจ',
                            'ทำกิจกรรมได้สำเร็จตามเป้าหมายหรือไม่?',
                            [
                                {
                                    text: 'ใช่', onPress: async () => {
                                        // this.props.onActivityLevelChange(this.props.activityLevel + 1)
                                        //In case of activity is completed
                                        this.setState({
                                            completedLevel: true,
                                            status: 'done'
                                        })
                                        // let result = {
                                        //     maxLevel: this.props.activityLevel + 1
                                        // }
                                        // await this.props.setTimeStop()
                                        // this.props.setDuration()
                                        // this.props.onDoingActivityDone(result)
                                    }
                                },
                                { text: 'ไม่ ', onPress: () => this.setState({ status: 'done' }) }
                            ]
                        )
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }

    //In case of activity is not completed
    onInputFilled = async () => {
        let value = this.refs.form.getValue()
        if (value) {
            let result = {}
            //Not completed
            if (!this.state.completedLevel) {
                result.maxLevel = this.props.activityLevel
                result.levelTitle = 'กางข้อศอก ยกไหล่ หมุนแขน'
                result.amount = value.amount
                result.completedLevel = this.state.completedLevel
                result.nextLevel = this.props.activityLevel
            }
            //Completed
            else {
                result.maxLevel = this.props.activityLevel
                result.levelTitle = 'กางข้อศอก ยกไหล่ หมุนแขน'
                result.amount = value.amount
                result.completedLevel = this.state.completedLevel
                if (this.props.activityLevel === 6) {
                    result.nextLevel = this.props.activityLevel + 1
                }
                else if (this.props.activityLevel === 7) {
                    //Max level is 7
                    result.nextLevel = this.props.activityLevel
                }
                //Complete all level activities
                // this.props.onActivityLevelChange(this.props.activityLevel + 1)
            }
            await this.props.setTimeStop()
            this.props.setDuration()
            this.props.onDoingActivityDone(result)
            // console.log("amount = ", result)
            // await this.props.setTimeStop()
            // this.props.setDuration()
            // this.props.onDoingActivityDone(result)
        }
    }

    renderForm = () => {
        return (
            <View style={{ marginTop: 30 }}>
                <Form ref='form' type={input} options={options} />
                <Icon
                    raised
                    reverse
                    name='exit-to-app'
                    color={common.accentColor}
                    size={35}
                    onPress={this.onInputFilled}
                    containerStyle={{ alignSelf: 'flex-end' }}
                />
            </View>
        )
    }

    renderActivity = () => {
        Tts.speak('กางข้อศอก ยกไหล่ หมุนแขน')
        return (
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/images/advices/daily1.png')} style={_styles.image} />
                </View>
                <View style={_styles.exitContainer}>
                    <Text style={_styles.text}>สิ้นสุดการทำกิจกรรม</Text>
                    <Icon
                        raised
                        reverse
                        name='exit-to-app'
                        color={common.accentColor}
                        size={35}
                        onPress={this.onActivityDone}
                        containerStyle={{ alignSelf: 'flex-end' }}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={_styles.container}>
                <Text style={_styles.topic}>กางข้อศอก ยกไหล่ หมุนแขน</Text>
                {(this.state.status === 'doing') ? this.renderActivity() : this.renderForm()}
            </View>
        )

    }
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        margin: 20,
        marginHorizontal: 25,

    },
    exitContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
    },
    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: common.grey,
        marginBottom: 15,
    },
    detail: {
        fontSize: 20,
        color: common.grey,
        marginTop: 20,
        marginRight: 15,
    },
    text: {
        fontSize: 20,
        color: common.grey,
        marginTop: 20,
        marginRight: 15,
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        height: 220,
    }
})