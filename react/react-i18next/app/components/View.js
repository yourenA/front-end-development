import React from 'react';
import { translate, Interpolate, Trans } from 'react-i18next'; //引入react-i18next中相关的方法
import AnotherComponent from './AnotherComponent';
import YetAnotherComponent from './YetAnotherComponent';
import i18n from '../i18n';  // 引入i18n配置文件

function Link({ to, children }) {
  return <a href={to}>{children}</a>;
}

/**
 * @ TranslatableView修饰器
 * 使用 translate() 才能向TranslatableView中传递 props.t
 *
 * */
@translate(['view', 'nav'], { wait: true })

class TranslatableView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 3000);
  }

  render() {
    const { t } = this.props;
    const { show } = this.state;

    let interpolateComponent = <strong>"a interpolated component"</strong>;
      /**
       * i18n.changeLanguage(lng)
       * lng 为locales中的文件名
       * 改变语言类型
       * */
    const toggle = lng => i18n.changeLanguage(lng);

    const count = 10;
    const name = 'Arthur';

      /**
       * t('fileName:jsonKey') 直接翻译
       * 获取相应的语言文件里的内容
       * */
    return (
      <div>
        <h1>{t('common:appName')}</h1>

          {/**
           * <Trans></Trans>  插值翻译
           * i18nKey : 语言文件中的jsonKey
           * "transTest": "<3>{{count}}</3> Nachricht für <1><0>{{name}}</0></1>. Öffne <5>hier</5>.",//不能直接使用
           * {{}} 插值
           * t('jsonKey') <Trans></Trans>中可以直接吗，不用添加fileName
           */}
        <Trans i18nKey="transTest" >
          Hello <strong title={t('nameTitle')}>{{name, format: 'uppercase'}}</strong>, you have {{count}} message. Open <Link to="/msgs">here</Link>.
        </Trans>

        <Trans i18nKey="share">
          <input value="copyme" readOnly />
        </Trans>

        <button onClick={() => toggle('de')}>{t('nav:linkDE')}</button>
        <button onClick={() => toggle('en')}>{t('nav:linkEN')}</button>
        {
          show && <AnotherComponent />
        }

        <YetAnotherComponent />

          {/**
           * Interpolate
           * parent包裹节点
           * i18nKey使用的jsonKey
           * 其他props为jsonKey中的参数
           * useDangerouslySetInnerHTML:将jsonKey中为html代码转变为真实的html节点
           * */}
        <Interpolate parent='p' i18nKey='common:interpolateSample' value='"some value in props"' component={interpolateComponent} up='something to uppercase' />


        <Interpolate parent='p' i18nKey='common:interpolateSample' useDangerouslySetInnerHTML={true} value='"some value in props"' component={interpolateComponent} up='something to uppercase' />
        <a href='https://github.com/i18next/react-i18next' target='_blank'>{t('nav:link1')}</a>
      </div>
    )
  }
}

export default TranslatableView;
