// import React, {Component} from 'react'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { Provider } from 'react-redux'
// import thunk from 'redux-thunk'

// import * as reducers from '../reducers'
// import CounterApp from './counterApp'

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const reducer = combineReducers(reducers);
// const store = createStoreWithMiddleware(reducer);

// export default class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         {/*<CounterApp />*/}
//       </Provider>
//     );
//   }
// }

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import CreateLogger from 'redux-logger'
import Login from './Login'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import Surgery from './Surgery'
import MainAdvices from './MainAdvices'
import FoodAdvices from './FoodAdvices'
import SideDrawer from '../components/drawers/SideDrawer'
import reducer from '../reducers/Index'
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

    render() {
        
        const store = createStore(reducer)
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
        return (
            <Provider store={store}>
                {/*<Router>
                    <Scene key='root' navigationBarStyle={{ backgroundColor: '#474045' }} titleStyle={{ color: 'white' }} barButtonTextStyle={{ color: 'white' }}>
                        <Scene key='loginPage' component={Login} title='Log in' initial={true} />
                        <Scene key='homePage' component={Home} title='Home' />
                    </Scene>
                </Router>*/}

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
                                    <Scene key="forgotPassword" component={ForgotPassword} title="รีเซ็ตรหัสผ่าน" back/>
                                    <Scene key="profile" component={Profile} title="ข้อมูลส่วนตัว" back/>
                                    <Scene key="surgery" component={Surgery} title="ข้อมูลการผ่าตัด" back/>

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
                                                        component={Home}
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
                                                        component={Home}
                                                        title="พัฒนาการ"
                                                        icon={TabIcon}
                                                        rightTitle="Right3"
                                                        onRight={() => { }}
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
                                                        title="อาหาร"
                                                        
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
