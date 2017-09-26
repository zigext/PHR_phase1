import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import Sound from 'react-native-sound'

export default class Activity1AdvicesDetail extends React.Component {
    constructor(props) {
        super(props)

    }

    playSound = (level) => {
        const callback = (error, sound) => {
            if (error) {
                Alert.alert('error', error.message)
                return
            }
            sound.play(() => {
                sound.release()
            })
        }
        switch (level) {
            case 0: {
                const sound = new Sound(require('../../assets/sound/food1.wav'), error => callback(error, sound))
                break
            }
            case 1: {
                const sound = new Sound(require('../../assets/sound/food2.wav'), error => callback(error, sound))
                break
            }
            case 2: {
                const sound = new Sound(require('../../assets/sound/food3.wav'), error => callback(error, sound))
                break
            }
            case 3: {
                const sound = new Sound(require('../../assets/sound/food4.wav'), error => callback(error, sound))
                break
            }
            case 4: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 5: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 6: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 7: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 8: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 9: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 10: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        console.log(this.props)
        return (
            <View style={_styles.slide}>
                <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 5 }]}>ระดับ {this.props.activity.level}   {this.props.activity.title}</Text>
                <Text style={styles.text}>{this.props.activity.subtitle}</Text>
                <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound(this.props.activity.level)} />
                {/*<Image source={require('../../assets/images/food1.png')} style={_styles.image}></Image>*/}

            </View>
        )
    }
}

const _styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',

        padding: 20,
        paddingHorizontal: 50,
        margin: 10
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    }
})