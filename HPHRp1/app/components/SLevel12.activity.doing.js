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
            label: 'จำนวนขั้นที่เดินได้'
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

const LEVEL = 12

export default class SLevel12 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            doingLevel: this.props.doingLevel,
            completedLevel: false,
            type: 'physical'
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
            Tts.speak('เดินขึ้นลงบันได')
        }
    }

    componentWillUnmount() {
        // Voice.destroy().then(Voice.removeAllListeners)

        //Call only in the last step
        Tts.stop()
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
    //     this.props.setPhysicalExercise('stairWalking', true)
    //     this.props.onActivityLevelChange(this.props.activityLevel + 1)
    //     this.props.onSystemLevelChange(this.props.systemLevel + 1)
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
                                        //In case of activity is completed
                                        this.setState({
                                            completedLevel: true,
                                            status: 'done'
                                        })
                                        this.props.setPhysicalExercise('stairWalking', true)

                                    }
                                },
                                {
                                    text: 'ไม่ ', onPress: () => {
                                        this.setState({ status: 'done' })
                                        this.props.setPhysicalExercise('stairWalking', false)
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
                if (value.amount < 3)
                    result.maxLevel = this.props.activityLevel
                else if (value.amount >= 3 && value.amount < 10)
                    result.maxLevel = 5
                else if (value.amount >= 10)
                    result.maxLevel = 6
                // else if (value.amount > 10)
                //     result.maxLevel = 7
                // result.maxLevel = this.props.activityLevel

                result.levelTitle = 'เดินขึ้นลงบันได'
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

                if (value.amount < 3)
                    result.maxLevel = this.props.activityLevel
                else if (value.amount >= 3 && value.amount < 10)
                    result.maxLevel = 5
                else if (value.amount === 10)
                    result.maxLevel = 6
                else if (value.amount > 10)
                    result.maxLevel = 7
                // result.maxLevel = this.props.activityLevel

                result.levelTitle = 'เดินขึ้นลงบันได'
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
                //Complete all level activities
                // this.props.onActivityLevelChange(this.props.activityLevel + 1)
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

    // renderNormalButton = () => {
    //     return (
    //         <View>
    //             <Icon
    //                 raised
    //                 reverse
    //                 name='ios-arrow-forward'
    //                 type='ionicon'
    //                 color={common.accentColor}
    //                 size={35}
    //                 onPress={this.onSystemLevelChange}
    //                 containerStyle={{ alignSelf: 'flex-end' }}
    //             />
    //             <View style={_styles.exitContainer}>
    //                 <Text style={_styles.text}>สิ้นสุดการทำกิจกรรม</Text>
    //                 <Icon
    //                     raised
    //                     reverse
    //                     name='exit-to-app'
    //                     color='#d6d4e0'
    //                     size={35}
    //                     onPress={this.onActivityDone}
    //                     containerStyle={{ alignSelf: 'flex-end' }}
    //                 />
    //             </View>
    //         </View>
    //     )
    // }

    // renderButtonWhenFinal = () => {
    //     return (
    //         <View style={_styles.exitContainer}>
    //             <Text style={_styles.text}>สิ้นสุดการทำกิจกรรม</Text>
    //             <Icon
    //                 raised
    //                 reverse
    //                 name='exit-to-app'
    //                 color={common.accentColor}
    //                 size={35}
    //                 onPress={this.onActivityDone}
    //                 containerStyle={{ alignSelf: 'flex-end' }}
    //             />
    //         </View>
    //     )
    // }

    renderActivity = () => {

        return (
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/images/activities/stair.jpg')} style={_styles.image} />
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
        let totalTimes
        switch (this.props.doingLevel) {
            case 5:
                totalTimes = 'เดินขึ้นลงบันได 3 ขั้น'
                break
            case 6:
                totalTimes = 'เดินลงบันได 10 ขั้นแบบพักขา'
                break
            case 7:
                totalTimes = 'เดินขึ้นลงบันได 10-15 ขั้น แบบสลับขา ถ้าอาการทางคลินิกคงที่ให้ขึ้นบันไดแบบพักขา และเดินขึ้นบันได 10-20 ขั้นแบบสลับขา'
                break
            default:
                totalTimes = 'เดินขึ้นลงบันได 3 ขั้น'
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
                <Text style={_styles.topic}>{totalTimes}</Text>
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