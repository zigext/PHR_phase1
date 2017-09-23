import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../styles/index'

export default class ExerciseAdvicesButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        this.props.onExercisePress()
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
                        <Image source={require('../../assets/images/exercise.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>ออกกำลังกาย</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}


