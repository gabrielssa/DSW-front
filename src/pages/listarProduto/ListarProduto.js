import React from 'react';
import Menu from '../../components/Menu';
import './ListarProduto.css'
import Api from '../login/Api';

const ListarProduto = () => {

    const listaTvs = () =>{
        let argumento = {
            "categoria":"tv"
        }
        handleRequest(argumento)
    }

    let appToken;
    const handleRequest = values => {
        let category = values.categoria;
        appToken = localStorage.getItem('app-token')
        Api.get(`http://localhost:5555/product?category=${category}&order=asc`, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }})
        .then(res => {
          const test = res.data;
          document.getElementById("produtos").innerHTML = '';
          for (let i = 0; i < test.length; i++){
              var produto = document.createElement("div");
              produto.className = "produto";

              var nameP = document.createElement("span");
              nameP.className = "nomeProduto"
              var namePText = document.createTextNode(test[i].name); 
              nameP.appendChild(namePText);

              var quantidadeP = document.createElement("span");
              quantidadeP.className = "qtdProduto";
              var quantidadePText = document.createTextNode("Quantidade Disponível: "+test[i].amount)
              quantidadeP.appendChild(quantidadePText);

              produto.appendChild(nameP); 
              produto.appendChild(quantidadeP);
              document.getElementById("produtos").appendChild(produto)
          }
        })
    }

    return (
        <><div id="principal">
            <div id="menu">
                <Menu page="listarProduto"/>
            </div>
            <div id="sidebar">
            <aside>
                <h1>Categorias</h1>
                <ul>
                    <li onClick={listaTvs}>TVs</li>
                    <li>Eletrodomésticos</li>
                    <li>Videogames</li>
                    <li>Celulares</li>
                </ul>
            </aside>
            </div>
            <div id="produtos">
            </div>
        </div>
        </>
    )
}

export default ListarProduto;