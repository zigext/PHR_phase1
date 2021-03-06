import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, TouchableHighlight, PermissionsAndroid,
    ListView,
    ScrollView,
    AppState,
    Dimensions,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Alert,
    ToastAndroid
} from 'react-native';
import { Button } from 'react-native-elements'
import common from '../styles/common'
import BleManager from 'react-native-ble-manager';


const window = Dimensions.get('window');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);



export default class ScanBLE extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            peripherals: new Map(),
            appState: ''
        }

        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        BleManager.start({ showAlert: false });

        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

    }

    handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                console.log('Connected peripherals: ' + peripheralsArray.length);
            });
        }
        this.setState({ appState: nextAppState });
    }

    componentWillUnmount() {
        this.handlerDiscover.remove();
        this.handlerStop.remove();
    }

    handleStopScan() {
        console.log('Scan is stopped');
        this.setState({ scanning: false });
    }

    startScan() {
        if (!this.state.scanning) {
            this.setState({ peripherals: new Map() });
            BleManager.scan([], 60, true).then((results) => {
                console.log('Scanning...');
                this.setState({ scanning: true });
            });
        }
    }

    retrieveConnected() {
        BleManager.getConnectedPeripherals([]).then((results) => {
            console.log(results);
            var peripherals = this.state.peripherals;
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                this.setState({ peripherals });
            }
        });
    }

    handleDiscoverPeripheral(peripheral) {
        var peripherals = this.state.peripherals;
        if (!peripherals.has(peripheral.id)) {
            console.log('Got ble peripheral', peripheral);
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals })
        }
    }

    test(peripheral) {
        console.log("Peripheral = ", peripheral)
        if (peripheral) {
            if (peripheral.connected) {
                BleManager.disconnect(peripheral.id);
            } else {
                BleManager.connect(peripheral.id).then(() => {
                    let peripherals = this.state.peripherals;
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        this.setState({ peripherals });
                    }
                    this.props.setPeripheral(peripheral)
                    this.props.setUseBLE(true)
                    console.log('Connected to ' + peripheral.id)
                    ToastAndroid.showWithGravity(`เชื่อมต่อกับ ${peripheral.name} สำเร็จ`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                    this.props.setConnectToBLE(true)

                }).catch((error) => {
                    ToastAndroid.showWithGravity(`ไม่สามารถเชื่อมต่อกับ ${peripheral.name} กรุณาลองอีกครั้ง`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                    console.log('Connection error', error);
                });
            }
        }
    }

    render() {
        const list = Array.from(this.state.peripherals.values());
        const dataSource = ds.cloneWithRows(list);

        return (
            <View style={styles.container}>
                <Text style={[styles.text, { margin: 15 }]}>เลือกสายรัดข้อมือที่ต้องการเชื่อมต่อ (กรุณาเปิดใช้งาน Bluetooth)</Text>
                {/*<TouchableHighlight style={{ marginTop: 40, margin: 20, padding: 20, backgroundColor: '#ccc' }} onPress={() => this.startScan()}>
                    <Text style={styles.text}>ค้นหาอุปกรณ์ Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>*/}
                <Button
                    raised
                    backgroundColor={common.primaryColorDark}
                    color='white'
                    title={this.state.scanning? 'ค้นหาอุปกรณ์ Bluetooth: on': 'ค้นหาอุปกรณ์ Bluetooth: off'}
                    fontSize={17}
                    containerViewStyle={{ borderRadius: 10 }}
                    buttonStyle={{ borderRadius: 10 }}
                    onPress={() => this.startScan()}
                />
                <Button
                    raised
                    backgroundColor='white'
                    color={common.primaryColorDark}
                    title='ใช้งานโดยไม่เชื่อมต่อกับอุปกรณ์ Bluetooth'
                    fontSize={17}
                    containerViewStyle={{ borderRadius: 10 }}
                    buttonStyle={{ borderRadius: 10 }}
                    onPress={() => this.props.setUseBLE(false)}
                />
               
                <ScrollView style={styles.scroll}>
                    {(list.length == 0) &&
                        <View style={{ flex: 1, margin: 20 }}>
                            <Text style={[styles.text, { textAlign: 'center' }]}>ไม่พบอุปกรณ์ Bluetooth</Text>
                        </View>
                    }
                    <ListView
                        enableEmptySections={true}
                        dataSource={dataSource}
                        renderRow={(item) => {
                            const color = item.connected ? 'green' : '#fff';
                            return (
                                <TouchableHighlight onPress={() => Alert.alert(
                                    'เชื่อมต่ออุปกรณ์ Bluetooth',
                                    `ต้องการเชื่อมต่อกับ ${item.name} หรือไม่?`,
                                    [
                                        {
                                            text: 'ใช่', onPress: () => {
                                                this.test(item)
                                            }
                                        },
                                        { text: 'ไม่ ', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                                    ]
                                )
                                }>
                                    <View style={[styles.row, { backgroundColor: color }]}>
                                        <Text style={styles.peripheralName}>{item.name}</Text>
                                        <Text style={styles.peripheralId}>{item.id}</Text>
                                    </View>
                                </TouchableHighlight>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: window.width,
        height: window.height
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    row: {
        margin: 10
    },
    text: {
        fontSize: 20,
        color: common.grey,
        // marginTop: 20,
    },
    peripheralId: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333333',
        padding: 10
    },
    peripheralName: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333333',
        padding: 10
    }
});