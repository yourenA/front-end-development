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
    TouchableNativeFeedback,
    Dimensions,
    Platform,
    ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import ToolItem from './../components/toolItem'
import NavBar from './../components/NavBar'

export default class Tool extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <NavBar navbar_text='千百度' left_text='后退' right_text='确认'/>

                <ScrollView ref={(scrollView) => {
                    this._scrollView = scrollView;
                }}>
                    <ToolItem onPress={() => Actions.mqtt({})} itemText='Mqtt test' leftIcon="settings-box"/>
                    <ToolItem onPress={() => Actions.scanQR({})} itemText='扫描二维码' leftIcon="barcode-scan"/>
                    <ToolItem onPress={() => Actions.map({})} itemText='地图' leftIcon="web"/>
                    <ToolItem onPress={() => Actions.weather({})} itemText='天气' leftIcon="weather-cloudy"/>
                    <ToolItem onPress={() => Actions.todolist({})} itemText='记事本' leftIcon="book-multiple"/>
                    <ToolItem onPress={() => Actions.ooxx({})} itemText='新闻' leftIcon="newspaper"/>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50
    },
});
