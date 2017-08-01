/**
 * Created by Administrator on 2017/4/17.
 */
export const FETCHTOUTIAO_REQUSET = 'FETCHTOUTIAO_REQUSET';
export const FETCHTOUTIAO_SUCCESS = 'FETCHTOUTIAO_SUCCESS';
export const FETCHTOUTIAO_FAIL = 'FETCHTOUTIAO_FAIL';
import axios from 'axios';
let url = 'http://api.dagoogle.cn/news/get-news?&pagesize=10'
exports.fetchToutiao = (sort=1,page=1)=> {
    return async(dispatch)=> {
        dispatch(toutiaoRequest());
        try {
            let response = await axios({
                url:`${url}&tableNum=${sort}&page=${page}`,
            });
            let data = await response.data;
            console.log('get toutiao',data);
            return dispatch(toutiaoSucceed(data,sort,page))

        } catch (e) {
            return dispatch(toutiaoFailed(e));
        }
    }
};

const toutiaoRequest = ()=>({
    type: FETCHTOUTIAO_REQUSET
});

const toutiaoSucceed = (data,sort,page)=>({
    type: FETCHTOUTIAO_SUCCESS,
    data: data.data,
    page:page,
    sort:sort
});

const toutiaoFailed = (error)=> {
    console.log('server state get failed', error);
    return {
        type: FETCHTOUTIAO_FAIL,
        error
    }
};