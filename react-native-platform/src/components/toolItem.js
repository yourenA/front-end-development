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
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import MateIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class RightBottomBtn extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={()=>this.props.onPress()} >
                <View style={styles.row}>
                    <View style={styles.leftIcon}>
                        <MateIcon name={this.props.leftIcon} size={25} color='#FFDB42'/>
                    </View>
                    <Text style={styles.text}>
                        {this.props.itemText}
                    </Text>
                    <View style={styles.rightIcon}>
                        <Icon name='arrow-right' size={18} color='#bbb'/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: deviceWidth,
        height: 55,
        borderBottomColor: '#ddd',
        padding: 5,
        borderBottomWidth: 1

    },
    text: {
        fontSize: 20,
        marginLeft: 10
    },
    leftIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#1C86EE',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIcon: {
        position: 'absolute',
        right: 10
    }
});

