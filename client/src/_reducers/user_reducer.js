import { 
    LOGIN_USER,
    REGISTER_USER
} from "../_actions/types";

export default function(state={}, action){
    switch (action.type) {
        case LOGIN_USER:
                // Reducer은 이전State와 action.object를 받은 후에 next State를 return 한다.
                return {...state, loginSuccess : action.payload}
                // action.payload에는 node에서 보내준 값 user_action에서 payload에 담기고 담긴 값이 action.payload에 들어가게 된다.
            break;
    
        case REGISTER_USER :
                return {...state, register : action.payload}
            break;
        default:
            return state;
    }
}