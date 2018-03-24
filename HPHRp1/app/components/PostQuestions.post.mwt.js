import React from 'react'
import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import common from '../styles/common'
import Step1PostMwt from '../components/Step1.mwt.post'
import Step2PostMwt from '../components/Step2.mwt.post'
import Step3PostMwt from '../components/Step3.mwt.post'
import Stepper from '../components/Stepper'
import { split, pick } from 'lodash'

let dataStore = {}

export default class PostQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            dyspnea: false,
            perspiration: false,
            vomitting: false,
            palpitation: false,
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
    }

    onDataChangeTmp = async (name, value) => {
        await this.setState({ [name]: value })
        dataStore[name] = value
        console.log("tmp", name, value)
    }

    onStepChange = async (step) => {
        await this.setState({ step })
    }

    onPostQuestionsDone = () => {
        let post = {
            ...pick(dataStore, ['hr', 'bp', 'o2sat', 'ekg']),
            conditions: pick(dataStore, ['dyspnea', 'anemia', 'fatigue', 'vomitting', 'perspiration', 'palpitation', 'nausea', 'chestPain', 'dizziness', 'note'])
        }
        console.log("POST = ", post)
        this.props.onPostQuestionsDone(post)
    }

    renderBody = () => {
        switch (this.state.step) {
            case 1:
                //Borg scale
                return <Step1PostMwt step={this.state.step} onStepChange={this.onStepChange} borg={this.props.borg} onDataChange={this.props.onDataChange} />
            case 2:
                //Post-HR & post-BP & post-O2Sat && EKG && HRmax
                return <Step2PostMwt step={this.state.step} onStepChange={this.onStepChange} onDataChangeTmp={this.onDataChangeTmp} onDataChange={this.props.onDataChange} hr={this.state.hr} bp={this.state.bp} o2sat={this.state.o2sat} hrmax={this.state.hrmax} ekg={this.state.ekg} />
            case 3:
                //Conditions
                return <Step3PostMwt step={this.state.step} onStepChange={this.onStepChange} onDataChangeTmp={this.onDataChangeTmp} onDataChange={this.props.onDataChange} onStatusChange={this.props.onStatusChange} onPostQuestionsDone={this.onPostQuestionsDone} resetState={this.resetState} distance={this.state.distance} dizziness={this.state.dizziness} anemia={this.state.anemia} dyspnea={this.state.dyspnea} vomitting={this.state.vomitting} perspiration={this.state.perspiration} chestPain={this.state.chestPain} nausea={this.state.nausea} palpitation={this.state.palpitation} fatigue={this.state.fatigue} note={this.state.note} />
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <Stepper step={this.state.step} onStepChange={this.onStepChange} totalStep={3} />
                    <View style={styles.bodyContainer}>
                        {this.renderBody()}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}


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