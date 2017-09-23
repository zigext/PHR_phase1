import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Image, ListView } from 'react-native'
import Sound from 'react-native-sound'
import { Actions } from 'react-native-router-flux'

const list = [
    {   level: 0,
        title: 'ไม่เคลื่อนไหวร่างกาย (นอนอยู่บนเตียง)',
        subtitle: 'บุคลากรเป็นผู้พลิกตัวและออกกำลังกายให้ ผู้ป่วยไม่มีการขยับร่างกายเอง'
    },
    {   level: 1,
        title: 'นั่งบนเตียง ออกกำลังกายบนเตียง',
        subtitle: 'ทำกิจกรรมบนเตียง ประกอบด้วย การพลิกตัว การออกกำลังกายด้วยตัวเอง ไม่มีการขยับร่างกายนอกเตียง หรือเกินขอบเตียง'
    },
    {   level: 2,
        title: 'มีผู้ช่วยเหลือผู้ป่วยมานั่งบนเก้าอี้ (ไม่ยืน)',
        subtitle: 'ยก อุ้ม หรือใช้กระดานเคลื่อนย้ายไปที่เก้าอี้ โดยไม่มีการยืนหรือนั่งที่ขอบเตียง'
    },
    {   level: 3,
        title: 'นั่งที่ขอบเตียง',
        subtitle: 'อาจมีบุคลากรช่วย เกี่ยวข้องกับการทำกิจกรมที่นั่งทำที่ขอบเตียง'
    },
    {   level: 4,
        title: 'ยืนที่ข้างเตียง',
        subtitle: 'ลงน้ำหนักที่เท้าทั้ง 2 ข้างในการยืน โดยมีหรือไม่มีบุคลากรช่วย อาจรวมไปถึงการยืนที่ใช้อุปกรณ์ช่วย'
    },
    {   level: 5,
        title: 'สามารถย้ายจากเตียงไปนั่งที่เก้าอี้ได้',
        subtitle: 'สามารถก้าวหรือลากเท้าจากท่ายืนไปนั่งที่เก้าอี้ได้ รวมถึงการลงน้ำหนักเท้า 1 ข้าง แล้วจับอุปกรณ์อื่นเพื่อเคลื่อนไปนั่งที่เก้าอี้ ไม่นับรวมอุปกรณ์ที่มีล้อในการช่วยเคลื่อนย้าย'
    },
    {   level: 6,
        title: 'ก้าวขา ย่ำเท้าที่ข้างเตียงได้',
        subtitle: 'สามารถเดินโดยยกเท้าจากพื้นได้อย่างน้อย 4 ก้าว หรือก้าวเท้าข้างละ 2 ก้าว โดยมีการช่วยเหลือหรือไม่ก็ได้'
    },
    {   level: 7,
        title: 'สามารถเดินได้โดยมีผู้ช่วยเหลือ 2 คนหรือมากกว่า',
        subtitle: 'เดินจากเตียงหรือเก้าอี้อย่างน้อย 5 เมตร มีคนช่วย 2 คนหรือมากกว่า'
    },
    {   level: 8,
        title: 'สามารถเดินได้โดยมีผู้ช่วยเหลือ 1 คน',
        subtitle: 'เดินจากเตียงหรือเก้าอี้อย่างน้อย 5 เมตร มีผู้ช่วยเหลือ 1 คน'
    },
    {   level: 9,
        title: 'สามารถเดินได้เองโดยมีอุปกรณ์ช่วย',
        subtitle: 'เดินจากเตียงหรือเก้าอี้อย่างน้อย 5 เมตร มีอุปกรณ์ช่วยแต่ไม่มีผู้ช่วยเหลือ'
    },
    {   level: 10,
        title: 'สามารถเดินได้เอง',
        subtitle: 'เดินจากเตียงหรือเก้าอี้อย่างน้อย 5 เมตร โดยไม่มีการช่วยเหลือ'
    }
]

export default class Activity1AdvicesList extends React.Component {

    onPress = (i) => {
        let obj = list[i]
        Actions.tab_advices_activity_1_detail({activity: obj})
    }

    render() {
        return (
            <ScrollView>
                <List>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={<Text style={styles.item}>ระดับ {i}   {item.title}</Text>}
                                titleStyle={styles.item}
                                onPress={() => this.onPress(i)}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
    }
})