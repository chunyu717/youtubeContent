import $ from 'jquery'; 

import {  TO_PAGE, ADD_REVIEWCOUNT, CHANGE_LANG, SET_LOGIN /*, SET_REGISTER*/ , LOGIN_FAIL_MSG} from '../action_type'; 

export const changeLang = lang => {
    return {
      type: CHANGE_LANG,
      lang
    }
  }

  export function addEvent(eventData) {
    return (dispatch ) => {
        return fetch(process.env.REACT_APP_QUOTASERVER + '/api/addEvent' , {
            method : 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                eventTitle : eventData.eventTitle, 
                startDate : eventData.startDate,
                endDate : eventData.endDate
			}),
        })
        .then( response => response.json() )
        .then( json => {
            dispatch(  {
                type : TO_PAGE, 
                page : 'Schedule',
                reload: true
            } )
        }) 
        .catch( error => {
            dispatch(  {
                type : TO_PAGE, 
                page : 'Schedule'
            } )
        });
    }
}

export function toPage(page) {
    return (dispatch ) => {
        dispatch(  {
            type : TO_PAGE, 
            page : page
        } )
    }
}

export function setLogin(login, page) {
    return (dispatch ) => {
        dispatch(  {
            type : SET_LOGIN, 
            payload : { login: login, page: page  }
        } )
    }
}


export function addReviewCount() {
    return (dispatch ) => {
        return fetch(process.env.REACT_APP_QUOTASERVER + '/api/reviewCountAddThenGet' , {
            method : 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then( response => response.json() )
        .then( json => {
            console.log( json ) ;
            setToken(json)
            dispatch(  {
                type : ADD_REVIEWCOUNT, 
                payload : json
            } ) 
        }) 
        .catch( error => {
            console.log('addReviewCount error!');
        });
    }
}

export function onLogin(data) {
    return (dispatch ) => {
        return fetch(process.env.REACT_APP_QUOTASERVER + '/api/login' , {
            method : 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
				account : data.account,
				password: data.password
			}),
        })
        .then( response => response.json() )
        .then( json => {
            console.log( json ) ;
            setToken(json) ;
            if(json.success && json.access_token ) {
                dispatch(  {
                    type : SET_LOGIN, 
                    payload : { login: true, page: 'Home'  }
                } )
            } else {
                console.log('failLogin')
                dispatch(  {
                    type : LOGIN_FAIL_MSG, 
                    loginFailMsg : true
                } )
            }
        }) 
        .catch( error => {
            dispatch(  {
                type : SET_LOGIN, 
                payload : { login: false, page: 'Login'  }
            } )
        });
    }
}

export function onRegister(data) {
    return (dispatch ) => {

        return fetch(process.env.REACT_APP_QUOTASERVER + '/api/register' , {
            method : 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
				account : data.account,
                password: data.password,
                realname: data.realname,
                gender: data.gender,
                mobile: data.mobile,
                address: data.address,
                email:data.email,
                note: data.note
			}),
        })
        .then( response => response.json() )
        .then( json => {
            console.log( json ) ;
            // dispatch(  {
            //     type : LOGIN_FAIL, 
            //     loginFailMsg : true
            // } )
        }) 
        .catch( error => {
            console.log( error ) ;
            // dispatch(  {
            //     type : LOGIN_FAIL_MSG, 
            //     loginFailMsg : true
            // } )
        });
    }
}

export function setToken(token/*, setGlobal*/) {
    console.log(token) ; 
    sessionStorage.clear();
    setSessionStorage('ACCESS_TOKEN', token.access_token);
    deleteSessionStorage('errorMsg');
    $.ajaxSetup({
        headers: { "x-access-token": token.access_token },
        cache: false
    });
}

export function setSessionStorage(key, value) {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem(key, value);
    }
}

export function deleteSessionStorage(key) {
    if (typeof(Storage) !== "undefined" && sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
    }
}