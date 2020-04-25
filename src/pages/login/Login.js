import React, { useState } from 'react';

import { useHistory} from "react-router-dom";
import * as yup from 'yup';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

import Loading from './img/loading.gif';
import Nuvem from './img/nuvem.png';

import './login.css';

const Login = () => {
    let history = useHistory();

    const [name, SetName] = useState("");

    const [id, SetId] = useState("");

    const responseGoogle = response => {

        if (response.profileObj){
            SetName(response.profileObj.name);
            SetId(response.profileObj.googleId);
        }

        console.log("Profile obj: "+response.profileObj.name)

        const data = {
            "name": name,
            "googleId": id
        }

        updateUI('loading')
        
        
        axios.post('https://dsw-backend.herokuapp.com/login', data)
            .then(resp => {
                console.log(resp)
                const { data } = resp
                if ( data ){
                    localStorage.setItem('app-token', data.token)
                    localStorage.setItem('app-username', data.user.name)
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

    return (
        <>
        <div id="login-container">
        <h1>Login</h1>
        <p>Entre em sua conta Google para logar, o cadastro é feito automaticamente</p>
            <div id="googleLogin">
                <GoogleLogin
                    clientId="332676288891-ore1jc8akqhnk1iiji162jhkk2p6sigo.apps.googleusercontent.com"
                    buttonText="Login com Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
        <img src={Loading} alt="carregando" class="loading-img" id="loading-gif"/>
        <img src={Nuvem} alt="nuvem" class="loading-img" id="loading-cloud"/>

        </>
    )
}

export default Login;