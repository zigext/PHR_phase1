import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import ActivityProgress from '../components/ActivityProgress'
import Timer from '../components/Timer'
import Stepper from '../components/Stepper'
import SLevel0 from '../components/SLevel0.activity.doing'
import SLevel1 from '../components/SLevel1.activity.doing'
import SLevel2 from '../components/SLevel2.activity.doing'
import SLevel3 from '../components/SLevel3.activity.doing'
import SLevel4 from '../components/SLevel4.activity.doing'
import SLevel5 from '../components/SLevel5.activity.doing'
import SLevel6 from '../components/SLevel6.activity.doing'
import SLevel7 from '../components/SLevel7.activity.doing'
import SLevel8 from '../components/SLevel8.activity.doing'
import SLevel9 from '../components/SLevel9.activity.doing'
import SLevel10 from '../components/SLevel10.activity.doing'
import SLevel11 from '../components/SLevel11.activity.doing'
import SLevel12 from '../components/SLevel12.activity.doing'
import SLevel13 from '../components/SLevel13.activity.doing'
import VoiceTest from '../components/VoiceTest'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'
import Heartrate from '../components/Heartrate'

let dataStore = {}
let physicalExercise = {}
let breathingExercise = {}

class DoingActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            systemLevel: 0,
            activityLevel: 1,
            resultForPassedOn: {},
            physicalExercise: {},
            breathingExercise: {},
            lastPhysicalLevel: 0,
            lastBreathingLevel: 0,
            completedAllPhysical: false,
            completedAllBreathing: false
        }
        this.baseState = this.state
    }



    //System level is activity level that we define for our system
    onSystemLevelChange = async (systemLevel) => {
        await this.setState({ systemLevel })
    }

    //Real activity level by theory
    onActivityLevelChange = async (activityLevel) => {
        await this.setState({ activityLevel })
    }

    onDataChange = async (name, value) => {
        await this.setState({ [name]: value })
        dataStore[name] = value
        console.log("STEP = ", this.state.step)
        console.log("DATA STORE = ", dataStore)
        console.log("STATE = ", this.state)
    }

    onAllPhysicalCompleted = () => {
        this.setState({
            completedAllPhysical: true
        })
    }

    onAllBreathingCompleted = () => {
        this.setState({
            completedAllBreathing: true
        })
    }

    setResult = async (result) => {
        await this.setState({
            resultForPassedOn: result
        })
    }

    //For switching exercise types
    setLastPhysicalLevel = (lastPhysicalLevel) => {
        this.setState({
            lastPhysicalLevel
        })
    }

    //For switching exercise types
    setLastBreathingLevel = (lastBreathingLevel) => {
        this.setState({
            lastBreathingLevel
        })
    }

    setPhysicalExercise = async (name, value) => {
        // this.setState({
        //     physicalExercise.as : value
        // })
        physicalExercise[name] = value
        console.log("Physical exercise = ", physicalExercise)
    }

    setBreathingExercise = async (name, value) => {
        // this.setState({
        //     physicalExercise.as : value
        // })
        breathingExercise[name] = value
        console.log("Breathing exercise = ", breathingExercise)
    }

    setCompletedAllBreathingExercise = (value) => {
        this.setState({
            completedAllBreathing: value
        })
    }

    setCompletedAllPhysicalExercise = (value) => {
        this.setState({
            completedAllPhysical: value
        })
    }



    renderBody = () => {
        switch (this.state.systemLevel) {
            //Fowler position
            case 0:
                return <SLevel0 exception={this.props.exception.ac0} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} activityLevel={this.state.activityLevel} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllPhysical={this.state.completedAllPhysical} completedAllBreathing={this.state.completedAllBreathing} setLastPhysicalLevel={this.setLastPhysicalLevel} />
            //Deep breathing
            case 1:
                return <SLevel1 exception={this.props.exception.ac1} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} activityLevel={this.state.activityLevel} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setBreathingExercise={this.setBreathingExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} lastPhysicalLevel={this.state.lastPhysicalLevel} setLastBreathingLevel={this.setLastBreathingLevel} completedAllPhysical={this.state.completedAllPhysical} completedAllBreathing={this.state.completedAllBreathing} />
            //Effective cough
            case 2:
                return <SLevel2 exception={this.props.exception.ac2} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} activityLevel={this.state.activityLevel} onActivityLevelChange={this.onActivityLevelChange} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setBreathingExercise={this.setBreathingExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} lastPhysicalLevel={this.state.lastPhysicalLevel} setLastBreathingLevel={this.setLastBreathingLevel} completedAllPhysical={this.state.completedAllPhysical} completedAllBreathing={this.state.completedAllBreathing} onAllBreathingCompleted={this.onAllBreathingCompleted} setCompletedAllBreathingExercise={this.setCompletedAllBreathingExercise} />
            //Legs exercising
            case 3:
                return <SLevel3 exception={this.props.exception.ac3} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} activityLevel={this.state.activityLevel} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} lastBreathingLevel={this.state.lastBreathingLevel} setLastPhysicalLevel={this.setLastPhysicalLevel} completedAllPhysical={this.state.completedAllPhysical} completedAllBreathing={this.state.completedAllBreathing} />
            //Arms exercising
            case 4:
                return <SLevel4 allException={this.props.exception} exception={this.props.exception.ac4} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} activityLevel={this.state.activityLevel} onActivityLevelChange={this.onActivityLevelChange} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} lastBreathingLevel={this.state.lastBreathingLevel} setLastPhysicalLevel={this.setLastPhysicalLevel} completedAllPhysical={this.state.completedAllPhysical} completedAllBreathing={this.state.completedAllBreathing} onAllPhysicalCompleted={this.onAllPhysicalCompleted} setCompletedAllPhysicalExercise={this.setCompletedAllPhysicalExercise} />
            //Sitting with free legs position
            case 5:
                return <SLevel5 exception={this.props.exception.ac5} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} activityLevel={this.state.activityLevel} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} onAllPhysicalCompleted={this.onAllPhysicalCompleted} />
            //Legs swinging
            case 6:
                return <SLevel6 exception={this.props.exception.ac6} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onDoingActivityDone={this.props.onDoingActivityDone} onActivityLevelChange={this.onActivityLevelChange} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} />
            //Sitting
            case 7:
                return <SLevel7 exception={this.props.exception.ac7} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} onAllPhysicalCompleted={this.onAllPhysicalCompleted} />
            //Standing position
            case 8:
                return <SLevel8 exception={this.props.exception.ac8} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} />
            //Stationary marching
            case 9:
                return <SLevel9 exception={this.props.exception.ac9} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} doingLevel={1} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} />
            //Walking
            //doingLevel is level that the patient that doing , read from server {this.props.doingLevel}
            case 10:
                return <SLevel10 exception={this.props.exception.ac10} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} doingLevel={1} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} onAllPhysicalCompleted={this.onAllPhysicalCompleted} />
            //Tip toeing
            //doingLevel is level that the patient that doing , read from server
            case 11:
                return <SLevel11 exception={this.props.exception.ac11} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} doingLevel={1} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} onAllPhysicalCompleted={this.onAllPhysicalCompleted} />
            //Stair walking
            //doingLevel is level that the patient that doing , read from server
            case 12:
                return <SLevel12 exception={this.props.exception.ac12} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} doingLevel={7} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore} setPhysicalExercise={this.setPhysicalExercise} physicalExercise={physicalExercise} breathingExercise={breathingExercise} completedAllBreathing={this.state.completedAllBreathing} completedAllPhysical={this.state.completedAllPhysical} onAllPhysicalCompleted={this.onAllPhysicalCompleted} />
            //doingLevel is level that the patient that doing , read from server
            // case 13:
            //     return <SLevel13 exception={this.props.exception.ac13} finalSystemLevel={this.props.exception.finalSystemLevel} resultForPassedOn={this.state.resultForPassedOn} systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} doingLevel={1} onDoingActivityDone={this.props.onDoingActivityDone} setTimeStop={this.props.setTimeStop} setDuration={this.props.setDuration} onDataChange={this.onDataChange} dataStore={dataStore}/>

        }
    }

    render() {
        console.log("Patient current level = ", this.props.doingLevel)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <View>
                                    <Timer style={{ flexDirection: 'row' }}/>
                                    <Heartrate state="doingActivity" preHr={this.props.preHr} />
                                </View>
                                {/*doingLevel={this.props.doingLevel}*/}
                                <ActivityProgress onLevelChanged={this.onLevelChanged} progress={this.state.activityLevel / 10} doingLevel={7} />
                            </View>
                            {this.renderBody()}
                        </View>
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoingActivity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,

    }
})