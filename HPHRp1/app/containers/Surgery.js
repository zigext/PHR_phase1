import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Image, ListView, NetInfo, ToastAndroid } from 'react-native'
import Sound from 'react-native-sound'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ActionButton from 'react-native-action-button'
// import Icon from 'react-native-vector-icons'
import { Icon } from 'react-native-elements'
import firebase from '../config/Firebase'
import ApiUtils from '../components/ApiUtils'
import { SERVER_IP, SURGERY } from '../config/Const'


class Surgery extends React.Component {

    constructor(props) {
        super(props)
        this.ref = null
        this.state = {
            surgeryArray: [],
            isConnected: ''
        }
        this.surgeries = {}
        this.surgeryArray = []
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        this.fetchSurgeries()
        //Check if internet is on
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            this.setState({ isConnected })

        })
        NetInfo.isConnected.addEventListener(
            'change',
            this.handleFirstConnectivityChange
        )
    }
    handleFirstConnectivityChange = (isConnected) => {
        console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
        this.setState({ isConnected })

    }

    //sort by date descending
    compare = (a, b) => {
        if (a.information.date < b.information.date)
            return 1
        if (a.information.date > b.information.date)
            return -1
        return 0
    }

    fetchSurgeries = async () => {
        // const path = `${SERVER_IP}${SURGERY}?userid=1416382941765846`  //userid=${this.props.UserReducer.user.uid}
        const path = `${SERVER_IP}${SURGERY}?userid=${this.props.userReducer.user.uid}`
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                let surgeryArray = responseData.data
                surgeryArray.sort(this.compare) //surgeryArray.sort(function(a,b) {return (a.information.date > b.information.date) ? -1 : ((b.information.date > a.information.date) ? 1 : 0);} );
                this.setState({
                    surgeryArray
                })
                console.log("Fetch surgeries success ", this.state.surgeryArray)
            })
            .catch(error => {
                console.log("Fetch surgeries failed = ", error)

            })
    }

    // getSurgeries = () => {
    //     this.ref = firebase.database().ref(`surgery`) //read all user's surgeries
    //     this.ref.on('value', this.handleSurgeryUpdate)
    // }

    // // Bind the method only once to keep the same reference
    // handleSurgeryUpdate = async (snapshot) => {
    //     console.log('Post Content', snapshot)
    //     // this.props.dispatchProfile(this.profile)
    //     this.surgeries = snapshot.val() || {};
    //     this.surgeryArray = Object.keys(this.surgeries).map((k) => this.surgeries[k])
    //     // let sorted = await this.sortContactsByName()
    //     this.setState({
    //         surgeryArray: this.surgeryArray
    //     })
    // }

    onPress = (i) => {
        let obj = this.state.surgeryArray[i]
        Actions.surgeryDetail({ surgery: obj.information, uid: this.props.userReducer.user.uid })
    }

    onPressActionButton = () => {
        Actions.addSurgery()
    }

    render() {
        if (!this.state.isConnected) {
            ToastAndroid.showWithGravity('โปรดเชื่อมต่ออินเตอร์เน็ต', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
        return (
            <View>
                <ScrollView>
                    <List>
                        {
                            this.state.surgeryArray.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={<Text style={styles.item}>วันที่   {item.information.date}   {item.information.type}</Text>}
                                    subtitle={<Text style={{ fontSize: 18 }}>Doctor   {item.information.doctor}</Text>}
                                    titleStyle={styles.item}
                                    onPress={() => this.onPress(i)}
                                />
                            ))
                        }
                    </List>

                </ScrollView>
                <ActionButton buttonColor="#f49842" onPress={() => Actions.addSurgery()} />
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









