/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    WebView,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Modal,
    ToastAndroid,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'
import Share from './../../components/Share'


export default class Content extends Component {
    constructor() {
        super()
        this.state = {
            isShareModal: false,
        }
    }

    componentDidMount = ()=> {
    }

    hideShare=()=>{
        this.setState({
            isShareModal:false
        })
    }
    render() {
        const that = this;
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true} showrightBtn={true} leftBtnPress={()=>Actions.pop()} rightBtnPress={()=> {
                    this.setState({isShareModal: true});
                }} navbar_text='微信精选文章' left_text='后退' right_text='分享'/>
                <WebView
                    style={{flex: 1}}
                    source={{uri: this.props.wxUrl}}
                    javaScriptEnabled={true}
                />
                <Share  isShareModal={this.state.isShareModal}
                        hideShare={this.hideShare}
                        shareToSession={{
                            //分享到微信聊天显示title，description
                            title: '分享自：友人A',
                            description: this.props.wxTitle,
                            thumbImage: this.props.thumbImage,
                            type: 'news',
                            webpageUrl: this.props.wxUrl
                        }}
                        shareToTimeline={{
                            //分享到微信朋友圈显示title，不显示description
                            title: this.props.wxTitle,
                            thumbImage: this.props.thumbImage,
                            type: 'news',
                            webpageUrl: this.props.wxUrl
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

})