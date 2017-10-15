
import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles/index'

export default class ActivityButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        this.props.onActivityPress()
    }

    render() {
        return (
            <View>

                <TouchableHighlight
                    style={[styles.buttonImage, {borderColor: '#0a3984'}]}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/heart.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>กิจกรรมฟื้นฟูหัวใจ</Text>
                    </View>
                </TouchableHighlight>
               
                <View>

                </View>
            </View>
        )
    }
}