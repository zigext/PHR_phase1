import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native'
import { Icon, Slider } from 'react-native-elements'
import common from '../styles/common'


export default class Step1PostMwt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borg: 6,
        }
    }

    onForward = () => {
        this.props.onDataChange('borg', this.state.borg)
        this.props.onStepChange(this.props.step + 1)
    }

    setBorgAndOpacity = (borg) => {
        this.setState({
            borg
        })
    }

    renderDescription = () => {
        let value
        (this.props.borg) ? value = this.props.borg : value = this.state.borg
        if (value >= 6 && value <= 8)
            return <Text style={styles.descriptionText}>เหมือนนั่งเล่นสบายๆ</Text>
        else if (value === 9)
            return <Text style={styles.descriptionText}>เหนื่อยเล็กน้อย พูดคุยได้ปกติ</Text>
        else if (value >= 10 && value <= 11)
            return <Text style={styles.descriptionText}>เหนื่อยมากขึ้นแต่ทนได้ พูดสื่อสารได้ ใจไม่สั่น</Text>
        else if (value >= 12 && value <= 13)
            return <Text style={styles.descriptionText}>เหนื่อย หายใจเร็ว พูดได้เป็นคำๆ ต้องหยุดพัก</Text>
        else
            return <Text style={styles.descriptionText}>เหนื่อยจนหอบ พูดไม่ไหว ใจสั่น</Text>
    }

    renderImage = () => {
        let value
        (this.props.borg) ? value = this.props.borg : value = this.state.borg
        if (value >= 6 && value <= 8)
            return <Image source={require('../../assets/images/borg_great.png')} style={styles.image} />
        else if (value === 9)
            return <Image source={require('../../assets/images/borg_good.png')} style={styles.image} />
        else if (value >= 10 && value <= 11)
            return <Image source={require('../../assets/images/borg_normal.png')} style={styles.image} />
        else if (value >= 12 && value <= 13)
            return <Image source={require('../../assets/images/borg_tired.png')} style={styles.image} />
        else
            return <Image source={require('../../assets/images/borg_bad.png')} style={styles.image} />
    }

    renderImageWithOpacity = () => {
        let value
        (this.props.borg) ? value = this.props.borg : value = this.state.borg
        if (value >= 6 && value <= 8)
            return (
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/borg_great.png')} style={styles.image} />
                    <Image source={require('../../assets/images/borg_good.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_normal.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_tired.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_bad.png')} style={[styles.image, { opacity: 0.3 }]} />
                </View>
            )
        else if (value === 9)
            return (
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/borg_great.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_good.png')} style={styles.image} />
                    <Image source={require('../../assets/images/borg_normal.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_tired.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_bad.png')} style={[styles.image, { opacity: 0.3 }]} />
                </View>
            )
        else if (value >= 10 && value <= 11)
            return (
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/borg_great.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_good.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_normal.png')} style={styles.image} />
                    <Image source={require('../../assets/images/borg_tired.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_bad.png')} style={[styles.image, { opacity: 0.3 }]} />
                </View>
            )
        else if (value >= 12 && value <= 13)
            return (
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/borg_great.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_good.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_normal.png')} style={[styles.image, { opacity: 0.3 }]} />
                    <Image source={require('../../assets/images/borg_tired.png')} style={styles.image} />
                    <Image source={require('../../assets/images/borg_bad.png')} style={[styles.image, { opacity: 0.3 }]} />
                </View>
            )
        return (
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/borg_great.png')} style={[styles.image, { opacity: 0.3 }]} />
                <Image source={require('../../assets/images/borg_good.png')} style={[styles.image, { opacity: 0.3 }]} />
                <Image source={require('../../assets/images/borg_normal.png')} style={[styles.image, { opacity: 0.3 }]} />
                <Image source={require('../../assets/images/borg_tired.png')} style={[styles.image, { opacity: 0.3 }]} />
                <Image source={require('../../assets/images/borg_bad.png')} style={styles.image} />
            </View>
        )
    }

    render() {
        //Show 5 borg faces and change their opacity
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>โปรดเลือกระดับความเหนื่อย</Text>
                    {this.renderImageWithOpacity()}
                    <View style={{ marginHorizontal: 300 }}>
                        <Slider
                            value={this.props.borg ? this.props.borg : this.state.borg}
                            onValueChange={(borg) => this.setState({ borg })}
                            minimumValue={6}
                            maximumValue={20}
                            step={1}
                            thumbTintColor={common.primaryColor}
                            minimumTrackTintColor={common.primaryColor} />
                    </View>

                    <Text style={[ styles.sliderText, {marginHorizontal: 300 }]}>Borg scale: {this.props.borg ? this.props.borg : this.state.borg}</Text>
                    <View style={{ alignItems: 'center', marginTop: 16 }} >
                        {this.renderDescription()}
                    </View>
                    <Icon
                        raised
                        reverse
                        name='ios-arrow-forward'
                        type='ionicon'
                        color={common.accentColor}
                        size={35}
                        onPress={this.onForward}
                        containerStyle={{alignSelf: 'flex-end'}}
                    />
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginVertical: 15,
        marginHorizontal: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
        margin: 12,
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: common.grey,
        textAlign: 'center',
    },
    sliderText: {
        fontSize: 19,
        color: common.grey
    },
    descriptionText: {
        fontSize: 20,
        color: common.grey,
        textAlign: 'center',
    }
})
