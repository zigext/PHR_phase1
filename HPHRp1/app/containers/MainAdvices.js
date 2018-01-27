import React, { Component, } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import FoodAdvicesButton from '../components/FoodAdvicesButton'
import ExerciseAdvicesButton from '../components/ExerciseAdvicesButton'
import ActivityAdvicesButton from '../components/ActivityAdvicesButton'
import DailyAdvicesButton from '../components/DailyAdvicesButton'
import ProhibitAdvicesButton from '../components/ProhibitAdvicesButton'
import InstructionAdvicesButton from '../components/InstructionAdvicesButton'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'

class MainAdvices extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    onFoodPress = () => {
        Actions.tab_advices_food()
    }

    onExercisePress = () => {
        Actions.tab_advices_exercise()
    }

    onDailyPress = () => {
        Actions.tab_advices_daily()
    }

    onProhibitPress = () => {
        Actions.tab_advices_prohibit()
    }
    onActivityPress = () => {
        Actions.tab_advices_activity()
    }

    render() {
        return (
            <View style={styles.container}>
                <FoodAdvicesButton onFoodPress={this.onFoodPress} />
                <ExerciseAdvicesButton onExercisePress={this.onExercisePress} />
                <DailyAdvicesButton onDailyPress={this.onDailyPress} />
                <ActivityAdvicesButton onActivityPress={this.onActivityPress} />
                <InstructionAdvicesButton />
                <ProhibitAdvicesButton onProhibitPress={this.onProhibitPress} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("mapStateToProps", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchLogIn: (email, uid) => dispatch(logIn(email, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAdvices)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})