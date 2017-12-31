import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import * as Progress from 'react-native-progress'

export default class ActivityProgress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            indeterminate: false,
            level: 0
        }
    }

    // componentDidMount() {
    //     this.animate()
    // }

    // levelUp = async () => {
    //     let progress = this.state.progress
    //     progress += 0.1
    //     if (progress >= 1) {
    //         progress = 1
    //     }
    //     let level = this.state.level
    //     level += 1
    //     if (progress >= 10) {
    //         progress = 10
    //     }
    //     await this.setState({ progress, level })
    //     this.props.onLevelChanged(this.state.level)
    // }

    // levelDown = async () => {
    //     let progress = this.state.progress
    //     progress -= 0.1
    //     if (progress <= 0) {
    //         progress = 0
    //     }
    //     let level = this.state.level
    //     level -= 1
    //     if (progress <= 0) {
    //         progress = 0
    //     }
    //     await this.setState({ progress, level })
    //     this.props.onLevelChanged(this.state.level)
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 25 }}>
                    <Progress.Circle size={210} showsText={true} thickness={5} borderWidth={3} color='#29B6F6' progress={this.props.progress}
                        indeterminate={this.state.indeterminate}
                        formatText={progress => `Level ${Math.round(this.props.progress * 10)}`}
                    />
                </View>
                <View style={styles.subContainer}>
                    {/*<Button
                        raised
                        title='ระดับก่อนหน้า'
                        fontSize={22}
                        onPress={this.levelDown} />*/}
                    {/*<Button
                        raised
                        backgroundColor='#7ae516'
                        title='ระดับถัดไป'
                        fontSize={22}
                        onPress={this.levelUp} />*/}
                    {/*<Icon raised reverse name='md-add' type='ionicon' color='#7ae516' size={50} onPress={this.levelUp}
                    />*/}
                    {/*<Icon raised reverse name='minus' type='entypo' color={common.accentColor} size={50} onPress={this.levelDown}
                    />*/}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        // flex: 0.5,
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 20,

    },
    subContainer: {
        flexDirection: 'row',
        padding: 20,

    }

})