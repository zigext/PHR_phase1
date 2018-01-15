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
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  
                        ▪ ใช้มือข้างหนึ่งวางบนทรวงอกและมืออีกข้างบริเวณหน้าท้อง ขณะหายใจเข้าท้องจะป่องจนรู้สึกได้ แต่มือบนทรวงอกจะไม่รู้สึก เพราะหน้าอกจะไม่ขยับหรือขยับน้อยมาก
                        ▪ สูดลมหายใจเข้าทางจมูกช้าๆจนท้องป่องออก
                        ▪ ค่อยๆ ผ่อนลมหายใจออกทางปากช้าๆ จนสุด แล้วพักสักครู่
                        ▪ ทำจนรู้สึกผ่อนคลาย
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  
                        ▪ ใช้มือข้างหนึ่งวางบนทรวงอกและมืออีกข้างวางบริเวณหน้าท้อง 
                        ▪ สูดลมหายใจเข้าทางจมูกช้าๆจนท้องป่องออกจนเกือบสุด แล้วสูดหายใจเข้าอีกพร้อมกับยกหน้าอกและหัวไหล่ขึ้นจนมือที่วางบนทรวงอกรู้สึกได้
                        ▪ ค่อยๆ ผ่อนลมหายใจออกทางปากช้าๆ จนสุด แล้วพักสักครู่
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารปอดโดยใช้อุปกรณ์ (Tri-flow)  
                        ▪ ควรอยู่ในท่านั่ง หากนอนบนเตียงให้ไขเตียงสูงมากกว่า 45 องศา
                        ▪ ควบคุมการหายใจเข้าออก 1-2 ครั้ง 
                        ▪ ใช้ริมฝีปากอมอุปกรณ์ส่วนท่อของเครื่อง
                        ▪ สูดลมหายใจเข้าทางปากให้เต็มที่จนลูกบอลลอยขึ้น และให้ลอยคงไว้ให้นานที่สุด แล้วค่อยๆผ่านหายใจออก แล้วหายใจปกติ 3-4 ครั้ง
                        ▪ ทำซ้ำจนครบ 10 ครั้ง หยุดพัก ควรทำทุก 1-2 ชั่วโมงขณะตื่น
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. ไออย่างมีประสิทธิภาพ (Effective cough)  
                        ▪ ใช้มือทั้งสอง หมอน หรือผ้าห่มประคองแผลผ่าตัดที่หน้าอก 
                        ▪ อยู่ในท่านั่ง โน้มตัวมาด้านหน้าเล็กน้อย
                        ▪ สูดลมหายใจเข้าให้ลึกพอควร แล้วพยายามไอเพื่อขับเสมหะออก อาจรู้สึกเจ็บแผลพอสมควรขณะไอ
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารขา-ข้อเท้า 
                        ▪ ยืดขาตรง ยกขาสูงประมาณ 30 องศาโดยใช้หมอนรองให้ปลายเท้าพ้นหมอน 
                        ▪ กระดกเท้าเข้าหาลำตัวนับ 1,2 แล้วเหยียดเท้าออกให้รู้สึกเกร็งบริเวณน่อง นับเป็น 1 ครั้ง ทำจนครบ 20 ครั้ง ทำทีละข้างหรือพร้อมกันก็ได้
                        ▪ หมุนข้อเท้าตามเข็มนาฬิกา 10 ครั้ง หมุนทวนเข็มนาฬิกา 10 ครั้ง ทั้งสองข้าง
                        ▪ งอข้อเข่าและสะโพก สลับกับเหยียดออกทีละข้างๆละ 5 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  
                        ▪ กำมือสลับแบมือ 10 ครั้ง 
                        ▪ เหยียดแขนไปด้านหน้า งอศอกสลับกับเหยียดศอก 10 ครั้ง
                        ▪ เหยียดแขนตรง ยกเหนือศีรษะทีละข้างๆละ 5 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            }
        ]
    },
    {
        level: 2,
        title: 'วันที่ 2 หลังผ่าตัด จัดท่านั่งห้อยขาข้างเตียงโดยไม่พิงหลัง',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  เหมือนกับขั้นที่ 1
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารปอดโดยใช้อุปกรณ์ (Tri-flow)  
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. ไออย่างมีประสิทธิภาพ (Effective cough)  

`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    7. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. นั่งเก้าอี้ข้างเตียงเมื่อรับประทานอาหารทุกมื้อ หรืออย่างน้อย 1-2 ครั้ง/วัน
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
        ]
    },
    {
        level: 3,
        title: 'วันที่ 3 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  เหมือนกับขั้นที่ 1
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. ยืนย่ำอยู่กับที่ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    7. เดินรอบเตียง 15-20 เมตร ไป-กลับช้าๆ
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. ลุกนั่งเก้าอี้อย่างน้อยวันละ 2 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
        ]
    },
    {
        level: 4,
        title: 'วันที่ 4 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  เหมือนกับขั้นที่ 1
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. ยืนย่ำอยู่กับที่ 30 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    7. เขย่งเท้าขึ้นลง 10 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. เดิน 50-100 เมตร วันละ 2-3 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
        ]
    },
    {
        level: 5,
        title: 'วันที่ 5 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  เหมือนกับขั้นที่ 1
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. ยืนย่ำอยู่กับที่ 30 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    7. เขย่งเท้าขึ้นลง 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. เดิน 100-200 เมตร วันละ 3 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. ฝึกขึ้นลงบันได 3 ขั้น
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
        ]
    },
    {
        level: 6,
        title: 'วันที่ 6 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  เหมือนกับขั้นที่ 1
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. กางข้อศอก ยกไหล่ หมุนแขน
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    7. ยืนย่ำอยู่กับที่ 2 นาที
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. เขย่งเท้าขึ้นลงนาน 2 นาที
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    9. เดิน 200-500 เมตร วันละ 2-3 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    10. เดินขึ้นลงบันได 1 ชั้นแบบพักขา
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
        ]
    },
    {
        level: 7,
        title: 'วันที่ 7 หลังผ่าตัด',
        subtitle: [
            {
                description: `     
                    1. บริหารปอดด้วยการฝึกควบคุมการหายใจเข้า-ออก (Breathing control)  เหมือนกับขั้นที่ 1
`,
                image: '../../assets/images/food1.png'
            },
            {
                description: `     
                    2. บริหารปอดด้วยการหายใจเข้าออกลึกๆ (Deep breathing)  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    3. บริหารขา-ข้อเท้า เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    4. แกว่งเท้าข้างละ 20 ครั้ง
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    5. บริหารแขน ข้อมือ ข้อศอก หัวไหล่  เหมือนกับขั้นที่ 1
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    6. กางข้อศอก ยกไหล่ หมุนแขน เหมือนกับขั้นที่ 6
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    7. เดิน 10-15 นาที หรือ 100-120 เมตร
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
            {
                description: `     
                    8. เดินขึ้นลงบันได 10-15 ขั้นแบบสลับขา ถ้าอาการคงที่ให้ขึ้นบันไดแบบพักขา
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
                        {
                description: `     
                    9. เดินขึ้นบันได 1-2 ชั้นแบบสลับขา
`,
                image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
            },
        ]
    },

    {
        level: 11,
        title: 'การไออย่างมีประสิทธิภาพ (Effective cough) ',
        subtitle: `     
                    1. จัดท่าให้นอนหัวสูง (Fowlers position) หรือนั่งบนเก้าอี้ กอดหมอนหรือผ้าห่มไว้บริเวณหน้าท้องหรือพยุงบริเวณที่มีแผล ก้มหน้าให้ไหล่โค้งเล็กน้อย ในกรณีที่ไม่มีหมอนอาจใช้ฝ่ามือทั้งสองข้างกดเบาๆ ด้านข้างของแผลเพื่อลดปวดและป้องกันแผลแยก 
                    2. หายใจเข้าออกลึกๆช้าๆ 2-3 ครั้ง จากนั้นหายใจเข้าลึกๆ และกลั้นหายใจไว้ประมาณ 1-2 วินาที จากนั้นให้ไอออกมาแรงๆโดยใช้แรงดันจากช่องท้องร่วมกับกล้ามเนื้อช่วยหายใจอื่นๆ เสมหะจะหลุดออกมาได้ง่ายขึ้น 
                    กรณีไม่มีเสมหะ ก็ต้องฝึกไอหลังผ่าตัด เพื่อหวังผลให้หน้าอกมีการสั่นสะเทือน ส่งผลให้เสมหะที่อยู่ในถุงลมปอดหลุดออกมาและดูดซึมได้ง่ายขึ้น
                   3. ทำซ้ำเพื่อให้เสมหะหลุดออกมา และกระตุ้นให้เกิดการไอบ่อยๆ เพื่อป้องกันภาวะแทรกซ้อนที่อาจจะเกิดตามมา เช่นภาวะอักเสบ, ปอดแฟบ 
`
    },
    {
        level: 12,
        title: 'การหายใจเข้าออกยาวๆ ลึกๆ (Deep-breathing exercises)',
        subtitle: `     
                    1. ให้ผู้ป่วยนั่งตัวตรงที่ข้างเตียง หรือช่วยให้อยู่ในท่า semi-Fowler’s position 
                    2. ใช้มือทั้งสองข้างจับที่ท้องจะได้รู้สึกเวลาหน้าอกขยายจะบ่งชี้ว่าปอดขยายตัว
                   3. ให้ผู้ป่วยหายใจเข้าทางจมูกจนรู้สึกว่าหน้าท้องขยาย
                   4. ให้ผู้ป่วยหายใจทางปากขณะกล้ามเนื้อหน้าหน้าท้องหดตัว
                   5. ทำแบบนี้ซ้ำทุกชั่วโมงในวันแรกหลังผ่าตัด 
`
    },
    {
        level: 13,
        title: 'การใช้สไปโรมิเตอร์ (Incentive spirometer) ',
        subtitle: `     
                    เพื่อขยายถุงลมในปอดหลังผ่าตัด ให้เป่าถึงระดับที่ตั้งไว้ให้ปอดขยายตัว วิธีนี้ช่วยให้ลมเข้าไปในถุงลม และช่วยทำให้กล้ามเนื้อที่ช่วยในการหายใจแข็งแรง ควรฝึกใช้เครื่องช่วยหายใจทั้งก่อนและหลังผ่า ส่วนมากให้ผู้ป่วยทำ 5-10 ครั้งต่อชั่วโมงหลังผ่าตัด 
`
    },
    {
        level: 14,
        title: 'การออกกำลังกายแขน-ขา (Extremity exercises) ',
        subtitle: `     
                    ช่วยป้องกันปัญหาเกี่ยวกับกรไหลเวียนโลหิต เลือดดำไหลกลับสู่หัวใจดีขึ้น ให้ผู้ป่วยงอและเหยียดข้อต่างๆทุกข้อ โดยเฉพาะข้อสะโพก ข้อเข่า ข้อเท้าขณะนอนราบหลังและขาอยู่แนวราบเหยียดตรงเท้าต้องหมุนเป็นวงกลมขณะนอนหรือนั่ง 
`
    },
    {
        level: 15,
        title: 'การพลิกตัว (Turning exercises)',
        subtitle: `     
                    หัดพลิกตัวจากด้านหนึ่งไปอีกด้าน โดยใช้ไม้กั้นเตียงช่วยในการพลิกตัว ช่วยป้องกันการคั่งของเลือดดำ หลอดเลือดดำอุดตัน แผลกดทับ และอาการแทรกซ้อนในระบบทางเดินหายใจ ควรพลิกตัวและเปลี่ยนท่านอนทุก 1-2 ชั่วโมง ในระยะหลังผ่าตัด 
`
    }
]

export default class Activity1AdvicesList extends React.Component {

    onPress = (i) => {
        // let obj = list[i]
        // Actions.tab_advices_activity_1_detail({ activity: obj })
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
                                title={item.level <= 10 ? <Text style={styles.item}>ขั้นที่ {item.level}   {item.title}</Text> : <Text style={styles.item}>{item.title}</Text>}
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