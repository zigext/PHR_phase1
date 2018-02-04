import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, ToastAndroid } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { cloneDeep } from 'lodash'

let Form = t.form.Form
const myCustomStylesheet = cloneDeep(t.form.Form.stylesheet)
myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'

let options = {
    fields: {
        ac0: {
            label: 'นั่งหัวสูง',
        },
        ac1: {
            label: 'บริหารปอดด้วยการหายใจเข้าออกลึกๆ 10 ครั้ง ใช้หรือไม่ใช้อุปกรณ์ก็ได้',
        },
        ac2: {
            label: 'ไออย่างมีประสิทธิภาพ',
        },
        ac3: {
            label: 'บริหารขา-ข้อเท้า',
        },

        ac4: {
            label: 'บริหารแขน-ข้อมือ',
        },
        ac5: {
            label: 'นั่งห้อยขาข้างเตียง โดยไม่พิงหลัง',
        },
        ac6: {
            label: 'แกว่งเท้า',
        },
        ac7: {
            label: 'นั่งเก้าอี้ข้างเตียง',
        },
        ac8: {
            label: 'ยืนข้างเตียง',
        },
        ac9: {
            label: 'เดินย่ำอยู่กับที่',
        },

        ac10: {
            label: 'เดิน',
        },
        ac11: {
            label: 'เขย่งเท้าขึ้นลง',
        },
        ac12: {
            label: 'เดินขึ้นลงบันได',
        }

    },
    stylesheet: myCustomStylesheet
}

let input = t.struct({
    ac0: t.Boolean,
    ac1: t.Boolean,
    ac2: t.Boolean,
    ac3: t.Boolean,
    ac4: t.Boolean,
    ac5: t.Boolean,
    ac6: t.Boolean,
    ac7: t.Boolean,
    ac8: t.Boolean,
    ac9: t.Boolean,
    ac10: t.Boolean,
    ac11: t.Boolean,
    ac12: t.Boolean

})

export default class Step6Pre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'initial'
        }
    }

    //Start doing activity
    onStartDoingActivity = () => {
        this.props.onPreActivityDone(this.props.dataStore)
    }

    //Back to state 1
    //Save only pre-activity's test result
    onBackToStarter = async () => {
        Alert.alert(
            'แบบทดสอบก่อนทำกิจกรรม',
            'ต้องการย้อนกลับสู่หน้าแรกหรือไม่?',
            [
                {
                    text: 'ใช่', onPress: async () => {
                        await this.props.saveOnlyPreActivity(this.props.dataStore)
                        this.props.resetState()
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )
    }

    onSelectActivityPress = () => {
        this.setState({
            status: 'choosing'
        })
    }

    //Failed pre-test and want to do activities 
    //Done selecting activities
    onStartActivityAfterSelect = () => {
        let value = this.refs.form.getValue()
        if (value) {
            Alert.alert(
                'แบบทดสอบก่อนทำกิจกรรม',
                'ต้องการสิ้นสุดการทำแบบทดสอบหรือไม่? กรุณาตรวจสอบความถูกต้อง',
                [
                    {
                        text: 'ใช่', onPress: async () => {
                            //For final system's level activity that patient has to do
                            let finalSystemLevel
                            if (value.ac0) finalSystemLevel = 0
                            if (value.ac1) finalSystemLevel = 1
                            if (value.ac2) finalSystemLevel = 2
                            if (value.ac3) finalSystemLevel = 3
                            if (value.ac4) finalSystemLevel = 4
                            if (value.ac5) finalSystemLevel = 5
                            if (value.ac6) finalSystemLevel = 6
                            if (value.ac7) finalSystemLevel = 7
                            if (value.ac8) finalSystemLevel = 8
                            if (value.ac9) finalSystemLevel = 9
                            if (value.ac10) finalSystemLevel = 10
                            if (value.ac11) finalSystemLevel = 11
                            if (value.ac12) finalSystemLevel = 12
                            // if (value.ac13) finalSystemLevel = 13

                            this.props.onSelectActivity(value, finalSystemLevel)
                            this.props.onPreActivityDone(this.props.dataStore)
                        }
                    },
                    { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                ]
            )
        }
        else {
            ToastAndroid.showWithGravity('กรุณาเลือกกิจกรรม', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    renderSelectActivity = () => {
        return (
            <View>
                <Text style={[_styles.text, { fontWeight: 'bold' }]}>เลือกกิจกรรมฟื้นฟูหัวใจที่สามารถทำได้</Text>
                <View style={_styles.formContainer}>
                    <Form ref='form' type={input} options={options} />
                </View>
                <View style={_styles.buttonContainer}>
                    <Button
                        raised
                        icon={{ name: 'home' }}
                        title='กลับสู่หน้าเริ่มต้น'
                        backgroundColor='grey'
                        onPress={this.onBackToStarter} />
                    <Button
                        raised
                        iconRight
                        icon={{ name: 'play', type: 'foundation' }}
                        title='เริ่มทำกิจกรรม'
                        backgroundColor={common.accentColor}
                        onPress={this.onStartActivityAfterSelect} />
                </View>
            </View>
        )
    }

    //If any of the conditions is true, should consult with doctor
    checkPreTestResult = () => {
        for (let property in this.props.dataStore) {
            if (this.props.dataStore[property] === true) {
                console.log("TRUE ", property)
                //If the first time doing activity. Pre-test result is passed. The preActivity.passed wil be true.
                //So this condition is to ignore the passed property.
                if (property !== "passed") {
                    return (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    raised
                                    reverse
                                    name='warning'
                                    type='font-awesome'
                                    color='#c81837'
                                    size={35}
                                />
                                <Text style={_styles.text}>กรุณาปรึกษาแพทย์เพื่อพิจารณาการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ</Text>
                            </View>
                            <View style={_styles.buttonContainer}>
                                <Button
                                    raised
                                    icon={{ name: 'home' }}
                                    title='กลับสู่หน้าเริ่มต้น'
                                    backgroundColor='grey'
                                    onPress={this.onBackToStarter} />
                                <Button
                                    raised
                                    iconRight
                                    icon={{ name: 'md-settings', type: 'ionicon' }}
                                    title='เลือกกิจกรรมที่ทำได้'
                                    backgroundColor={common.accentColor}
                                    onPress={this.onSelectActivityPress} />
                            </View>
                        </View>
                    )
                }
            }
        }
        return (
            <View>
                <Text style={_styles.text}>มีความพร้อมในการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ</Text>
                <View style={_styles.buttonContainer}>
                    <Button
                        raised
                        icon={{ name: 'home' }}
                        title='กลับสู่หน้าเริ่มต้น'
                        backgroundColor='grey'
                        onPress={this.onBackToStarter} />
                    <Button
                        raised
                        iconRight
                        icon={{ name: 'play', type: 'foundation' }}
                        title='เริ่มทำกิจกรรม'
                        backgroundColor={common.accentColor}
                        onPress={this.onStartDoingActivity} />
                </View>
            </View>

        )
    }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    {this.state.status === 'initial' ? this.checkPreTestResult() : this.renderSelectActivity()}
                </ScrollView>
            </View>
        )

    }
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 20,
        marginHorizontal: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50,
    },
    formContainer: {
        marginLeft: 60,
        marginRight: 300
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: common.grey,
        marginBottom: 25,
        marginTop: 20,
    }
})