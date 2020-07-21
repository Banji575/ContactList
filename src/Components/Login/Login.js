import React, { Component } from 'react';
import Auth from '../Auth/Auth';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Login.scss';

class Login extends Component {
    constructor(){
        super()
        this.Auth = new Auth();
    }

    state = {
        isFormValid: false,
        inputs: {
            username: {
                value: '',
                type: 'text',
                label: 'Username',
                errorMessage: 'Enter username',
                valid: false,
                touched: false,
                validation:{
                    required: true
                }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Enter password',
                    valid: false,
                    touched: false,
                    validation:{
                        required: true
                    }
                }
            }
        }

    validateInput(value, validation){
        if(!validation){
            return true
        }
        let isValid = true;
        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        return isValid
    }

    renderInput = () => {
        return Object.keys(this.state.inputs).map((inputName,i)=>{
            const input = this.state.inputs[inputName]
            return(
                <Input 
                    key = {inputName + i}
                    type = {input.type}
                    label = {input.label}
                    errorMessage = {input.errorMessage}
                    value = {input.value}
                    valid = {input.valid}
                    touched = {input.touched}
                    shoudValidate = {!!input.validation}
                    onChange = {evt=>this.onChangeHandler(evt, inputName)}
                />
            )
        })
    }
    onChangeHandler = (evt, inputName) => {
       const inputs = {...this.state.inputs}
       const input = {...this.state.inputs[inputName]}
       input.value = evt.target.value
       input.touched = true
       input.valid = this.validateInput(input.value, input.validation)
       inputs[inputName] = input

        let isFormValid = true;

        Object.keys(inputs).forEach(name=>{
            isFormValid =  inputs[name].valid && isFormValid    
        })

       this.setState({
           inputs,
           isFormValid
       })

    }
    handleFormSubmit = (e) =>{
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        {this.renderInput()}
                        <Button
                        onClick={this.handleFormSubmit}
                        type = 'submit'
                        disabled = {!this.state.isFormValid}
                        >Sign in</Button>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;