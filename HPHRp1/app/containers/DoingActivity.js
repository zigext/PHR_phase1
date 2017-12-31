import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import ActivityProgress from '../components/ActivityProgress'
import Timer from '../components/Timer'
import Stepper from '../components/Stepper'
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
import VoiceTest from '../components/VoiceTest'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import moment from 'moment'

let dataStore = {}

class DoingActivity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            systemLevel: 1,
            activityLevel: 1,
        }
        this.baseState = this.state
    }

    setTimeStart = () => {
        this.setState({ timeStart: new Date() })
    }


    levelUp = async () => {
        let progress = this.state.progress
        progress += 0.1
        if (progress >= 1) {
            progress = 1
        }
        let level = this.state.level
        level += 1
        if (progress >= 10) {
            progress = 10
        }
        await this.setState({ progress, level })
        // this.props.onLevelChanged(this.state.level)
    }

    levelDown = async () => {
        let progress = this.state.progress
        progress -= 0.1
        if (progress <= 0) {
            progress = 0
        }
        let level = this.state.level
        level -= 1
        if (progress <= 0) {
            progress = 0
        }
        await this.setState({ progress, level })
        // this.props.onLevelChanged(this.state.level)
    }

    finish = () => {
        Alert.alert(
            'สิ้นสุดการทำกิจกรรม',
            'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่?',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.setState({ timeStop: new Date() })
                        let duration = this.calculateDuration(this.state.timeStart, this.state.timeStop)
                        this.setState({ duration })
                    }
                },
                { text: 'ไม่', style: 'cancel' }
            ]
        )
    }

    //System level is activity level that we define for our system
    onSystemLevelChange = async (systemLevel) => {
        await this.setState({ systemLevel })
        console.log("SLevel = ", this.state.systemLevel)
    }

    //Real activity level by theory
    onActivityLevelChange = async (activityLevel) => {
        await this.setState({ activityLevel })
        console.log("ALevel = ", this.state.activityLevel)
    }

    onActivityDone = () => {

    }

    renderBody = () => {
        switch(this.state.systemLevel) {
            case 1:
            // return <VoiceTest />
                return <SLevel1 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 2:
                return <SLevel2 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 3:
                return <SLevel3 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 4:
                return <SLevel4 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 5:
                return <SLevel5 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 6:
                return <SLevel6 systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange}/>
            case 7:
                return <SLevel7 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} />
            case 8:
                return <SLevel8 systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange}/>
            case 9:
                return <SLevel9 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange} doingLevel={1}/>
                //doingLevel is level that the patient that doing , read from server
            case 10:
                return <SLevel10 systemLevel={this.state.systemLevel} activityLevel={this.state.activityLevel} onSystemLevelChange={this.onSystemLevelChange} onActivityLevelChange={this.onActivityLevelChange} doingLevel={1}/>
                //doingLevel is level that the patient that doing , read from server
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Timer />
                             <ActivityProgress onLevelChanged={this.onLevelChanged} progress={this.state.activityLevel/10} />
                        </View>
                        {this.renderBody()}
                    </View>
                           
                            
                       
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/*<Icon
                            raised
                            reverse
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={common.accentColor}
                            size={35}
                            onPress={this.levelUp}
                        />*/}
                        </View>
                 </View>
                 <View>
                         {/*<Button
                             raised
                             backgroundColor='#f49842'
                             title='สิ้นสุด'
                             fontSize={22}
                             onPress={this.finish} />*/}
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
        margin: 20,

    }
})