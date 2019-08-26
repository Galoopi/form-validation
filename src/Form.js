import React from 'react';
import './App.css';
import ValidateMessage from './ValidateMessage'



class Form extends React.Component {

  state ={
    username: '',
    usernameValid: false,
    email: '',
    emailValid: false,
    password: '',
    passwordValid: false,
    passwordConfirm: '',
    passwordConfirmValid: false,
    formValid: false,
    errorMsg: {}
  }
  
  updateUsername =  (username) => {
    this.setState({username},
    this.validateUsername)
  }

 validateUsername = () => {
    const {username} = this.state;
    let usernameValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (username.length < 3) {
      usernameValid = false;
      errorMsg.username = 'Must be 3 characters or longer '
    }

    this.setState({usernameValid, errorMsg}, this.validateForm)
  }

validateForm = () => {
  const {usernameValid,emailValid,passwordValid,passwordConfirmValid} = this.state;
  this.setState({
    formValid: usernameValid &&
               emailValid &&
               passwordValid && 
               passwordConfirmValid
      })
}

updateEmail = (email) => {
  this.setState({email},
  this.validateEmail )
}

validateEmail = () => {
  const {email} = this.state;
  let emailValid = true;
  let errorMsg = {...this.state.errorMsg}

// checks for format _@_._
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailValid = false;
    errorMsg.email = 'Email not valid. Try again'
  }
  this.setState({emailValid, errorMsg}, this.validateForm)
}

updatePassword = (password) => {
    this.setState({password}, this.validatePassword);
  }

  validatePassword = () => {
    const {password} = this.state;
    let passwordValid = true;
    let errorMsg = {...this.state.errorMsg}

    // must be 6 chars
    // must contain a number
    // must contain a special character

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)){
      passwordValid = false;
      errorMsg.password = 'Password must contain a digit';
    } else if (!/[!@#$%^&*]/.test(password)){
      passwordValid = false;
      errorMsg.password = 'Password must contain special character: !@#$%^&*';
    }

    this.setState({passwordValid, errorMsg}, this.validateForm);
  }

updatePasswordConfirm = (passwordConfirm) => {
    this.setState({passwordConfirm}, this.validatePasswordConfirm)
  }

  validatePasswordConfirm = () => {
    const {passwordConfirm, password} = this.state;
    let passwordConfirmValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (password !== passwordConfirm) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = 'Passwords do not match'
    }

    this.setState({passwordConfirmValid, errorMsg}, this.validateForm);
  }

  render() {
    return (
        <div className="mt5">
        
        <form action="" className="center  mw7-ns br3 hidden ba b--black-10 mv4 tc">
          <div className=" tc pa3 bt b--black-10">
            <label for="username" className="db fw6 lh-copy f6">Username</label>
            <ValidateMessage  valid={this.state.usernameValid} message={this.state.errorMsg.username} />
            <input type="text" id='username' name="username" 
              className="form-field pa2 input-reset ba bg-transparent hover-bg-black hover-white w-30"
            value={this.state.username} onChange={(e) => this.updateUsername(e.target.value)}/>
          </div>

          <div className="form-group">
            <label for="email" className="db fw6 lh-copy f6">Email</label>
            <ValidateMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
            <input type="text" id='email' name="email" 
            className="form-field pa2 input-reset ba bg-transparent hover-bg-black hover-white w-30"
            value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)}/>
          </div>

          <div className="form-group">
            <label for="password" className="db fw6 lh-copy f6">Password</label>
            <ValidateMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
            <input type="text" id='password' name="password" 
            className="form-field pa2 input-reset ba bg-transparent hover-bg-black hover-white w-30"
            value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)}/>
          </div>
          <div className="form-group">
            <label for="confirmPassword" className="db fw6 lh-copy f6">Confirm Password</label>
            <ValidateMessage valid={this.state.passwordConfirmValid} message={this.state.errorMsg.passwordConfirm} />
            <input type="text" id='passwordConfirm' name="passwordConfirm" 
            className="form-field pa2 input-reset ba bg-transparent hover-bg-black hover-white w-30"
            value={this.state.passwordConfirm} onChange={(e) => this.updatePasswordConfirm(e.target.value)}/>
          </div>

          <div className='form-controls db fw6 lh-copy f6 mt4'>
            <button className=" disabled={!this.state.formValid} button b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-10 tc" type='submit '  >Register</button>

          </div>
        </form>

      
     </div>

    );
  }
}

export default Form;