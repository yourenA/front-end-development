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
    NativeAppEventEmitter,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
import Icon from 'react-native-vector-icons/FontAwesome'
import AMap from 'react-native-smart-amap'
import AMapLocation from 'react-native-smart-amap-location'
import {loadMap} from './../actions/smartMap';
let timer;
let locationAddListener;
let POISearchAddListener;
class SmartMapDemo extends Component {

    constructor() {
        super();

        this.state = {
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
        };
    }

    componentDidMount() {
        this._loadInitialState()
        if (!this.props.smartMap.loadMap) {
            console.log("加载地图")
            AMapLocation.init({}) //使用默认定位配置
            AMapLocation.getLocation();
            this.props.dispatch(loadMap());
        }
        timer=setInterval(function () {
            AMapLocation.getLocation();
        },5000)
        locationAddListener= NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult)
        POISearchAddListener=NativeAppEventEmitter.addListener('amap.onPOISearchDone', this._onPOISearchDone)
        //NativeAppEventEmitter.addListener('amap.onPOISearchFailed', this._onPOISearchFailed)
    }
    componentWillUnmount(){
        locationAddListener.remove();
        POISearchAddListener.remove();
        clearInterval(timer)
    }
    async _loadInitialState(){
        try{
            var latitude=await AsyncStorage.getItem('latitude');
            var longitude=await AsyncStorage.getItem('longitude');
            this.setState({
                center: {
                    longitude: Number(longitude),
                    latitude: Number(latitude)
                },
            })
            this._amap.setCenterCoordinate({
                longitude: Number(longitude),
                latitude:  Number(latitude),
            })
        }catch(error){
        }
    }
    _onLocationResult = (result) => {
        console.log(`latitude`,result.coordinate.latitude)
        console.log(`longitude`,result.coordinate.longitude)
        /**这里使用alert害死人，不能直接alert来弹出对象*/
        if (result.error) {
            Alert.alert(`map-错误代码: ${result.error.code}, map-错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if (result.formattedAddress) {
                Alert.alert(`${result.formattedAddress}`)
            }
            this._coordinate = {
                latitude: result.coordinate.latitude,
                longitude: result.coordinate.longitude,
            }
            AsyncStorage.setItem('latitude', result.coordinate.latitude.toString() );
            AsyncStorage.setItem('longitude', result.coordinate.longitude.toString() );
            if (this._amap) {
                this._amap.setOptions({
                    zoomLevel: 15.1,
                })
                this._amap.setCenterCoordinate(this._coordinate)
            }

        }
    }
    _onPOISearchDone = (result) => {
        console.log('搜索结果:', result)
    }
    _onDidMoveByUser = (e) => {
        //
        let {longitude, latitude,} = e.nativeEvent.data.centerCoordinate;
        console.log("移动地图结果", e.nativeEvent.data.centerCoordinate);
        this._searchNearBy({
            page: 1,
            coordinate: this._coordinate,
            keywords: '餐厅',
            sortrule: 0
        })
        this.setState({
            center: {longitude: longitude, latitude: latitude}
        })
    }
    _searchNearBy = (searchParams)=> {
        console.log("搜索.....")
        this._amap.searchPoiByCenterCoordinate(searchParams)
    }
    _onLayout = (e)=> {
        console.log("_onLayout：", e)
    }
    _renderSaveBtn = ()=> {
        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,.5)',
                    padding: 15,
                    borderRadius: 30,
                    bottom: 80,
                    right: 30,
                }}
                onPress={() => {
                    AMapLocation.getLocation();
                }}
            >
                <Icon name='map-marker' size={20} color='#FFDB42'/>
            </TouchableOpacity>
        )
    }


    _renderCenterBtn = ()=> {
        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    borderRadius: 30,
                    top: (deviceHeight - ( Platform.OS === 'ios' ? 60 : 54)) / 2 - 30,
                    left: deviceWidth / 2 - 5,
                }}
            >
                <Icon name='map-marker' size={30} color='blue'/>
            </TouchableOpacity>
        )
    }

    render() {
        /**
         * ref={ component => this._amap = component }
         * 这样设置可以在其他地方直接使用this._amap就可以取到组件
         * */
        return (
            <View style={styles.container}>
                <View style={styles.map}>
                    <AMap
                        ref={ component => this._amap = component }
                        style={{flex: 1,}}
                        options={{
                            frame: {//ios设置地图宽(width), 高(height), 类型是number
                                width: 200,
                                height: 200
                            },
                            userTrackingMode: Platform.OS == 'ios' ? AMap.constants.userTrackingMode.none : null,

                            showsUserLocation: true,//	ios设置是否显示用户位置，默认显示
                            centerCoordinate: {
                                latitude: this.state.center.latitude,
                                longitude: this.state.center.longitude,
                            },
                            zoomLevel: 15.1,
                        }}
                        onLayout={this._onLayout}
                        onDidMoveByUser={this._onDidMoveByUser}//拖动地图回调事件
                    >
                    </AMap>
                    {this._renderCenterBtn()}
                </View>
                {this._renderSaveBtn()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50
    },
    map: {
        flex: 1
    }
});


const mapStateToProps = state => ({
    smartMap: state.smartMap
})

export default connect(mapStateToProps)(SmartMapDemo);
