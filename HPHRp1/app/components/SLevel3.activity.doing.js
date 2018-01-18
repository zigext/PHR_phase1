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

const LEVEL = 3

export default class SLevel3 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing',
            showDescription: false,
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
            Tts.speak('บริหารขาและข้อเท้า')
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
        this.props.setPhysicalExercise('legsExercise', true)
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
                        this.props.setPhysicalExercise('legsExercise', false)
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
            let result = {
                maxLevel: this.props.activityLevel,
                levelTitle: 'บริหารขาและข้อเท้า',
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
                            <Text style={_styles.descriptionText}>▪ ยืดขาตรง ยกขาสูงประมาณ 30 องศาโดยใช้หมอนรองให้ปลายเท้าพ้นหมอน  </Text>
                            <Text style={_styles.descriptionText}>▪ กระดกเท้าเข้าหาลำตัวนับ 1,2 แล้วเหยียดเท้าออกให้รู้สึกเกร็งบริเวณน่อง นับเป็น 1 ครั้ง ทำจนครบ 20 ครั้ง ทำทีละข้างหรือพร้อมกันก็ได้</Text>
                            <Text style={_styles.descriptionText}>▪ หมุนข้อเท้าตามเข็มนาฬิกา 10 ครั้ง หมุนทวนเข็มนาฬิกา 10 ครั้ง ทั้งสองข้าง</Text>
                            <Text style={_styles.descriptionText}>▪ งอข้อเข่าและสะโพก สลับกับเหยียดออกทีละข้างๆละ 5 ครั้ง</Text>
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
                        backgroundColor={this.state.type === 'physical' ? common.primaryColor  : 'white' }
                        color={this.state.type === 'physical' ? 'white' : common.primaryColor  }
                        title='Physical'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.changeToPhysicalPress}
                    />
                    <Button
                        raised
                        backgroundColor={this.state.type === 'physical' ? 'white' : common.primaryColor  }
                        color={this.state.type === 'physical' ?  common.primaryColor : 'white'}
                        title='Breathing'
                        fontSize={18}
                        containerViewStyle={{ alignSelf: 'flex-start', borderRadius: 10 }}
                        buttonStyle={{ borderRadius: 10 }}
                        onPress={this.changeToBreathingPress}
                    />
                </View>
                <Text style={_styles.topic}>บริหารขา-ข้อเท้า</Text>
                <Text style={_styles.detail}>กระดกเท้าเข้าหาลำตัวแล้วเหยียดออก 10 ครั้ง</Text>
                <Text style={_styles.detail}>หมุนข้อเท้าตามเข็มนาฬิกา 10 ครั้ง</Text>
                <Text style={_styles.detail}>หมุนข้อเท้าทวนเข็มนาฬิกา 10 ครั้ง</Text>
                <Text style={_styles.detail}>งอเข่าและสะโพก แล้วเหยียดออก ทีละข้างๆละ 5 ครั้ง</Text>
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
    detail: {
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