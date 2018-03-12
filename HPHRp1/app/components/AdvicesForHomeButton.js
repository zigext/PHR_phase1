
import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import styles from '../styles/index'

export default class AdvicesForHomeButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        this.props.onAdvicesHomePress()
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
                        <Image source={require('../../assets/images/buttons/home.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>หลังกลับบ้าน</Text>
                    </View>
                </TouchableHighlight>
               
                <View>

                </View>
            </View>
        )
    }
}