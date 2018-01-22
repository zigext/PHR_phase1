import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor } from 'react-native'
import { LineChart, BarChart } from 'react-native-charts-wrapper'
import update from 'immutability-helper'
import moment from 'moment'
import common from '../styles/common'

export default class Chart extends React.Component {
    constructor(props) {
        super(props)
    }

    renderNoData = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.text}>ไม่พบข้อมูลการทำกิจกรรม</Text>
            </View>
        )
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
        }

        console.log(event.nativeEvent)
    }

    renderBarChart() {
        return (
            <BarChart
                style={styles.chart}
                data={this.props.dataActivities}
                xAxis={this.props.xAxisActivities}
                yAxis={this.props.yAxisActivities}
                animation={{ durationX: 2000 }}
                legend={this.props.legendActivities}
                gridBackgroundColor={processColor('#ffffff')}
                drawBarShadow={false}
                drawValueAboveBar={true}
                drawHighlightArrow={true}
                onSelect={this.handleSelect.bind(this)}
                onChange={(event) => console.log(event.nativeEvent)}
            />
        )
    }

    renderLineChart() {
        return (
            <LineChart
                style={styles.chart}
                data={this.props.dataActivities}
                chartDescription={{ text: '' }}
                legend={this.props.legendActivities}
                marker={this.props.markerActivities}
                xAxis={this.props.xAxisActivities}
                yAxis={this.props.yAxisActivities}
                drawGridBackground={false}
                borderColor={processColor('teal')}
                borderWidth={1}
                drawBorders={true}

                touchEnabled={true}
                dragEnabled={true}
                scaleEnabled={true}
                scaleXEnabled={true}
                scaleYEnabled={true}
                pinchZoom={true}
                doubleTapToZoomEnabled={true}

                dragDecelerationEnabled={true}
                dragDecelerationFrictionCoef={0.99}

                keepPositionOnRotation={false}
                onSelect={this.handleSelect.bind(this)}
                onChange={(event) => console.log(event.nativeEvent)}
            />
        )
    }

    render() {
        console.log("type ", this.props.type)
        if (this.props.type === 'maxLevel') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>

                        {this.renderLineChart()}
                    </View>
                </View>
            );
        }
        if (this.props.type === 'duration') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>

                        {this.renderBarChart()}
                    </View>
                </View>
            );
        }
        else {
            return ( //Should return null
                <View style={{ flex: 1 }}>
                    <Text>test</Text>
                    {this.renderLineChart()}
                </View >
            )
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
})



