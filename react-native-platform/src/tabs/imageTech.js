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
import NavBar from './../components/NavBar'
import LoadingSpinner from '../components/loadingSpinner'

export default class Content extends Component {
    constructor() {
        super()
        this.state = {
            url:'http://www.fsbus.com/sheyingjiqiao/',
            showLoading:true,
            WebViewCangoback:false
        }
    }

    componentDidMount = ()=> {
    }
    onNavigationStateChange=(navState)=>{
        this.setState({
            WebViewCangoback:navState.canGoBack
        })

    }
    leftBtnPress=()=>{
        if(!this.state.WebViewCangoback){
            Actions.pop()
        }else{
            this._WebView.goBack();//使WebView后退
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar  showLeftBtn={true} leftBtnPress={this.leftBtnPress} navbar_text='摄影技巧' left_text='后退'/>
                <WebView
                    ref={(WebView)=>this._WebView=WebView}
                    style={{flex: 1}}
                    startInLoadingState={true}
                    renderLoading ={()=>{return <LoadingSpinner animating={true}/>}}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
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