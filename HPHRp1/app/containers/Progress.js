import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor, ToastAndroid, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { BarChart } from 'react-native-charts-wrapper'
import { last, max, property } from 'lodash'
import moment from 'moment'
import update from 'immutability-helper'
import InitialProgress from './InitialProgress'
import SearchProgress from './SearchProgress'
import common from '../styles/common'
import { SERVER_IP, ACTIVITY_RESULT_1 } from '../config/Const'
import ApiUtils from '../components/ApiUtils'

let dataStore = {}
let search
let yAxisMaximum //For seting axis maximum when render duration chart

class Progress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'initial',
            recentActivity: last(this.props.activity),
            activity: this.props.activity,
            dataRecentActivities: {},
            legendRecentActivities: {
                enabled: true,
                textColor: processColor('black'),
                textSize: 16,
                position: 'BELOW_CHART_RIGHT',
                form: 'SQUARE',
                formSize: 15,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5,
                custom: {
                    colors: [processColor('red'), processColor('blue'), processColor('green')],
                    labels: ['Company Dashed'] //the rectangle represent label at the bottom
                }
            },
            markerRecentActivities: {
                enabled: true,
                digits: 2,
                backgroundTint: processColor('teal'),
                markerColor: processColor(common.grey),
                textColor: processColor('white'),
            },
            dataActivities: {},
            legendActivities: {
                enabled: true,
                textColor: processColor('black'),
                textSize: 16,
                position: 'BELOW_CHART_RIGHT',
                form: 'SQUARE',
                formSize: 15,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5,
                custom: {
                    colors: [processColor('red'), processColor('blue'), processColor('green')],
                    labels: ['Company Dashed'] //the rectangle represent label at the bottom
                }
            },
            markerActivities: {
                enabled: true,
                digits: 2,
                backgroundTint: processColor('teal'),
                markerColor: processColor(common.grey),
                textColor: processColor('white'),
            }
        }
        this.baseState = this.state
    }

    componentDidMount = async () => {
        //Patient hasn't done any activity yet
        if (this.state.activity.length === 0) {
            ToastAndroid.showWithGravity('ไม่มีผลการทำกิจกรรมที่ผ่านมา', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
        else {
            let dataSets = await this.prepareYAxisForRecentLevelChart()
            let xAxis = await this.prepareXAxisForRecentLevelChart()
            this.setUpRecentChart(dataSets, xAxis)
        }

    }

    //Check for the most recent activity
    componentWillReceiveProps = async (nextProps) => {
        console.log("receive props in progress ", nextProps.activity)
        //If lastest activity is not the same, set state.recentActivity
        //It also means activity history is not the same, also set state.activity
        if (last(nextProps.activity) !== this.state.recentActivity) {
            console.log("not equal")
            await this.setState({
                recentActivity: last(nextProps.activity), //last activity is the last element
                activity: nextProps.activity
            })
            if (this.state.activity.length === 0) {
                ToastAndroid.showWithGravity('ไม่มีผลการทำกิจกรรมที่ผ่านมา', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            else {
                let dataSets = await this.prepareYAxisForRecentLevelChart()
                let xAxis = await this.prepareXAxisForRecentLevelChart()
                this.setUpRecentChart(dataSets, xAxis)
            }
            // let dataSets = await this.prepareYAxisForRecentLevelChart()
            // let xAxis = await this.prepareXAxisForRecentLevelChart()
            // this.setUpRecentChart(dataSets, xAxis)

        }
        else {
            console.log("equal")
        }
    }

    //Go back to InitialProgress scene. And set up the new recent activity chart
    resetState = async () => {
        this.setState(this.baseState)
        let dataSets = await this.prepareYAxisForRecentLevelChart()
        let xAxis = await this.prepareXAxisForRecentLevelChart()
        this.setUpRecentChart(dataSets, xAxis)
    }

    // handleSelect(event) {
    //     let entry = event.nativeEvent
    //     if (entry == null) {
    //         this.setState({ ...this.state, selectedEntry: null })
    //     } else {
    //         this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    //     }

    //     console.log(event.nativeEvent)
    // }

    formatDate = (date, format) => {
        return moment(date).format(format)
    }

    //Change to SearchProgress
    startSearching = () => {
        this.setState({ status: 'searching' })
    }

    //Prepare data for searching
    //Call when click searh button
    searching = async (callback) => {
        //If user doesn't pick type, set it to default (maxLevel)
        if (!this.state.type) {
            await this.setState({
                type: 'maxLevel'
            })
        }
        //Use to define when to re-prepare data for chart
        search = this.state.type

        //this.state.startDate & this.state.endDate is for using as placeholder in DatePicker
        let startDate
        let endDate
        //Change date from 'dd/mm/yyyy' to 'yyyy-mm-dd' so it can be query from database
        //User picks date
        if (this.state.startDate || this.state.endDate) {
            //Picks both date
            if (this.state.startDate && this.state.endDate) {
                let tmpStart = this.state.startDate.split("/")
                startDate = `${tmpStart[2]}-${tmpStart[1]}-${tmpStart[0]}`
                let tmpEnd = this.state.endDate.split("/")
                endDate = `${tmpEnd[2]}-${tmpEnd[1]}-${tmpEnd[0]}`
            }
            //Picks startDate
            else if (this.state.startDate) {
                let tmpStart = this.state.startDate.split("/")
                startDate = `${tmpStart[2]}-${tmpStart[1]}-${tmpStart[0]}`
                endDate = moment(this.state.endDate).format('YYYY-MM-DD')
            }
            //Picks endDate
            else if (this.state.endDate) {
                startDate = moment(this.state.startDate).format('YYYY-MM-DD')
                let tmpEnd = this.state.endDate.split("/")
                endDate = `${tmpEnd[2]}-${tmpEnd[1]}-${tmpEnd[0]}`
            }
        }
        //User uses default date, both this.state.startDate and this.state.endDate are undefined 
        //Moment will use Date() instead
        else {
            startDate = moment(this.state.startDate).format('YYYY-MM-DD')
            endDate = moment(this.state.endDate).format('YYYY-MM-DD')
        }
        //If endDate is before startDate
        if (endDate < startDate) {
            ToastAndroid.showWithGravity('กรุณาเลือกวันที่ที่ถูกต้อง', ToastAndroid.SHORT, ToastAndroid.CENTER)
            callback(true)
        }
        else {
            this.prepareChart(startDate, endDate)
            callback(false)
        }

    }

    prepareChart = async (startDate, endDate) => {
        await this.fetchActivityResult(startDate, endDate)
        console.log("this.state.activityResult = ", this.state.activityResult)
        if (this.state.activityResult.data.length === 0) {
            console.log("no result")
            ToastAndroid.showWithGravity('ไม่มีผลการทำกิจกรรมในวันที่ค้นหา', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
        else {
            let dataSets = await this.prepareYAxisForChart()
            let xAxis = await this.prepareXAxisForChart()
            this.setUpChart(dataSets, xAxis)
        }

    }

    fetchActivityResult = async (startDate, endDate) => {
        const path = `${SERVER_IP}${ACTIVITY_RESULT_1}?userid=1416382941765846&appid=PHRapp&start_date=${startDate}&end_date=${endDate}` //userid=${this.props.userReducer.user.uid}&appid=${this.props.userReducer.appId}  
        await fetch(path)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(async responseData => {
                await this.setState({
                    activityResult: responseData
                })
                console.log("Fetch activity result success", responseData)
            })
            .catch(error => {
                console.log("Error in fetchActivityResult = ", error)
            })
    }

    handleSearchChange = (name, value) => {
        this.setState({ [name]: value })
        dataStore[name] = value

    }

    prepareYAxisForRecentLevelChart = () => {
        let dataSets = []
        for (let index in this.state.activity) {
            let data = {}
            data.y = this.state.activity[index].results.result.maxLevel //y-axis is max level
            dataSets.push(data)
        }
        return dataSets
    }

    prepareXAxisForRecentLevelChart = () => {
        let xAxis = []
        for (let index in this.state.activity) {
            xAxis.push(moment(this.state.activity[index].results.timeStart).format('D MMM, kk:mm')) //x-axis is date and time
        }
        return xAxis
    }

    setUpRecentChart = (dataSets, xAxis) => {
        this.setState(
            update(this.state, {
                dataRecentActivities: {
                    $set: {
                        dataSets: [
                            {
                                values: dataSets,
                                label: 'ขั้นของกิจกรรมที่ทำสำเร็จ',
                                config: {
                                    color: processColor(common.primaryColor),
                                    drawFilled: true,
                                    fillColor: processColor(common.primaryColor),
                                    fillAlpha: 50,
                                    valueFormatter: '#' //Doesn't display the decimal
                                }
                            }],
                    }
                },
                xAxisRecentActivities: {
                    $set: {
                        valueFormatter: xAxis,
                        textSize: 15,
                        avoidFirstLastClipping: true,
                        position: 'BOTTOM',
                        granularityEnabled: true,
                        granularity: 1,
                    }
                },
                yAxisRecentActivities: {
                    $set: {
                        left: {
                            axisMaximum: 7,
                            axisMinimum: 0,
                            textSize: 15,
                        },
                        right: {
                            enabled: false
                        }
                    }
                }
            })
        )
    }

    prepareYAxisForChart = () => {
        let dataSets = []
        if (search === 'maxLevel') {
            for (let index in this.state.activityResult.data) {
                let key = Object.keys(this.state.activityResult.data[index])[0]
                let data = {}
                data.y = this.state.activityResult.data[index][key].activity_result_1.result.result.maxLevel //y-axis is max level
                dataSets.push(data)
            }
        }
        else if (search === 'duration') {
            let minAndSec
            for (let index in this.state.activityResult.data) {
                let key = Object.keys(this.state.activityResult.data[index])[0]
                let data = {}
                minAndSec = this.millisToMinutesAndSeconds(this.state.activityResult.data[index][key].activity_result_1.result.durationMillis) //y-axis is duration
                minAndSec = parseFloat(minAndSec) //Change string to float
                data.y = minAndSec
                dataSets.push(data)
            }
            let tmp = max(dataSets, property('y'))
            yAxisMaximum = Math.ceil(tmp.y)
        }
        return dataSets
    }

    prepareXAxisForChart = () => {
        let xAxis = []
        for (let index in this.state.activityResult.data) {
            let key = Object.keys(this.state.activityResult.data[index])[0]
            xAxis.push(moment(this.state.activityResult.data[index][key].activity_result_1.result.timeStart).format('D MMM, kk:mm')) //x-axis is date and time
        }
        return xAxis
    }

    setUpChart = async (dataSets, xAxis) => {
        console.log("datasets = ", dataSets)
        console.log("xaxis = ", xAxis)
        if (search === 'maxLevel') {
            this.setState(
                update(this.state, {
                    dataActivities: {
                        $set: {
                            dataSets: [
                                {
                                    values: dataSets,
                                    label: 'ขั้นของกิจกรรมที่ทำสำเร็จ',
                                    config: {
                                        color: processColor(common.primaryColor),
                                        drawFilled: true,
                                        fillColor: processColor(common.primaryColor),
                                        fillAlpha: 50,
                                        valueFormatter: '#' //Doesn't display the decimal
                                    }
                                }],
                        }
                    },
                    xAxisActivities: {
                        $set: {
                            valueFormatter: xAxis,
                            textSize: 15,
                            avoidFirstLastClipping: true,
                            position: 'BOTTOM',
                            granularityEnabled: true,
                            granularity: 1,
                        }
                    },
                    yAxisActivities: {
                        $set: {
                            left: {
                                axisMaximum: 7,
                                axisMinimum: 0,
                                textSize: 15,
                            },
                            right: {
                                enabled: false
                            }
                        }
                    }
                })
            )
        }
        else if (search === 'duration') {
            this.setState(
                update(this.state, {
                    dataActivities: {
                        $set: {
                            dataSets: [
                                {
                                    values: dataSets,
                                    label: 'ระยะเวลาที่ใช้ (นาที)',
                                    config: {
                                        color: processColor(common.primaryColor),
                                        barSpacePercent: 40,
                                        barShadowColor: processColor('lightgrey'),
                                        highlightAlpha: 90,
                                        highlightColor: processColor('red'),
                                        valueFormatter: '#.##' //Display 2 decimal
                                    }
                                }],
                        }
                    },
                    xAxisActivities: {
                        $set: {
                            valueFormatter: xAxis,
                            textSize: 15,
                            avoidFirstLastClipping: true,
                            position: 'BOTTOM',
                            granularityEnabled: true,
                            granularity: 1,
                        }
                    },
                    yAxisActivities: {
                        $set: {
                            left: {
                                axisMinimum: 0,
                                axisMaximum: yAxisMaximum,
                                textSize: 15,
                            },
                            right: {
                                enabled: false
                            }
                        }
                    }
                })
            )
        }
    }

    millisToMinutesAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000)
        let seconds = ((millis % 60000) / 1000).toFixed(0)
        return minutes + "." + (seconds < 10 ? '0' : '') + seconds
    }

    renderBody = () => {
        switch (this.state.status) {
            case 'initial':
                return <InitialProgress dataRecentActivities={this.state.dataRecentActivities} xAxisRecentActivities={this.state.xAxisRecentActivities} yAxisRecentActivities={this.state.yAxisRecentActivities} activity={this.state.activity} markerRecentActivities={this.state.markerRecentActivities} legendRecentActivities={this.state.legendRecentActivities} recentActivity={this.state.recentActivity} admitDate={this.props.profile? this.props.profile.admit_date: null} startSearching={this.startSearching} searching={this.searching} handleSearchChange={this.handleSearchChange} type={this.state.type} startDate={this.state.startDate} endDate={this.state.endDate} />
            case 'searching':
                return <SearchProgress activityResult={this.state.activityResult} dataActivities={this.state.dataActivities} xAxisActivities={this.state.xAxisActivities} yAxisActivities={this.state.yAxisActivities} markerActivities={this.state.markerActivities} legendActivities={this.state.legendActivities} resetState={this.resetState} searching={this.searching} handleSearchChange={this.handleSearchChange} type={this.state.type} startDate={this.state.startDate} endDate={this.state.endDate} admitDate={this.props.profile? this.props.profile.admit_date: null} search={search} />
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    {this.renderBody()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps in progress ", state)
    // return state
    return {
        profile: state.userReducer.user.profile,
        activity: state.userReducer.activity
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})