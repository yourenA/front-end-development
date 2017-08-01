'use strict';
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
    TouchableOpacity,
    VibrationIOS,
    Platform,
    AsyncStorage,
    TextInput,
    Animated
} from 'react-native';
import Camera from 'react-native-camera';
let scanQRTimer;
var QRCodeScreen = React.createClass({

    propTypes: {
        cancelButtonVisible: React.PropTypes.bool,
        cancelButtonTitle: React.PropTypes.string,
        onSucess: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            cancelButtonVisible: false,
            cancelButtonTitle: 'Cancel',

        };
    },
    getInitialState:function(){
        return{
            top: new Animated.Value(0),
            turn:'down'
        };
    },
    _onPressCancel: function() {
        var $this = this;
        requestAnimationFrame(function() {
            if ($this.props.onCancel) {
                $this.props.onCancel();
            }
        });
    },

    _onBarCodeRead: function(result) {
        var $this = this;
        if(result.type==="QR_CODE"){
            if (this.barCodeFlag) {
                this.barCodeFlag = false;

                setTimeout(function() {
                    // VibrationIOS.vibrate();
                    // $this.props.navigator.pop();
                    $this.props.onSucess(result.data);
                }, 1000);
            }
        }

    },
    componentDidMount:function() {
        let $this=this;
        let animated;
        scanQRTimer=setInterval(function () {
            if($this.state.turn==='down'){
                animated = Animated.sequence([
                    Animated.timing($this.state.top, {
                        toValue: 243,
                        duration: 1500,
                    })
                ])
                $this.setState({
                    turn:'up'
                })
            }else if($this.state.turn==='up'){
                animated = Animated.sequence([
                    Animated.timing($this.state.top, {
                        toValue: 0,
                        duration: 1500,
                    })
                ])
                $this.setState({
                    turn:'down'
                })
            }
            animated.start();
        },1500)
    },
    componentWillUnmount:function () {
        clearInterval(scanQRTimer)
    },
    render: function() {
        var cancelButton = null;
        this.barCodeFlag = true;

        if (this.props.cancelButtonVisible) {
            cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
        }

        return (
            <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}>
                        <Animated.View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width:245,
                            height:2,
                            shadowColor:'#ffdb42',
                            shadowOffset:{h:3,w:3},
                            shadowOpacity:0.8,
                            backgroundColor:'#ffdb42',
                            transform: [
                                {translateY: this.state.top},
                            ]
                        }}>

                        </Animated.View>

                    </View>
                </View>
                {cancelButton}
            </Camera>
        );
    },
});

var CancelButton = React.createClass({
    render: function() {
        return (
            <View style={styles.cancelButton}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={styles.cancelButtonText}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    },
});

var styles = StyleSheet.create({

    camera: {
        height: 568,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        bottom: 10,
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },
});

module.exports = QRCodeScreen;
