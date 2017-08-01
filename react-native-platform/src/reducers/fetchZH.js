/**
 * Created by Administrator on 2017/4/14.
 */
import {
    ListView
} from 'react-native';
import { FETCHZT_FAIL, FETCHZT_REQUSET, FETCHZT_SUCCESS} from './../actions/fetchZH';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
let initState = {
    top_stories: [],
    stories: ds,
    data:[],
    loaded:false
}
export default (state = initState, action)=> {
    switch (action.type) {
        case FETCHZT_REQUSET:
            return {...state, loaded: false};
        case FETCHZT_SUCCESS:
            const _data = {
                top_stories: action.top_stories,
                stories: state.stories.cloneWithRows(action.stories) ,
                loaded: true,
            };
            return {...state, ..._data};
        case FETCHZT_FAIL:
            return {...state, loaded: false};
        default:
            return state
    }
}
