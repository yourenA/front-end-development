import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next'; //引入react-i18next中的I18nextProvider

import App from './components/App'; //根组件
import i18n from './i18n'; // 引入i18n配置文件

/**
 *  <I18nextProvider i18n={ i18n }><App /></I18nextProvider>
 *  使用 I18nextProvider 包裹 根组件
 * */
ReactDOM.render(
  <I18nextProvider i18n={ i18n }><App /></I18nextProvider>,
  document.getElementById('app')
);
