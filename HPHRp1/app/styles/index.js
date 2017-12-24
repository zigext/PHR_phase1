import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import common from './common'

export default StyleSheet.create({
    selectedTab: {
        backgroundColor: common.primaryColorDark
    },
    tabTitle: {
        color: 'white',
        alignSelf: 'center'
    },
    tab: {
        backgroundColor: common.primaryColor
    },
    text: {
        color: common.grey,
        fontSize: 28,
    },
    background: {
        backgroundColor: common.backgroundWhite
    },
    buttonImageText: {
        fontSize: 24,
        color: common.grey,
        alignSelf: 'center'
    },
    buttonImage: {
        flex: 1,
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
        alignSelf: 'center'
    }
})

