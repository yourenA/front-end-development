/**
 * Created by Administrator on 2017/4/14.
 */
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const RESET = 'RESET';

const increase = () =>{
    return dispatch => {
        dispatch({ type: INCREASE })
    }
} ;
const decrease = () =>{
    return dispatch => {
        dispatch({ type: DECREASE })
    }
} ;
const reset = () =>{
    return dispatch => {
        dispatch({ type: RESET })
    }
} ;
export {
    increase,
    decrease,
    reset
}