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

const LEVEL = 1

export default class SLevel1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            showDescription: false,
            type: 'breathing'
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
            console.log("DONT")
            this.props.onSystemLevelChange(this.props.systemLevel + 1)
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
        this.props.setBreathingExercise('deepBreathing', true)
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
                        this.props.setBreathingExercise('deepBreathing', false)
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
                levelTitle: 'Deep breathing',
                amount: value.amount,
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
        this.props.onSystemLevelChange(this.props.systemLevel + 2)
    }

    changeToBreathingPress = () => {
        this.setState({
            type: 'breathing'
        })
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
        Tts.speak('บริหารปอดด้วยการหายใจเข้าออกลึกๆ 10 ครั้ง ใช้หรือไม่ใช้อุปกรณ์ก็ได้')
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
                            <Text style={[_styles.descriptionText, {fontWeight: 'bold'}]}>กรณีไม่ใช้อุปกรณ์</Text>
                            <Text style={_styles.descriptionText}>▪ ใช้มือข้างหนึ่งวางบนทรวงอกและมืออีกข้างวางบริเวณหน้าท้อง</Text>
                            <Text style={_styles.descriptionText}>▪ สูดลมหายใจเข้าทางจมูกช้าๆ จนท้องป่องออกทำให้มือที่วางบนหน้าท้องรู้สึกได้ จนเกือบสุด แล้วค่อยๆสูดหายใจเข้าอีกพร้อมกับยกหน้าอกและหัวไหล่ขึ้นจนมือที่วางบนทรวงอกรู้สึกได้</Text>
                            <Text style={_styles.descriptionText}>▪ ค่อยๆ ผ่อนลมหายใจออกทางปากช้าๆ จนสุด พักสักครู่</Text>
                            <Text> </Text>
                            <Text style={[_styles.descriptionText, {fontWeight: 'bold'}]}>กรณีใช้อุปกรณ์ Triflow</Text>
                            <Text style={_styles.descriptionText}>▪ ควบคุมการหายใจเข้าออก 1-2 ครั้ง </Text>
                            <Text style={_styles.descriptionText}>▪ ใช้ริมฝีปากอมอุปกรณ์ส่วนท่อของเครื่อง</Text>
                            <Text style={_styles.descriptionText}>▪ สูดลมหายใจเข้าทางปากให้เต็มที่จนลูกบอลลอยขึ้น และให้ลอยคงไว้ให้นานที่สุด แล้วค่อยๆผ่านหายใจออก แล้วหายใจปกติ 3-4 ครั้ง</Text>
                            <Text style={_styles.descriptionText}>▪ ทำซ้ำจนครบ 10 ครั้ง หยุดพัก ควรทำทุก 1-2 ชั่วโมงขณะตื่น</Text>
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
                        backgroundColor={this.state.type === 'breathing' ? 'white' : common.primaryColor }
                        color={this.state.type === 'breathing' ? common.primaryColor : 'white' }
                        title='Physical'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.changeToPhysicalPress}
                    />
                    <Button
                        raised
                        backgroundColor={this.state.type === 'breathing' ? common.primaryColor : 'white' }
                        color={this.state.type === 'breathing' ?  'white' : common.primaryColor }
                        title='Breathing'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.changeToBreathingPress}
                    />
                </View>
                <Text style={_styles.topic}>บริหารปอดด้วยการหายใจเข้าออกลึกๆ 10 ครั้ง ใช้หรือไม่ใช้อุปกรณ์ก็ได้ </Text>
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