import React from 'react';
import './Menu.css';
import { useHistory, Link } from "react-router-dom";

const Menu = (props) => {
    const data = props.location

    const username = localStorage.getItem('app-username')

    let history = useHistory();

    const logout = values => {
            localStorage.removeItem('app-token')
            localStorage.removeItem('app-username')
            history.push('/')
    }
    

    const historyPush = (pageb) => {
        history.push({
            pathname: `/${pageb}`,
          })
    }
    

    return (
    <>
        <div id="menu-container">
            <h1>Naja</h1>

            
            <nav id="navbar-container" class={props.page+'Menu'}>
                <ul id="navbar">
                
                <li id="cadastrar-produto" onClick={
                    () => {
                    historyPush('cadastrar-produto')
                    }
                }>Cadastrar Produto</li>

                
                <li id="listar-produto" onClick={
                    () => {
                    historyPush('listar-produto')
                    }
                }>Listar Produtos</li>
                    <li id="logout" onClick={logout}>Logout</li>
                </ul>

                <p id="welcome">Bem vindo {username}</p>
            </nav>
        </div>
    </>
    )
}

export default Menu;