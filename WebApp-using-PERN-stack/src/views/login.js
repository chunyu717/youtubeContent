import React from 'react';
import { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { onLogin, toPage } from '../actions';


class LoginComponent extends Component{
    constructor(props)
    {
        super(props);
        //this.store = LoginStore; // <- just assign the store class itself
        this.state = { failLogin: false } ;
        this.submit = this.submit.bind(this) ; 
    }

    componentWillReceiveProps(nextProps) {
        //if (nextProps.page_info.reload == true && nextProps.page_info.reload != this.props..page_info.reload )
        console.log( 'nextProps.notify.loginFailMsg =' + nextProps.notify.loginFailMsg ) 
        //this.forceUpdate();
        if( nextProps.notify.loginFailMsg)
            this.setState( {failLogin : true })
    }

    submit() {
        var userData = {account : this.accountInput.value, password : this.passwordInput.value } ;
        console.log( userData ) ;
        this.setState({ failLogin: false});
        this.props.dispatch(onLogin( userData) ) ;
	}
    
    render() {
        var failMsg = this.state.failLogin ? "帳號密碼錯誤!!" : "" ;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <h1 align="center">Login</h1>
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputAccount">Account</label>
                            <input className="form-control" id="exampleInputAccount" ref={(input) => { this.accountInput = input; }} type="text" aria-describedby="accountHelp" placeholder="Enter Account" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input className="form-control" id="exampleInputPassword1" ref={(input) => { this.passwordInput = input; }} type="password" placeholder="Password" />
                        </div>
                        <p>{failMsg}</p>
                        <button className="btn btn-primary btn-block" type="submit" onClick={this.submit}>Login</button>
                 
                        </form>
                        <div className="text-center">
                            <a className="d-block small mt-3" href="#/" onClick={ () => { this.props.dispatch(toPage('Register')) ; } } >Register an Account</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state; 
}

const Login = connect(mapStateToProps)(LoginComponent) ;

export default Login;