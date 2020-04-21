import React from 'react';
import { useHistory } from "react-router-dom";

import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import './login.css';

const Login = () => {
    let history = useHistory();

    const handleSubmit = values => {
        axios.post('http://localhost:5555/login', values)
            .then(resp => {
                const { data } = resp
                if ( data ){
                    localStorage.setItem('app-token', data.token)
                    history.push('/home')
                }
            });
    }
    
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(2).required()
    })

    return (
        <>
        <div id="login-container">
        <h1>Login</h1>
        <p>Preencha os campos para logar</p>

        <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
            <Form className="Login">
                <div className="Login-Group">
                    <Field
                        name="email"
                        className="Login-Field"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="email" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>

                <div className="Login-Group">
                    <Field
                        name="password"
                        className="Login-Field"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="password" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>


                <button className="Login-Btn" type="submit">Login</button>
            </Form>
        </Formik>

        </div>
        </>
    )
}

export default Login;