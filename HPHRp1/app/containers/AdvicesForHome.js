import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Orientation from 'react-native-orientation'
import DailyAdvicesButton from '../components/DailyAdvicesButton'
import FoodAdvicesButton from '../components/FoodAdvicesButton'
import ExerciseAdvicesButton from '../components/ExerciseAdvicesButton'
import OtherAdvicesButton from '../components/OtherAdvicesButton'

export default class AdvicesForHome extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        Orientation.lockToLandscape();
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

    
    onOtherPress = () => {
        Actions.tab_advices_other()
    }

    render() {
        return (
            <View style={styles.container}>
                <FoodAdvicesButton onFoodPress={this.onFoodPress} />
                <ExerciseAdvicesButton onExercisePress={this.onExercisePress} />
                <DailyAdvicesButton onDailyPress={this.onDailyPress} />
                <OtherAdvicesButton onOtherPress={this.onOtherPress} />
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})