/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Platform,
    Image,
    TouchableWithoutFeedback,
    CameraRoll,
    TouchableOpacity
} from 'react-native'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-root-toast'
import LoadingSpinner from './loadingSpinner'
export default class ImageModal extends Component {
    constructor() {
        super()
        /**
         * Animated
         * 最简单的工作流程就是创建一个Animated.Value，把它绑定到组件的**一个或多个样式属性上**。
         * new Animated.Value(0)初始化
         * */
        this.state = {
            modalSize: new Animated.Value(0.5),
            modalOpacity: new Animated.Value(1.0),
            modalWidth: new Animated.Value(deviceWidth),
            animatedDuration: 400,
            loading: true,
        }
    }

    /**
     * componentDidUpdate
     * 这个方法和 componentDidMount 类似，在组件重新被渲染之后，
     * componentDidUpdate(object prevProps, object prevState) 会被调用。可以在这里访问并修改 DOM。
     * */
    componentDidMount(){
        console.log('componentDidMount')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
        this.props.hide ? this._hideModal() : this._showModal()//初始的时候就调用了_hideModal
    }

    _hideModal = ()=> {
        console.log('hdieModal');
        let animated = Animated.sequence([
            Animated.parallel([
                //响应式数据，改变的时候，绑定的视图也会同时改变
                Animated.timing(this.state.modalSize, {
                    toValue: .5,
                    duration: this.state.animatedDuration,
                }),
                Animated.timing(this.state.modalOpacity, {
                    toValue: 0.0,
                    duration: this.state.animatedDuration,
                })
            ]),
            Animated.timing(this.state.modalWidth, {
                toValue: 0,
                duration: 1,
            })
        ])
        animated.start()
    }
    _showModal = ()=> {
        console.log('showModal')

        /**
         * Animated.sequence([,,])
         * Animated.sequence顺序执行一段动画
         *
         * Animated.parallel([,,])
         * Animated.parallel同时执行一段动画
         *
         *  Animated.timing(attr,{options})从时间范围映射到渐变的值。
         *  options.duration:动画持续的时间（单位是毫秒），默认为500
         *  options.easing:一个用于定义曲线的渐变函数
         *  options.delay:在一段时间之后开始动画（单位是毫秒），默认为0。
         *  options.toValue:终点状态值
         * */
        let animated = Animated.sequence([
            Animated.timing(this.state.modalWidth, {//首先改变宽度
                toValue: deviceWidth,
                duration: 1,
            }),
            Animated.parallel([
                Animated.timing(this.state.modalSize, {//改变整体大小
                    toValue: 1.0,
                    duration: this.state.animatedDuration,
                }),
                Animated.timing(this.state.modalOpacity, {//改变透明度
                    toValue: 1.0,
                    duration: this.state.animatedDuration,
                })
            ])
        ])
        /**
         * 动画可以通过调用start方法来开始。start接受一个回调函数，当动画结束的时候会调用此回调函数。
         * */
        animated.start()

    }
    _renderSaveBtn=()=> {
        console.log("this.props.uri",this.props.uri)
            return (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0,0,0,.5)',
                        padding: 10,
                        borderRadius: 20,
                        bottom: 40,
                        right: 30
                    }}
                    onPress={() => {
                        let a = CameraRoll.saveToCameraRoll(this.props.uri, 'photo')
                        a.then((e) => Toast.show('保存成功', {
                                position: Toast.positions.CENTER,
                            })
                        )
                        a.catch((e) => Toast.show(e.message, {
                                position: Toast.positions.CENTER,
                            })
                        )
                    }}
                >
                    <Icon name='download' size={20} color='#FFDB42'/>
                </TouchableOpacity>
            )
    }
    render() {
        if (!this.props.uri) return <View></View>
        /**
         * Animated.View用于创建有动画的View组件,style里面为初始的属性，大小最初为一半scale：0.5,
         * 在_showModal和_hideModal利用sequence改变动画的状态,style中的状态也会改变
         * */
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    paddingTop: Platform.OS === 'ios' ? 60 : 54,
                    paddingBottom: 50,
                    width: this.state.modalWidth,
                    height: deviceHeight,
                    backgroundColor: 'black',
                    zIndex: 100000,
                    opacity: this.state.modalOpacity,
                    transform: [
                        {scale: this.state.modalSize},
                    ]
                }}
            >
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <Image
                        source={{uri: this.props.uri}}
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        resizeMode='cover'
                        resizeMethod='scale'
                        onLoadStart={() => this.setState({loading: true})}
                        onLoad={() => this.setState({loading: false})}
                        onLoadEnd={() => console.log('end')}
                        onProgress={(e) => console.log(e.nativeEvent)}
                    >
                        {this._renderSaveBtn()}
                        {this.state.loading && <LoadingSpinner animating={true}/>}
                    </Image>
                </TouchableWithoutFeedback>
            </Animated.View>
        )
    }
}