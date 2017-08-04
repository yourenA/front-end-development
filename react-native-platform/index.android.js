/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//入口文件
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Index from './src/index'
import { Provider } from 'react-redux';//在react-native中使用redux与react中一样
import store from './src/store/store';
export default class ReactNativePlatform extends Component {
  render() {
    return (
        <Provider store={store}>
          <Index/>
        </Provider>

    );
  }
}
//使用AppRegistry.registerComponent('name',callback)注册app
AppRegistry.registerComponent('ReactNativePlatform', () => ReactNativePlatform);
