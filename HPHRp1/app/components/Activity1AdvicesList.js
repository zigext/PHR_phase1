import React from 'react'
import { List, ListItem } from 'react-native-elements'
import { AppRegistry, StyleSheet, Text, View, ScrollView, Alert, Image, ListView } from 'react-native'
import Sound from 'react-native-sound'
import { Actions } from 'react-native-router-flux'

const list = [
    {
        level: 1,
        title: 'วันที่ 1 หลังผ่าตัด จัดท่านั่งหัวสูงบนเตียง 45-60 องศา',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing) ใช้หรือไม่ใช้อุปกรณ์ก็ได้ 
                        ▪ ใช้มือข้างหนึ่งวางบนทรวงอกและมืออีกข้างวางบริเวณหน้าท้อง 
                        ▪ สูดลมหายใจเข้าทางจมูกช้าๆจนท้องป่องออกจนเกือบสุด แล้วสูดหายใจเข้าอีกพร้อมกับยกหน้าอกและหัวไหล่ขึ้นจนมือที่วางบนทรวงอกรู้สึกได้
                        ▪ ค่อยๆ ผ่อนลมหายใจออกทางปากช้าๆ จนสุด แล้วพักสักครู่
`,
                image: 'breathing',
               
            },
            {
                description: `     
                    2. บริหารปอดกรณีใช้อุปกรณ์ Triflow 
                        ▪ ควรอยู่ในท่านั่ง หากนอนบนเตียงให้ไขเตียงสูงมากกว่า 45 องศา
                        ▪ ควบคุมการหายใจเข้าออก 1-2 ครั้ง 
                        ▪ ใช้ริมฝีปากอมอุปกรณ์ส่วนท่อของเครื่อง
                        ▪ สูดลมหายใจเข้าทางปากให้เต็มที่จนลูกบอลลอยขึ้น คงไว้ให้นานที่สุด แล้วค่อยๆผ่านหายใจออก แล้วหายใจปกติ 3-4 ครั้ง
                        ▪ ทำซ้ำจนครบ 10 ครั้ง แล้วหยุดพัก ควรทำทุก 1-2 ชั่วโมงขณะตื่น
`,
                image: 'triflow'
            },
            {
                description: `     
                    3. ไออย่างมีประสิทธิภาพ (Effective cough)  
                        ▪ ใช้มือทั้งสองกอดหมอนหรือผ้าห่มประคองแผลผ่าตัดที่หน้าอก 
                        ▪ อยู่ในท่านั่ง โน้มตัวมาด้านหน้าเล็กน้อย
                        ▪ สูดลมหายใจเข้าให้ลึกพอควร แล้วพยายามไอเพื่อขับเสมหะออก อาจรู้สึกเจ็บแผลพอสมควรขณะไอ
`,
                image: 'cough'
            },
            {
                description: `     
                    4. บริหารขา-ข้อเท้า 
                        ▪ ยืดขาตรง ยกขาสูงประมาณ 30 องศา โดยใช้หมอนรองให้ปลายเท้าพ้นหมอน 
                        ▪ กระดกเท้าเข้าหาลำตัวนับ 1,2 แล้วเหยียดเท้าออกให้รู้สึกเกร็งบริเวณน่อง นับเป็น 1 ครั้ง ทำจนครบ 20 ครั้ง ทำทีละข้างหรือพร้อมกันก็ได้
                        ▪ หมุนข้อเท้าตามเข็มนาฬิกา 10 ครั้ง หมุนทวนเข็มนาฬิกา 10 ครั้ง ทั้งสองข้าง
                        ▪ งอข้อเข่าและสะโพก สลับกับเหยียดออกทีละข้างๆละ 5 ครั้ง
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  
                        ▪ กำมือสลับแบมือ 10 ครั้ง 
                        ▪ เหยียดแขนไปด้านหน้า งอศอกสลับกับเหยียดศอก 10 ครั้ง
                        ▪ เหยียดแขนตรง ยกเหนือศีรษะทีละข้างๆละ 5 ครั้ง
`,
                image: 'armsExercise'
            }
        ]
    },
    {
        level: 2,
        title: 'วันที่ 2 หลังผ่าตัด จัดท่านั่งห้อยขาข้างเตียงโดยไม่พิงหลัง',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'breathing'
            },
            {
                description: `     
                    2. ไออย่างมีประสิทธิภาพ (Effective cough)  

`,
                image: 'cough'
            },
            {
                description: `     
                    3. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    4. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'legsSwing'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'armsExercise'
            },
            {
                description: `     
                    6. นั่งเก้าอี้ข้างเตียงเมื่อรับประทานอาหารทุกมื้อ หรืออย่างน้อย 1-2 ครั้ง/วัน และทำกิจวัตรประจำวันด้วยตนเอง
`,
                    image: 'sitting'
            },
        ]
    },
    {
        level: 3,
        title: 'วันที่ 3 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'breathing'
            },
            {
                description: `     
                    2. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    3. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'legsSwing'
            },
            {
                description: `     
                    4. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'armsExercise'
            },
            {
                description: `     
                    5. ยืนย่ำอยู่กับที่ 20 ครั้ง
`,
                    image: 'marching'          
            },
            {
                description: `     
                    6. เดินรอบเตียง 15-20 เมตร ไป-กลับช้าๆ
`,
                    image: 'walking'            
            },
            {
                description: `     
                    7. นั่งเก้าอี้ข้างเตียงเมื่อรับประทานอาหารทุกมื้อ หรืออย่างน้อย 1-2 ครั้ง/วัน และทำกิจวัตรประจำวันด้วยตนเอง
`,
                    image: 'sitting'       
            },
        ]
    },
    {
        level: 4,
        title: 'วันที่ 4 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'breathing'
            },
            {
                description: `     
                    2. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    3. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'legsSwing'
            },
            {
                description: `     
                    4. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'armsExercise'
            },
            {
                description: `     
                    5. ยืนย่ำอยู่กับที่ 20 ครั้ง
`,
                    image: 'marching'   
            },
            {
                description: `     
                    6. เขย่งเท้าขึ้นลง 10 ครั้ง
`,
                    image: 'tiptoe'    
            },
            {
                description: `     
                    7. เดิน 50-100 เมตร วันละ 2-3 ครั้ง
`,
                    image: 'walking'  
            },
        ]
    },
    {
        level: 5,
        title: 'วันที่ 5 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'breathing'
            },
            {
                description: `     
                    2. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    3. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'legsSwing'
            },
            {
                description: `     
                    4. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'armsExercise'
            },
            {
                description: `     
                    5. ยืนย่ำอยู่กับที่ 20 ครั้ง
`,
                    image: 'marching'   
            },
            {
                description: `     
                    6. เขย่งเท้าขึ้นลง 20 ครั้ง
`,
                    image: 'tiptoe'
            },
            {
                description: `     
                    7. เดิน 100-200 เมตร วันละ 3 ครั้ง
`,
                    image: 'walking'  
            },
            {
                description: `     
                    8. ฝึกขึ้นลงบันได 3 ขั้น
`,
                    image: 'climbingStair'      
            },
        ]
    },
    {
        level: 6,
        title: 'วันที่ 6 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'breathing'
            },
            {
                description: `     
                    2. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    3. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'legsSwing'
            },
            {
                description: `     
                    4. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'armsExercise'
            },
            {
                description: `     
                    5. ยืนย่ำอยู่กับที่ 20 ครั้ง
`,
                    image: 'marching'   
            },
            {
                description: `     
                    6. เขย่งเท้าขึ้นลง 20-30 ครั้ง
`,
                    image: 'tiptoe'
            },
            {
                description: `     
                    7. เดิน 200-500 เมตร วันละ 2-3 ครั้ง
`,
                    image: 'walking'  
            },
            {
                description: `     
                    8. เดินขึ้นลงบันได 1 ชั้น แบบพักขา
`,
                    image: 'climbingStair'       
            },
        ]
    },
    {
        level: 7,
        title: 'วันที่ 7 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'breathing'
            },
            {
                description: `     
                    2. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'legsExercise'
            },
            {
                description: `     
                    3. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'legsSwing'
            },
            {
                description: `     
                    4. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'armsExercise'
            },
            {
                description: `     
                    5. ยืนย่ำอยู่กับที่ 20 ครั้ง
`,
                    image: 'marching'  
            },
            {
                description: `     
                    6. เดิน 10-15 นาที หรือ 100-120 เมตร
`,
                    image: 'walking'  
            },
            {
                description: `     
                    7. เดินขึ้นลงบันได 10-15 ขั้น แบบสลับขา ถ้าอาการคงที่ให้ขึ้นบันไดแบบพักขา
`,
                    image: 'climbingStair'  
            },
            {
                description: `     
                    8. เดินขึ้นบันได 1-2 ชั้น แบบสลับขา
`,
               
            },
        ]
    },
    {
        level: 8,
        title: 'การพลิกตัว (Turning exercises)',
        subtitle: [
            {
                description: `     
                    หัดพลิกตัวจากด้านหนึ่งไปอีกด้าน โดยใช้ไม้กั้นเตียงช่วยในการพลิกตัว ช่วยป้องกันการคั่งของเลือดดำ หลอดเลือดดำอุดตัน แผลกดทับ และอาการแทรกซ้อนในระบบทางเดินหายใจ ควรพลิกตัวและเปลี่ยนท่านอนทุก 1-2 ชั่วโมง ในระยะหลังผ่าตัด 
`
            }
        ] 
    }
]

export default class Activity1AdvicesList extends React.Component {

    onPress = (i) => {
        let level = list[i].level
        let title = list[i].title
        let subtitle = list[i].subtitle
        Actions.tab_advices_activity_1_detail({ level, title, subtitle })
    }

    render() {
        return (
            <ScrollView>
                <List>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.level <= 7 ? <Text style={styles.item}>ขั้นที่ {item.level}   {item.title}</Text> : <Text style={styles.item}>{item.title}</Text>}
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