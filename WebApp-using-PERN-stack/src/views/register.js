import React from 'react';
import { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { onRegister } from '../actions';

class RegisterComponent extends Component{
    constructor(props)
    {
        super(props);
        //this.store = LoginStore; // <- just assign the store class itself
        this.state = { failLogin: false, selectedOption: 'male' } ;
        this.handleOptionChange = this.handleOptionChange.bind(this) ; 
        this.submit = this.submit.bind(this) ; 

    }

    handleOptionChange(changeEvent) {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    }

    submit() {
        console.log( 'gendar = ' + this.state.selectedOption )
        var userData = {
            account : this.accountInput.value, 
            password : this.passwordInput.value,
            realname: this.realname.value,
            gender: this.state.selectedOption === 'male' ? true  : false,
            mobile: this.mobile.value,
            address: this.address.value,
            email:this.email.value,
            note: this.note.value,
        } ;
        console.log( userData ) ;
        //this.setState({ failLogin: false});
        this.props.dispatch(onRegister( userData) ) ;
	}
    
    render() {
        var failMsg = this.state.failLogin ? "帳號密碼錯誤!!" : "" ;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <h1 align="center">Register</h1>
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputAccount">帳號</label>
                            <input className="form-control" id="exampleInputAccount" ref={(input) => { this.accountInput = input; }} type="text" aria-describedby="accountHelp" placeholder="Account" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">密碼</label>
                            <input className="form-control" id="exampleInputPassword1" ref={(input) => { this.passwordInput = input; }} type="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2">重新輸入密碼</label>
                            <input className="form-control" id="exampleInputPassword2" ref={(input) => { this.passwordInput = input; }} type="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">真實姓名</label>
                            <input className="form-control" id="name" ref={(input) => { this.realname = input; }} type="text" placeholder="name" />
                        </div>
                        <div className="radio"> 
                            <input type="radio" value="male" checked={this.state.selectedOption === 'male'} onChange={this.handleOptionChange} /> 先生
                            <input type="radio" value="female" checked={this.state.selectedOption === 'female'} onChange={this.handleOptionChange} /> 女士
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">電話</label>
                            <input className="form-control" id="mobile" ref={(input) => { this.mobile = input; }} type="text" placeholder="mobile" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">地址</label>
                            <input className="form-control" id="address" ref={(input) => { this.address = input; }} type="text" placeholder="address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">電子郵件</label>
                            <input className="form-control" id="email" ref={(input) => { this.email = input; }} type="email" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note">備註</label>
                            <input className="form-control" id="note" ref={(input) => { this.note = input; }} type="text" placeholder="note" />
                        </div>
                        <p>{failMsg}</p>
                        <button className="btn btn-primary btn-block" type="submit" onClick={this.submit}>Register</button>
                 
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state; 
}

const Register = connect(mapStateToProps)(RegisterComponent) ;

export default Register;