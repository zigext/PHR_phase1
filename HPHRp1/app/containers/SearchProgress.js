import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor, ScrollView, Picker } from 'react-native'
import { connect } from 'react-redux'
import { BarChart, LineChart } from 'react-native-charts-wrapper'
import { Icon, List, ListItem } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import _ from 'lodash'
import Chart from '../components/Chart'
import common from '../styles/common'

export default class SearchProgress extends React.Component {

    constructor(props) {
        super(props)
    }

    onSelect = type => {
        this.props.handleSearchChange('type', type)
    }

    searchProgress = async () => {
        await this.props.searching((wrongDate) => {
            if (wrongDate === true) {
                return
            }
            else {

            }
        })
    }

    reset = () => {
        this.props.resetState()
    }

    render() {
        console.log("______type", this.props.type)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={true}>
                    <View style={{ margin: 20, flex: 1 }}>
                        {/*<ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={true}>*/}

                        <View style={styles.formContainer}>

                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.formText}>เลือกผลการทำกิจกรรม</Text>
                                    <View style={styles.buttonDown}>
                                        <Picker selectedValue={this.props.type} onValueChange={(type, idx) => this.onSelect(type)}>
                                            <Picker.Item label='ขั้นที่ทำได้' value='maxLevel' />
                                            <Picker.Item label='ระยะเวลาที่ใช้' value='duration' />
                                        </Picker>
                                    </View>
                                </View>

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
                                <Icon
                                    raised
                                    reverse
                                    name='search'
                                    type='feather'
                                    color={common.primaryColorDark}
                                    size={25}
                                    containerStyle={{ alignSelf: 'flex-end' }}
                                    onPress={this.searchProgress}
                                />
                                <Icon
                                    raised
                                    reverse
                                    name='table-large'
                                    type='material-community'
                                    color={common.accentColor}
                                    size={25}
                                    containerStyle={{ alignSelf: 'flex-end' }}
                                    onPress={() =>  Actions.progressResultList({activityResult: this.props.activityResult, searchType: this.props.type})}
                                />
                                <Icon
                                    raised
                                    reverse
                                    name='settings-backup-restore'
                                    color={common.grey}
                                    size={25}
                                    containerStyle={{ alignSelf: 'flex-end' }}
                                    onPress={this.reset}
                                />
                            </View>


                        </View>

                        <View style={styles.chartContainer}>
                            <Chart dataActivities={this.props.dataActivities} xAxisActivities={this.props.xAxisActivities} yAxisActivities={this.props.yAxisActivities} markerActivities={this.props.markerActivities} legendActivities={this.props.legendActivities} activityResult={this.props.activityResult} type={this.props.type} search={this.props.search} />
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f7f1e6'
    },
    formContainer: {
        flex: 0.4,
        backgroundColor: '#f7f1e6'
    },
    chartContainer: {
        flex: 1,
        backgroundColor: '#f7f1e6'
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
    recentActivityContainer: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: common.primaryColor
    },
    text: {
        fontSize: 17,
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