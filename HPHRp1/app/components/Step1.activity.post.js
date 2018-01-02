import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native'
import { Icon, Slider } from 'react-native-elements'
import common from '../styles/common'
// import styles from '../styles/index'


export default class Step1Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borg: 6,
        }
    }
    onPress = () => {

    }

    onForward = () => {
        this.props.onDataChange('borg', this.state.borg)
        this.props.onStepChange(this.props.step + 1)
    }

    renderImage = () => {
        let value
        (this.props.borg)? value = this.props.borg : value = this.state.borg
        if (value >= 6 && value <= 8)
            return <Image source={require('../../assets/images/borg_great.png')} style={styles.imageInButtonImage} />
        else if (value === 9)
            return <Image source={require('../../assets/images/borg_good.png')} style={styles.imageInButtonImage} />
        else if (value >= 10 && value <= 11)
            return <Image source={require('../../assets/images/borg_normal.png')} style={styles.imageInButtonImage} />
        else if (value >= 12 && value <= 13)
            return <Image source={require('../../assets/images/borg_tired.png')} style={styles.imageInButtonImage} />
        else
            return <Image source={require('../../assets/images/borg_bad.png')} style={styles.imageInButtonImage} />
    }

    render() {
        // this.props.borg? this.state.borg = this.props.borg : this.state.borg = 6
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', marginVertical: 15, marginHorizontal: 20 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={styles.text}>โปรดเลือกระดับความเหนื่อย</Text>
                    {this.renderImage()}
                    <View style={{ marginHorizontal: 300 }}>
                        <Slider
                            value={this.props.borg? this.props.borg: this.state.borg}
                            onValueChange={(borg) => this.setState({ borg })}
                            minimumValue={6}
                            maximumValue={20}
                            step={1}
                            thumbTintColor={common.primaryColor}
                            minimumTrackTintColor={common.primaryColor} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, marginHorizontal: 300 }}>Borg scale: {this.props.borg? this.props.borg: this.state.borg}</Text>
                        <Icon
                            raised
                            reverse
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={common.accentColor}
                            size={35}
                            onPress={this.onForward}
                        />
                    </View>

                    {/*<View style={styles.container}>
                    
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
                </View>*/}
                </ScrollView>
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
        justifyContent: 'center',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
        // shadowColor: '#000',
        // elevation: 1,
    },
    imageInButtonImage: {
        resizeMode: 'contain',
        margin: 12,
        alignItems: 'center',
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: common.grey,
        textAlign: 'center',
    }
})
