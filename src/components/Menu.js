import React from 'react';
import './Menu.css';
import { useHistory } from "react-router-dom";

const Menu = (props) => {


    let history = useHistory();

    const logout = values => {
            localStorage.removeItem('app-token')
            history.push('/')
    }

    const markPage = () => {
        console.log(props.page)
    }

    return (
    <>
        <div id="menu-container">
            <h1>Naja</h1>
            <nav id="navbar-container">
                <ul id="navbar" >
                    <li id="home">Home</li>
                    <li id="cadastrarProduto">Cadastrar Produto</li>
                    <li id="listarProduto">Listar Produtos</li>
                    <li id="logout" onClick={logout}>Logout</li>
                </ul>
            </nav>
        </div>
    </>
    )
}

export default Menu;