/**
 * Created by Administrator on 2017/4/14.
 */

import { LOADMAP} from './../actions/smartMap';

export default (state = {loadMap:false}, action)=> {
    switch (action.type) {
        case LOADMAP:
            return { ...state, loadMap: true };
        default:
            return state;
    }
}
