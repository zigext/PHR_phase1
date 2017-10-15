// import React from 'react'
// import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
// import firebase from '../config/Firebase'
// import { Actions } from 'react-native-router-flux'
// import { connect } from 'react-redux'
// import Orientation from 'react-native-orientation'
// import _ from 'lodash'
// import SurgeryInfo from '../components/SurgeryInfo'


// class Surgery extends React.Component {
//     constructor(props) {
//         super(props)
//         this.ref = null
//         this.state = {
//             surgeryArray: []
//         }
//         // Keep a local reference of the TODO items
//         this.surgeries = {}
//         this.surgeryArray = []
//     }

//     componentDidMount() {
//         Orientation.lockToLandscape()
//         this.getSurgeries()
//         // this.ref = firebase.database().ref(`surgery`).orderByKey().startAt(`${this.props.default.uid}`)
//         // this.ref.on('value', this.handleSurgeryUpdate)
//     }

//     componentWillUnmount() {
//         if (this.ref) {
//             this.ref.off('value', this.handleSurgeryUpdate)
//         }
//     }


//     getSurgeries = () => {
//         this.ref = firebase.database().ref(`surgery`).orderByKey().startAt(`${this.props.default.uid}`)
//         this.ref.on('value', this.handleSurgeryUpdate)
//     }

//     // Bind the method only once to keep the same reference
//     handleSurgeryUpdate = async (snapshot) => {
//         console.log('Post Content', snapshot)
//         // this.props.dispatchProfile(this.profile)
//         this.surgeries = snapshot.val() || {};
//         this.surgeryArray = Object.keys(this.surgeries).map((k) => this.surgeries[k])
//         // let sorted = await this.sortContactsByName()
//         this.setState({
//             surgeryArray: this.surgeryArray
//         })
//     }

//     // sortContactsByName = async () => {
//     //     // // order by ascending
//     //     let sortArr = await _.sortBy(this.contactsArray, 'name', function (n) {
//     //         return Math.sin(n);
//     //     })
//     //     return sortArr
//     // }

//     renderRow(rowData) {
//         console.log("ROW ", rowData)
//         return (
//             <SurgeryInfo {...rowData.item}></SurgeryInfo>
//         );
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <FlatList
//                     data={this.state.surgeryArray}
//                     renderItem={this.renderRow}
//                 />
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     console.log("mapStateToProps in surgery ", state)
//     return state
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // dispatchProfile: (profile) => dispatch(getProfile(profile))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Surgery)

// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         backgroundColor: '#FFFDF9',
//         justifyContent: 'center'
//     }
// })

import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Image, ListView } from 'react-native'
import Sound from 'react-native-sound'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ActionButton from 'react-native-action-button'
// import Icon from 'react-native-vector-icons'
import { Icon } from 'react-native-elements'
import firebase from '../config/Firebase'


class Surgery extends React.Component {

    constructor(props) {
        super(props)
        this.ref = null
        this.state = {
            surgeryArray: []
        }
        this.surgeries = {}
        this.surgeryArray = []
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        this.getSurgeries()
        // this.ref = firebase.database().ref(`surgery`).orderByKey().startAt(`${this.props.default.user.uid}`)
        // this.ref.on('value', this.handleSurgeryUpdate)
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleSurgeryUpdate)
        }
    }

    getSurgeries = () => {
        this.ref = firebase.database().ref(`surgery`) //read all user's surgeries
        this.ref.on('value', this.handleSurgeryUpdate)
    }

    // Bind the method only once to keep the same reference
    handleSurgeryUpdate = async (snapshot) => {
        console.log('Post Content', snapshot)
        // this.props.dispatchProfile(this.profile)
        this.surgeries = snapshot.val() || {};
        this.surgeryArray = Object.keys(this.surgeries).map((k) => this.surgeries[k])
        // let sorted = await this.sortContactsByName()
        this.setState({
            surgeryArray: this.surgeryArray
        })
    }

    onPress = (i) => {
        let obj = this.state.surgeryArray[i]
        Actions.surgeryDetail({ surgery: obj, uid: this.props.default.user.uid })
    }

    onPressActionButton = () => {
        Actions.addSurgery()
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <List>
                        {
                            this.state.surgeryArray.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={<Text style={styles.item}>วันที่   {item.date}   {item.type}</Text>}
                                    subtitle={<Text style={{ fontSize: 18 }}>Doctor   {item.doctor}</Text>}
                                    titleStyle={styles.item}
                                    onPress={() => this.onPress(i)}
                                />
                            ))
                        }
                    </List>
                
                </ScrollView>
                  <ActionButton buttonColor="#f49842" onPress={() =>  Actions.addSurgery()} />
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

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        fontWeight: 'bold'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
})









