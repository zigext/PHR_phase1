import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import firebase from '../config/Firebase'
import LogInForm from '../components/Login'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import ActivityButton from '../components/ActivityButton'
import AdvicesButton from '../components/AdvicesButton'
import ProgressButton from '../components/ProgressButton'
import Orientation from 'react-native-orientation'


class Home extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // this locks the view to Portrait Mode
        // const initial = Orientation.getInitialOrientation()
        Orientation.lockToLandscape();
    }


    onActivityPress = (callback) => {
        Actions.tab_activity()
    }

    onAdvicesPress = (callback) => {
        Actions.tab_advices()
    }

    onProgressPress = (callback) => {

    }


    render() {
        return (
            <View style={styles.container}>
                <AdvicesButton onAdvicesPress={this.onAdvicesPress}/>
                <ActivityButton onActivityPress={this.onActivityPress}/>
                <ProgressButton onProgressPress={this.onProgressPress}/>
            </View>
            // <View style={styles.container1}>
            //     {/*<View style={styles.container2}></View>
            //     <View style={styles.container3}></View>*/}
            //     {/*<ActivityButton />*/}
            // </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    },
    container1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue'
    },
    container2: {
        flexDirection: 'column',
        flex: 0.3,
        backgroundColor: 'red'
    },
    container3: {
        flexDirection: 'column',
        flex: 0.7,
        backgroundColor: 'green'
    }
})