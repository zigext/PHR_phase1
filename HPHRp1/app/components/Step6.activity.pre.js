import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import styles from '../styles/index'
import common from '../styles/common'

export default class Step6Pre extends React.Component {
    constructor(props) {
        super(props)

    }

    //Start doing activity
    onStartDoingActivity = () => {
        this.props.onPreActivityDone(this.props.dataStore)
    }

    //Back to state 1
    onBackToStarter = () => {
        this.props.resetState()
    }
    
    //If any of the conditions is false, should consult with doctor
    checkPreTestResult = () => {
      for (let property in this.props.dataStore) {
            if (this.props.dataStore[property] === true) {
                return <Text style={_styles.text}>กรุณาปรึกษาแพทย์เพื่อพิจารณาการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ</Text>
            }
        }
        return <Text style={_styles.text}>มีความพร้อมในการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ</Text>
    }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    {this.checkPreTestResult()}
                    <View style={_styles.buttonContainer}>
                        <Button
                            raised
                            icon={{ name: 'home' }}
                            title='กลับสู่หน้าเริ่มต้น'
                            backgroundColor='grey'
                            onPress={this.onBackToStarter} />
                        <Button
                            raised
                            iconRight
                            icon={{ name: 'play', type: 'foundation' }}
                            title='เริ่มทำกิจกรรม'
                            backgroundColor={common.accentColor}
                            onPress={this.onStartDoingActivity} />
                    </View>
                </ScrollView>
            </View>
        )

    }
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 20,
        marginHorizontal: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: common.grey,
        marginBottom: 25,
        marginTop: 20,
    }
})