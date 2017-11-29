import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
// import styles from '../styles/index'


export default class Borg extends React.Component {
    constructor(props) {
        super(props)
    }
    onPress = () => {

    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/borg_great.png')} style={styles.imageInButtonImage}></Image>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/borg_good.png')} style={styles.imageInButtonImage}></Image>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/borg_normal.png')} style={styles.imageInButtonImage}></Image>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/borg_tired.png')} style={styles.imageInButtonImage}></Image>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                    underlayColor='#99d9f4'
                >
                    <View>
                        <Image source={require('../../assets/images/borg_bad.png')} style={styles.imageInButtonImage}></Image>
                    </View>
                </TouchableHighlight>
                <View>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 20,

    },
    button: {

        backgroundColor: '#FFFDF9',
        borderColor: common.primaryColor,
        borderWidth: 3,
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    imageInButtonImage: {
        resizeMode: 'contain',
        margin: 10,
        alignItems: 'center',
        height: 100,
        width: 100,
        alignSelf: 'center',
    //      shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowColor: '#000',
    // elevation: 1,
    }

})
