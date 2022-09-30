// store에서 여러개의 reducer가 여러개가 있을 수 있음 => reducer 안에서 state가 어떻게 변하는 가를 보여준 다음 변한 마지막 값을 return 해주는것
// 각 state별로 reducer가 나눠져 있기 떄문에 여러개의 reducer이 여러개가 되는 것
import { combineReducers } from "redux";
// import user from './user_reducer';

// combineReducers를 이용해서 여러개의 reducer을 rootReducer로 하나로 합쳐주는 것
const rootReducer = combineReducers({
    // user
});

export default rootReducer;