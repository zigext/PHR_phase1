import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles/index'


export default class AdvicesButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        this.props.onAdvicesPress()
    }

    render() {
        // const { inputStyle, labelStyle, containerStyle } = styles
        return (
            <View>

                <TouchableHighlight
                    style={styles.buttonImage}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/buttons/advices.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>คำแนะนำ</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}
