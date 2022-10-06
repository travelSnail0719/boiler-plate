import { LOGIN_USER } from "../_actions/types";

export default function(state={}, action){
    switch (action.type) {
        case LOGIN_USER:
                return {...state, loginSuccess : action.payload}
                // action.payload에는 node에서 보내준 값이 들어가게 된다.
            break;
    
        default:
            return state;
    }
}