/**
 * Created by Administrator on 2017/4/17.
 */
import {
    ListView
} from 'react-native';
import {FETCHTOUTIAO_FAIL,FETCHTOUTIAO_REQUSET,FETCHTOUTIAO_SUCCESS} from './../../actions/news/toutiao';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
let initState = {
    temp_1:[],
    data_1: ds,
    page_1:1,
    loaded_1:false,
    temp_2:[],
    data_2: ds,
    page_2:1,
    loaded_2:false,
    temp_3:[],
    data_3: ds,
    page_3:1,
    loaded_3:false,
    temp_4:[],
    data_4: ds,
    page_4:1,
    loaded_4:false,
    temp_5:[],
    data_5: ds,
    page_5:1,
    loaded_5:false,
    temp_7:[],
    data_7: ds,
    page_7:1,
    loaded_7:false
}
export default (state = initState, action)=> {
    switch (action.type) {
        case FETCHTOUTIAO_REQUSET:
            switch (action.sort){
                case 1:
                    return {...state, loaded_1: false};
                case 2:
                    return {...state, loaded_2: false};
                case 3:
                    return {...state, loaded_3: false};
                case 4:
                    return {...state, loaded_4: false};
                case 5:
                    return {...state, loaded_5: false};
                case 7:
                    return {...state, loaded_7: false};
                    return state
            }
        case FETCHTOUTIAO_SUCCESS:
            switch (action.sort){
                case 1:
                    let temp_1=state.temp_1.concat(action.data)
                    const _data1 = {
                        temp_1:temp_1,
                        data_1: state.data_1.cloneWithRows(temp_1) ,
                        loaded_1: true,
                        page_1:action.page
                    };
                    return {...state, ..._data1};
                case 2:
                    let temp_2=state.temp_2.concat(action.data)
                    const _data2 = {
                        temp_2:temp_2,
                        data_2: state.data_2.cloneWithRows(temp_2) ,
                        loaded_2: true,
                        page_2:action.page
                    };
                    return {...state, ..._data2};
                case 3:
                    let temp_3=state.temp_3.concat(action.data)
                    const _data3 = {
                        temp_3:temp_3,
                        data_3: state.data_3.cloneWithRows(temp_3) ,
                        loaded_3: true,
                        page_3:action.page
                    };
                    return {...state, ..._data3};
                case 4:
                    let temp_4=state.temp_4.concat(action.data)
                    const _data4 = {
                        temp_4:temp_4,
                        data_4: state.data_4.cloneWithRows(temp_4) ,
                        loaded_4: true,
                        page_4:action.page
                    };
                    return {...state, ..._data4};
                case 5:
                    let temp_5=state.temp_5.concat(action.data)
                    const _data5 = {
                        temp_5:temp_5,
                        data_5: state.data_5.cloneWithRows(temp_5) ,
                        loaded_5: true,
                        page_5:action.page
                    };
                    return {...state, ..._data5};
                case 7:
                    let temp_7=state.temp_7.concat(action.data)
                    const _data7 = {
                        temp_7:temp_7,
                        data_7: state.data_7.cloneWithRows(temp_7) ,
                        loaded_7: true,
                        page_7:action.page
                    };
                    return {...state, ..._data7};
                default:
                    return state
            }

        case FETCHTOUTIAO_FAIL:
            switch (action.sort){
                case 1:
                    return {...state, loaded_1: false};
                case 2:
                    return {...state, loaded_2: false};
                case 3:
                    return {...state, loaded_3: false};
                case 4:
                    return {...state, loaded_4: false};
                case 5:
                    return {...state, loaded_5: false};
                case 7:
                    return {...state, loaded_7: false};
                    return state
            }
        default:
            return state
    }
}
