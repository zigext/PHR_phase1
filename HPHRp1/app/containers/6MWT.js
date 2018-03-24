import React from 'react'
import { StyleSheet, Text, View, BackAndroid, ScrollView } from 'react-native'
import { SERVER_IP, MWT6 } from '../config/Const'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import { Icon, ListItem, List, Button } from 'react-native-elements'
import ApiUtils from '../components/ApiUtils'
import ScanBLE from './ScanBLE'
import common from '../styles/common'
import { isEmpty } from 'lodash'
import Main6Mwt from './Main6MWT'

class MWT extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isView: true,
            mwtArray: [],
            profile: {},
        }
    }

    componentDidMount = async () => {
        Orientation.lockToLandscape()
        // await this.fetchMWTResult()
        // await this.fetchProfile()
    }

    fetchMWTResult = async () => {
        const path = `${SERVER_IP}${MWT6}?userid=${this.props.userReducer.user.uid}&appid=${this.props.userReducer.appId}`
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                let mwtArray = responseData.results
                this.setState({
                    mwtArray
                })
                console.log("Fetch 6MWT success ", this.state.mwtArray)
            })
            .catch(error => {
                console.log("Fetch 6MWT failed = ", error)
            })
    }

    fetchProfile = async () => {
        const path = `${SERVER_IP}${PROFILE}?userid=${this.props.userReducer.user.uid}&appid=${this.props.userReducer.appId}`
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(responseData => {
                let profile = responseData.data.profile
                this.setState({ profile })
            })
            .catch(error => {
                console.log("Error in fetchProfile = ", error)
            })
    }


    onPress = () => {
        this.toggleIsView()
        let profile = {
            firstname: 'Tony',
            lastname: 'Stark',
            patient_code: '1234',
            picture_uri: 'https://consequenceofsound.files.wordpress.com/2016/04/screen-shot-2016-04-21-at-3-02-15-pm1.png?w=807'
        }
        // Actions.main6Mwt({ appId: this.props.userReducer.appId, uid: this.props.userReducer.user.uid, profile: profile })
        // Actions.main6Mwt({ appId: this.props.userReducer.appId, uid: this.props.userReducer.user.uid, profile: this.state.profile })
    }

    onPressMwtItem = (i) => {
        let obj = this.state.mwtArray[i]
        // Actions.surgeryDetail({ surgery: obj.information, uid: this.props.userReducer.user.uid })
    }

    toggleIsView = () => {
        this.setState({ isView: !this.state.isView })
    }

    //Show list
    renderView = () => {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {isEmpty(this.state.mwtArray) ? (
                            <Text style={styles.noListText}>ไม่มีผลการทดสอบ</Text>
                    ) :
                        (
                            <List>
                                {
                                    this.state.mwtArray.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            title={<Text style={styles.item}>วันที่   {item.result.date}  ระยะทาง  {item.result.distance} เมตร</Text>}
                                            subtitle={<Text style={{ fontSize: 18 }}>เวลา   {item.result.duration}</Text>}
                                            titleStyle={styles.item}
                                            onPress={() => this.onPressMwtItem(i)}
                                        />
                                    ))
                                }
                            </List>
                        )
                    }

                </ScrollView>

                <Button
                    title='เริ่มทดสอบ'
                    icon={{ name: 'arrow-right', type: 'font-awesome', size: 20 }}
                    iconRight
                    raised
                    rounded
                    textStyle={styles.buttonText}
                    buttonStyle={styles.button}
                    containerViewStyle={styles.buttonContainer}
                    onPress={this.onPress}
                />
            </View>
        )

    }

    renderMain = () => {
        let profile = {
            firstname: 'Tony',
            lastname: 'Stark',
            patient_code: '1234',
            picture_uri: 'https://consequenceofsound.files.wordpress.com/2016/04/screen-shot-2016-04-21-at-3-02-15-pm1.png?w=807'
        }
        return (
            <Main6Mwt
                appId={this.props.userReducer.appId}
                uid={this.props.userReducer.user.uid}
                profile={profile} //this.state.profile
                toggleIsView={this.toggleIsView} />
        )
    }

    render() {
        return (
            this.state.isView ? this.renderView() : this.renderMain()
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(MWT)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        margin: 20
    },
    scrollViewContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },
    noListText: {
        fontSize: 22,
        textAlign: 'center'
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: common.accentColor,
        borderColor: "transparent",
        borderWidth: 0,
        // width: 300,
        // height: 45,
    },
    buttonContainer: {
        borderWidth: 0,
        borderRadius: 50,
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})