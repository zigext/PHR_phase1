import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import common from '../styles/common'
import Sound from 'react-native-sound'
import PropTypes from 'prop-types'

export default class Activity1AdvicesDetail extends React.Component {
    static propTypes = {
        level: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.array.isRequired,
    }
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
                const sound = new Sound(require('../../assets/sound/ac1_0.wav'), error => callback(error, sound))
                break
            }
            case 1: {
                const sound = new Sound(require('../../assets/sound/ac1_1.wav'), error => callback(error, sound))
                break
            }
            case 2: {
                const sound = new Sound(require('../../assets/sound/ac1_2.wav'), error => callback(error, sound))
                break
            }
            case 3: {
                const sound = new Sound(require('../../assets/sound/ac1_3.wav'), error => callback(error, sound))
                break
            }
            case 4: {
                const sound = new Sound(require('../../assets/sound/ac1_4.wav'), error => callback(error, sound))
                break
            }
            case 5: {
                const sound = new Sound(require('../../assets/sound/ac1_5.wav'), error => callback(error, sound))
                break
            }
            case 6: {
                const sound = new Sound(require('../../assets/sound/ac1_6.wav'), error => callback(error, sound))
                break
            }
            case 7: {
                const sound = new Sound(require('../../assets/sound/ac1_7.wav'), error => callback(error, sound))
                break
            }
            case 8: {
                const sound = new Sound(require('../../assets/sound/ac1_8.wav'), error => callback(error, sound))
                break
            }
            case 9: {
                const sound = new Sound(require('../../assets/sound/ac1_9.wav'), error => callback(error, sound))
                break
            }
            case 10: {
                const sound = new Sound(require('../../assets/sound/ac1_10.wav'), error => callback(error, sound))
                break
            }
            case 11: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 12: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 13: {
                const sound = new Sound(require('../../assets/sound/ac1_13.wav'), error => callback(error, sound))
                break
            }
            case 14: {
                const sound = new Sound(require('../../assets/sound/ac1_14.wav'), error => callback(error, sound))
                break
            }
            case 15: {
                const sound = new Sound(require('../../assets/sound/ac1_15.wav'), error => callback(error, sound))
                break
            }
            default: return
        }

    }

    renderImage = (image) => {
        console.log("render img", image)
        switch (image) {
            case "breathing":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/breathing-1.jpg')} style={_styles.image}></Image>
                        <Image source={require('../../assets/images/activities/breathing-2.jpg')} style={_styles.image}></Image>
                    </View>
                )
            case "triflow":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/breathing-triflow.jpg')} style={_styles.image}></Image>
                    </View>
                )
            case "cough":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/cough-1.jpg')} style={_styles.image}></Image>
                        <Image source={require('../../assets/images/activities/cough-2.jpg')} style={_styles.image}></Image>
                        <Image source={require('../../assets/images/activities/cough-3.jpg')} style={_styles.image}></Image>
                    </View>
                )
            case "legsExercise":
                return (
                    <View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/legs-1.jpg')} style={_styles.image}></Image>
                            <Image source={require('../../assets/images/activities/legs-2.jpg')} style={_styles.image}></Image>
                        </View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/legs-3.jpg')} style={_styles.image}></Image>
                            <Image source={require('../../assets/images/activities/legs-4.jpg')} style={_styles.image}></Image>
                        </View>
                    </View>
                )
            case "armsExercise":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/arms-1.jpg')} style={_styles.image}></Image>
                        <Image source={require('../../assets/images/activities/arms-2.jpg')} style={_styles.image}></Image>
                    </View>
                )
            case "legsSwing":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/legs_swing.jpg')} style={_styles.image}></Image>
                    </View>
                )
        }
    }

    renderDescription = () => {
        return (
            <View>
                {this.props.subtitle.map((d, idx) => {
                    return (
                        <View key={idx}>
                            <Text style={_styles.text}>{d.description}</Text>
                            {/*<Image source={require(d.image)} style={_styles.image}></Image>*/}
                            {d.hasOwnProperty('image') ? this.renderImage(d.image) : null}
                        </View>
                    )
                })}
            </View>
        )
    }

    render() {
        return (
            <View style={_styles.slide}>
                <ScrollView>
                    {this.props.level <= 10 ? <Text style={[_styles.text, { fontWeight: 'bold', marginBottom: 5 }]}>ระดับ {this.props.level}   {this.props.title}</Text> :
                        <Text style={[_styles.text, { fontWeight: 'bold', marginBottom: 5 }]}>{this.props.title}</Text>}
                    {/*<Text style={[styles.text, { fontWeight: 'bold', marginBottom: 5 }]}>ระดับ {this.props.activity.level}   {this.props.activity.title}</Text>*/}
                    {/*<Text style={styles.text}>{this.props.subtitle}</Text>*/}
                    {this.renderDescription()}
                    <Icon reverse name='controller-play' type='entypo' color='#f49842' onPress={() => this.playSound(this.props.level)} />
                    {/*<Image source={require('../../assets/images/food1.png')} style={_styles.image}></Image>*/}
                </ScrollView>
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        flex: 1
    },
    text: {
        color: common.grey,
        fontSize: 22,
        letterSpacing: 4,
        lineHeight: 45
    }
})