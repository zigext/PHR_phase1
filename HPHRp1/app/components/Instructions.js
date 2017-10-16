import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import styles from '../styles/index'

const instructions = [
    { name: 'มีผู้ดูแลขณะทำกิจกรรมเสมอ' },
    { name: 'ไม่ควรทำกิจกรรม หากมีอาการ' },
    { name: 'เจ็บหน้าอก อ่อนเพลีย คลื่นไส้ หน้ามืด' },
    { name: 'ตัวเย็น หายใจลำบาก รู้สึกเหนื่อยปานกลาง' },
    { name: 'และควรหยุดทำกิจกรรมทันทีเมื่อมีอาการดังกล่าว' }
]

export default class Instructions extends React.Component {
    render() {
        return (
            <Card title="คำแนะนำ" titleStyle={{fontSize: 22}} >
                {
                    instructions.map((instruction, i) => {
                        return (
                            <View key={i}>
                                <Text style={_styles.text}>{instruction.name}</Text>
                            </View>
                        );
                    })
                }
            </Card>
        )
    }
}

const _styles = StyleSheet.create({
    text: {
        color: '#474045',
        fontSize: 22,
        marginBottom: 10
    }
})