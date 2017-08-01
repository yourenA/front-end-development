/**
 * Created by Administrator on 2017/4/14.
 */

import { combineReducers } from 'redux';
import counter from './count'
import fetchZH from './fetchZH'
import smartMap from './smartMap'
import toutiao from './news/toutiao'
export default combineReducers({
    counter,
    fetchZH,
    smartMap,
    toutiao
});