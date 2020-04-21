import React from 'react';
import Menu from '../../components/Menu';
import './ListarProduto.css'
import Api from '../login/Api';
import axios from 'axios';

const ListarProduto = () => {

    const removeProduct = function(produto){
        alert('Apagando produto ' + produto.name)
        appToken = localStorage.getItem('app-token')
        
        const config = {
            'headers': {
              'Authorization': `Bearer ${appToken}`
            }}
        
        const bodyParameters = {
           "_id": ""
        };

        bodyParameters._id = produto._id;

        console.log(bodyParameters);
        console.log(config);
        
        Api.delete( 
          'http://localhost:5555/product',
          config,
        ).then(console.log).catch(console.log);

    }

    const listaTvs = () =>{
        let argumento = {
            "categoria":"tv",
            "nome":"TVs"
        }
        handleRequest(argumento)
    }

    const listaEdo = () =>{
        let argumento = {
            "categoria":"edo",
            "nome":"Eletrodomésticos"
        }
        handleRequest(argumento)
    }

    const listaVga = () =>{
        let argumento = {
            "categoria":"vga",
            "nome":"Video Games"
        }
        handleRequest(argumento)
    }

    const listaCel = () =>{
        let argumento = {
            "categoria":"cel",
            "nome":"Celulares"
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

          if (test.length == 0){
              var result = document.createElement("p")
              var resultText = document.createTextNode(`Nenhum produto encontrado na categoria de ${values.nome}`);
              result.appendChild(resultText);
              document.getElementById("produtos").appendChild(result)
              

          }
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

              var img = document.createElement('img'); 
              img.src = 'https://i.ibb.co/ncvjf8H/apagar.png';
              img.id = "img-apagar";
        
              img.addEventListener("click", () => {
                    removeProduct(test[i])
              })
                

              produto.appendChild(nameP); 
              produto.appendChild(quantidadeP);
              produto.appendChild(img);
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
                    <li onClick={listaEdo}>Eletrodomésticos</li>
                    <li onClick={listaVga}>Videogames</li>
                    <li onClick={listaCel}>Celulares</li>
                </ul>
            </aside>
            </div>
            <div id="produtos">
                <p>Selecione uma categoria</p>
            </div>
        </div>
        </>
    )
}

export default ListarProduto;