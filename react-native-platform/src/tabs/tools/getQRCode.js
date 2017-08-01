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
    TextInput
} from 'react-native';
import QRCode from 'react-native-qrcode';
export default class ScanQR extends Component {

    constructor() {
        super();

        this.state = {
            text: 'http://facebook.github.io/react-native/',
        };
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                />
                <QRCode
                    style={styles.QRCode}
                    value={this.state.text}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
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
