
import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'



export default class ActivityButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {

    }

    render() {
        // const { inputStyle, labelStyle, containerStyle } = styles
        return (
            <View>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/heart.png')} style={styles.image}></Image>
                        <Text style={styles.buttonText}>กิจกรรมฟื้นฟูหัวใจ</Text>
                    </View>
                </TouchableHighlight>
                
                {/*<Button
                    large
                    icon={{ name: 'heartbeat', type: 'font-awesome' }}
                    buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 10}}
                    title='Activity' />*/}
                {/*<Button
                    title='BUTTON' />

                <Button
                    raised
                    icon={{ name: 'cached' }}
                    title='BUTTON WITH ICON' />

                <Button
                    large
                    iconRight
                    icon={{ name: 'code' }}
                    title='LARGE WITH RIGHT ICON' />

                <Button
                    large
                    icon={{ name: 'envira', type: 'font-awesome' }}
                    title='LARGE WITH RIGHT ICON' />*/}
                <View>

                </View>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container1: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'blue'
    },
    container2: {
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 24,
        color: '#474045',
        alignSelf: 'center'
    },
    button: {
        flex: 1,
        backgroundColor: '#FFFDF9',
        borderColor: '#0a3984',
        borderWidth: 3,
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
       alignSelf: 'stretch',
        justifyContent: 'center'
    },
    image: {
        resizeMode: 'contain',
        margin: 10,
        alignItems: 'center',
        height: 100,
        width: 100,
        alignSelf: 'center'
    }
})