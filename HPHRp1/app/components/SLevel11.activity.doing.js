import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import Tts from 'react-native-tts'
import Voice from 'react-native-voice'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { cloneDeep } from 'lodash'
import BorgScale from './BorgScale.activity.doing'

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
        },
        disorder: {
            label: 'เกิดอาการผิดปกติ'
        },
        patientNotWilling: {
            label: 'ผู้ป่วยไม่ประสงค์ทำกิจกรรมต่อ'
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
    amount: amount,
    disorder: t.Boolean,
    patientNotWilling: t.Boolean
})

const LEVEL = 11

export default class SLevel11 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            doingLevel: this.props.doingLevel,
            completedLevel: false,
            type: 'physical',
            displayMain: true
        }
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this)
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this)
        // Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this)
    }

    componentDidMount = () => {
        Voice.start('th-TH')
        //If patient can't do this activity
        if (typeof this.props.exception === 'boolean' && this.props.exception === false) {
            this.props.onSystemLevelChange(this.props.systemLevel + 1)
        }
        else {
            Tts.speak('เขย่งเท้าขึ้นลง')
        }
    }

    componentWillUnmount() {
        // Voice.destroy().then(Voice.removeAllListeners)
        // Tts.stop()
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

    toggleDisplayMain = () => {
        this.setState({ displayMain: !this.state.displayMain })
    }

    onSystemLevelChange = () => {
        this.props.setPhysicalExercise('tiptoeing', true)
        this.toggleDisplayMain()
        // this.props.onActivityLevelChange(this.props.activityLevel + 1)
        // this.props.onSystemLevelChange(this.props.systemLevel + 1)
    }

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
                                        //In case of activity is completed
                                        this.setState({
                                            completedLevel: true,
                                            status: 'done'
                                        })
                                        this.props.setPhysicalExercise('tiptoeing', true)
                                        //  let result = {
                                        //     maxLevel: this.props.activityLevel + 1
                                        // }
                                        // this.props.onActivityLevelChange(this.props.activityLevel + 1)
                                        // await this.props.setTimeStop()
                                        // this.props.setDuration()
                                        // this.props.onDoingActivityDone(result)
                                    }
                                },
                                {
                                    text: 'ไม่ ', onPress: () => {
                                        this.setState({ status: 'done' })
                                        this.props.setPhysicalExercise('tiptoeing', false)
                                    }
                                }
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
            //End but activity not completed
            if (!this.state.completedLevel) {
                if (value.amount >= 10 && value.amount < 20)
                    result.maxLevel = 4
                else if (value.amount === 20)
                    result.maxLevel = 5
                else if (value.amount > 20)
                    result.maxLevel = 6
                else if (value.amount < 10)
                    result.maxLevel = 3
                // result.maxLevel = this.props.activityLevel

                result.levelTitle = 'เขย่งเท้าขึ้นลง'
                result.amount = value.amount
                result.completedLevel = this.state.completedLevel
                result.nextLevel = this.props.doingLevel
                result.physicalExercise = this.props.physicalExercise
                result.breathingExercise = this.props.breathingExercise
                result.completedAllPhysical = this.props.completedAllPhysical
                result.completedAllBreathing = this.props.completedAllBreathing
                result.reasonToStop = {
                    disorder: value.disorder,
                    patientNotWilling: value.patientNotWilling
                }
                //If patient select his own activity, then define maxLevel and nextLevel = 1
                if (this.props.finalSystemLevel === LEVEL) {
                    result.nextLevel = 1
                    result.maxLevel = 1
                }
            }
            //End and activity completed
            else {
                await this.props.onAllPhysicalCompleted()

                if (value.amount >= 10 && value.amount < 20)
                    result.maxLevel = 4
                else if (value.amount === 20)
                    result.maxLevel = 5
                else if (value.amount > 20)
                    result.maxLevel = 6
                else if (value.amount < 10)
                    result.maxLevel = 3
                // result.maxLevel = this.props.activityLevel

                result.levelTitle = 'เขย่งเท้าขึ้นลง'
                result.amount = value.amount
                result.completedLevel = this.state.completedLevel
                //Max level is 7
                if (this.props.doingLevel === 7) {
                    result.nextLevel = this.props.doingLevel
                }
                else {
                    result.nextLevel = this.props.doingLevel + 1
                }
                result.physicalExercise = this.props.physicalExercise
                result.breathingExercise = this.props.breathingExercise
                result.completedAllPhysical = this.props.completedAllPhysical
                result.completedAllBreathing = this.props.completedAllBreathing,
                    result.reasonToStop = {
                        disorder: value.disorder,
                        patientNotWilling: value.patientNotWilling
                    }
                //If patient select his own activity, then define maxLevel and nextLevel = 1
                if (this.props.finalSystemLevel === LEVEL) {
                    result.nextLevel = 1
                    result.maxLevel = 1
                }

                this.props.onActivityLevelChange(this.props.activityLevel + 1)
            }
            await this.props.setTimeStop()
            this.props.setDuration()
            this.props.onDoingActivityDone(result)

        }
    }

    renderForm = () => {
        return (
            <View>
                <View style={_styles.formContainer}>
                    <Form ref='form' type={input} options={options} />
                </View>
                <Icon
                    raised
                    reverse
                    name='exit-to-app'
                    color='#d6d4e0'
                    size={35}
                    onPress={this.onInputFilled}
                    containerStyle={{ alignSelf: 'flex-end' }}
                />
            </View>
        )
    }

    renderNormalButton = () => {
        return (
            <View>
                <Icon
                    raised
                    reverse
                    name='ios-arrow-forward'
                    type='ionicon'
                    color={common.accentColor}
                    size={35}
                    onPress={this.onSystemLevelChange}
                    containerStyle={{ alignSelf: 'flex-end' }}
                />
                <View style={_styles.exitContainer}>
                    <Text style={_styles.text}>สิ้นสุดการทำกิจกรรม</Text>
                    <Icon
                        raised
                        reverse
                        name='exit-to-app'
                        color={common.primaryColorDark}
                        size={35}
                        onPress={this.onActivityDone}
                        containerStyle={{ alignSelf: 'flex-end' }}
                    />
                </View>
                <View style={_styles.exitContainer}>
                    <Text style={_styles.text}>ยกเลิกการทำกิจกรรม</Text>
                    <Icon
                        raised
                        reverse
                        name='cross'
                        type='entypo'
                        color={common.grey}
                        size={35}
                        onPress={this.props.onCancelActivity}
                        containerStyle={{ alignSelf: 'flex-end' }}
                    />
                </View>
            </View>
        )
    }

    renderButtonWhenFinal = () => {
        return (
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
        )
    }

    renderActivity = () => {

        return (
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/images/activities/tiptoe.png')} style={_styles.image} />
                </View>
                {/*Check if this is the final activity that patient can do*/}
                {this.props.finalSystemLevel === LEVEL ? this.renderButtonWhenFinal() : this.renderNormalButton()}
            </View>
        )
    }

    renderMain = () => {
        let totalTimes
        switch (this.props.doingLevel) {
            case 4:
                totalTimes = '10 ครั้ง'
                break
            case 5:
                totalTimes = '20 ครั้ง'
                break
            case 6:
                totalTimes = '20-30 ครั้ง'
                break
            case 7:
                totalTimes = '20-30 ครั้ง'
                break
            default:
                totalTimes = '10 ครั้ง'
        }

        return (
            <View style={_styles.container}>
                <View style={_styles.typeExerciseContainer}>
                    <Button
                        raised
                        backgroundColor={this.state.type === 'physical' ? common.primaryColor : 'white'}
                        color={this.state.type === 'physical' ? 'white' : common.primaryColor}
                        title='Physical'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}

                    />
                    <Button
                        raised
                        backgroundColor={this.state.type === 'physical' ? 'white' : common.primaryColor}
                        color={this.state.type === 'physical' ? common.primaryColor : 'white'}
                        title='Breathing'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={() => ToastAndroid.showWithGravity('ทำ Breathing exercise สำเร็จครบแล้ว', ToastAndroid.SHORT, ToastAndroid.CENTER)}
                    />
                </View>
                <Text style={_styles.topic}>เขย่งเท้าขึ้นลง {totalTimes}</Text>
                {(this.state.status === 'doing') ? this.renderActivity() : this.renderForm()}
            </View>
        )
    }

    renderBorg = () => (
        <BorgScale
            onActivityLevelChange={this.props.onActivityLevelChange}
            onSystemLevelChange={this.props.onSystemLevelChange}
            activityLevel={this.props.activityLevel}
            systemLevel={this.props.systemLevel}
        />
    )

    render() {

        return (
            this.state.displayMain ? this.renderMain() : this.renderBorg()
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
    typeExerciseContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    formContainer: {
        marginTop: 30,
        marginRight: 75,
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