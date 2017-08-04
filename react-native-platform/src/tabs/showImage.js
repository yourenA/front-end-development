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
    DeviceEventEmitter,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import uuidv4 from 'uuid/v4';
import Icon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import RNFetchBlob from 'react-native-fetch-blob'
import PhotoView from 'react-native-photo-view'
import NavBar from './../components/NavBar'
import Share from './../components/Share'
import {Actions} from 'react-native-router-flux'
export default class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShareModal:false,
            showIndex: parseInt(this.props.rowID),
            imageLoaded:false
        }
    }

    componentDidMount = ()=> {

    }
    componentWillUnmount = ()=> {
    }
    showShare=()=>{
        this.setState({
            isShareModal:true
        })
    }
    hideShare=()=>{
        this.setState({
            isShareModal:false
        })
    }
    renderPagination = (index, total, context) => {
        return (
            <View style={{
                position: 'absolute',
                bottom: 80,
                right: 10,
                flexDirection:'row',
            }}>
                {this._renderSaveBtn(index)}
                <Text style={{ color: 'grey' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 20
                    }}>{index + 1}</Text>/{total}
                </Text>
            </View>
        )
    }
    //图片滑动后的钩子
    onIndexUpdate=(e, state, context)=>{
        this.setState({
            showIndex:state.index
        })
    }

    _renderSaveBtn=(index)=> {
        let dirs = RNFetchBlob.fs.dirs
        return (
            <TouchableOpacity
                style={{
                    paddingTop:8,
                    paddingRight:5,
                    backgroundColor: 'rgba(0,0,0,.7)',
                    borderRadius: 15,
                }}
                onPress={() => {
                    RNFetchBlob.config({
                        fileCache : true,
                        // response data will be saved to this path if it has access right.
                        path : `/sdcard/Pictures/${uuidv4()}.png`
                    }).fetch('GET', this.props.images[index].url, {
                        // more headers  ..
                    })
                    // when response status code is 200
                        .then((res) => {
                            console.log('The file saved to ', res.path())
                            ToastAndroid.show('保存成功', ToastAndroid.SHORT)
                        })
                        // Status code is not 200
                        .catch((errorMessage, statusCode) => {
                            // error handling
                        })
                }}
            >
                <Icon name='download' size={15} color='#FFDB42'/>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true} leftBtnPress={()=>Actions.pop()} navbar_text='画廊' left_text='后退'  showrightBtn={true}  rightBtnPress={this.showShare}  right_text='分享'/>
                {/* Swiper index表示要显示第几个View */}
                <Swiper onMomentumScrollEnd={this.onIndexUpdate} index={parseInt(this.props.rowID)} style={styles.wrapper}  renderPagination={this.renderPagination}>
                    {
                        this.props.images.map((item, i) => <View key={i} style={styles.slide}>
                            <PhotoView
                                source={{uri: item.url}}
                                minimumZoomScale={1}
                                maximumZoomScale={3}
                                style={styles.photo}>

                            </PhotoView>

                        </View>)
                    }
                </Swiper>
                <Share hideShare={this.hideShare} isShareModal={this.state.isShareModal}
                        shareToSession={{
                            //分享到微信聊天显示title，description
                            title: '分享自：友人A',
                            type: 'imageUrl',
                            imageUrl:this.props.images[ this.state.showIndex].url
                        }}
                        shareToTimeline={{
                            //分享到微信朋友圈显示title，不显示description
                            title:'分享自：友人A',
                            type: 'imageUrl',
                            imageUrl:this.props.images[this.state.showIndex].url
                        }}/>
            </View>
        );
    }
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },

    photo: {
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#000',
        width: width,
        height: height,
        marginTop:-100
    },
});




