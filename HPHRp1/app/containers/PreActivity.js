import React from 'react'
import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import common from '../styles/common'
import Step1Pre from '../components/Step1.activity.pre'
import Step2Pre from '../components/Step2.activity.pre'
import Step3Pre from '../components/Step3.activity.pre'
import Step4Pre from '../components/Step4.activity.pre'
import Step5Pre from '../components/Step5.activity.pre'
import Step6Pre from '../components/Step6.activity.pre'
import Stepper from '../components/Stepper'
import { connect } from 'react-redux'
import moment from 'moment'
import { split } from 'lodash'

let dataStore = {}

class PreActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            preHr: '',
            preBp: '',
            highSbp: false,
            highDbp: false,
            sbpLowerThanNormal: false,
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
    }

    onStepChange = async (step) => {
        await this.setState({ step })
    }

    onDataChange = async (name, value) => {
        await this.setState({ [name]: value })
        dataStore[name] = value
        //If blood pressure, set systolic and diastolic 
        //calculeted from input field
        if (name === 'preBp') {
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
    }

    //Calculate pre-test result
    calculatePreActivity = async () => {
        //If any condition is true
        //Not passed
        for (let property in dataStore) {
            if (dataStore[property] === true) {
                await this.setState({ passed: false })
                dataStore.passed = false
                return
            }
        }
        await this.setState({ passed: true })
        dataStore.passed = true
    }

    connectPress = () => {
        this.props.setUseBLE(null)
        this.props.setConnectToBLE(false)
    }

    renderBody = () => {
        switch (this.state.step) {
            case 1:
                return <Step1Pre useBLE={this.props.useBLE} peripheral={this.props.peripheral} setTimeStart={this.props.setTimeStart} step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} preHr={this.state.preHr} preBp={this.state.preBp} />
            case 2:
                return <Step2Pre step={this.state.step} onStepChange={this.onStepChange} onDataChange={this.onDataChange} sbpLowerThanNormal={this.state.sbpLowerThanNormal} abnormalGlucose={this.state.abnormalGlucose} weakMuscle={this.state.weakMuscle}
                    st={this.state.st} pvc={this.state.pvc} af={this.state.af} svt={this.state.svt} bradycardia={this.state.bradycardia} stSegment={this.state.stSegment}
                    agitation={this.state.agitation} dyspnea={this.state.dyspnea} af={this.state.af} rr={this.state.rr} spO2={this.state.spO2} paO2={this.state.paO2}
                    anemia={this.state.anemia} fatigue={this.state.fatigue} nausea={this.state.nausea} chestPain={this.state.chestPain} dizziness={this.state.dizziness} pain={this.state.pain}
                    calculatePreActivity={this.calculatePreActivity}
                />
            case 3:
                return <Step6Pre onStepChange={this.onStepChange} onPreActivityDone={this.props.onPreActivityDone} dataStore={dataStore} resetState={this.resetState} onSelectActivity={this.props.onSelectActivity} saveOnlyPreActivity={this.props.saveOnlyPreActivity} />
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }} >
                <KeyboardAwareScrollView>
                    <View style={styles.headerContainer}>
                        {this.props.useBLE ? (
                            <Button
                                raised
                                backgroundColor='white'
                                color={common.primaryColorDark}
                                title='ยกเลิกการเชื่อมต่อกับอุปกรณ์ Bluetooth'
                                fontSize={14}
                                containerViewStyle={{ borderRadius: 10, alignSelf: 'flex-start' }}
                                buttonStyle={{ borderRadius: 10 }}
                                onPress={() => Alert.alert(
                                    'ยกเลิกการเชื่อมต่ออุปกรณ์ Bluetooth',
                                    `ต้องการยกเลิกการเชื่อมต่อกับ ${this.props.peripheral.name} หรือไม่?`,
                                    [
                                        {
                                            text: 'ใช่', onPress: () => {
                                                this.props.disconnectBLE()
                                            }
                                        },
                                        { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                                    ]
                                )}
                            />
                        ) : (
                                <Button
                                    raised
                                    backgroundColor='white'
                                    color={common.primaryColorDark}
                                    title='เชื่อมต่อกับอุปกรณ์ Bluetooth'
                                    fontSize={14}
                                    containerViewStyle={{ borderRadius: 10, alignSelf: 'flex-start' }}
                                    buttonStyle={{ borderRadius: 10 }}
                                    onPress={this.connectPress}
                                />
                            )}

                        <View style={styles.patientInfoContainer}>
                            <Text style={styles.text}>{this.props.firstname} {this.props.lastname}  รหัสผู้ป่วย {this.props.patientCode}</Text>
                            <Image source={{ uri: this.props.pictureUri }} style={styles.image}></Image>
                        </View>
                    </View>
                    <Stepper step={this.state.step} onStepChange={this.onStepChange} totalStep={3} />
                    <View style={styles.bodyContainer} >
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

export default connect(mapStateToProps, mapDispatchToProps)(PreActivity)

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        marginTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    patientInfoContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-end'
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