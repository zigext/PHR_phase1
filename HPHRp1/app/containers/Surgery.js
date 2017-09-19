import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from '../config/Firebase'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ProfileContent from '../components/Profile'


class Surgery extends React.Component {
    constructor(props) {
        super(props)
        this.ref = null
        
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        this.ref = firebase.database().ref(`surgery`).orderByKey().startAt(`${this.props.default.uid}`)
        this.ref.on('value', this.handleSurgeryUpdate)
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleSurgeryUpdate)
        }
    }

    // Bind the method only once to keep the same reference
    handleSurgeryUpdate = (snapshot) => {
        
        console.log('Post Content', snapshot.val())
        // this.props.dispatchProfile(this.profile)
    }


    render() {
        return (
            <View style={styles.container}>
                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps in surgery ", state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatchProfile: (profile) => dispatch(getProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Surgery)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFDF9',
        justifyContent: 'center'
    }
})