/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ListView,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class RightBottomBtn extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
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
                onPress={() => { this.props.onPress() }}
            >
                <Icon name={this.props.icon} size={20} color='#FFDB42'/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
})
