/**
 * Created by Administrator on 2017/4/14.
 */

import { INCREASE, DECREASE, RESET} from './../actions/count';
// 原始默认state
const defaultState = {
    count: 5,
    factor: 1
}

export default (state = defaultState, action)=> {
    switch (action.type) {
        case INCREASE:
            return { ...state, count: state.count + state.factor };
        case DECREASE:
            return { ...state, count: state.count - state.factor };
        case RESET:
            return { ...state, count: 0 };
        default:
            return state;
    }
}
