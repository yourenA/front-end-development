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
    AsyncStorage,
    TextInput,
    Linking,
    ScrollView,
    Image,
    ListView,
    Alert,
    ActivityIndicator
} from 'react-native';
import {Geolocation} from 'react-native-baidu-map';
import axios from 'axios';
import MateIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import {
    SwRefreshScrollView, //支持下拉刷新的ScrollView
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
    RefreshStatus, //刷新状态 用于自定义下拉刷新视图时使用
    LoadMoreStatus //上拉加载状态 用于自定义上拉加载视图时使用
} from 'react-native-swRefresh'
import NavBar from './../../components/NavBar'

import {convertWeekday, convertCodeToImage, convertTime} from './../../util/index';
import {Actions} from 'react-native-router-flux'
let weatherCity, now_weather, now_temperature, f1, f2, f3, f4, f5, f6, f7, tigan_temperature, sd, jiangshui, fx, fl, zwx, quality, hours_list, qy;
export default class Weather extends Component {

    constructor() {
        super();
        this.onPullRelease = this.onPullRelease.bind(this)
        AsyncStorage.getItem('weatherCity').then((data)=> {
            weatherCity = data
        });
        AsyncStorage.getItem('now_weather').then((data)=> {
            now_weather = data
        });
        AsyncStorage.getItem('now_temperature').then((data)=> {
            now_temperature = data
        });
        AsyncStorage.getItem('f1').then((data)=> {
            f1 = JSON.parse(data)
        });
        AsyncStorage.getItem('f2').then((data)=> {
            f2 = JSON.parse(data)
        });
        AsyncStorage.getItem('f3').then((data)=> {
            f3 = JSON.parse(data)
        });
        AsyncStorage.getItem('f4').then((data)=> {
            f4 = JSON.parse(data)
        });
        AsyncStorage.getItem('f5').then((data)=> {
            f5 = JSON.parse(data)
        });
        AsyncStorage.getItem('f6').then((data)=> {
            f6 = JSON.parse(data)
        });
        AsyncStorage.getItem('f7').then((data)=> {
            f7 = JSON.parse(data)
        });
        AsyncStorage.getItem('tigan_temperature').then((data)=> {
            tigan_temperature = data
        });
        AsyncStorage.getItem('sd').then((data)=> {
            sd = data
        });
        AsyncStorage.getItem('jiangshui').then((data)=> {
            jiangshui = data
        });
        AsyncStorage.getItem('fx').then((data)=> {
            fx = data
        });
        AsyncStorage.getItem('fl').then((data)=> {
            fl = data
        });
        AsyncStorage.getItem('zwx').then((data)=> {
            zwx = data
        });
        AsyncStorage.getItem('qy').then((data)=> {
            qy = data
        });
        AsyncStorage.getItem('quality').then((data)=> {
            quality = data
        });
        AsyncStorage.getItem('hours_list').then((data)=> {
            console.log("data", JSON.parse(data));
            hours_list = JSON.parse(data)
        });
        this.state = {
            localCity: '',
            weatherCity: weatherCity || '',
            now_weather: now_weather || '',
            now_temperature: now_temperature || '',
            f1: f1 || {},
            f2: f2 || {},
            f3: f3 || {},
            f4: f4 || {},
            f5: f5 || {},
            f6: f6 || {},
            f7: f7 || {},
            tigan_temperature: tigan_temperature || null,
            sd: sd || null,
            jiangshui: jiangshui || null,
            fx: fx || null,
            fl: fl || null,
            zwx: zwx || null,
            qy: qy || null,
            quality: quality || null,
            hours_list: hours_list || [],
            loaded: false
        };
    }

    componentDidMount() {
        let that = this
        Geolocation.getCurrentPosition()
            .then(data => {
                console.log(data)
                if (data.city) {
                    that.setState({
                        localCity: data.city
                    });
                    that.getWeather(data.city)
                } else {
                    Alert.alert(`无法定位`)
                }
            })
            .catch(e => {
                console.log(e, 'error');
            })
    }

    getWeather = (area)=> {
        console.log('area', area)
        let that = this
        axios({
            url: 'http://saweather.market.alicloudapi.com/hour24',
            method: 'get',
            params: {
                area: area,
            },
            headers: {"Authorization": "APPCODE 7553024c8a4147fd8fb609b057fe0b06"}
        }).then(function (response) {
            console.log("返回24小时天气数据", response.data);
            let HoursDate = response.data.showapi_res_body.hourList;
            console.log("HoursDate", HoursDate)
            that.setState({
                tigan_temperature: HoursDate[0].temperature,
                hours_list: HoursDate
            });
            AsyncStorage.setItem('tigan_temperature', HoursDate[0].temperature.toString());
            AsyncStorage.setItem('hours_list', JSON.stringify(HoursDate));
        });
        axios({
            url: 'http://saweather.market.alicloudapi.com/area-to-weather',
            method: 'get',
            params: {
                area: area,
                needMoreDay: 1
            },
            headers: {"Authorization": "APPCODE 7553024c8a4147fd8fb609b057fe0b06"}
        }).then(function (response) {
            console.log("返回七天天气数据", response.data);
            let SevenDate = response.data.showapi_res_body;
            AsyncStorage.setItem('weatherCity', SevenDate.now.aqiDetail.area.toString());
            AsyncStorage.setItem('now_weather', SevenDate.now.weather.toString());
            AsyncStorage.setItem('now_temperature', SevenDate.now.temperature.toString());
            AsyncStorage.setItem('f1', JSON.stringify(SevenDate.f1));
            AsyncStorage.setItem('f2', JSON.stringify(SevenDate.f2));
            AsyncStorage.setItem('f3', JSON.stringify(SevenDate.f3));
            AsyncStorage.setItem('f4', JSON.stringify(SevenDate.f4));
            AsyncStorage.setItem('f5', JSON.stringify(SevenDate.f5));
            AsyncStorage.setItem('f6', JSON.stringify(SevenDate.f6));
            AsyncStorage.setItem('f7', JSON.stringify(SevenDate.f7));
            AsyncStorage.setItem('sd', SevenDate.now.sd.toString());
            AsyncStorage.setItem('jiangshui', SevenDate.f1.jiangshui.toString());
            AsyncStorage.setItem('fx', SevenDate.now.wind_direction.toString());
            AsyncStorage.setItem('fl', SevenDate.now.wind_power.toString());
            AsyncStorage.setItem('zwx', SevenDate.f1.ziwaixian.toString());
            AsyncStorage.setItem('qy', SevenDate.f1.air_press.toString());
            AsyncStorage.setItem('quality', SevenDate.now.aqiDetail.quality.toString());

            that.setState({
                weatherCity: SevenDate.now.aqiDetail.area,
                now_weather: SevenDate.now.weather,
                now_temperature: SevenDate.now.temperature,
                f1: SevenDate.f1,
                f2: SevenDate.f2,
                f3: SevenDate.f3,
                f4: SevenDate.f4,
                f5: SevenDate.f5,
                f6: SevenDate.f6,
                f7: SevenDate.f7,
                sd: SevenDate.now.sd,
                jiangshui: SevenDate.f1.jiangshui,
                fx: SevenDate.now.wind_direction,
                fl: SevenDate.now.wind_power,
                zwx: SevenDate.f1.ziwaixian,
                qy: SevenDate.f1.air_press,
                quality: SevenDate.now.aqiDetail.quality,
                loaded: true
            })

        }).catch(e => {
            console.log(e, 'error');

        });
    }

    async onPullRelease(resolve) {
        let that = this;
        await that.getWeather(that.state.localCity);
        console.log('刷新');
        resolve();

    }

    topIndicatorRender = (pulling, pullok, pullrelease)=> {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="white"/>
                <Text style={{color: 'white'}} ref={(c) => {
                    this.txtPulling = c;
                }}>下拉刷新</Text>
                <Text style={{color: 'white'}} ref={(c) => {
                    this.txtPullok = c;
                }}>松开刷新</Text>
                <Text style={{color: 'white'}} ref={(c) => {
                    this.txtPullrelease = c;
                }}>刷新中</Text>
            </View>
        );
    }
    _onRefresh(end){
        let timer =  setTimeout(()=>{
            this.getWeather(this.state.localCity);
            clearTimeout(timer)
            end()//刷新成功后需要调用end结束刷新

        },1500)
    }
    render() {

        const hours_list = this.state.hours_list.map((hourElem, hourIndex) => {
            return (
                <View key={hourIndex} style={styles.hours_list_item}>
                    <Text style={styles.f_text}>{convertTime(hourElem.time)}</Text>
                    <Image
                        style={styles.f_image}
                        source={{uri: convertCodeToImage(hourElem.time, hourElem.weather_code)}}
                    />
                    <Text style={styles.f_text}>{hourElem.temperature}°</Text>
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true} leftBtnPress={()=>Actions.pop()} navbar_text='天气' left_text='后退'
                        right_text='确认'/>

                <SwRefreshScrollView ref={(scrollView) => {
                    this._scrollView = scrollView;
                }}
                    onRefresh={this._onRefresh.bind(this)}>
                    <View style={styles.weatherTop}>
                        <Text style={styles.weatherCity}>{this.state.weatherCity}</Text>
                        <Text style={styles.now_weather}>{this.state.now_weather}</Text>
                        <Text style={styles.now_temperature}>{this.state.now_temperature}°</Text>
                    </View>
                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f1.weekday)} 今天</Text>
                        <Text
                            style={styles.f_text}>{`${this.state.f1.night_air_temperature || 0}°   ${this.state.f1.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <ScrollView style={styles.hour_list} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {hours_list}
                    </ScrollView>
                    <View style={styles.line}></View>

                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f2.weekday)}</Text>
                        <Image
                            style={styles.f_image}
                            source={{uri: this.state.f2.day_weather_pic}}
                        />
                        <Text
                            style={styles.f_text}>{`${this.state.f2.night_air_temperature || 0}°   ${this.state.f2.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f3.weekday)}</Text>
                        <Image
                            style={styles.f_image}
                            source={{uri: this.state.f3.day_weather_pic}}
                        />
                        <Text
                            style={styles.f_text}>{`${this.state.f3.night_air_temperature || 0}°   ${this.state.f3.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f4.weekday)}</Text>
                        <Image
                            style={styles.f_image}
                            source={{uri: this.state.f4.day_weather_pic}}
                        />
                        <Text
                            style={styles.f_text}>{`${this.state.f4.night_air_temperature || 0}°   ${this.state.f4.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f5.weekday)}</Text>
                        <Image
                            style={styles.f_image}
                            source={{uri: this.state.f5.day_weather_pic}}
                        />
                        <Text
                            style={styles.f_text}>{`${this.state.f5.night_air_temperature || 0}°   ${this.state.f5.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f6.weekday)}</Text>
                        <Image
                            style={styles.f_image}
                            source={{uri: this.state.f6.day_weather_pic}}
                        />
                        <Text
                            style={styles.f_text}>{`${this.state.f6.night_air_temperature || 0}°   ${this.state.f6.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.f}>
                        <Text style={styles.f_text}>{convertWeekday(this.state.f7.weekday)}</Text>
                        <Image
                            style={styles.f_image}
                            source={{uri: this.state.f7.day_weather_pic}}
                        />
                        <Text
                            style={styles.f_text}>{`${this.state.f7.night_air_temperature || 0}°   ${this.state.f7.day_air_temperature || 0}°`}</Text>
                    </View>
                    <View style={styles.line}></View>

                    <View style={styles.f}>
                        <View style={styles.f_info}>
                            <MateIcon name={"oil-temperature"} size={20} color='white'/>
                            <Text style={styles.info_text}>
                                体感温度{ this.state.tigan_temperature}°
                            </Text>
                        </View>
                        <View style={styles.f_info}>
                            <MateIcon name={"water"} size={20} color='white'/>
                            <Text style={styles.info_text}>
                                湿度{ this.state.sd}
                            </Text>
                        </View>
                        <View style={styles.f_info}>
                            <MateIcon name={"weather-windy"} size={20} color='white'/>
                            <Text style={styles.info_text}>
                                { this.state.fx + this.state.fl}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.f}>
                        <View style={styles.f_info}>
                            <MateIcon name={"weather-sunny"} size={20} color='white'/>
                            <Text style={styles.info_text}>
                                紫外线{ this.state.zwx}
                            </Text>
                        </View>
                        <View style={styles.f_info}>
                            <MateIcon name={"chevron-double-down"} size={20} color='white'/>
                            <Text style={styles.info_text}>
                                气压{ this.state.qy}
                            </Text>
                        </View>
                        <View style={styles.f_info}>
                            <EntypoIcon name={"air"} size={20} color='white'/>
                            <Text style={styles.info_text}>
                                空气质量{ this.state.quality}
                            </Text>
                        </View>
                    </View>
                </SwRefreshScrollView>
            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#64A8D1',
        flex: 1,
    },
    line: {
        width: deviceWidth,
        height: 1,
        backgroundColor: '#ccc',
    },
    weatherTop: {
        width: deviceWidth,
        height: 260,
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherCity: {
        fontSize: 40,
        color: 'white'
    },
    now_weather: {
        fontSize: 24,
        color: 'white'
    },
    now_temperature: {
        fontSize: 70,
        color: 'white',
        marginLeft: 20
    },
    hour_list: {
        height: 100,
    },
    hours_list_item: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    f: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        width: deviceWidth,
        justifyContent: 'space-between',
    },
    f_text: {
        fontSize: 14,
        color: 'white',
    },
    f_image: {
        width: 25,
        height: 25,
        marginTop: 2
    },
    f_info: {
        padding: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info_text: {
        fontSize: 14,
        color: 'white',
        marginTop: 5
    }
});
