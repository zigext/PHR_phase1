import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import styles from '../styles/index'

export default class Activity2AdvicesButton extends React.Component {

    onPress = () => {
     
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    style={[styles.buttonImage, {paddingHorizontal:0}]}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/walking.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>ระยะที่ 2</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}