import React from 'react';

import { useHistory, Link } from "react-router-dom";
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

import Loading from './img/loading.gif';
import Nuvem from './img/nuvem.png';

import './login.css';

const Login = () => {
    let history = useHistory();

    const handleSubmit = values => {
        updateUI('loading')
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
                updateUI('default')
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

    

    const updateUI = (state) => {
        let loginContainer = document.getElementById("login-container");
        let nuvem = document.getElementById("loading-cloud")
        let loading = document.getElementById("loading-gif")

        if (state === 'loading'){
            loginContainer.style.filter = 'blur(5px)';
            loginContainer.style.filter = 'grayscale(100)';
            nuvem.style.display = 'block'
            loading.style.display = 'block'
        }else if(state ==='default'){
            loginContainer.style.filter = 'blur(0px)';
            loginContainer.style.filter = 'grayscale(0)';
            nuvem.style.display = 'none'
            loading.style.display = 'none'
        }

    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <>
        <div id="login-container">
        <h1>Login</h1>
        <p> Preencha os campos para logar</p>
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
        <div>
            <h2>Ou faça login pelo google</h2>
            <GoogleLogin
                clientId="332676288891-ore1jc8akqhnk1iiji162jhkk2p6sigo.apps.googleusercontent.com"
                buttonText="Login com Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
            <div id="links">
                <p><Link to="/register">Registrar</Link></p>
                <p>Não tem uma conta?</p>
            </div>
        </div>
        <img src={Loading} alt="carregando" class="loading-img" id="loading-gif"/>
        <img src={Nuvem} alt="nuvem" class="loading-img" id="loading-cloud"/>

        </>
    )
}

export default Login;