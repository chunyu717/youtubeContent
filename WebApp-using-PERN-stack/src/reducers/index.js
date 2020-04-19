import { combineReducers } from 'redux' ;
import page_info from './page_info' ; 
import langs from './langs' ; 
import notify from './notify' ;

const rootReducer = combineReducers({
    page_info,
    langs,
    notify
});

export default rootReducer;