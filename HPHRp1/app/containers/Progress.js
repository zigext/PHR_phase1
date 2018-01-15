import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor } from 'react-native'
import { connect } from 'react-redux'
import { BarChart } from 'react-native-charts-wrapper'
import { last } from 'lodash'
import moment from 'moment'
import LineChart from '../components/LineChart'
import InitialProgress from './InitialProgress'
import SearchProgress from './SearchProgress'
import common from '../styles/common'

let array = ['2017-02-02', '2017-02-03', '2017-02-04']
class Progress extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            status: 'initial',
            recentActivity: null,
        }
    }

    //Check for the most recent activity
    componentWillReceiveProps = async (nextProps) => {
        console.log("receive props in progress ", nextProps.activity)
        if(last(nextProps.activity) !== this.state.recentActivity) {
             console.log("not equal")
             await this.setState({
                 recentActivity: last(nextProps.activity) //last activity is the last element
             })
              console.log("last ", this.state.recentActivity)
        }
        else {
            console.log("equal")
        }
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

    formatDate = (date, format) => {
        return moment(date).format(format)
    }

    formatTime = (time, format) => {
        return moment(time).format(format)
}

    renderLastActivity = () => {
        
        if(this.state.recentActivity)
        {
            console.log("XXXXXXXXX ", this.state.recentActivity.time)
              return (
                <View style={styles.recentActivityContainer}>
                    <Text style={styles.text}>{this.formatDate(this.state.recentActivity.date, 'DD MMM')} เวลา {this.formatTime(this.state.recentActivity.results.timeStart, 'HH:mm')} ขั้นที่ {this.state.recentActivity.results.result.maxLevel} 
                        กิจกรรม {this.state.recentActivity.results.result.levelTitle}
                    </Text>
                </View>
            )
        }
          
        else {
            return <Text style={styles.text}>ยังไม่เริ่มทำกิจกรรมฟื้นฟูหัวใจ</Text>
        }
    }

    startSearching = () => {
        this.setState({status: 'searching'})
    }

    renderBody = () => {
        switch (this.state.status) {
            case 'initial': 
                return <InitialProgress recentActivity={this.state.recentActivity} startSearching={this.startSearching} admitDate={this.props.profile.admit_date}/>
            case 'searching': 
                return <SearchProgress />
        }
    }


    render() {
        // console.log("progress ", this.props.activity)
        return (
            <View style={{ flex: 1 }}>
                {/*<View style={{ flex: 1, backgroundColor: 'green', flexDirection: 'row' }}>


                    <View style={{ flex: 1, backgroundColor: 'pink' }}>
                         <LineChart />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'yellow', flexDirection: 'column' }}>
                        <View style={{ flex: 0.5, backgroundColor: 'orange' }}>
                            <View style={styles.levelContainer}>
                                <Text>level</Text>
                            </View>
                        </View>
                        {this.renderLastActivity() }
                        
                    </View>
                </View>*/}
                {this.renderBody()}
            </View>
        );
    }
    }

const mapStateToProps = (state) => {
    console.log("mapStateToProps in progress ", state)
    // return state
      return {
        profile : state.default.user.profile,
        activity : state.default.activity        
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
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    },
    levelContainer: {
        borderWidth: 10,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        borderColor: common.primaryColor
    },
    recentActivityContainer: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: common.primaryColor
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: common.grey,
        margin: 10
    }
})