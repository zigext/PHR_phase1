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
        this.incrementer = setInterval(() =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            })
            , 1000)
    }

    componentUnMount = () => {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        })
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

    render() {
        return (
            <View>
                <Text style={styles.text}>{formattedSeconds(this.state.secondsElapsed)}</Text>

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
        fontSize: 60
    }
})