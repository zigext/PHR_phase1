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
        disorder: {
            label: 'เกิดอาการผิดปกติ'
        },
        patientNotWilling: {
            label: 'ผู้ป่วยไม่ประสงค์ทำกิจกรรมต่อ'
        }
    },
    stylesheet: myCustomStylesheet
}

let input = t.struct({
    disorder: t.Boolean,
    patientNotWilling: t.Boolean
})

const LEVEL = 0

export default class SLevel1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            showDescription: false,
            type: 'physical'
        }
        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this)
        Voice.onSpeechError = this.onSpeechError.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this)
    }


    componentDidMount = () => {
        Voice.start('th-TH')
        //If patient can't do this activity
        if (typeof this.props.exception === 'boolean' && this.props.exception === false) {
            this.props.onSystemLevelChange(this.props.systemLevel + 1)
        }
        else {
            Tts.speak('นั่งหัวสูงบนเตียง 45 ถึง 60 องศา')
        }
    }

    componentWillUnmount() {
        // Voice.destroy().then(Voice.removeAllListeners)
        // Tts.stop()
    }

    onSpeechStart(e) {
        console.log("Speech start")
    }
    onSpeechRecognized(e) {
        console.log("Speech recognized")
    }
    onSpeechEnd(e) {
        console.log("Speech end")
    }
    onSpeechError(e) {
        console.log("Speech error = ", JSON.stringify(e.error))
    }
    onSpeechResults(e) {
        console.log("Speech results = ", e.value)
    }
    onSpeechPartialResults(e) {
        console.log("Speech partial results = ", e.value)
    }

    onStartButtonPress(e) {
        Voice.start('th-TH')
    }

    onSystemLevelChange = () => {
        // let result = {
        //         maxLevel: this.props.activityLevel,
        //         levelTitle: 'Breathing control',
        //         completedLevel: true,
        //         nextLevel: this.props.activityLevel
        //     }
        this.props.setLastPhysicalLevel(3) //Set to leg exercise's level. In case of user doesn't switch. So it will go to systemLevel 3
        this.props.setPhysicalExercise('fowlerPosition', true)
        this.props.onSystemLevelChange(this.props.systemLevel + 1)
    }

    onActivityDone = () => {
        Alert.alert(
            'กิจกรรมฟื้นฟูสมรรถภาพหัวใจ',
            'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.setState({ status: 'done' })
                        this.props.setPhysicalExercise('fowlerPosition', false)
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }
    //In case of activity is not completed
    onInputFilled = async () => {
        let result = {}
        let value = this.refs.form.getValue()
        if (value) {
            result = {
                maxLevel: this.props.activityLevel,
                levelTitle: 'นั่งหัวสูง',
                // amount: value.amount,
                completedLevel: false,
                nextLevel: this.props.activityLevel,
                physicalExercise: this.props.physicalExercise,
                breathingExercise: this.props.breathingExercise,
                completedAllPhysical: this.props.completedAllPhysical,
                completedAllBreathing: this.props.completedAllBreathing,
                reasonToStop: {
                    disorder: value.disorder,
                    patientNotWilling: value.patientNotWilling
                }
            }
            //If patient select his own activity, then define maxLevel and nextLevel = 1
            if (this.props.finalSystemLevel === LEVEL) {
                result.nextLevel = 1
                result.maxLevel = 1
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

                {/*Check if this is the final activity that patient can do*/}
                {this.props.finalSystemLevel === LEVEL ? this.renderButtonWhenFinal() : this.renderNormalButton()}
            </View>
        )
    }

    render() {

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
                        onPress={() => ToastAndroid.showWithGravity('ไม่สามารถสลับไปทำ Breathing exercise ได้', ToastAndroid.SHORT, ToastAndroid.CENTER)}
                    />
                </View>
                <Text style={_styles.topic}>นั่งหัวสูงบนเตียง 45-60 องศา</Text>
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