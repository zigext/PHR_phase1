import React from 'react'
import { StyleSheet, Text, View, Alert, ToastAndroid, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import common from '../styles/common'
import { cloneDeep } from 'lodash'

let Form = t.form.Form
const myCustomStylesheet = cloneDeep(t.form.Form.stylesheet)
myCustomStylesheet.controlLabel.normal.fontWeight = 'normal'
myCustomStylesheet.controlLabel.normal.fontSize = 20
let options = {
    fields: {
        amount: {
            label: 'จำนวนครั้งที่ทำได้'
        }
    },
    stylesheet: myCustomStylesheet
}

//amount must be positive value
let amount = t.refinement(t.Number, function (n) { return n >= 0 })
amount.getValidationErrorMessage = function (value, path, context) {
    return 'จำนวนไม่ถูกต้อง'
}

let input = t.struct({
    amount: amount
})

export default class SLevel1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'doing'
        }
    }

    onSystemLevelChange = () => {
        this.props.onSystemLevelChange(this.props.systemLevel + 1)
    }

    onActivityDone = () => {
          Alert.alert(
                'กิจกรรมฟื้นฟูสมรรถภาพหัวใจ',
                'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่?',
                [
                    {
                        text: 'ใช่', onPress: () => {
                           this.setState({status: 'done'})
                        }
                    },
                    { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                ]
            )
    }

    onInputFilled = () => {
        let value = this.refs.form.getValue()
        if (value) {
        }
    }

    renderForm = () => {
        return (
            <View style={{marginTop: 30}}>
                <Form ref='form' type={input} options={options} />
                <Icon
                    raised
                    reverse
                    name='exit-to-app'
                    color='#d6d4e0'
                    size={35}
                    onPress={this.onInputFilled}
                    containerStyle={{ alignSelf: 'flex-end' }}
                />
            </View>
        )
    }

    renderActivity = () => {
        return (
            <View>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../../assets/images/daily1.png')} style={_styles.image} />
                </View>
                <Icon
                    raised
                    reverse
                    name='ios-arrow-forward'
                    type='ionicon'
                    color={common.accentColor}
                    size={35}
                    onPress={this.onSystemLevelChange}
                    containerStyle={{ alignSelf: 'flex-end' }}
                />
                <View style={_styles.exitContainer}>
                    <Text style={_styles.text}>สิ้นสุดการทำกิจกรรม</Text>
                    <Icon
                        raised
                        reverse
                        name='exit-to-app'
                        color='#d6d4e0'
                        size={35}
                        onPress={this.onActivityDone}
                        containerStyle={{ alignSelf: 'flex-end' }}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={_styles.container}>
                <Text style={_styles.topic}>บริหารปอดวิธี Breathing control </Text>
                {(this.state.status === 'doing')? this.renderActivity() : this.renderForm() }
            </View>
        )

    }
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        padding: 20,
        paddingHorizontal: 50,

    },
    exitContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
    },
    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: common.grey,
        marginBottom: 15,
    },
    text: {
        fontSize: 20, 
        color: common.grey,
        marginTop: 20,
        marginRight: 15,
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        height: 220, 
    }
})