import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard } from 'react-native'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import moment from 'moment'
import _ from 'lodash'

let Form = t.form.Form

let Profile = t.struct({
    phone: t.maybe(t.Number), // a date field
    cousin_phone: t.maybe(t.Number),
    height: t.maybe(t.Number),
    weight: t.maybe(t.Number),
    address: t.maybe(t.String),
    medical_condition: t.maybe(t.list(t.String)),
    current_medicine: t.maybe(t.list(t.String)),
    allergic_medicine: t.maybe(t.list(t.String)),
    allergic_food: t.maybe(t.list(t.String))
})

let options = {
    fields: {
        medical_condition: {
            item: { // <= options applied to each item in the list
                label: 'Medical condition'
            }
            //one textbox, each item separated by comma (, ). Will autometrically turned to array
            // factory: t.form.Textbox,
            // transformer: listTransformer,
            // help: 'Keywords are separated by spaces'
        },
        current_medicine: {
            item: {
                label: 'Current medicine'
            }
        },
        allergic_medicine: {
            item: {
                label: 'Allergic medicine'
            }
        },
        allergic_food: {
            item: {
                label: 'Allergic food'
            }
        },
        address: {
            multiline: true
        }
    },
    i18n: {
        optional: ' (optional)',
        required: '',
        add: '➕',   // add button
        remove: '✘',  // remove button
        up: '↑',      // move up button
        down: '↓'     // move down button
    }
}

export default class EditProfileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    onPress = () => {
        this.setState({ loading: true })
        let newProfile = this.refs.form.getValue() || {}
        let formattedProfile = _.pickBy(newProfile, _.identity) //remove keys that are null or undefined
        this.props.onEditProfilePress(formattedProfile, (err) => {
            this.setState({ loading: false })
            if (err !== null) {
                ToastAndroid.showWithGravity('ผิดพลาด ไม่สามารถแก้ไขข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            ToastAndroid.showWithGravity('แก้ไขข้อมูลสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)

        })
    }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Form ref="form" type={Profile} options={options} />
                    <TouchableHighlight
                        style={this.state.loading ? _styles.disabledButton : _styles.button}
                        onPress={this.onPress}
                        underlayColor='#99d9f4'
                        disabled={this.state.loading}
                    >
                        <Text style={_styles.buttonText}>แก้ไข</Text>
                    </TouchableHighlight>
                </ScrollView>
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
        marginTop: 20,
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
        marginTop: 20,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
})