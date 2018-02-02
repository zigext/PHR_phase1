import React from 'react'
import { AppRegistry, StyleSheet, Text, View, processColor, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Icon, List, ListItem } from 'react-native-elements'
import Modal from 'react-native-modalbox'
import moment from 'moment'
import { isEmpty } from 'lodash'
import common from '../styles/common'

export default class ProgressResultList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resultArray: [],
            modalData: {},
            isOpen: false
        }

    }

    componentDidMount = () => {
        this.prepareArray()
    }

    formatMoment = (date, format) => {
        return moment(date).format(format)
    }

    millisToMinutesAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000)
        let seconds = ((millis % 60000) / 1000).toFixed(0)
        return minutes + "." + (seconds < 10 ? '0' : '') + seconds
    }

    prepareArray = async () => {
        for (let index in this.props.activityResult.data) {
            let key = Object.keys(this.props.activityResult.data[index])[0]
            let data = {}
            let obj = this.props.activityResult.data[index][key].activity_result_1.result
            await this.setState({
                resultArray: [...this.state.resultArray, obj]
            })
        }
        console.log("state array = ", this.state.resultArray)
    }

    prepareDataForModal = async (i) => {
        await this.setState({
            modalData: this.state.resultArray[i]
        })
        console.log("modal = ", this.state.resultArray[i], this.state.modalData)
    }

    openModal = async (i) => {
        await this.prepareDataForModal(i)
        this.setState({ isOpen: true })
        this.refs.modal.open()
    }

    //Check wheter it has that property and that it is true
    checkPhysicalExercise = (physicalExercise) => {
        console.log("phy = ", physicalExercise)
        let str
        if (!isEmpty(physicalExercise)) {
            if (physicalExercise.hasOwnProperty('fowlerPosition') && physicalExercise.fowlerPosition === true)
                str = 'นั่งหัวสูง'
            if (physicalExercise.hasOwnProperty('legsExercise') && physicalExercise.legsExercise === true)
                str = str + ', บริหารขาและข้อเท้า'
            if (physicalExercise.hasOwnProperty('armsExercise') && physicalExercise.armsExercise === true)
                str = str + ', บริหารแขน-ข้อมือ-ข้อศอก-หัวไหล่'
            if (physicalExercise.hasOwnProperty('sitWithFreeLegsPosition') && physicalExercise.sitWithFreeLegsPosition === true)
                str = str + ', นั่งห้อยขาข้างเตียง'
            if (physicalExercise.hasOwnProperty('legsSwing') && physicalExercise.legsSwing === true)
                str = str + ', แกว่งเท้า'
            if (physicalExercise.hasOwnProperty('sitting') && physicalExercise.sitting === true)
                str = str + ', นั่งเก้าอี้ข้างเตียง'
            if (physicalExercise.hasOwnProperty('standing') && physicalExercise.standing === true)
                str = str + ', ยืนข้างเตียง'
            if (physicalExercise.hasOwnProperty('marching') && physicalExercise.marching === true)
                str = str + ', ยืนย่ำอยู่กับที่'
            if (physicalExercise.hasOwnProperty('walking') && physicalExercise.walking === true)
                str = str + ', เดิน'
            if (physicalExercise.hasOwnProperty('tiptoeing') && physicalExercise.tiptoeing === true)
                str = str + ', เขย่งเท้าขึ้นลง'
            if (physicalExercise.hasOwnProperty('stairWalking') && physicalExercise.stairWalking === true)
                str = str + ', เดินขึ้นลงบันได'
            if (physicalExercise.hasOwnProperty('fowlerPosition') && physicalExercise.fowlerPosition === false)
                str = 'ไม่มี'
        }
        else str = 'ไม่มี'
        return str
    }

    //Check wheter it has that property and that it is true
    checkBreathingExercise = (breathingExercise) => {
        console.log("bre = ", breathingExercise)
        let str
        if (!isEmpty(breathingExercise)) {
            if (breathingExercise.hasOwnProperty('deepBreathing') && breathingExercise.deepBreathing === true)
                str = 'บริหารปอดด้วยการหายใจเข้า-ออกลึกๆ'
            if (breathingExercise.hasOwnProperty('effectiveCough') && breathingExercise.effectiveCough === true)
                str = str + ', ไออย่างมีประสิทธิภาพ'
            if (breathingExercise.hasOwnProperty('deepBreathing') && breathingExercise.deepBreathing === false)
                str = 'ไม่มี'
        }
        else str = 'ไม่มี'
        return str
    }

    checkPreActivity = (preActivity) => {
        let str = ''
        if (preActivity.sbpLowerThanNormal === true)
            str = str + 'SBP ต่ำลงมากกว่าปกติของผู้ป่วยมากกว่า 20 mmHg'
        if (preActivity.highSbp === true)
            str = str + ', ' + 'SBP ≥ 180 mmHG'
        if (preActivity.highDbp === true)
            str = str + ', ' + 'DBP ≥ 110 mmHG'
        if (preActivity.st === true)
            str = str + ', ' + 'ST ≥ 120 ครั้ง/นาที'
        if (preActivity.pvc === true)
            str = str + ', ' + 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว'
        if (preActivity.af === true)
            str = str + ', ' + 'AF ≥ 100 ครั้ง/นาที'
        if (preActivity.svt === true)
            str = str + ', ' + 'SVT'
        if (preActivity.bradyCardia === true)
            str = str + ', ' + 'Bradychardia ที่ต้องใช้ pacemaker VT หรือ VF'
        if (preActivity.stSegment === true)
            str = str + ', ' + 'มีความผิดปกติของ ST-segment'
        if (preActivity.rr === true)
            str = str + ', ' + 'อัตราการหายใจ ≥ 35 ครั้ง/นาที'
        if (preActivity.spO2 === true)
            str = str + ', ' + 'SpO2 ≤ 93%'
        if (preActivity.paO2 === true)
            str = str + ', ' + 'PaO2 ≤ 60 mmHg'
        if (preActivity.agitation === true)
            str = str + ', ' + 'กระสับกระส่าย'
        if (preActivity.dyspnea === true)
            str = str + ', ' + 'หอบเหนื่อย'
        if (preActivity.abnormalGlucose === true)
            str = str + ', ' + 'น้ำตาลในเลือดผิดปกติ/ไม่เป็นไปตามแผนการรักษา (300 mg% หรือ < 80 mg%)'
        if (preActivity.anemia === true)
            str = str + ', ' + 'ใบหน้าซีด หรือ Hb ≤ 10 gm%'
        if (preActivity.fatigue === true)
            str = str + ', ' + 'เหนื่อยล้า อ่อนเพลีย'
        if (preActivity.nausea === true)
            str = str + ', ' + 'คลื่นไส้'
        if (preActivity.chestPain === true)
            str = str + ', ' + 'เจ็บแน่นหน้าอก'
        if (preActivity.dizziness === true)
            str = str + ', ' + 'หน้ามืด มึนงง'
        if (preActivity.weakMuscle === true)
            str = str + ', ' + 'กล้ามเนื้ออ่อนแรง'
        if (preActivity.pain === true)
            str = str + ', ' + 'ปวดแผล (Pain score ≥ 5)'
        if(str === '')  str = 'ไม่มี'

        return str
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List containerStyle={{ flex: 1 }}>
                        {
                            this.state.resultArray.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={<Text style={{ fontSize: 18 }}>{this.formatMoment(item.date, "DD/MM/YYYY")}    เวลา {this.formatMoment(item.timeStart, "kk:mm")}   ระดับ {item.result.maxLevel}    {item.result.levelTitle}   {this.props.searchType === "duration" ? <Text>ใช้เวลา {this.millisToMinutesAndSeconds(item.durationMillis)} นาที</Text> : null}</Text>}
                                    titleStyle={styles.item}
                                    onPress={() => this.openModal(i)}
                                />
                            ))
                        }
                    </List>

                </ScrollView>
                {this.state.isOpen ? (
                    <Modal style={[styles.modal, styles.modalSize]}  ref={"modal"} backdrop={true} >
                        <ScrollView>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTopic}>ผลการทำกิจกรรม</Text>
                                <Text style={styles.modalText}>วันที่: {this.formatMoment(this.state.modalData.date, "DD/MM/YYYY")}</Text>
                                 <Text style={styles.modalText}>เวลา: {this.formatMoment(this.state.timeStart, "kk:mm")}</Text>
                                <Text style={styles.modalText}>ระดับของกิจกรรมสูงสุดที่ทำได้: {this.state.modalData.result.maxLevel}  {this.state.modalData.result.levelTitle}</Text>
                                <Text style={styles.modalText}>ระดับของกิจกรรมต่อไป: {this.state.modalData.result.nextLevel}</Text>
                                <Text style={styles.modalText}>กิจกรรมทางกายที่ทำสำเร็จ: {this.state.modalData.result.physicalExercise ? this.checkPhysicalExercise(this.state.modalData.result.physicalExercise) : 'ไม่มี'}</Text>
                                <Text style={styles.modalText}>ฝึกหายใจที่ทำสำเร็จ: {this.state.modalData.result.breathingExercise ? this.checkBreathingExercise(this.state.modalData.result.breathingExercise) : 'ไม่มี'}</Text>
                                <Text style={styles.modalTopic}>ผลแบบทดสอบก่อนทำกิจกรรม</Text>
                                <Text style={styles.modalText}>อัตราการเต้นหัวใจ: {this.state.modalData.preActivity.preHr} bpm</Text>
                                <Text style={styles.modalText}>ความดันเลือด: {this.state.modalData.preActivity.preBp}</Text>
                                <Text style={styles.modalText}>ความผิดปกติที่พบ: {this.checkPreActivity(this.state.modalData.preActivity)}</Text>
                                <Text style={styles.modalText}>สรุป: {this.state.modalData.preActivity.passed ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                                <Text style={styles.modalTopic}>ผลแบบทดสอบหลังทำกิจกรรม</Text>
                                <Text style={styles.modalText}>อัตราการเต้นหัวใจ: {this.state.modalData.postActivity.postHr} bpm</Text>
                                <Text style={styles.modalText}>ความดันเลือด: {this.state.modalData.postActivity.postBp}</Text>
                                <Text style={styles.modalText}>ระดับความเหนื่อย Borg: {this.state.modalData.postActivity.borg}</Text>
                                <Text style={styles.modalText}>จำนวนผู้ช่วยเหลือ: {this.state.modalData.postActivity.assistant}</Text>
                                <Text style={styles.modalText}>ความผิดปกติของระบบหมุนเวียนเลือด: {this.state.modalData.postActivity.cardiacDisorder ? this.state.modalData.postActivity.cardiacDisorder : 'ไม่มี'}</Text>
                                <Text style={styles.modalText}>ความผิดปกติของทางเดินหายใจ: {this.state.modalData.postActivity.respiratoryDisorder ? this.state.modalData.postActivity.respiratoryDisorder : 'ไม่มี'}</Text>
                                <Text style={styles.modalText}>ความผิดปกติอื่นๆ: {this.state.modalData.postActivity.otherDisorder ? this.state.modalData.postActivity.otherDisorder : 'ไม่มี'}</Text>
                                <Text style={styles.modalText}>หมายเหตุ: {this.state.modalData.postActivity.note ? this.state.modalData.postActivity.note : 'ไม่มี'}</Text>
                            </View>
                        </ScrollView>
                    </Modal>
                ) : null}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    modalContainer: {
        flex: 1,
        margin: 15,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: common.grey,
        margin: 10
    },
    modalTopic: {
        fontSize: 19,
        color: common.grey,
        fontWeight: 'bold',
        marginVertical: 12
    },
    modalText: {
        fontSize: 18,
        color: common.grey,
        lineHeight: 30
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSize: {
        height: 500,
        width: 650
    },
}