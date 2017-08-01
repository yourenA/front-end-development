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
    AsyncStorage,
    TextInput,
    Linking
} from 'react-native';
import QRCodeScreen from './QRCodeScreen'
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'

export default class ScanQR extends Component {

    constructor() {
        super();

        this.state = {
            text: 'http://facebook.github.io/react-native/',
        };
    }

    componentDidMount() {
    }
    _onSucess=(result)=>{
        Linking.openURL(result).catch(err => console.error('An error occurred', err));
    }
    _onCancel=()=>{
        Actions.pop();
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true}   leftBtnPress={()=>Actions.pop()} navbar_text='扫描二维码' left_text='后退' right_text='确认'/>
                <QRCodeScreen cancelButtonVisible={true} onCancel={this._onCancel} onSucess={this._onSucess} />
            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50
    },
    input: {
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    QRCode:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});
