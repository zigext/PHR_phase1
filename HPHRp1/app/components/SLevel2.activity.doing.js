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
            label: 'จำนวนครั้งที่ทำได้',
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

const LEVEL = 2

export default class SLevel2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            completedLevel: false,
            showDescription: false,
            type: 'breathing'
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
            Tts.speak('ไออย่างมีประสิทธิภาพ')
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

    onSystemLevelChange = () => {
        if (!this.props.breathingExercise.hasOwnProperty("deepBreathing")) {
            this.props.setCompletedAllBreathingExercise(false)
        }
        else {
            this.props.onAllBreathingCompleted()
        }
        
        this.props.setBreathingExercise('effectiveCough', true)
        //If other physical exercises in this level are completed, then go to next activityLevel
        if (this.props.completedAllPhysical) {
            this.props.onActivityLevelChange(this.props.activityLevel + 1)
            this.props.onSystemLevelChange(5) //go to sit with free legs position
        }
        else {
            this.props.onSystemLevelChange(this.props.lastPhysicalLevel) //go to last physical level
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
                                        this.props.setBreathingExercise('effectiveCough', true)
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
                                        this.props.setBreathingExercise('effectiveCough', false)
                                    }
                                }
                            ]
                        )
                        //    this.setState({status: 'done'})
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }

    onInputFilled = async () => {
        let value = this.refs.form.getValue()
        if (value) {
            let result = {}

            //End but activity not completed
            if (!this.state.completedLevel) {
                // await this.props.onAllPhysicalCompleted()

                result.maxLevel = this.props.activityLevel
                result.levelTitle = 'ไออย่างมีประสิทธิภาพ'
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
                }


            }
            //End and activity completed
            else {

                await this.props.onAllBreathingCompleted()

                result.maxLevel = this.props.activityLevel
                result.levelTitle = 'ไออย่างมีประสิทธิภาพ'
                result.amount = value.amount
                result.physicalExercise = this.props.physicalExercise
                result.breathingExercise = this.props.breathingExercise
                result.completedAllPhysical = this.props.completedAllPhysical
                result.completedAllBreathing = this.props.completedAllBreathing
                result.reasonToStop = {
                    disorder: value.disorder,
                    patientNotWilling: value.patientNotWilling
                }
                //If all physical exercises in this level are completed, then activity level 1 is completed
                if (this.props.completedAllPhysical) {
                    result.completedLevel = this.state.completedLevel
                    result.nextLevel = this.props.activityLevel + 1
                    this.props.onActivityLevelChange(this.props.activityLevel + 1)
                }
                //If any physical exercise in this level is not completed, then activity level 1 is  not completed
                else {
                    result.completedLevel = false
                    result.nextLevel = this.props.activityLevel
                }

                //If patient select his own activity, then define maxLevel and nextLevel = 1
                if (this.props.finalSystemLevel === LEVEL) {
                    result.nextLevel = 1
                    result.maxLevel = 1
                    if (!this.props.breathingExercise.hasOwnProperty("deepBreathing")) {
                        await this.props.setCompletedAllBreathingExercise(false)
                        result.completedAllBreathing = this.props.completedAllBreathing
                    }
                }
            }



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

    //The next physical exercise is on systemLevel 3
    changeToPhysicalPress = () => {
        this.setState({
            type: 'physical'
        })
        this.props.setLastBreathingLevel(this.props.systemLevel) //For switching back to breathing
        this.props.onSystemLevelChange(this.props.lastPhysicalLevel) //Switch to last physical level
    }

    changeToBreathingPress = () => {
        this.setState({
            type: 'breathing'
        })
    }

    //In case of activity is not completed
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
                        color='#d6d4e0'
                        size={35}
                        onPress={this.onActivityDone}
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
                    <Image source={require('../../assets/images/daily1.png')} style={_styles.image} />
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
                            <Text style={_styles.descriptionText}>▪ ใช้มือทั้งสองข้าง หมอน หรือผ้าห่มประคองแผลผ่าตัดที่หน้าอก </Text>
                            <Text style={_styles.descriptionText}>▪ อยู่ในท่านั่ง โน้มตัวมาด้านหน้าเล็กน้อย</Text>
                            <Text style={_styles.descriptionText}>▪ สูดลมหายใจเข้าให้ลึกพอควร แล้วพยายามไอเพื่อขับเสมหะออก อาจรู้สึกเจ็บแผลพอสมควรขณะไอ</Text>
                        </View>)
                        : null}
                </View>

                {/*Check if this is the final activity that patient can do*/}
                {this.props.finalSystemLevel === LEVEL ? this.renderButtonWhenFinal() : this.renderNormalButton()}
                {/*<Icon
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
                        color='#d6d4e0'
                        size={35}
                        onPress={this.onActivityDone}
                        containerStyle={{ alignSelf: 'flex-end' }}
                    />
                </View>*/}
            </View>
        )
    }

    render() {
        return (
            <View style={_styles.container}>
                <View style={_styles.typeExerciseContainer}>
                    <Button
                        raised
                        backgroundColor={this.state.type === 'breathing' ? 'white' : common.primaryColor}
                        color={this.state.type === 'breathing' ? common.primaryColor : 'white'}
                        title='Physical'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.changeToPhysicalPress}
                    />
                    <Button
                        raised
                        backgroundColor={this.state.type === 'breathing' ? common.primaryColor : 'white'}
                        color={this.state.type === 'breathing' ? 'white' : common.primaryColor}
                        title='Breathing'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.changeToBreathingPress}
                    />
                </View>
                <Text style={_styles.topic}>ไออย่างมีประสิทธิภาพ</Text>
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
    descriptionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        marginRight: 180
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
    image: {
        resizeMode: 'center',
        margin: 10,
        height: 220,
    }
})