import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'

let locationTimer

export default class BaiduMapDemo extends Component {

    constructor() {
        super();

        this.state = {
            locationLebel:false,
            mayType: MapTypes.NORMAL,//地图类型
            zoom: 15,//放大
            center: {//中心
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,//是否显示交通图
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 113.981718,
                latitude: 22.542449,
                title: "Window of the world"
            }, {
                longitude: 113.995516,
                latitude: 22.537642,
                title: ""
            }]
        };
    }

    componentDidMount() {

    }
    _startContinuteLocation=()=>{
        const that=this;
        if(this.state.locationLebel===false){
            that.setState({
                locationLebel:true
            })
            locationTimer=setInterval(function () {
                that._location()
            },5000)
        }else{
            that.setState({
                locationLebel:false
            })
            clearInterval(locationTimer)
        }
    }
    componentWillUnmount(){
        clearInterval(locationTimer)
    }
    _location = ()=> {
        Geolocation.getCurrentPosition()
            .then(data => {
                Alert.alert(data.city)
                console.log(data);
                this.setState({
                    zoom: 15,
                    marker: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        title: 'Your location'
                    },
                    center: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        rand: Math.random()
                    }
                });
            })
            .catch(e => {
                Alert.alert(`无法定位`)
                console.log(e, 'error');
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true}   leftBtnPress={()=>Actions.pop()} navbar_text='百度地图' left_text='后退' right_text='确认'/>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={styles.map}
                    onMarkerClick={(e) => {
                        console.log(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                    }}
                >
                </MapView>

                <View style={styles.row}>
                    <Button title="普通图" onPress={() => {
                        this.setState({
                            mapType: MapTypes.NORMAL//普通图
                        });
                    }}/>
                    <Button style={styles.btn} title="卫星图" onPress={() => {
                        this.setState({
                            mapType: MapTypes.SATELLITE//卫星图
                        });
                    }}/>
                    <Button title="交通图" onPress={() => {
                        this.setState({
                            trafficEnabled: !this.state.trafficEnabled
                        });
                    }}/>

                    <Button title="热力图" onPress={() => {
                        this.setState({
                            baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
                        });
                    }}/>

                </View>
                <View style={styles.row}>
                    <Button style={styles.btn} title="定位" onPress={this._location }/>
                    <Button style={styles.btn} title={this.state.locationLebel===false?"开启连续定位":"关闭连续定位"} onPress={this._startContinuteLocation }/>
                </View>
                <View style={styles.row}>
                    <Button title="放大" onPress={() => {
                        this.setState({
                            zoom: this.state.zoom + 1
                        });
                    }}/>
                    <Button title="缩小" onPress={() => {
                        if (this.state.zoom > 0) {
                            this.setState({
                                zoom: this.state.zoom - 1
                            });
                        }

                    }}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        marginTop:5,
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
    },
    btn:{
        marginRight:5
    }
});