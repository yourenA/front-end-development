/**
 * Created by Administrator on 2017/4/14.
 */
export const FETCHZT_REQUSET = 'FETCHZT_REQUSET';
export const FETCHZT_SUCCESS = 'FETCHZT_SUCCESS';
export const FETCHZT_FAIL = 'FETCHZT_FAIL';
import axios from 'axios';
let url = 'http://news-at.zhihu.com/api/4/news/latest'
exports.fetchEndPoints = ()=> {
    return async(dispatch)=> {
        dispatch(endpointsRequest());
        try {
            let response = await axios({
                url:url,
            });
            let data = await response.data;
            console.log('get endpoints',data);
            return dispatch(endpointsSucceed(data))

        } catch (e) {
            return dispatch(endpointsFailed(e));
        }
    }
};

const endpointsRequest = ()=>({
    type: FETCHZT_REQUSET
});

const endpointsSucceed = (data)=>({
    type: FETCHZT_SUCCESS,
    stories: data.stories,
    top_stories:data.top_stories
});

const endpointsFailed = (error)=> {
    console.log('server state get failed', error);
    return {
        type: FETCHZT_FAIL,
        error
    }
};