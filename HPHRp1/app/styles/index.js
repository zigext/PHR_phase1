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
        fontSize: 30,
    },
    background: {
        backgroundColor: common.backgroundWhite
    }
})

