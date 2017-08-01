/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    WebView,
    StyleSheet,
    Platform
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'

export default class Content extends Component {
    constructor() {
        super()
        this.state = {
            html: ''
        }
    }
    componentDidMount=()=> {
        let css='img{ margin:0 auto;margin-left:20%}';
        let cssLink = '<style>'+css+'</style>'
        console.log(cssLink+this.props.content)
            this.setState({
            html:`${cssLink}<div>${this.props.content}</div>`
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true}  leftBtnPress={()=>Actions.pop()} navbar_text='新闻' left_text='后退' right_text='确认'/>
                <WebView
                    style={{flex:1}}
                    source={{html: this.state.html}}
                    javaScriptEnabled={false}
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