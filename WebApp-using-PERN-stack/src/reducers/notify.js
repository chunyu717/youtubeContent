import {
    LOGIN_FAIL_MSG,
} from '../action_type'

const notify = ( state = { loginFailMsg: false}, action ) => {
    switch(action.type) {
        case LOGIN_FAIL_MSG: 
            return { loginFailMsg: action.loginFailMsg }
        default:
            return state
    }
}

export default notify