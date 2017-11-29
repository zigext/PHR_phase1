import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class ProhibitInfo extends React.Component {
    constructor(props) {
        super(props)
    }

 pressRow = () => {
            console.log("click")
            console.log(this.props)
        }

    render() {
        console.log(this.props)
        return (
            <View>
            <TouchableOpacity onPress={this.pressRow}>
                
                <View style={styles.container}>
                   
                    {/*<Image source={ icon } style={styles.image}></Image>
                    
                    <View style={styles.detailContainer}>
                        <Text style={styles.telephone}>{this.props.telephone}</Text>
                        <Text style={styles.name}>{this.props.name}</Text>
                    </View>*/}
                    <Text>Test</Text>
                </View>
               
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        margin: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    telephone: {
        fontSize: 18,
        color: 'grey'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey'
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5
    }
});
