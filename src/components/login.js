import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLogin } from '../actions';

class Login extends Component {

    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className='form-control' 
                    type='text'
                    {...field.input}
                />
                <div className='text-help'>{touched ? error : ''}</div>
            </div>
        );
    }

    onSubmit(values){
        this.props.doLogin(values);
    }

    render(){
        console.log('in login render');
        const { handleSubmit } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };
    
        if (this.props.isAuthenticated) {
            console.log('redirecting to ',from);
          return <Redirect to={from} />;
        }

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h3> Login </h3>
                <Field 
                    label='Username'
                    name='username'
                    component={this.renderField} 
                />
                 <Field 
                    label='Password'
                    name='password'
                    component={this.renderField} 
                />
                <button type='submit' className='btn btn-primary'>
                    Login
                </button>
            </form>
        );
    }
}

function validate(values) {
    console.log('inside validation ', values);
    const errors = {};
    if(!values.username){
        errors.username = 'Enter an username!';
    }
    if(!values.password){
        errors.password = 'Enter a valid password!';
    }
    return errors;
}

function mapStateToProps( {user} ){
    console.log('login: in mapStateToProps', user.isAuthenticated);
    return { isAuthenticated: user.isAuthenticated };
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(mapStateToProps, { doLogin } )(Login)
);