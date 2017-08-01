/**
 * Created by Administrator on 2017/4/14.
 */
export const LOADMAP = 'LOADMAP';

exports.loadMap = () =>{
    return dispatch => {
        dispatch({ type: LOADMAP })
    }
} ;