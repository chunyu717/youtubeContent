import React from 'react';
import './App.css';
import Home from './views/home'; 
// import About from './views/about';
// import Contact from './views/contact'
import Schedule from './views/schedule'
import Login from './views/login'
import Register from './views/register'
import $ from 'jquery';

// redux 
import { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { addReviewCount, toPage, setLogin } from './actions';
import { FormattedMessage } from 'react-intl';

import Lang from "./views/Lang";

class AppComponent extends Component {

    componentDidMount() {
        this.setAjaxOptions();
        this.props.dispatch(addReviewCount()) ;
    }

    componentWillReceiveProps(nextProps) {

    }
    
    setAjaxOptions() {
        var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN') ;
        if (ACCESS_TOKEN &&  ACCESS_TOKEN !== "undefined" ) { 
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    //xhr.setRequestHeader("x-access-token", ACCESS_TOKEN);
                    xhr.setRequestHeader("token", ACCESS_TOKEN);
                },
                cache: false
            });
            this.props.dispatch(setLogin(true, 'Home')) ;
        } else {
            this.props.dispatch(setLogin(false, 'Home')) ;
            console.log('no token bye!')
        }
    };

    setBlock(page) {
        this.props.dispatch(toPage(page)) ;
    }

    logout() {
        sessionStorage.removeItem('ACCESS_TOKEN');
        sessionStorage.removeItem('REFRESH_TOKEN');
        document.location.href = '/';
    }

    render() {
    var content ; 
    switch(this.props.page_info.page){
        case 'Home':
                content = <Home/> ; 
            break;
        case 'Schedule':
                content = <Schedule/> ; 
            break;
        case 'Register':
                content = <Register/> ; 
            break;
        case 'Login':
            if(!this.props.page_info.login  )
                content = <Login/> ; 
            else 
                content = <Home/> ; 
            break;
        default : 
            content = <Home/> ; 
        break;
    }
    var loginLogin = '';
    if( !this.props.page_info.login) {
        loginLogin = <a href="#/" className="nav-link" onClick={ () => {this.setBlock('Login')} }> <FormattedMessage id='login' description='say hello to Howard.' defaultMessage='Hello, Howard'/> </a>
    } else {
        loginLogin = <a href="#/" className="nav-link" onClick={ () => {  this.logout('Logout');  this.props.dispatch(setLogin(false, 'Home')) ; } }> <FormattedMessage id='logout' description='say hello to Howard.' defaultMessage='Hello, Howard'/> </a>
    }
    
    return (
      <div> 
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>            
                <div className="collapse navbar-collapse" id="myNavbar">
                    <a href="#/" className="navbar-brand text-white"  onClick={ () => {this.setBlock('Home')} } ><FormattedMessage id='title' description='say hello to Howard.' defaultMessage='Hello, Howard'/></a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item text-white">
                            <a href="#/" className="nav-link" onClick={ () => {this.setBlock('Schedule')} }><FormattedMessage id='schedule' description='say hello to Howard.' defaultMessage='Hello, Howard'/></a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item text-white">
                            <span className="nav-item text-white nav-link">
                            <Lang/>
                            </span>
                        </li>
                        <li className="nav-item text-white">
                            {loginLogin}
                        </li>
                        <li className="nav-item text-white">
                            <span className="nav-item text-white nav-link"><FormattedMessage id='reviews' description='say hello to Howard.' defaultMessage='Hello, Howard'/>: { this.props.page_info.reviewCount}</span>
                        </li>
                    </ul>
                </div>    
          </nav>    
          
          {content}
          <div style={{padding: "30px 0 10px"}}>
              <div className="col-lg-12 text-center">
                  <p>Copyright &copy; ChunYuTech 2019</p>
              </div>
          </div>
      </div>      
    );
  }
}

//map global state to Props
const mapStateToProps = state => {
    return state; 
}

const App = connect(mapStateToProps)(AppComponent) ;

export default App;

