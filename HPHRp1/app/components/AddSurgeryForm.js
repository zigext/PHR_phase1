import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Button, DatePickerAndroid } from 'react-native'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import moment from 'moment'
import _ from 'lodash'

let Form = t.form.Form

let Surgery = t.struct({
    date: t.Date, // a date field
    time: t.Date,
    doctor: t.maybe(t.String),
    hospital: t.String,
    type: t.maybe(t.String),
    note: t.maybe(t.String)
})

let formatDate = (format, date) => {
    return moment(date).format(format)
}

let formatTime = (format, time) => {
    let formatted = moment(time).format(format)
    let compiled = _.template('<%= time %>:00')
    return compiled({ 'time': formatted })
}

let dateSetting = {
    label: 'Date',
    mode: 'date',
    config: {
        format: (date) => formatDate("YYYY-MM-DD", date),
        dialogMode: 'spinner'
    },
    transformer: {
        format: (value) => value,
        parse: (value) => value,
    },
    help: "คลิกเพื่อเลือกวันที่"
    // factory: t.form.Textbox
}

let timeSetting = {
    label: 'Time',
    mode: 'time',
    config: {
        format: (time) => formatTime("kk:mm", time)
    },
    transformer: {
        format: (value) => value,
        parse: (value) => value,
    },
    help: "คลิกเพื่อเลือกเวลา"
    // factory: t.form.Textbox
}

let options = {
    fields: {
        "date": dateSetting,
        note: {
            multiline: true
        },
        "time": timeSetting
    }
}

export default class AddSurgeryForm extends React.Component {
    // state = {
    //     loading: false
    // }
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    onPress = () => {
        this.setState({ loading: true })
        let newSurgery = this.refs.form.getValue() || {}
        let { date, time, doctor, hospital, type, note } = this.refs.form.getValue() || {}

        if (!date || !time || !hospital) {
            this.setState({ loading: false })
            ToastAndroid.showWithGravity('กรุณากรอกวันที่ เวลา และโรงพยาบาล', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            let date2 = formatDate("YYYY-MM-DD", date)
            let time2 = formatTime("kk:mm", time)
            this.props.onAddSurgeryPress(newSurgery, date2, time2, doctor, hospital, type, note, (err) => {
                this.setState({ loading: false })
                if (err !== null) {
                    ToastAndroid.showWithGravity('ผิดพลาด ไม่สามารถเพิ่มข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
                }
                ToastAndroid.showWithGravity('เพิ่มข้อมูลสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)

            })
        }
    }

    render() {
        return (
            <View style={_styles.container}>
                <Form ref="form" type={Surgery} value={this.state.dateValue} options={options} />
                {/*<Form ref="form" type={Surgery} options={options} />*/}
                <TouchableHighlight
                    style={this.state.loading ? _styles.disabledButton : _styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                    disabled={this.state.loading}
                >
                    <Text style={_styles.buttonText}>เพิ่ม</Text>
                </TouchableHighlight>

            </View>
        )
    }
}


var _styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 20,
        paddingHorizontal: 50,
        backgroundColor: '#FFFDF9'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    disabledButton: {
        height: 36,
        backgroundColor: '#bdc3c7',
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
})