import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import styles from '../styles/index'

export default class Activity1AdvicesButton extends React.Component {

    onPress = () => {
     this.props.onActivity1Press()
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
                        <Image source={require('../../assets/images/heart.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>ระยะที่ 1</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}