import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../styles/index'



export default class ActivityAdvicesButton extends React.Component {
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
                    style={[styles.buttonImage, {paddingHorizontal: 3}]}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/cardiogram.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>กิจกรรมฟื้นฟูหัวใจ</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}



