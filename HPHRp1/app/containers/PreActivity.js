import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import firebase from '../config/Firebase'
import ActivityProgress from '../components/ActivityProgress'
import Timer from '../components/Timer'
import Step1Pre from '../components/Step1.activity.pre'
import Step2Pre from '../components/Step2.activity.pre'
import Step3Pre from '../components/Step3.activity.pre'
import Step4Pre from '../components/Step4.activity.pre'
import Step5Pre from '../components/Step5.activity.pre'
import Step6Pre from '../components/Step6.activity.pre'
import Stepper from '../components/Stepper'
import Borg from '../components/Borg'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'
import { split } from 'lodash'

let dataStore = {}

class PreActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: 'pre activity',
            step: 1,
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
    componentDidMount() {
        Orientation.lockToLandscape()
        // this.setInitialValue()

    }

    onPreActivityDone = (value) => {
        this.setState({
            state: 'doing activity'
        })
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
        if (name === 'bp') {
            let bpArray = split(value, '/')
            //High systolic
            if (bpArray[0] > 180) {
                await this.setState({ ['highSbp']: true })
                dataStore['highSbp'] = true
            }
            else {
                await this.setState({ ['highSbp']: false })
                dataStore['highSbp'] = false
            }
            //High diastolic
            if (bpArray[1] > 110) {
                await this.setState({ ['highDbp']: true })
                dataStore['highDbp'] = true
            }
            else {
                await this.setState({ ['highDbp']: false })
                dataStore['highDbp'] = false
            }
        }
        console.log("STEP = ", this.state.step)
        console.log("DATA STORE = ", dataStore)
        console.log("STATE = ", this.state)
    }

    setInitialValue = () => {
        this.setState({ hr: '', bp: '' })
    }


    // renderPreActivity = () => {
    //     return (

    //         <View style={styles.container}>
    //             <Instructions />
    //             <PreActivityForm onSubmitStep0={this.onSubmitStep0} />
    //         </View>
    //     )
    // }

    renderBody = () => {
        switch (this.state.step) {
            case 1: 
                return <Step1Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} hr={this.state.hr} bp={this.state.bp} />
            case 2:
                return <Step2Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} sbpLowerThanNormal={this.state.sbpLowerThanNormal} abnormalGlucose={this.state.abnormalGlucose} weakMuscle={this.state.weakMuscle} />
            case 3:
                return <Step3Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} st={this.state.st} pvc={this.state.pvc} af={this.state.af} svt={this.state.svt} bradycardia={this.state.bradycardia} stSegment={this.state.stSegment} />
            case 4:
                return <Step4Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} agitation={this.state.agitation} dyspnea={this.state.dyspnea} af={this.state.af} rr={this.state.rr} spO2={this.state.spO2} paO2={this.state.paO2} />
            case 5:
                return <Step5Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} anemia={this.state.anemia} fatigue={this.state.fatigue} nausea={this.state.nausea} chestPain={this.state.chestPain} dizziness={this.state.dizziness} pain={this.state.pain} />
            case 6:
                return <Step6Pre onStepChange={this.onStepChange} onPreActivityDone={this.onPreActivityDone} dataStore={dataStore} resetState={this.resetState}/>    
    }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Stepper step={this.state.step} onStepChange={this.onStepChange} />
                <View style={{ flex: 1 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreActivity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',

    }
})