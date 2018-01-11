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
            showDescription: false
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

const LEVEL = 2

export default class SLevel2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing'
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
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }

    onInputFilled = async () => {
        let value = this.refs.form.getValue()
        if (value) {
            let result = {
                maxLevel: this.props.activityLevel,
                levelTitle: 'Deep breathing',
                amount: value.amount,
                completedLevel: false,
                nextLevel: this.props.activityLevel
            }
            console.log("amount = ", result)
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

    //In case of activity is not completed
    renderForm = () => {
        return (
            <View style={{ marginTop: 30 }}>
                <Form ref='form' type={input} options={options} />
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
        Tts.speak('บริหารปอดด้วยวิธี Deep breathing')
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
                            <Text style={_styles.descriptionText}>▪ ใช้มือข้างหนึ่งวางบนทรวงอกและมืออีกข้างวางบริเวณหน้าท้อง</Text>
                            <Text style={_styles.descriptionText}>▪ สูดลมหายใจเข้าทางจมูกช้าๆ จนท้องป่องออกทำให้มือที่วางบนหน้าท้องรู้สึกได้ จนเกือบสุด แล้วค่อยๆสูดหายใจเข้าอีกพร้อมกับยกหน้าอกและหัวไหล่ขึ้นจนมือที่วางบนทรวงอกรู้สึกได้</Text>
                            <Text style={_styles.descriptionText}>▪ ค่อยๆ ผ่อนลมหายใจออกทางปากช้าๆ จนสุด พักสักครู่</Text>
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
                <Text style={_styles.topic}>บริหารปอดด้วยวิธี Deep breathing 5-10 ครั้ง</Text>
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