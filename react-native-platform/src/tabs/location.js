/**
 * @author lovebing
 */

import React, {
    Component,
    PropTypes
} from 'react';


import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Platform,
    DeviceEventEmitter
} from 'react-native';
var { RNLocation: Location } = require('NativeModules');

Location.startUpdatingLocation();


export default class Content extends Component {
    constructor() {
        super()
        this.state = {
            html: '',
            location:[]
        }
    }
    componentDidMount=()=> {
        const that=this;
        let subscription = DeviceEventEmitter.addListener(
            'locationUpdated',
            (location) => {
                console.log("location",location);
                /* Example location returned
                 {
                 speed: -1,
                 longitude: -0.1337,
                 latitude: 51.50998,
                 accuracy: 5,
                 heading: -1,
                 altitude: 0,
                 altitudeAccuracy: -1
                 }
                 */
                that.setState({
                    location:that.state.location.concat(location)
                })
            }
        );

    }
    componentWillUnmount=()=> {
        // Location.stopUpdatingLocation();
        // console.log('停止定位location')
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.location.map((item,index)=>{
                    let localtion= `纬度:${item.latitude},经度:${item.longitude},高度:${item.altitude},速度${item.speed}`
                    return(
                        <Text key={index}>
                            {localtion}
                        </Text>
                    )
                })}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
    },
});




