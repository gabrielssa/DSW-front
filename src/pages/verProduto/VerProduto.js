import React from 'react';
import Menu from '../../components/Menu';
import Api from '../login/Api';
import './VerProduto.css'
import removeProduto from '../../components/RemoveProduto';
import { useHistory, Link} from "react-router-dom";
import Axios from 'axios';
import Voltar from './img/voltar.png'

const VerProduto = (props) => {
    const data = props.location
    let history = useHistory();

    const produto ={
        "qtd":data.amount,
        "category":data.category
    }

    const verifyColor = () =>{
        if (produto.qtd > 0 && produto.qtd < 10){
            document.getElementById("quantidade").style.background = 'rgb(231, 212, 39)';
        } else if (produto.qtd === 0){
            document.getElementById("quantidade").style.background = 'rgba(255, 0, 0, 0.301)';
        }else{
            document.getElementById("quantidade").style.background = '#fdfdfd';
        }
    }

    const upgradeQtdStatus = (status) =>{
        if (status === 'default'){
            document.getElementById("qtdStatus").style.color = "black";
            document.getElementById("qtdText").style.color = "black";

        }else if(status === 'changed'){
            document.getElementById("qtdStatus").innerHTML = "Novo Valor";
            document.getElementById("qtdStatus").style.color = "red";
            document.getElementById("qtdText").style.color = "red";
        }
    }

    const incrementaQtd = () =>{
        console.log(data.produto)
        produto.qtd += 1;
        console.log(produto.qtd)
        upgradeQtdStatus('changed')
        document.getElementById("qtdValor").innerHTML = produto.qtd;
        verifyColor()
    }

    const decrementaQtd = () =>{

        if (!produto.qtd == 0){
            produto.qtd -= 1;
        }

        console.log(produto.qtd)
        upgradeQtdStatus('changed')
        document.getElementById("qtdValor").innerHTML = produto.qtd;
        verifyColor()
    }

    const atualizaQuantidade = () =>{
        let appToken = localStorage.getItem('app-token')
        let idProduto = data._id
        let novaQtd = produto.qtd

        let localData = {
            "_id":idProduto,
            "n": novaQtd
        }


        Axios.put(`https://dsw-backend.herokuapp.com/product/`,localData, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }}).then(res =>{
                upgradeQtdStatus("default")
                console.log(res)
                document.getElementById("feedback").style.display = 'block';

                setTimeout(() => {
                    if (document.getElementById("feedback") !== null){
                        document.getElementById("feedback").style.display = 'none';
                    }
                }, 3000);
            })
    }

    const handleRequest = () => {

        let appToken = localStorage.getItem('app-token')
        console.log("Token " + appToken)
        console.log("Data id: "+data._id)

        Api.get(`https://dsw-backend.herokuapp.com/product/${data._id}`, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }}).then(res =>{
                renderProduct(res.data)
            })
    }

    const remover = (produto, token) =>{
        removeProduto(produto, token, 'ver-produto')
    }

    const renderProduct = (produto) => {
        

        console.log(produto)

        document.getElementById("voltaPListar").addEventListener("click", () =>{
            history.push({
                pathname: '/listar-produto',
                category: produto.category
    
              })
        })


        let img = document.createElement("div");
        img.style.backgroundImage = `url(${produto.thumbnail_url}) `;
        img.id = "produto-img";


        document.getElementById("produto").appendChild(img)
        document.getElementById("nome").innerHTML = produto.name;
        document.getElementById("precoValor").innerHTML = produto.value.toFixed(2);
        document.getElementById("remover").addEventListener("click", () =>{
            let appToken = localStorage.getItem('app-token')
            remover(produto, appToken)
        })

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

        if (produto.amount > 0 && produto.amount < 10){
            document.getElementById("quantidade").style.background = 'rgba(255, 255, 0, 0.233)';
        } else if (produto.amount === 0){
            document.getElementById("quantidade").style.background = 'rgba(255, 0, 0, 0.301)';
        }

        document.getElementById("produto").style.display = 'grid';
        document.getElementById("carregando").style.display = "none";

    }

    document.onload = handleRequest();

    return (
    <>  
        <Menu page="produto"/>
        <div id="produto">
            <h2 id="nome">Produto Tal</h2>
            
            <div id="quantidade" class="propriedade">
                <h3 id="qtdStatus">Em Estoque</h3>
                <p id="qtdText"><span id="qtdValor">65</span> Produtos</p>
            </div>
            
            <div id="preco">
                <p>R$ <span id="precoValor">87</span> Reais</p>
            </div>

            <div id="categoria" class="propriedade">
                <h3>Categoria</h3>
                <p id="categoriaValor">Eletrodomésticos</p>
            </div>

            <div id="remover">
                <span>Excluir Produto</span>
            </div>

            <div id="atualizar">
                <button id="incQtd"  onClick={incrementaQtd}><p><i class="arrow up"></i></p></button>
                <button id="decQtd"  onClick={decrementaQtd}><p><i class="arrow down"></i></p></button>
                <button id="atuQtd"  onClick={atualizaQuantidade}>Atualizar Quantidade</button>
            </div>
            <p id="feedback">Quantidade Atualizada</p>

            <div id="voltar">
                <img src={Voltar}></img>
                <span id="voltaPListar">Voltar</span>
            </div>


        </div>
        <div id="produtoDeletado">
            <h2>Este produto foi deletado</h2>
            <p><Link to="/listar-produto">Voltar</Link></p>
        </div>
        <div id="carregando">
                <img src="https://miro.medium.com/max/656/1*LruTBJfGS0SDPrR9icfrMw.gif" alt="carregando"></img>
        </div>
        
    </>
    );
}

export default VerProduto;