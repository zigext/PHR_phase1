import React from 'react'
import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import common from '../styles/common'
import Step0Post from '../components/Step0.activity.post'
import Step1Post from '../components/Step1.activity.post'
import Step2Post from '../components/Step2.activity.post'
import Step3Post from '../components/Step3.activity.post'
import Step4Post from '../components/Step4.activity.post'
import Stepper from '../components/Stepper'
import { SERVER_IP, PIN_CODE } from '../config/Const'
import ApiUtils from '../components/ApiUtils'
import { connect } from 'react-redux'
import moment from 'moment'
import { split } from 'lodash'

let dataStore = {}

class PostActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            highSbp: false,
            highDbp: false,
            st: false,
            pvc: false,
            af: false,
            svt: false,
            bradycardia: false,
            stSegment: false,
            agitation: false,
            dyspnea: false,
            rr: false,
            spO2: false,
            paO2: false,
            anemia: false,
            fatigue: false,
            nausea: false,
            chestPain: false,
            dizziness: false,
        }
        this.baseState = this.state
    }

    resetState = () => {
        this.setState(this.baseState)
        // this.setState()
    }

    onStepChange = async (step) => {
        await this.setState({ step })
    }

    onDataChange = async (name, value) => {
        await this.setState({ [name]: value })
        dataStore[name] = value
        //If blood pressure, set systolic and diastolic 
        //calculeted from input field
        // if (name === 'bp') {
        //     let bpArray = split(value, '/')
        //     //High systolic
        //     if (bpArray[0] > 180) {
        //         await this.setState({ ['highSbp']: true })
        //         dataStore['highSbp'] = true
        //     }
        //     else {
        //         await this.setState({ ['highSbp']: false })
        //         dataStore['highSbp'] = false
        //     }
        //     //High diastolic
        //     if (bpArray[1] > 110) {
        //         await this.setState({ ['highDbp']: true })
        //         dataStore['highDbp'] = true
        //     }
        //     else {
        //         await this.setState({ ['highDbp']: false })
        //         dataStore['highDbp'] = false
        //     }
        // }
        console.log("STEP = ", this.state.step)
        console.log("DATA STORE = ", dataStore)
        console.log("STATE = ", this.state)
    }

    //Check nurse pin with server
    checkNursePin = (pin, callback) => {
        console.log("pin = ", pin)
        if (pin === 1234)
            callback(true, null)
        else
            callback(false, null)
        // const path = `${SERVER_IP}${PIN_CODE}?pin_code=1416382941765846&appid=HPHR` //pin_code=${pin}&appid=${this.props.default.appId}  //userid=${this.props.UserReducer.user.uid}&appid=${this.props.UserReducer.appId}
        // await fetch(path)
        //     .then(ApiUtils.checkStatus)
        //     .then(response => response.json())
        //     .then(responseData => {
        //         console.log("Check pin success")
        //         let success = responseData.success
        //         if (success)
        //             callback(true, null)
        //         else
        //             callback(false, null)
        //     })
        //     .catch(error => {
        //         console.log("Error in checkNursePin = ", error)
        //     })
    }


    renderBody = () => {
        switch (this.state.step) {
            case 0:
                return <Step0Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} checkNursePin={this.checkNursePin} />
            case 1:
                return <Step1Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} borg={this.state.borg} />
            //Borg scale
            case 2:
                return <Step2Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} postHr={this.state.postHr} postBp={this.state.postBp} />
            case 3:
                return <Step3Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} assistant={this.state.assistant} />
            case 4:
                return <Step4Post step={this.state.step} onStepChange={this.onStepChange} onPostActivityDone={this.props.onPostActivityDone} dataStore={dataStore} />

            // case 6:
            //     return <Step6Pre onStepChange={this.onStepChange} onPreActivityDone={this.props.onPreActivityDone} dataStore={dataStore} resetState={this.resetState} />
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <View style={styles.patientInfoContainer}>
                        <Text style={styles.text}>{this.props.firstname} {this.props.lastname} รหัสผู้ป่วย {this.props.patientCode}</Text>
                        <Image source={{ uri: this.props.pictureUri }} style={styles.image}></Image>
                    </View>
                    {(this.state.step === 0) ? null : <Stepper step={this.state.step} onStepChange={this.onStepChange} totalStep={4} />}

                    <View style={styles.bodyContainer}>
                        {this.renderBody()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchLogIn: (email, uid) => dispatch(logIn(email, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostActivity)

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        marginTop: 10
    },
    patientInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: 20,
        color: common.grey,
        textAlign: 'right',
        marginTop: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        margin: 10,
        alignSelf: 'center'
    }
})