import { LOGIN } from '../actions';

export default function(state={}, action){
    switch(action.type){
        case LOGIN:
            console.log('in login reducer',action.payload);
            return action.payload;
        default:
            return state;
    }
}