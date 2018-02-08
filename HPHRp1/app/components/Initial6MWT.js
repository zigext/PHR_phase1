import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import styles from '../styles/index'
import { join, compact, replace, trim } from 'lodash'
import moment from 'moment'

//replace in String
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
}

export default class Initial6MWT extends React.Component {
    constructor(props) {
        super(props)
    }

    //Change duration from ms to hr:min
    formatDuration = (ms) => {
        let hm = moment.utc(ms).format('HH:mm:ss')
        return hm
    }

    formatDate = (date) => {
        return moment(date).format(" DD MMM YYYY")
    }

    render() {
        return (
            <Swiper style={_styles.wrapper} showsButtons>
                {/*general information*/}
                <View style={_styles.container}>
                    <View style={_styles.pictureContainer}>
                        <Image source={{ uri: this.props.profile.picture_uri }} style={_styles.image}></Image>
                    </View>
                    <ScrollView>

                        <View style={_styles.contentContainer}>
                           
                        </View>


                    </ScrollView>

                </View>

    
            </Swiper>

        )
    }
}

const _styles = StyleSheet.create({
    wrapper: {
    },
    text: {
        color: '#474045',
        fontSize: 25,
        marginBottom: 10
    },
    image: {
        height: 200,
        borderRadius: 100,
        width: 200,
        margin: 10,
        alignSelf: 'center'
    },
    container: {
        flexDirection: 'row',
        flex: 1
    },
    contentContainer: {
        alignItems: 'stretch',
        borderColor: '#f49842',
        borderWidth: 3,
        borderRadius: 10,
        padding: 15,
        margin: 20,
        flex: 0.7
    },
    pictureContainer: {
        alignItems: 'stretch',
        flex: 0.3,
        opacity: 60
    }
})