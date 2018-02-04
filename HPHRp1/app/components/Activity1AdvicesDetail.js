import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, Alert, ScrollView, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import styles from '../styles/index'
import common from '../styles/common'
import Sound from 'react-native-sound'
import PropTypes from 'prop-types'

let { width, height } = Dimensions.get('window')
const imageHeight = Math.round(width * 9 / 16);
const imageWidth = width

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
                Alert.alert('ผิดพลาด! ไม่สามารถเล่นเสียงได้', error.message)
                return
            }
            sound.play(() => {
                sound.release()
            })
        }
        switch (level) {
            case "breathing": {
                const sound = new Sound(require('../../assets/sound/breathing.wav'), error => callback(error, sound))
                break
            }
            case "triflow": {
                const sound = new Sound(require('../../assets/sound/breathing-triflow.wav'), error => callback(error, sound))
                break
            }
            case "cough": {
                const sound = new Sound(require('../../assets/sound/cough.wav'), error => callback(error, sound))
                break
            }
            case "legs": {
                const sound = new Sound(require('../../assets/sound/legs.wav'), error => callback(error, sound))
                break
            }
            case "arms": {
                const sound = new Sound(require('../../assets/sound/arms.wav'), error => callback(error, sound))
                break
            }
            case 2: {
                const sound = new Sound(require('../../assets/sound/level2.wav'), error => callback(error, sound))
                break
            }
            case 3: {
                const sound = new Sound(require('../../assets/sound/level3.wav'), error => callback(error, sound))
                break
            }
            case 4: {
                const sound = new Sound(require('../../assets/sound/level4.wav'), error => callback(error, sound))
                break
            }
            case 5: {
                const sound = new Sound(require('../../assets/sound/level5.wav'), error => callback(error, sound))
                break
            }
            case 6: {
                const sound = new Sound(require('../../assets/sound/level6.wav'), error => callback(error, sound))
                break
            }
            case 7: {
                const sound = new Sound(require('../../assets/sound/level7.wav'), error => callback(error, sound))
                break
            }
            case 8: {
                const sound = new Sound(require('../../assets/sound/ac1-other-1.wav'), error => callback(error, sound))
                break
            }
            default: return
        }
    }

    renderImage = (image) => {
        switch (image) {
            case "breathing":
                return (
                    <View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/breathing-1.jpg')} style={_styles.image}></Image>
                            <Image source={require('../../assets/images/activities/breathing-2.jpg')} style={_styles.image}></Image>
                        </View>
                        {this.props.level === 1 ? <Icon reverse name='controller-play' type='entypo' color={common.accentColor} containerStyle={_styles.soundContainer} onPress={() => this.playSound("breathing")} /> : null}
                    </View>
                )
            case "triflow":
                return (
                    <View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/breathing-triflow.jpg')} style={_styles.image}></Image>
                        </View>
                        {this.props.level === 1 ? <Icon reverse name='controller-play' type='entypo' color={common.accentColor} containerStyle={_styles.soundContainer} onPress={() => this.playSound("triflow")} /> : null}
                    </View>
                )
            case "cough":
                return (
                    <View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/cough.jpg')} style={[_styles.image, {width: 600, height: 350}]}></Image>
                        </View>
                        {this.props.level === 1 ? <Icon reverse name='controller-play' type='entypo' color={common.accentColor} containerStyle={_styles.soundContainer} onPress={() => this.playSound("cough")} /> : null}
                    </View>
                )
            case "legsExercise":
                return (
                    <View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/legs-1.jpg')} style={[_styles.image, {width: 500, height: 300}]}></Image>
                        </View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/legs-3.jpg')} style={_styles.image}></Image>
                            <Image source={require('../../assets/images/activities/legs-4.jpg')} style={_styles.image}></Image>
                        </View>
                        {this.props.level === 1 ? <Icon reverse name='controller-play' type='entypo' color={common.accentColor} containerStyle={_styles.soundContainer} onPress={() => this.playSound("legs")} /> : null}
                    </View>
                )
            case "armsExercise":
                return (
                    <View>
                        <View style={_styles.imageContainer}>
                            <Image source={require('../../assets/images/activities/arms-1.jpg')} style={_styles.image}></Image>
                            <Image source={require('../../assets/images/activities/arms-2.jpg')} style={_styles.image}></Image>
                        </View>
                        {this.props.level === 1 ? <Icon reverse name='controller-play' type='entypo' color={common.accentColor} containerStyle={_styles.soundContainer} onPress={() => this.playSound("arms")} /> : null}
                    </View>
                )
            case "legsSwing":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/legs_swing.jpg')} style={_styles.image}></Image>
                    </View>
                )
            case "tiptoe":
                return (
                    <View style={_styles.imageContainer}>
                        <Image source={require('../../assets/images/activities/tiptoe.png')} style={_styles.image}></Image>
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
                    {this.props.level <= 7 ? <Text style={[_styles.text, _styles.topic]}>ระดับ {this.props.level}   {this.props.title}</Text> :
                        <Text style={[_styles.text, _styles.topic]}>{this.props.title}</Text>}
                    {this.props.level === 1 ? (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}><Image source={require('../../assets/images/activities/fowler.png')} style={{ height: 290, width: 430 }} resizeMode='contain' /></View>) : null}
                    {this.renderDescription()}
                    {this.props.level > 1 ? <Icon reverse name='controller-play' type='entypo' color={common.accentColor} onPress={() => this.playSound(this.props.level)} containerStyle={_styles.soundContainer} /> : null}

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
    soundContainer: {
        alignSelf: 'flex-end'
    },
    image: {
        resizeMode: 'center',
        margin: 10,
        height: 260,
        width: 350,
        // flex: 1
    },
    text: {
        color: common.grey,
        fontSize: 22,
        letterSpacing: 4,
        lineHeight: 45
    },
    topic: {
        fontWeight: 'bold',
        marginBottom: 5
    }
})