import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import firebase from '../config/Firebase'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import FoodAdvicesSwiper from '../components/FoodAdvicesSwiper'
import Orientation from 'react-native-orientation'


class FoodAdvices extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        Orientation.lockToLandscape();
    }
    render() {
        return (
            <View style={styles.container}>
                <FoodAdvicesSwiper />
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