import React from 'react';

import { useHistory, Link } from "react-router-dom";

import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import '../login/login.css';

const Register = () => {
    let history = useHistory();

    const handleSubmit = values => {
        axios.post('http://dsw-backend.herokuapp.com/register', values)
            .then(resp => {
                const { data } = resp
                if ( data ){
                    history.push('/')
                }
            });
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    return (
        <>
        <div id="login-container">
        <h1>Register</h1>
        <p>Preencha os campos para se cadastrar</p>

        <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
            <Form className="Login">
                <div className="Login-Group">
                    <Field
                        name="name"
                        className="Login-Field"
                        placeholder="primeiro nome"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="name" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>

                <div className="Login-Group">
                    <Field
                        name="lastname"
                        className="Login-Field"
                        placeholder="último nome"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="lastname" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>

                <div className="Login-Group">
                    <Field
                        name="email"
                        className="Login-Field"
                        placeholder="email"
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
                        placeholder="senha"
                        type="password"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="password" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>


                <button className="Login-Btn" type="submit">Registrar</button>
            </Form>
        </Formik>
            <div id="links">
                <p>Já tem uma conta?</p>
                <p><Link to="/">Login</Link></p>
            </div>
        </div>
        </>
    )
}

export default Register;