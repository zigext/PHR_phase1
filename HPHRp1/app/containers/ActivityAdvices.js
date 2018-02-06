import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Activity1 from '../components/Activity1AdvicesButton'
import Activity2 from '../components/Activity2AdvicesButton'
import ProhibitAdvicesButton from '../components/ProhibitAdvicesButton'
import InstructionAdvicesButton from '../components/InstructionAdvicesButton'
import Orientation from 'react-native-orientation'


class FoodAdvices extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        Orientation.lockToLandscape();
    }

    onInstructionPress = () => {
        Actions.tab_advices_instruction()
    }

    onProhibitPress = () => {
        Actions.tab_advices_prohibit()
    }

    onActivity1Press = () => {
        Actions.tab_advices_activity_1()
    }

    onActivity2Press = () => {
        Actions.tab_advices_activity_2()
    }

    render() {
        return (
            <View style={styles.container}>
                <InstructionAdvicesButton onInstructionPress={this.onInstructionPress} />
                <ProhibitAdvicesButton onProhibitPress={this.onProhibitPress} />
                <Activity1 onActivity1Press={this.onActivity1Press} />
                <Activity2 onActivity2Press={this.onActivity2Press} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchLogIn: (email, uid) => dispatch(logIn(email, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodAdvices)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})