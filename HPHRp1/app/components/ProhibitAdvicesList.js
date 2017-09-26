import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import Sound from 'react-native-sound'

const list = [
    {title: 'เจ็บหน้าอก'},
    {title: 'เจ็บป่วยหรือมีไข้เฉียบพลัน'},
    {title: 'ปัญหาโรคข้อที่กระทบกระเทือนจากการออกกําลังกาย'},
    {title: 'ภาวะหัวใจวายที่ควบคุมไม่ได้'},
    {title: 'เยื่อหุ้มหัวใจอักเสบ กล้ามเนื้อหัวใจอักเสบเฉียบพลัน'},
    {title: 'มีภาวะหลอดเลือดดําอักเสบหรืออุดตันใหม่ๆ'},
    {title: 'เบาหวานที่ควบคุมไม่ได้ (นํ้าตาล > 300 มก./ดล.)'},
    {title: 'ความดันซิสโตลิก > 180 มิลลิเมตรปรอท'},
    {title: 'ความดันไดแอสโตลิก > 110 มิลลิเมตรปรอท'},
    {title: 'ความดันซิสโตลิกตํ่าลงจากปกติมากกว่า 20 มิลลิเมตรปรอท'},
    {title: 'หลอดเลือดแดงใหญ่ที่ออกจากหัวใจ (Aorta) ตีบรุนแรง'},
    {title: 'ภาวะหัวใจเต้นเร็วมากกว่า 120 ครั้งต่อนาที (Sinus tachycardia) ที่ควบคุมไม่ได้'},
    {title: 'ภาวะหัวใจเต้นผิดจังหวะ (Atrial หรือ Ventricular arrhythmia) ควบคุมไม่ได้'},
    {title: 'ภาวะที่มีการปิดกั้นการส่งผ่านกระแสไฟฟ้าอย่างสมบูรณ์ (Third degree A-V block)'},
    {title: 'การเปลี่ยนแปลงของคลื่นไฟฟ้า ST > 2 มม.ขณะพัก หรือ > 2 มม.ขณะได้รับยาดิจิทาลิส'},
    {title: 'ภาวะผิดปกติทางเมตาบอลิซึมอื่นๆ เช่น ภาวะโพแทสเซียมตํ่า'}
]


export default class ProhibitAdvicesList extends React.Component {

    playSound = (index) => {
        const callback = (error, sound) => {
            if (error) {
                Alert.alert('error', error.message)
                return
            }
            sound.play(() => {
                sound.release()
            })
        }
        switch (index) {
            case 0: {
                const sound = new Sound(require('../../assets/sound/food1.wav'), error => callback(error, sound))
                break
            }
            case 1: {
                const sound = new Sound(require('../../assets/sound/food2.wav'), error => callback(error, sound))
                break
            }
            case 2: {
                const sound = new Sound(require('../../assets/sound/food3.wav'), error => callback(error, sound))
                break
            }
            case 3: {
                const sound = new Sound(require('../../assets/sound/food4.wav'), error => callback(error, sound))
                break
            }
            case 4: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 5: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 6: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 7: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 8: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 9: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 10: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 11: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 12: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 13: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 14: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            case 15: {
                const sound = new Sound(require('../../assets/sound/food5.wav'), error => callback(error, sound))
                break
            }
            default: return
        }

    }

    render() {
        return (
            <ScrollView>
                <List>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                rightIcon={{ name: 'controller-play', type: 'entypo', color: '#f49842' }}
                                onPressRightIcon={() => this.playSound(i)}
                                titleStyle={styles.item}
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