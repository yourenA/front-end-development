/**
 * Created by Administrator on 2017/3/8.
 */
import {IS_MOBILE,NOT_MOBILE} from '../actions/responsive';

const initLogin={
    isMobile:false
};
export default function login(state = initLogin ,action){
    switch (action.type){
        case IS_MOBILE:
            return Object.assign({},state,{isMobile:true});
        case NOT_MOBILE:
            return Object.assign({},state,{isMobile:false});
        default:
            return state;
    }
}