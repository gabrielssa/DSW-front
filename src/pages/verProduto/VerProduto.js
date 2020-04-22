import React from 'react';
import Menu from '../../components/Menu';
import Api from '../login/Api';
import './VerProduto.css'

const VerProduto = (props) => {
    const data = props.location

    const produto ={
        "qtd":data.amount
    }

    const incrementaQtd = () =>{
        console.log(data.produto)
        produto.qtd += 1;
        console.log(produto.qtd)
        document.getElementById("qtdValor").innerHTML = produto.qtd;
    }

    const decrementaQtd = () =>{
        produto.qtd -= 1;
        console.log(produto.qtd)
        document.getElementById("qtdValor").innerHTML = produto.qtd;
    }

    const handleRequest = () => {

        let appToken = localStorage.getItem('app-token')
        console.log("Token " + appToken)
        console.log("Data id: "+data._id)

        Api.get(`http://dsw-backend.herokuapp.com/product/${data._id}`, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }}).then(res =>{
                renderProduct(res.data)
            })
    }

    const renderProduct = (produto) => {
        

        console.log(produto)
        
        let img = document.createElement("img");
        img.src = produto.thumbnail_url
        img.id = "produto-img"
        document.getElementById("produto").appendChild(img)
        document.getElementById("nome").innerHTML = produto.name;
        document.getElementById("precoValor").innerHTML = produto.value;

        let categoria = document.getElementById("categoriaValor");

        if (produto.category === "tv"){
            categoria.innerHTML = "TVs";
        }else if (produto.category === "edo"){
            categoria.innerHTML = "Eletrodomésticos";
        }else if (produto.category === "vga"){
            categoria.innerHTML = "Video Games";
        }else if (produto.category === "cel"){
            categoria.innerHTML = "Celulares";
        }

        document.getElementById("qtdValor").innerHTML = produto.amount;



    }

    document.onload = handleRequest();

    return (
    <>  
        <Menu page="produto"/>
        <div id="produto">
            <h2 id="nome">Produto Tal</h2>
            
            <div id="quantidade" class="propriedade">
                <h3>Em Estoque</h3>
                <p><span id="qtdValor">65</span> Produtos</p>
            </div>
            
            <div id="preco">
                <p>R$ <span id="precoValor">87</span> Reais</p>
            </div>

            <div id="categoria" class="propriedade">
                <h3>Categoria</h3>
                <p id="categoriaValor">Eletrodomésticos</p>
            </div>

            <div id="remover">
                <span>Apagar Produto</span>
            </div>

            <div id="atualizar">
                <button id="incQtd" class="hoverGreen" onClick={incrementaQtd}><p><i class="arrow up"></i></p></button>
                <button id="decQtd" class="hoverGreen" onClick={decrementaQtd}><p><i class="arrow down"></i></p></button>
                <button id="atuQtd" class="hoverGreen">Atualizar Quantidade</button>
            </div>

        </div>
    </>
    );
}

export default VerProduto;