import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const formattedSeconds = (sec) =>
    Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
            laps: [],
            lastClearedIncrementer: null
        }
        this.incrementer = null
    }

    componentDidMount = () => {
        this.incrementer = setInterval(async () => {
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            })
            //for 6 mins walk test, stop when reach 6 miniutes
            if (this.props.sixMinsWalk) {
                if (this.state.secondsElapsed >= 360) {
                    clearInterval(this.incrementer)
                    if (this.state.secondsElapsed >= 360)
                        await this.setState({ secondsElapsed: 360 })
                    this.props.onDataChange('duration', this.state.secondsElapsed * 1000) //change to ms
                }
            }
        }
            , 1000)
    }

    componentUnMount = () => {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        })
    }

    //when stop 6mwt before reach 6 minutes 
    componentWillReceiveProps = (nextProps) => {
        if (this.props.isDoing6Mwt !== nextProps.isDoing6Mwt) {
                if (this.props.sixMinsWalk) {
                    clearInterval(this.incrementer)
                    this.props.onDataChange('duration', this.state.secondsElapsed * 1000) //change to ms
                }
        }
    }

    handleStartClick = () => {
        this.incrementer = setInterval(() =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            })
            , 1000)
    }

    handleStopClick = () => {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        })
    }

    handleResetClick = () => {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }

    timerSize = (size) => {
        if (size) {
            return {
                fontSize: size
            }
        }
        return {
            fontSize: 60,
        }
    }

    render() {
        return (
            <View>
                <Text style={this.timerSize(this.props.fontSize)}>{formattedSeconds(this.state.secondsElapsed)}</Text>

                {/*{(this.state.secondsElapsed === 0 ||
                    this.incrementer === this.state.lastClearedIncrementer
                    ? <Button title='start' onPress={this.handleStartClick.bind(this)}/>
                    : <Button title='stop' onPress={this.handleStopClick.bind(this)} />
                )}*/}

            </View>
        )
    }

}
const styles = StyleSheet.create({
    text: {
        fontSize: 60,
    }
})