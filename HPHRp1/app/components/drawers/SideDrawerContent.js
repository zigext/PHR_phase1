import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e4042'
    },
});

class SideDrawerContent extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        sceneStyle: ViewPropTypes.style,
        title: PropTypes.string,
    }

    static contextTypes = {
        drawer: React.PropTypes.object,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Drawer Content</Text>
                <Button onPress={Actions.closeDrawer}>Back</Button>
                <Text>Title: {this.props.title}</Text>
                <Button onPress={Actions.tab_home}>Home</Button>
                <Button onPress={Actions.tab_activity}>Activity</Button>
                <Button onPress={Actions.tab_progress}>Progress</Button>
                <Button onPress={Actions.tab_advices}>Advices</Button>
                <Button onPress={() => { Actions.profile({ data: 'test!' }); }}>Profile</Button>
                <Button>Log out</Button>
            </View >
        )
    }
}

export default SideDrawerContent