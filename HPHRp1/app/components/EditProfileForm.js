import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import t from 'tcomb-form-native'
import styles from '../styles/index'
import moment from 'moment'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

const imageOptions = {
    title: 'Choose a photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
let Form = t.form.Form

let Profile = t.struct({
    phone: t.maybe(t.String),
    cousin_phone: t.maybe(t.String),
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
            loading: false,
            
            path: '',
            filename: '',
            timestamp: '',
            // imageSource: 'https://firebasestorage.googleapis.com/v0/b/cardiac-surgery-phr.appspot.com/o/images%2FScreenshot_2017-09-30-16-15-40.png%2Bundefined?alt=media&token=e50f6a4e-3b8f-4686-8b79-143f8e84b199' 
        }
        

    }
    onSubmitPress = () => {
        this.setState({ loading: true })
        let newProfile = this.refs.form.getValue() || {}
        let formattedProfile = _.pickBy(newProfile, _.identity) //remove keys that are null or undefined
        this.props.onEditProfilePress(formattedProfile, this.state.path, this.state.filename, this.state.timestamp, (err) => {
            this.setState({ loading: false })
            if (err !== null) {
                ToastAndroid.showWithGravity('ผิดพลาด ไม่สามารถแก้ไขข้อมูล', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            else {
                ToastAndroid.showWithGravity('แก้ไขข้อมูลสำเร็จ', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }

        })
    }

    onChoosePhotoPress = () => {
        ImagePicker.showImagePicker(imageOptions, response => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                   
                let imageSource = { uri: 'data:image/jpeg;base64,' + response.data }
                console.log('source', imageSource)
                let imageUri = response.uri + ''
                console.log('imageUri', imageUri)
                let filename = response.fileName + ''
                let timestamp = response.timestamp + ''
                ImageResizer.createResizedImage(imageUri, 328, 495, 'JPEG', 60).then(response => {
                    let path = response.path + ''
                    this.setState({ path, filename, timestamp})
                     this.setState({ imageSource: imageUri })
                })
                // .catch(err => {
                //   console.log('err', err)
                //   Alert.alert('Oops, something went wrong', err)
                // })
            }
        })
    }

    render() {
        console.log("Prev profile = ", this.props.prevProfile)
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Image source={{uri:this.state.imageSource}} style={_styles.image}></Image>

                    <TouchableHighlight style={_styles.button} onPress={this.onChoosePhotoPress} underlayColor='#99d9f4'>
                        <Text style={_styles.buttonText}>เลือกรูปภาพ</Text>
                    </TouchableHighlight>

                    <Form ref="form" type={Profile} options={options} />
                    <TouchableHighlight
                        style={this.state.loading ? _styles.disabledButton : _styles.button}
                        onPress={this.onSubmitPress}
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
    },
       image: {
        height: 200,
        borderRadius: 100,
        width: 200,
        margin: 10,
        alignSelf: 'center'
    }
})