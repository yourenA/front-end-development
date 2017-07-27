import Vue from 'vue'
import moment from 'moment'

/**
 * {{evel.rateTime | time}}
 * // 注册过滤器
 *  Vue.filter('my-filter', function (value) {
 *  // 返回处理后的值
 *  })
 * */
Vue.filter('time', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
})
