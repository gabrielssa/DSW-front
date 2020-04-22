import React from 'react';
import Menu from '../../components/Menu';
import './ListarProduto.css'
import Api from '../login/Api';
import { useHistory } from "react-router-dom";

const ListarProduto = () => {

    let history = useHistory();
    

    const removeProduct = function(produto){
        appToken = localStorage.getItem('app-token')
        
        const config = {
            'headers': {
              'Authorization': `Bearer ${appToken}`
            }}
        
        const bodyParameters = {
           "_id": ""
        };

        bodyParameters._id = produto._id;
        
        var r = window.confirm("Você realmente deseja remover este item?");
        if (r == true) {
            Api.delete( 
                `http://dsw-backend.herokuapp.com/product/${produto._id}`,
                config,
              ).then(res =>{
                  console.log(res);
                  alert('Item Apagado');
                  if (produto.category === "tv"){
                      listaTvs();
                  }else if (produto.category === "edo"){
                      listaEdo();
                  }else if (produto.category === "vga"){
                      listaVga();
                  }else if (produto.category === "cel"){
                      listaCel();
                  }
      
              })
        } else {
            alert("Remoção de Item Cancelada");
        } 


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
        Api.get(`http://dsw-backend.herokuapp.com/product?category=${category}&order=asc`, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }})
        .then(res => {
          const test = res.data;
          document.getElementById("produtos").innerHTML = '';

          if (test.length === 0){
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

              if (test[i].amount < 10 && test[i].amount > 0){
                  produto.style.background = "rgb(192, 173, 1)";
                  produto.style.color = "#fdfdfd";
              }else if (test[i].amount === 0){
                  produto.style.background = "red";
                  produto.style.color = "#fdfdfd";
              }

              quantidadeP.addEventListener("click", () => {
                history.push({
                    pathname: '/ver-produto',
                    _id: test[i]._id,
                    amount: test[i].amount

                  })

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