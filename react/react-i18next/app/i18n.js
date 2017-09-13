import i18n from 'i18next'; //引入i18next

/**
 * i18next-xhr-backend
 * 这是一个简单的i18next后端，用于浏览器。 它将使用xhr从后端服务器加载资源
 * */
import XHR from 'i18next-xhr-backend'; //引入 i8n XHR
// import Cache from 'i18next-localstorage-cache';
/**
 * i18next-browser-languagedetector
 * 这是一个i18next语言检测插件，用于在浏览器中检测用户语言
 * */
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(XHR) //使用XHR和LanguageDetector插件
  // .use(Cache)
  .use(LanguageDetector)
  .init({ //初始化i18n
    fallbackLng: 'en',//使用语言，如果用户语言的翻译不可用

    react: {
      // wait: true, // globally set to wait for loaded translations in translate hoc
      // exposeNamespace: true // exposes namespace on data-i18next-options to be used in eg. locize-editor
    },

    // have a common namespace used around the full app
    ns: ['common'], //namespace命名空间，可以在这里引入多个['common','nav','view']
    defaultNS: 'common',//公共的common.json不需要在每个页面重新引入

    debug: true, //是否开启debug模式

    // cache: {
    //   enabled: true
    // },

    interpolation: { //插值
      escapeValue: false, // not needed for react!!
      formatSeparator: ',', //用于将格式与插值相分离
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });


export default i18n;
