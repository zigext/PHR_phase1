import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ViewPropTypes, ScrollView, Alert } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import firebase from '../../config/Firebase'
import { logOut } from '../../actions/userAction'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e4042'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 45,
        color: 'white'
    }
})

const list = [
    { title: 'หน้าหลัก' },
    { title: 'กิจกรรมฟื้นฟูสมรรถภาพหัวใจ' },
    { title: 'พัฒนาการ' },
    { title: 'คำแนะนำ' },
    { title: 'ประวัติส่วนตัว' },
    { title: 'ประวัติการผ่าตัด' },
    { title: 'ออกจากระบบ' }
]

class SideDrawerContent extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        sceneStyle: ViewPropTypes.style,
        title: PropTypes.string,
    }

    static contextTypes = {
        drawer: React.PropTypes.object,
    }

    logOut = () => new Promise((resolve, reject) => {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out successfully');
                // dispatch(logOut())
                this.props.dispatchLogOut()
                resolve()
                // this.setAuthenticationToAsyncStorage()
            })
            .catch()
    })
        
    

    // setAuthenticationToAsyncStorage = async () => {
    //     await AsyncStorage.setItem('authentication', JSON.stringify({ isLoggedIn: false }))
    //     console.log("save auth to false")
    // }

    onPress = (index) => {
        switch (index) {
            case 0: {
                Actions.tab_home()
                break
            }
            case 1: {
                Actions.tab_activity()
                break
            }
            case 2: {
                Actions.tab_progress()
                break
            }
            case 3: {
                Actions.tab_advices()
                break
            }
            case 4: {
                Actions.profile()
                break
            }
            case 5: {
                Actions.surgery()
                break
            }
            case 6: {

                Alert.alert(
                    'ออกจากระบบ',
                    'ต้องการออกจากระบบหรือไม่?',
                    [
                        {
                            text: 'ใช่', onPress: () => {
                                this.logOut().then( () => Actions.launch())
                                
                            }
                        },
                        { text: 'ไม่', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                    ]
                )

                break
            }
            default: return
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <List containerStyle={{ backgroundColor: '#3e4042' }}>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    titleStyle={styles.item}
                                    hideChevron={true}
                                    onPress={() => this.onPress(i)}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View >
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawerContent)