import React from 'react';
import './Menu.css';
import { useHistory } from "react-router-dom";

const Menu = (props) => {


    let history = useHistory();

    const logout = values => {
            localStorage.removeItem('app-token')
            history.push('/')
    }

    window.onload = function(){
        document.getElementById(props.page).style.background = '#41b3a3';
        document.getElementById(props.page).style.color = '#fdfdfd';
    }

    return (
    <>
        <div id="menu-container">
            <h1>Naja</h1>
            <nav id="navbar-container">
                <ul id="navbar" >
                <a href="/home"><li id="home">Home</li></a>
                <a href="/cadastrar-produto"><li id="cadastrarProduto">Cadastrar Produto</li></a>
                <a href="/listar-produto"><li id="listarProduto">Listar Produtos</li></a>
                    <li id="logout" onClick={logout}>Logout</li>
                </ul>
            </nav>
        </div>
    </>
    )
}

export default Menu;