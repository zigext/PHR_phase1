import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, Image } from 'react-native'
import { Button } from 'react-native-elements'




export default class ExerciseAdvicesButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {

    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/exercise.png')} style={styles.image}></Image>
                        <Text style={styles.buttonText}>Exercise</Text>
                    </View>
                </TouchableHighlight>
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
    buttonText: {
        fontSize: 24,
        color: '#474045',
        alignSelf: 'center'
    },
    button: {
        flex: 1,

        backgroundColor: '#FFFDF9',
        borderColor: '#48BBEC',
        borderWidth: 3,
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 10,
       alignSelf: 'stretch',
        justifyContent: 'center'
    },
    image: {
        resizeMode: 'contain',
        margin: 10,
        alignItems: 'center',
        height: 100,
        width: 100,
    }
})