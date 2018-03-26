import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import { persistStore, autoRehydrate, REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
// import { PersistGate } from 'redux-persist/es/integration/react'
// import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import store from '../config/ReduxStore'
import thunkMiddleware from 'redux-thunk'
import CreateLogger from 'redux-logger'
import * as RNProgress from 'react-native-progress'
import Login from './Login'
import Home from './Home'
import Activity from './Activity'
import Progress from './Progress'
import ProgressResultList from './ProgressResultList'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Surgery from './Surgery'
import AddSurgery from './AddSurgery'
import MWT from './6MWT'
import MWTDetail from '../components/6MWTDetail'
import Main6MWT from './Main6MWT'
import MainAdvices from './MainAdvices'
import FoodAdvices from './FoodAdvices'
import OtherAdvices from './OtherAdvices'
import ExerciseAdvices from './ExerciseAdvices'
import DailyAdvices from './DailyAdvices'
import ProhibitAdvices from './ProhibitAdvices'
import ActivityAdvices from './ActivityAdvices'
import AdvicesForHome from './AdvicesForHome'
import Activity1AdvicesList from '../components/Activity1AdvicesList'
import Activity1AdvicesDetail from '../components/Activity1AdvicesDetail'
import Activity2AdvicesDetail from '../components/Activity2AdvicesDetail'
import InstructionAdvices from '../components/Instructions'
import SurgeryDetail from '../components/SurgeryDetail'
import SideDrawer from '../components/drawers/SideDrawer'
import reducers from '../reducers/Index'
import styles from '../styles/index'
import { Icon } from 'react-native-elements'
import HomeIcon from '../components/HomeIcon'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import SideDrawerContent from '../components/drawers/SideDrawerContent';
import TabView from '../components/TabView';
import TabIcon from '../components/TabIcon';
import EchoView from '../components/EchoView';
import MessageBar from '../components/MessageBar';
import ErrorModal from '../components/modal/ErrorModal';
import DemoLightbox from '../components/lightbox/DemoLightbox';
import MenuIcon from '../../assets/images/ic_menu_burger_24dp.png'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            progress: 0,
            indeterminate: true,
        }
    }

    componentDidMount() {
        persistStore(
            store,
            {
                storage: AsyncStorage,
            },
            () => {
                this.setState({
                    isReady: true
                })
            }
        ) //purge here to delete all states in store
        // this.animate()
    }

    // animate() {
    //     let progress = 0
    //     this.setState({ progress })
    //     setTimeout(() => {
    //         this.setState({ indeterminate: false })
    //         setInterval(() => {
    //             progress += Math.random() / 5
    //             if (progress > 1) {
    //                 progress = 1
    //             }
    //             this.setState({ progress })
    //         }, 500)
    //     }, 1000)
    // }

    render() {
        // const config = {
        //     key: 'primary',
        //     storage
        // }
        // let reducer = persistCombineReducers(config, reducers)

        //Works normal
        // const store = createStore(
        //     reducers,
        //     undefined,
        //     compose(
        //         applyMiddleware(
        //             thunkMiddleware,
        //             CreateLogger
        //         ),

        //     )
        // )


        // const callback = ()
        // persistStore(
        //     store, 
        //     null,
        //     () => {
        //         console.log("persist store = ", store.getState())
        //         store.getState()
        //     });
        // let persistor = persistStore(store)
        // Enable persistence
        // persistStore(store)
        const reducerCreate = params => {
            const defaultReducer = new Reducer(params);
            return (state, action) => {
                console.log('ACTION:', action);
                return defaultReducer(state, action);
            };
        }
        const getSceneStyle = () => ({
            backgroundColor: '#FFFDF9',
            shadowOpacity: 1,
            shadowRadius: 3
        })
        const onBeforeLift = () => {
            // take some action before the gate lifts
            console.log("On before lift")
        }

        if (!this.state.isReady) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/*// <RNProgress.Bar progress={0.3} width={300} progress={this.state.progress} indeterminate={this.state.indeterminate} />
                     // <RNProgress.CircleSnail color={['red', 'green', 'blue']} />*/}
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <Provider store={store}  >
                <Router
                    createReducer={reducerCreate}
                    getSceneStyle={getSceneStyle}
                >
                    <Overlay>
                        <Modal
                            hideNavBar
                            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
                        >
                            <Lightbox>
                                <Stack
                                    navigationBarStyle={styles.tab}
                                    key="root"
                                    titleStyle={{ alignSelf: 'center', color: 'white' }}
                                >
                                    <Scene key="echo" back clone component={EchoView} getTitle={({ navigation }) => navigation.state.key} />
                                    <Scene key="launch" component={Login} title="Heart PHR phase 1" initial />
                                    <Scene key="forgotPassword" component={ForgotPassword} title="รีเซ็ตรหัสผ่าน" back />
                                    <Scene key="profile" component={Profile} title="ข้อมูลส่วนตัว" back />
                                    <Scene key="editProfile" component={EditProfile} title="แก้ไขข้อมูลส่วนตัว" back />
                                    <Scene key="surgery" component={Surgery} title="ข้อมูลการผ่าตัด" back />
                                    <Scene key="surgeryDetail" component={SurgeryDetail} title="ข้อมูลการผ่าตัด" back />
                                    <Scene key="addSurgery" component={AddSurgery} title="เพิ่มข้อมูลการผ่าตัด" back />
                                    <Scene key="progressResultList" component={ProgressResultList} title="รายละเอียดผลการทำกิจกรรม" back />
                                    <Scene key="mwt" component={MWT} title="ทดสอบเดินบนพื้นราบ 6 นาที" back />
                                    <Scene key="mwtDetail" component={MWTDetail} title="ผลการทดสอบเดินบนพื้นราบ 6 นาที" back />
                                    {/*<Scene key="main6Mwt" component={Main6MWT} title="ทดสอบเดินบนพื้นราบ 6 นาที" back />*/}

                                    <Drawer
                                        key="drawer"
                                        hideNavBar
                                        contentComponent={SideDrawerContent}
                                        drawerImage={MenuIcon}
                                        openDrawerOffset={0.4}
                                    >

                                        <Scene hideNavBar>
                                            <Tabs
                                                key="tabbar"
                                                swipeEnabled
                                                showLabel={false}
                                                tabBarStyle={styles1.tabBarStyle}
                                                activeBackgroundColor={styles.selectedTab}
                                                inactiveBackgroundColor='#29B6F6'
                                            >
                                                <Stack
                                                    key="tab_home"
                                                    title='หน้าหลัก'
                                                    tabBarLabel="TAB #1"
                                                    inactiveBackgroundColor={styles.tab}
                                                    activeBackgroundColor="#DDD"
                                                    icon={TabIcon}
                                                    navigationBarStyle={styles.selectedTab}
                                                    titleStyle={styles.tabTitle}
                                                    initial
                                                >
                                                    <Scene
                                                        key="tab_home_1"
                                                        component={Home}
                                                        title="หน้าหลัก"
                                                    />
                                                </Stack>

                                                <Stack
                                                    key="tab_activity"
                                                    title="กิจกรรมฟื้นฟูสมรรถภาพหัวใจ"
                                                    icon={TabIcon}
                                                    navigationBarStyle={styles.selectedTab}
                                                    titleStyle={styles.tabTitle}

                                                >
                                                    <Scene
                                                        key="tab_activity_1"
                                                        component={Activity}
                                                        title="กิจกรรมฟื้นฟูสมรรถภาพหัวใจ"

                                                    />
                                                    {/*<Scene
                                                        key="tab_2_2"
                                                        component={Home}
                                                        title="Tab #2_2"
                                                        onBack={() => alert('onBack button!')}
                                                        backTitle="Back!"
                                                        panHandlers={null}
                                                    />*/}
                                                </Stack>

                                                <Stack
                                                    key="tab_progress"
                                                    title="พัฒนาการ"
                                                    navigationBarStyle={styles.selectedTab}
                                                    titleStyle={styles.tabTitle}>
                                                    <Scene
                                                        key="tab_progress_1"
                                                        component={Progress}
                                                        title="พัฒนาการ"
                                                        icon={TabIcon}

                                                    />
                                                </Stack>
                                                <Stack
                                                    key="tab_advices"
                                                    navigationBarStyle={styles.selectedTab}
                                                    titleStyle={styles.tabTitle}
                                                >
                                                    <Scene key="tab_advices_1" component={MainAdvices} title="คำแนะนำ" icon={TabIcon} />
                                                    <Scene
                                                        key="tab_advices_food"
                                                        component={FoodAdvices}
                                                        title="อาหารและยา"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_exercise"
                                                        component={ExerciseAdvices}
                                                        title="ออกกำลังกาย"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_daily"
                                                        component={DailyAdvices}
                                                        title="ชีวิตประจำวัน"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_instruction"
                                                        component={InstructionAdvices}
                                                        title="คำแนะนำ"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_prohibit"
                                                        component={ProhibitAdvices}
                                                        title="ข้อห้ามในการทำกิจกรรมฟื้นฟูสมรรถภาพหัวใจ"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_activity"
                                                        component={ActivityAdvices}
                                                        title="รายละเอียดกิจกรรมฟื้นฟูสมรรถภาพหัวใจ"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_activity_1"
                                                        component={Activity1AdvicesList}
                                                        title="กิจกรรมฟื้นฟูสมรรถภาพหัวใจระยะที่ 1"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_activity_1_detail"
                                                        component={Activity1AdvicesDetail}
                                                        title="กิจกรรมฟื้นฟูสมรรถภาพหัวใจระยะที่ 1"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_activity_2"
                                                        component={Activity2AdvicesDetail}
                                                        title="กิจกรรมฟื้นฟูสมรรถภาพหัวใจระยะที่ 2"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_home"
                                                        component={AdvicesForHome}
                                                        title="คำแนะนำหลังกลับบ้าน"
                                                        panHandlers={null}
                                                    />
                                                    <Scene
                                                        key="tab_advices_other"
                                                        component={OtherAdvices}
                                                        title="ทั่วไป"
                                                        panHandlers={null}
                                                    />
                                                </Stack>

                                            </Tabs>
                                        </Scene>
                                    </Drawer>
                                </Stack>
                                {/*
                                <Scene key="demo_lightbox" component={DemoLightbox} />*/}
                            </Lightbox>
                            {/*<Scene key="error" component={ErrorModal} />*/}
                            {/*<Stack key="login" titleStyle={{ alignSelf: 'center' }}>
                                <Scene
                                    key="loginModal"
                                    component={Login0}
                                    title="Login0"
                                    onExit={() => console.log('onExit')}
                                    leftTitle="Cancel"
                                    onLeft={Actions.pop}
                                />
                                <Scene
                                    key="loginModal2"
                                    component={Login2}
                                    title="Login2"
                                    backTitle="Back"
                                    panHandlers={null}
                                    duration={1}
                                />
                                <Scene
                                    key="loginModal3"
                                    hideNavBar
                                    component={Login3}
                                    title="Login3"
                                    panHandlers={null}
                                    duration={1}
                                />
                            </Stack>*/}
                        </Modal>

                        <Scene component={MessageBar} />
                    </Overlay>
                </Router>
                {/*</PersistGate>*/}
            </Provider>
        );
    }
}


// const styles = StyleSheet.create({
//     navBar: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'green',
//     }
// })

const styles1 = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#29B6F6',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: 'green',
    },
})
