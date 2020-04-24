import React from 'react';
import { useHistory, Link } from "react-router-dom";

import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import './login.css';

const Login = () => {
    let history = useHistory();

    const handleSubmit = values => {
        document.getElementById("feedback").innerHTML = 'Logando'
        axios.post('https://dsw-backend.herokuapp.com/login', values)
            .then(resp => {
                console.log(resp)
                const { data } = resp
                if ( data ){
                    localStorage.setItem('app-token', data.token)
                    history.push('/listar-produto')
                }
            }).catch(function(motivo) {
                console.log("erro")
                alert('login ou senha incorretos')
                /*
                document.getElementById("feedback").innerHTML = 'Senha ou Login incorretos'
                setTimeout(() => {
                    document.getElementById("feedback").innerHTML = '';
                }, 3000);*/
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
        <p id="feedback"></p>

        <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
            <Form className="Login">
                <div className="Login-Group">
                    <Field
                        name="email"
                        className="Login-Field"
                        placeholder="Email"
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
                        placeholder="Senha"
                        type="password"
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
        
            <div id="links">
                <p><Link to="/register">Registrar</Link></p>
                <p>Não tem uma conta?</p>
            </div>
        </div>
        </>
    )
}

export default Login;