import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor, TouchableHighlight, ToastAndroid, Picker } from 'react-native'
import { connect } from 'react-redux'
import { BarChart } from 'react-native-charts-wrapper'
import { Icon, Button } from 'react-native-elements'
import _ from 'lodash'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import RecentLevelChart from '../components/RecentLevelChart'
import common from '../styles/common'

export default class InitialProgress extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recentActivity: this.props.recentActivity,
        }
    }

    formatDate = (date, format) => {
        return moment(date).format(format)
    }

    formatTime = (time, format) => {
        return moment(time).format(format)
    }

    startSearching = async () => {
            await this.props.searching((wrongDate) => {
                if(wrongDate === true) {
                    return
                }
                else {
                    this.props.startSearching()
                }
            })
            
    }

    onSelect = type => {
        this.props.handleSearchChange('type', type)
    }

    renderLastActivity = () => {

        if (this.props.recentActivity) {
            return (
                <View style={styles.recentActivityContainer}>
                    <Text style={[styles.text, { fontWeight: 'bold', textAlign: 'left' }]}>กิจกรรมครั้งล่าสุด</Text>
                    <Text style={styles.text}>{this.formatDate(this.props.recentActivity.date, 'DD MMM')} เวลา {this.formatTime(this.props.recentActivity.results.timeStart, 'HH:mm')}  ขั้นที่ {this.props.recentActivity.results.result.maxLevel}</Text>
                    <Text style={styles.text}>{this.props.recentActivity.results.result.levelTitle}</Text>
                </View>
            )
        }

        else {
            return <Text style={styles.text}>ยังไม่เริ่มทำกิจกรรมฟื้นฟูหัวใจ</Text>
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#f7f1e6', flexDirection: 'row' }}>

                    <View style={{ flex: 1, backgroundColor: '#f7f1e6' }}>
                        <RecentLevelChart dataRecentActivities={this.props.dataRecentActivities} xAxisRecentActivities={this.props.xAxisRecentActivities} yAxisRecentActivities={this.props.yAxisRecentActivities} markerRecentActivities={this.props.markerRecentActivities} legendRecentActivities={this.props.legendRecentActivities} />
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f7f1e6', flexDirection: 'column' }}>
                        <View style={{ flex: 0.8, backgroundColor: '#f7f1e6', padding: 20 }}>
                            <Text style={styles.formText}>เลือกผลการทำกิจกรรม</Text>
                            <View style={styles.buttonDown}>
                                <Picker selectedValue={this.props.type} onValueChange={(type, idx) => this.onSelect(type)}>
                                    <Picker.Item label='ขั้นที่ทำได้' value='maxLevel' />
                                    <Picker.Item label='ระยะเวลาที่ใช้' value='duration' />
                                </Picker>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.formText}>ตั้งแต่วันที่</Text>
                                    <DatePicker
                                        mode='date'
                                        date={this.props.startDate}
                                        format='DD/MM/YYYY'
                                        minDate={this.props.admitDate ? new Date(this.props.admitDate) : this.props.startDate}
                                        maxDate={new Date()}
                                        style={styles.elementContainer}
                                        customStyles={styles.customStyles}
                                        onDateChange={startDate => this.props.handleSearchChange('startDate', startDate)}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.formText}>ถึงวันที่</Text>
                                    <DatePicker
                                        mode='date'
                                        date={this.props.endDate}
                                        format='DD/MM/YYYY'
                                        minDate={this.props.startDate ? this.props.startDate : this.props.endDate}
                                        maxDate={new Date()}
                                        style={styles.elementContainer}
                                        customStyles={styles.customStyles}
                                        onDateChange={endDate => this.props.handleSearchChange('endDate', endDate)}
                                    />
                                </View>
                            </View>

                            <Icon
                                raised
                                reverse
                                name='search'
                                type='feather'
                                color={common.primaryColorDark}
                                size={25}
                                containerStyle={{ alignSelf: 'flex-end' }}
                                onPress={this.startSearching}
                            />

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.renderLastActivity()}
                        </View>


                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f7f1e6'
    },
    levelContainer: {
        borderWidth: 10,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderColor: common.primaryColor
    },
    recentActivityContainer: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: common.primaryColor,
        
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: common.grey,
        margin: 10
    },
    formText: {
        fontSize: 17,
        color: common.grey,
        margin: 10,
        fontWeight: 'bold'
    },
    buttonDown: {
        flexDirection: 'column',
        marginBottom: 10,
        paddingLeft: 20,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: common.grey
    },
    elementContainer: {
        width: '80%',
        marginBottom: 10,
        borderColor: common.grey
    },
    customStyles: {
        dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 5
        },
        dateText: {
            marginLeft: 30
        }
    }
}