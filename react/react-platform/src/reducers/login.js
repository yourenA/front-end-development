/**
 * Created by Administrator on 2017/3/8.
 */
import {ACTIVE_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,SIGNOUT_SUCCESS,SIGNOUT_FAIL} from '../actions/login';

const initLogin={
    login:false,
    username:'',
    token:'',
    permissions:[],
    activeSuccess:true
};
export default function login(state = initLogin ,action){
    switch (action.type){
        case LOGIN_SUCCESS:
            return Object.assign({},state,{login:true,permissions:action.permissions,username:action.username,token:action.token,});
        case LOGIN_FAIL:
            return Object.assign({},state,{login:false,username:action.username,});
        case ACTIVE_FAIL:
            return Object.assign({},state,{login:false,activeSuccess:false});
        case SIGNOUT_SUCCESS:
            return Object.assign({},state,{login:false,username:'',token:''});
        case SIGNOUT_FAIL:
            return Object.assign({},state,{login:false,username:'',token:'',});
        default:
            return state;
    }
}