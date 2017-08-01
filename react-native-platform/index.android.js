/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Index from './src/index'
import { Provider } from 'react-redux';
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


AppRegistry.registerComponent('ReactNativePlatform', () => ReactNativePlatform);
