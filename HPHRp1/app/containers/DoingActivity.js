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

    onSystemLevelChange = async (systemLevel) => {
        await this.setState({ systemLevel })
        console.log("SLevel = ", this.state.systemLevel)
    }

    onActivityDone = () => {

    }

    renderBody = () => {
        switch(this.state.systemLevel) {
            case 1:
                return <SLevel1 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 2:
                return <SLevel2 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 3:
                return <SLevel3 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 4:
                return <SLevel4 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
            case 5:
                return <SLevel5 systemLevel={this.state.systemLevel} onSystemLevelChange={this.onSystemLevelChange}/>
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
                             <ActivityProgress onLevelChanged={this.onLevelChanged} progress={this.state.progress} />
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