/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ListView,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Animated,
    Image,
    ToastAndroid
} from 'react-native'
import * as WeChat from 'react-native-wechat';
const shareIconWechat = require('../img/share_icon_wechat.png');
const shareIconMoments = require('../img/share_icon_moments.png');
const shareIconQQ = require('../img/share_icon_qq.png');
const shareIconQQMoment = require('../img/share_icom_qqmoment.png');

export default class Share extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //需要移动的值必须使用new Animated.Value()去定义
            shareBottom: new Animated.Value(130),//初始的时候transform: [{translateY: this.state.shareBottom}]，向下移动130 ，隐藏
            isShareModal: this.props.isShareModal
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShareModal === true) {
            this.showShare()
        }
        this.setState({
            isShareModal: nextProps.isShareModal
        })
    }

    showShare = ()=> {
        this.setState({isShareModal: true});
        let animated = Animated.sequence([
            Animated.timing(this.state.shareBottom, {
                toValue: 0, //移动到位置 0 显示
                duration: 400,
            }),
        ])
        animated.start();
    }
    hideShare = ()=> {
        this.props.hideShare();
        this.setState({isShareModal: false}, function () {
            let animated = Animated.sequence([
                Animated.timing(this.state.shareBottom, {
                    toValue: 130, //隐藏的时候要重新将位置改为 130 ，否则重新打开的时候就没有移动的动画效果
                    duration: 400,
                }),
            ])
            animated.start()
        });


    }

    render() {
        if (this.state.isShareModal) {
            return (
                <View
                    style={{flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
                >
                    <TouchableWithoutFeedback
                        onPress={this.hideShare}
                    >
                        <View key={'spinner'} style={styles.spinner}>
                            {/*使用 Animated.View 包住需要运动的元素 */}
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    transform: [
                                        {translateY: this.state.shareBottom},
                                    ]
                                }}>

                                <View style={styles.spinnerContent}>
                                    <Text
                                        style={[styles.spinnerTitle, {fontSize: 20, color: 'black'}]}
                                    >
                                        分享到
                                    </Text>
                                    <View style={styles.shareParent}>
                                        <TouchableOpacity
                                            style={styles.base}
                                            onPress={() => {
                                                WeChat.isWXAppInstalled().then((isInstalled) => {//判断是否安装微信客户端
                                                    console.log("isInstalled", isInstalled)
                                                    if (isInstalled) {
                                                        WeChat.shareToSession(this.props.shareToSession).then((result)=> {
                                                            console.log('share text message to time line successful:', result);
                                                        }).catch((error) => {
                                                            console.log("error", error)
                                                        });
                                                    } else {
                                                        ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                                                    }
                                                });
                                            }}
                                        >
                                            <View style={styles.shareContent}>
                                                <Image style={styles.shareIcon} source={shareIconWechat}/>
                                                <Text style={styles.spinnerTitle}>
                                                    微信
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.base}
                                            onPress={() => {
                                                WeChat.isWXAppInstalled().then((isInstalled) => {
                                                    if (isInstalled) {
                                                        WeChat.shareToTimeline(this.props.shareToTimeline).then((result)=> {
                                                            console.log('share text message to time line successful:', result);
                                                            if (result.errCode === 0) {
                                                                ToastAndroid.show('分享成功', ToastAndroid.SHORT);

                                                            }
                                                        }).catch((error) => {
                                                            console.log("error", error)
                                                        });
                                                    } else {
                                                        ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                                                    }
                                                });
                                            }}
                                        >
                                            <View style={styles.shareContent}>
                                                <Image style={styles.shareIcon} source={shareIconMoments}/>
                                                <Text style={styles.spinnerTitle}>
                                                    朋友圈
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.base}
                                            onPress={() => {
                                                ToastAndroid.show('暂不支持QQ', ToastAndroid.SHORT);
                                            }}
                                        >
                                            <View style={styles.shareContent}>
                                                <Image style={styles.shareIcon} source={shareIconQQ}/>
                                                <Text style={styles.spinnerTitle}>
                                                    QQ好友
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.base}
                                            onPress={() => {
                                                ToastAndroid.show('暂不支持QQ', ToastAndroid.SHORT);
                                            }}
                                        >
                                            <View style={styles.shareContent}>
                                                <Image style={styles.shareIcon} source={shareIconQQMoment}/>
                                                <Text style={styles.spinnerTitle}>
                                                    QQ空间
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        } else {
            return null
        }

    }
}

let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: '#fcfcfc',
        padding: 10,
        height: 130
    },
    spinnerTitle: {
        fontSize: 16,
        color: '#313131',
        textAlign: 'left',
    },
    shareParent: {
        flexDirection: 'row',
        marginTop: 10,
    },
    base: {
        marginRight: 15
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        width: 40,
        height: 40
    }
});

