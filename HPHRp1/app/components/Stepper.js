import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import StepIndicator from 'react-native-step-indicator'

const labels = ['Detail', 'Address', 'Available Date', 'Payment']

export default class Stepper extends Component {
    constructor(props) {
    super(props)
}   

  onStepChange = step => {
    step < this.props.step && this.props.onStepChange(step)
  }

  render () {
    return (
      <View style={{ marginTop: 15 }}>
        <StepIndicator
          stepCount={5}
          customStyles={styles.customStyles}
          currentPosition={this.props.step - 1}
          onPress={step => this.onStepChange(step + 1)}
        />
      </View>
    )
  }
}

const styles = {
  customStyles: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }
}