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

const LEVEL = 4

export default class SLevel4 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            showDescription: false,
            type: 'physical',
            completedLevel: false,
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
            Tts.speak('บริหารแขน ข้อมือ ข้อศอก และหัวไหล่')
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

    onSystemLevelChange = async () => {
        if (!this.props.physicalExercise.hasOwnProperty("legsExercise")) {
            this.props.setCompletedAllPhysicalExercise(false)
        }

        this.props.setPhysicalExercise('armsExercise', true)
        //If all breathing exercises also completed
        if (this.props.completedAllBreathing) {
            // this.props.onActivityLevelChange(this.props.activityLevel + 1)
            // this.props.onSystemLevelChange(this.props.systemLevel + 1)

            this.toggleDisplayMain() //to ask borg scale
        }
        //If not
        else {
            await this.props.onAllPhysicalCompleted()
            //If patient can't do breathing exercise, then go on
            if (this.props.allException.ac1 === false || this.props.exception.ac2 === false) {
                if (!this.props.physicalExercise.hasOwnProperty("legsExercise")) {
                    await this.props.setCompletedAllPhysicalExercise(false)
                }
                this.props.onSystemLevelChange(this.props.systemLevel + 1)
            }
            //If patient hasn't done breathing exercise
            else {
                ToastAndroid.showWithGravity('กรุณาทำ Breathing exercise ก่อน', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }

        }

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
                                        this.props.setPhysicalExercise('armsExercise', true)
                                        // let result = {
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
                                        this.props.setPhysicalExercise('armsExercise', false)
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
                result.maxLevel = this.props.activityLevel
                result.levelTitle = 'บริหารแขน ข้อมือ ข้อศอก หัวไหล่'
                result.amount = value.amount
                result.completedLevel = this.state.completedLevel
                result.nextLevel = this.props.activityLevel
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
                    if (!this.props.physicalExercise.hasOwnProperty("legsExercise")) {
                        await this.props.setCompletedAllPhysicalExercise(false)
                        result.completedAllPhysical = this.props.completedAllPhysical
                    }
                }


            }
            //End and activity completed
            else {
                await this.props.onAllPhysicalCompleted()

                result.maxLevel = this.props.activityLevel
                result.levelTitle = 'บริหารแขน ข้อมือ ข้อศอก หัวไหล่'
                result.amount = value.amount
                result.nextLevel = this.props.activityLevel + 1
                result.physicalExercise = this.props.physicalExercise
                result.breathingExercise = this.props.breathingExercise
                result.completedAllPhysical = this.props.completedAllPhysical
                result.completedAllBreathing = this.props.completedAllBreathing,
                    result.reasonToStop = {
                        disorder: value.disorder,
                        patientNotWilling: value.patientNotWilling
                    }

                //If all breathing exercises in this level are completed, then activity level 1 is completed
                if (this.props.completedAllBreathing) {
                    result.completedLevel = this.state.completedLevel
                    result.nextLevel = this.props.activityLevel + 1
                    this.props.onActivityLevelChange(this.props.activityLevel + 1)
                }
                //If any breathing exercise in this level is not completed, then activity level 1 is  not completed
                else {
                    result.completedLevel = false
                    result.nextLevel = this.props.activityLevel
                }

                //If patient select his own activity, then define maxLevel and nextLevel = 1
                if (this.props.finalSystemLevel === LEVEL) {
                    result.nextLevel = 1
                    result.maxLevel = 1
                    if (!this.props.physicalExercise.hasOwnProperty("legsExercise")) {
                        await this.props.setCompletedAllPhysicalExercise(false)
                        result.completedAllPhysical = this.props.completedAllPhysical
                    }
                }

                // this.props.onActivityLevelChange(this.props.activityLevel + 1)
            }
            // let result = {
            //     maxLevel: this.props.activityLevel,
            //     levelTitle: 'บริหารแขน',
            //     amount: value.amount,
            //     completedLevel: false,
            //     nextLevel: this.props.activityLevel,
            //     physicalExercise: this.props.physicalExercise,
            //     breathingExercise: this.props.breathingExercise,
            //     completedAllPhysical: false,
            //     completedAllBreathing: false,
            //     reasonToStop: {
            //         disorder: value.disorder,
            //         patientNotWilling: value.patientNotWilling
            //     }
            // }
            await this.props.setTimeStop()
            this.props.setDuration()
            this.props.onDoingActivityDone(result)
        }
    }

    onShowDescriptionPress = () => {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }

    changeToPhysicalPress = () => {
        this.setState({
            type: 'physical'
        })
    }

    changeToBreathingPress = () => {
        this.setState({
            type: 'breathing'
        })
        this.props.setLastPhysicalLevel(this.props.systemLevel) //For switching back to physical this level
        this.props.onSystemLevelChange(this.props.lastBreathingLevel) //Back to last breathing 
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
                    <Image source={require('../../assets/images/activities/arms-1.jpg')} style={[_styles.image, { width: 500 }]} />
                    <Image source={require('../../assets/images/activities/arms-2.jpg')} style={_styles.image} />
                </View>

                <View style={_styles.descriptionContainer}>
                    <Button
                        raised
                        backgroundColor={common.primaryColorDark}
                        title='ดูรายละเอียด'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.onShowDescriptionPress}
                    />
                    {this.state.showDescription ?
                        (<View>
                            <Text style={_styles.descriptionText}>▪ กำมือสลับแบมือ 10 ครั้ง </Text>
                            <Text style={_styles.descriptionText}>▪ เหยียดแขนไปด้านหน้า งอศอกสลับกับเหยียดศอก 10 ครั้ง</Text>
                            <Text style={_styles.descriptionText}>▪ เหยียดแขนตรง ยกเหนือศีรษะทีละข้างๆละ 5 ครั้ง</Text>
                        </View>)
                        : null}
                </View>

                {/*Check if this is the final activity that patient can do*/}
                {this.props.finalSystemLevel === LEVEL ? this.renderButtonWhenFinal() : this.renderNormalButton()}
            </View>
        )
    }

    renderMain = () => (
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
                    onPress={this.changeToPhysicalPress}
                />
                <Button
                    raised
                    backgroundColor={this.state.type === 'physical' ? 'white' : common.primaryColor}
                    color={this.state.type === 'physical' ? common.primaryColor : 'white'}
                    title='Breathing'
                    fontSize={18}
                    containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                    buttonStyle={{ borderRadius: 10 }}
                    onPress={this.changeToBreathingPress}
                />
            </View>
            <Text style={_styles.topic}>บริหารแขน-ข้อศอก-ข้อมือ-หัวไหล่</Text>
            <Text style={_styles.detail}>กำสลับแบมือ 10 ครั้ง</Text>
            <Text style={_styles.detail}>เหยียดแขนแล้วงอศอกสลับเหยียดศอก 10 ครั้ง</Text>
            <Text style={_styles.detail}>เหยียดแขนตรงเหนือศีรษะทีละข้างๆละ 5 ครั้ง</Text>
            {(this.state.status === 'doing') ? this.renderActivity() : this.renderForm()}
        </View>
    )

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
    imageContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        marginRight: 180,
        marginTop: 15
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
    text: {
        fontSize: 20,
        color: common.grey,
        marginTop: 20,
        marginRight: 15,
    },
    descriptionText: {
        fontSize: 18,
        color: common.grey,
        lineHeight: 35,
    },
    detail: {
        fontSize: 20,
        color: common.grey,
        marginTop: 20,
        marginRight: 15,
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        height: 220,
        width: 400
    }
})