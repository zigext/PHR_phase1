import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../styles/index'

export default class InstructionAdvicesButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {
        this.props.onInstructionPress()
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
                        <Image source={require('../../assets/images/buttons/instructions.png')} style={styles.imageInButtonImage}></Image>
                        <Text style={styles.buttonImageText}>คำแนะนำ</Text>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}


// var styles = StyleSheet.create({

//     button: {
//         flex: 1,

//         backgroundColor: '#FFFDF9',
//         borderColor: '#48BBEC',
//         borderWidth: 3,
//         borderRadius: 8,
//         marginHorizontal: 10,
//         marginVertical: 10,
//        alignSelf: 'stretch',
//         justifyContent: 'center'
//     },

// })