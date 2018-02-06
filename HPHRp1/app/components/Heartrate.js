import React from 'react'
import { StyleSheet, Text, View, NativeEventEmitter, NativeModules } from 'react-native'
import BleManager from 'react-native-ble-manager'
import Buffer from 'buffer'
import { Icon } from 'react-native-elements'

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)


export default class Heartrate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHr: 0
        }
        this.count = 0
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this)
    }

    componentDidMount = () => {
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic)
        BleManager.retrieveServices(this.props.peripheral.id).then((peripheralInfo) => {
            console.log("retrieve service = ", peripheralInfo);

            BleManager.startNotification(this.props.peripheral.id, '0000180d-0000-1000-8000-00805F9B34FB', '00002a37-0000-1000-8000-00805F9B34FB')
                .then(() => {
                    // Success code
                    console.log('Notification started');
                })
                .catch((error) => {
                    // Failure code
                    ToastAndroid.showWithGravity('ผิดพลาด! ไม่สามารถอ่านอัตราการเต้นหัวใจจากอุปกรณ์ Bluetooth', ToastAndroid.SHORT, ToastAndroid.CENTER)
                    console.log('Notification error', error);
                })

        });
    }

    componentWillUnmount() {
        this.handlerUpdate.remove();
    }


    handleUpdateValueForCharacteristic(data) {
        // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
        const buffer = Buffer.Buffer.from(data.value);
        const sensorData = buffer.readUInt8(1, true);
        //Read only one heartrate value
        if (this.count === 0 && this.props.getHeartrate && this.props.state === 'preActivity') {
            this.props.getHeartrate("preHr", sensorData)
            this.count++
        }
        else if (this.count === 0 && this.props.getHeartrate && this.props.state === 'postActivity') {
            this.props.getHeartrate("postHr", sensorData)
            this.count++
        }
        else if (this.props.state === 'doingActivity') {
            this.setState({
                currentHr: sensorData
            })
            console.log("count = ", this.count, this.state.currentHr)
        }

        if (this.state.currentHr - this.props.preHr >= 20) {
            ToastAndroid.showWithGravity('อัตราการเต้นหัวใจถึงค่าที่กำหนด ควรหยุดทำกิจกรรม', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    render() {
        //If it mounted from preActivity or postActivity, doesn't display anything
        if (this.props.state === 'preActivity') {
            return null
        }
        else if (this.props.state === 'doingActivity') {
            return (
                <View style={styles.container}>
                    <Icon
                        name='heartbeat'
                        type='font-awesome'
                        color='#D32F2F'
                        size={35}
                    />
                    <Text style={styles.text} > {this.state.currentHr} bpm</Text>
                </View>
            )
        }
        else if (this.props.state === 'postActivity') {
            return null
        }

    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 35,
    }
})