import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { join, compact } from 'lodash'
import styles from '../styles/index'
import common from '../styles/common'

//replace in String
String.prototype.replaceAll = function (search, replacement) {
    var target = this
    return target.split(search).join(replacement)
}

export default class Step4Post extends React.Component {
    constructor(props) {
        super(props)
    }

    //Start doing activity
    onPostActivityDone = () => {
        Alert.alert(
            'แบบทดสอบหลังทำกิจกรรม',
            'ต้องการสิ้นสุดการทำกิจกรรมหรือไม่? กรุณาตรวจสอบความถูกต้องของข้อมูล',
            [
                {
                    text: 'ใช่', onPress: () => {
                        this.props.onPostActivityDone(this.props.dataStore)
                    }
                },
                { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
        )

    }

    onBackward = () => {
        this.props.onStepChange(this.props.step - 1)
    }

    renderDisorder = (array) => {
        // array.map((item, i) => (
        //     <Text>{item}</Text>
        // ))
        let compactArr = compact(array)
        let str = join(compactArr, ', ')
        str = str.replaceAll("_", " ")
        return str
    }

    render() {
        return (
            <View style={_styles.container}>
                <ScrollView>
                    <Text style={[_styles.text, {fontWeight: 'bold', textAlign: 'center',}]}>สรุปผลการทำกิจกรรม</Text>
                    <Text style={_styles.text}>ขั้นที่ทำได้ :  {this.props.result.maxLevel}</Text>
                    <Text style={_styles.text}>ขั้นต่อไป:  {this.props.result.nextLevel}</Text>
                    <Text style={_styles.text}>อัตราการเต้นหัวใจ :  {this.props.dataStore.postHr} bpm</Text>
                    <Text style={_styles.text}>ความดันเลือด :  {this.props.dataStore.postBp}</Text>
                    <Text style={_styles.text}>ระดับความเหนื่อย :  {this.props.dataStore.borg}</Text>
                    <Text style={_styles.text}>จำนวนผู้ช่วยเหลือ :  {this.props.dataStore.assistant} คน</Text>
                    <Text style={_styles.text}>ภาวะหัวใจเต้นผิดจังหวะ :  {this.props.dataStore.cardiacDisorder ? this.renderDisorder(this.props.dataStore.cardiacDisorder) : 'ไม่มี'}</Text>
                    <Text style={_styles.text}>ภาวะผิดปกติของการหายใจ :  {this.props.dataStore.respiratoryDisorder ? this.renderDisorder(this.props.dataStore.respiratoryDisorder) : 'ไม่มี'}</Text>
                    <Text style={_styles.text}>อาการอื่นๆ :  {this.props.dataStore.otherDisorder ? this.renderDisorder(this.props.dataStore.otherDisorder) : 'ไม่มี'}</Text>
                    <Text style={_styles.text}>หมายเหตุ :  {this.props.dataStore.note ? this.props.dataStore.note : 'ไม่มี'}</Text>
                    <View style={_styles.buttonContainer}>
                        <Icon
                            raised
                            reverse
                            name='ios-arrow-back'
                            type='ionicon'
                            color={common.accentColor}
                            size={35}
                            onPress={this.onBackward}

                        />
                        <Button
                            raised
                            title='บันทึกผลการทำกิจกรรม'
                            backgroundColor={common.accentColor}
                            onPress={this.onPostActivityDone} />
                    </View>
                </ScrollView>
            </View>
        )

    }
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 20,
        marginHorizontal: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50,
    },
    text: {
        fontSize: 20,
        color: common.grey,
        marginBottom: 25,
        marginTop: 20,
    }
})