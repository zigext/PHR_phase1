import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import common from '../styles/common'
import Step0Post from '../components/Step0.activity.post'
import Step1Post from '../components/Step1.activity.post'
import Step2Post from '../components/Step2.activity.post'
import Step3Post from '../components/Step3.activity.post'
import Step4Post from '../components/Step4.activity.post'
// import Step5Pre from '../components/Step5.activity.pre'
// import Step6Pre from '../components/Step6.activity.pre'
import Stepper from '../components/Stepper'
// import { SERVER_IP, PIN } from '../config/Const'
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
            hr: '',
            bp: '',
            highSbp: false,
            highDbp: false,
            abnormalGlucose: false,
            weakMuscle: false,
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
            pain: false
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
        // const path = `${SERVER_IP}${PIN}`
        // await fetch(path, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userid: '1416382941765846', //this.props.default.user.uid
        //         appid: 'PHRapp', //this.props.defalt.appId
        //         pin: pin
        //     })
        // })
        //     .then(ApiUtils.checkStatus)
        //     .then(responseData => {
        //         if(responseData === true) {
        //             callback(true)
        //         }
        //         else {
        //             callback(false)
        //         } 

        //     })
        //     .catch(error => {
        //        callback(null, error)     
        //     })
    }


    renderBody = () => {
        switch (this.state.step) {
            case 0:
                return <Step0Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} checkNursePin={this.checkNursePin} />
            case 1:
                return <Step1Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} />
                //Borg scale
            case 2:
                return <Step2Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} />
            case 3:
                return <Step3Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} />
            case 4:
                return <Step4Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} />
            // case 2:
            //     return <Step2Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} sbpLowerThanNormal={this.state.sbpLowerThanNormal} abnormalGlucose={this.state.abnormalGlucose} weakMuscle={this.state.weakMuscle} />
            // case 3:
            //     return <Step3Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} st={this.state.st} pvc={this.state.pvc} af={this.state.af} svt={this.state.svt} bradycardia={this.state.bradycardia} stSegment={this.state.stSegment} />
            // case 4:
            //     return <Step4Post step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} agitation={this.state.agitation} dyspnea={this.state.dyspnea} af={this.state.af} rr={this.state.rr} spO2={this.state.spO2} paO2={this.state.paO2} />
            // case 5:
            //     return <Step5Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} anemia={this.state.anemia} fatigue={this.state.fatigue} nausea={this.state.nausea} chestPain={this.state.chestPain} dizziness={this.state.dizziness} pain={this.state.pain} />
            // case 6:
            //     return <Step6Pre onStepChange={this.onStepChange} onPreActivityDone={this.props.onPreActivityDone} dataStore={dataStore} resetState={this.resetState} />
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>{this.props.firstname} {this.props.lastname} รหัสผู้ป่วย {this.props.patientCode}</Text>
                {(this.state.step === 0) ? null : <Stepper step={this.state.step} onStepChange={this.onStepChange} />}

                <View style={{ flex: 1, marginTop: 10 }}>
                    {this.renderBody()}
                </View>
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
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
    },
    text: {
        fontSize: 20,
        color: common.grey,
        textAlign: 'right',
        marginTop: 20,
        marginRight: 20,
        marginBottom: 10,
    }
})