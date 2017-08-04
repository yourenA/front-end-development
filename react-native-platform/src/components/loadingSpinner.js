/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native'
/**
 * ActivityIndicator
 * 显示一个圆形的loading提示符号。
 * */
export default class LoadingSpinner extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={this.props.animating}
                    color='#FFDB42'
                    size='large'
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,//使用flex布局占据全部，默认主轴是垂直方向
        justifyContent: 'center',//主轴对齐
        alignItems: 'center',//侧轴对齐
    },
})
