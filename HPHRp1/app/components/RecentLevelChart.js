import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor } from 'react-native'
import { LineChart } from 'react-native-charts-wrapper'
import common from '../styles/common'

export default class RecentLevelChart extends React.Component {
    constructor(props) {
        super(props)
    }

    renderNoData = () => {
        return (
            <View style={{flex: 1, justtifyContent: 'center', alignItems: 'center'}}>
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

    render() {

        return (
            <View style={{ flex: 1 }}>

                <View style={styles.container}>
                    <LineChart
                        style={styles.chart}
                        data={this.props.dataRecentActivities}
                        chartDescription={{ text: '' }}
                        legend={this.props.legendRecentActivities}
                        marker={this.props.markerRecentActivities}
                        xAxis={this.props.xAxisRecentActivities}
                        yAxis={this.props.yAxisRecentActivities}
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
                        dragDecelerationEnabled={false}
                        dragDecelerationFrictionCoef={0.99}
                        noDataText="ไม่มีข้อมูล"

                        keepPositionOnRotation={false}
                        onSelect={this.handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: common.grey
    },
})



