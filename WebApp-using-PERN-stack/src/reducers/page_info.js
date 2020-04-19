import {
    SET_LOGIN,
    ADD_REVIEWCOUNT,
    TO_PAGE,
    //SET_REGISTER
} from '../action_type'

const page_info = ( state = { page: 'Login', reviewCount: null, login: false, reload: false}, action ) => {
    switch(action.type) {
        case ADD_REVIEWCOUNT: 
            return { page: state.page, reviewCount: action.payload.msg, login: state.login }
        case TO_PAGE:
            return { page: action.page, reviewCount: state.reviewCount, login: state.login, reload: action.reload ? true : false }
        case SET_LOGIN: 
            return { page: action.payload.page, reviewCount: state.reviewCount, login: action.payload.login }
        // case SET_REGISTER: 
        //     return { page: action.payload.page, reviewCount: state.reviewCount, login: state.login }
        default:
            return state
    }
}

export default page_info