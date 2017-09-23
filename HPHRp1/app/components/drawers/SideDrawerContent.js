import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

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
    {title: 'หน้าหลัก'},
    {title: 'กิจกรรมฟื้นฟูสมรรถภาพหัวใจ'},
    {title: 'พัฒนาการ'},
    {title: 'คำแนะนำ'},
    {title: 'ประวัติส่วนตัว'},
    {title: 'ประวัติการผ่าตัด'},
    {title: 'ออกจากระบบ'}
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
                break
            }
            default: return
        }
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text>Drawer Content</Text>
            //     <Button onPress={Actions.closeDrawer}>Back</Button>
            //     <Text>Title: {this.props.title}</Text>
            //     <Button onPress={Actions.tab_home}>Home</Button>
            //     <Button onPress={Actions.tab_activity}>Activity</Button>
            //     <Button onPress={Actions.tab_progress}>Progress</Button>
            //     <Button onPress={Actions.tab_advices}>Advices</Button>
            //     <Button onPress={() => { Actions.profile({ data: 'test!' }); }}>Profile</Button>
            //     <Button onPress={Actions.surgery}>Surgery</Button>
            //     <Button>Log out</Button>
            // </View >
            <View style={styles.container}>
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
            </View >
        )
    }
}

export default SideDrawerContent