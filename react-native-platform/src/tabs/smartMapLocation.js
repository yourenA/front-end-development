import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Alert,
    NativeAppEventEmitter,
    ActivityIndicator,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Button,
    Platform
} from 'react-native'


class AMapLocationDemo extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {
        // AMapLocation.startUpdatingLocation()
        // NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult);
    }

    componentWillUnmount() {
        //停止并销毁定位服务
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    ref={ component => this._button_1 = component }
                    onPress={this._showReGeocode}
                    title="定位逆地理编码信息"/>

                <Button
                    ref={ component => this._button_2 = component }
                    onPress={this._showLocation}
                    title="定位地理编码信息"/>
                <View >
                    <Text style={{
                        fontSize: 17,
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: '.HelveticaNeueInterface-MediumP4',
                    }}>努力定位中</Text>
                </View>

            </View>
        )
    }

    _onLocationResult = (result) => {
        console.log("result",result)
        if (result.error) {
            Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if (result.formattedAddress) {
                Alert.alert(`格式化地址 = ${result.formattedAddress}`)
            }
            else {
                Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
            }
        }
    }

    //单次定位并返回逆地理编码信息
    _showReGeocode = () => {
        this._button_1.setState({
            loading: true,
        })
        AMapLocation.getReGeocode()
    }

    //单次定位并返回地理编码信息
    _showLocation = () => {
        this._button_2.setState({
            loading: true,
        })
        AMapLocation.getLocation()
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{margin: 10,}}
                animating={true}
                color={'#fff'}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{margin: 10,}}
                    color={'#fff'}
                    styleAttr={'Small'}/>

            ) : (
            <ActivityIndicatorIOS
                style={{margin: 10,}}
                animating={true}
                color={'#fff'}
                size={'small'}/>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
    },
});
export default AMapLocationDemo