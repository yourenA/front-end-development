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
import EleRNLocation from 'ele-react-native-location';




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
        this.listener = EleRNLocation.addEventListener((data) => console.log('data', data));
        EleRNLocation.startLocation({
            accuracy: 'HighAccuracy', // BatterySaving(低功耗定位模式), DeviceSensors(仅设备定位模式), HighAccuracy(高精度模式)
            needAddress: true, // 设置是否返回地址信息
            onceLocation: false, // 是否只定位一次
            onceLocationLatest: false,//获取最近3s内精度最高的一次定位结果
            wifiActiveScan: true, // 设置是否强制刷新WIFI，默认为强制刷新,模式为仅设备模式(Device_Sensors)时无效
            mockEnable: true, // 设置是否允许模拟位置,默认为false，不允许模拟位置,模式为低功耗模式(Battery_Saving)时无效
            interval: 5000, // 设置定位间隔,单位毫秒,默认为2000ms
            httpTimeOut: 30000, // 设置联网超时时间(ms), 模式为仅设备模式(Device_Sensors)时无效,默认30000毫秒，建议超时时间不要低于8000毫秒,
            protocol:'http', //用于设定网络定位时所采用的协议，提供http/https两种协议,默认值http
            locationCacheEnable: false //true表示使用定位缓存策略；false表示不使用。默认是false
        });

    }
    componentWillUnmount=()=> {
        EleRNLocation.stopLocation();
        this.listener.remove();
        console.log('停止定位eleLocation')
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




