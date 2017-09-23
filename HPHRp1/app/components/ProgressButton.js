
import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles/index'


export default class ProgressButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {

    }

    render() {
        return (
            <View>

                <TouchableHighlight
                    style={styles.buttonImage}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/line-chart.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>พัฒนาการ</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}
