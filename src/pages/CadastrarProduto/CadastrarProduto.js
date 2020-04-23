import React from 'react';
import Menu from '../../components/Menu';
import axios from 'axios';
import './CadastrarProduto.css'
import Done from './img/done.png'
import Error from './img/error.png'

const CadastrarProduto = () => {

    const fileUploadHandler = () => {
        document.getElementById("form").style.display = "none";
        document.getElementById("carregando").style.display = "block";

        let target = document.getElementById("file")
         console.log(target.files[0])
        let name = document.getElementById("name").value
        let category = document.getElementById("categoria").value;
        let amount = document.getElementById("amount").value;
        let value = document.getElementById("value").value;

        const fd = new FormData();

        if (document.getElementById("file").files.length > 0){
            fd.append('file', target.files[0])
        }

        fd.append('name', name)
        fd.append('category', category)
        fd.append('amount', amount)
        fd.append('value', value)




        let appToken = localStorage.getItem('app-token')
        axios.post('http://dsw-backend.herokuapp.com/product', fd, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }})
            .then(res => {
                console.log(res);
                if(res.status == 200){
                    if (res.data.err == null){
                        document.getElementById("form").style.display = "none";
                        document.getElementById("produtoCriado").style.display = "block";
                        document.getElementById("carregando").style.display = "none";
                    }else{
                        document.getElementById("form").style.display = "none";
                        document.getElementById("erroCriando").style.display = "block";
                        document.getElementById("carregando").style.display = "none";
                    }
                }
            }).catch(function(e) {
                document.getElementById("form").style.display = "none";
                document.getElementById("erroCriando").style.display = "block";
                console.log(e);
            })
    }

    return (
        <>
        
            <Menu page="cadastrarProduto"/>
            <div id="form">
                <label for="file" id="imgLabel">
                    Adicione uma foto ao produto
                </label>
                
                <input type="file" id="file" accept="image/*"/>

                <input type="text" name ="name" id="name" class="form-element" placeholder="Nome do Produto"/>
                <span id="labelCategoria">Categoria</span>
                <select id="categoria">
                    <option value="tv">TVs</option>
                    <option value="edo">Eletrodomésticos</option>
                    <option value="vga">Videogames</option>
                    <option value="cel">Celulares</option>
                </select>

                <input type="text" name ="amount" id="amount" class="form-element" placeholder="Quantidade em Estoque"/>

                <input type="text" name ="value" id="value" class="form-element" placeholder="Valor do Produto em R$ Ex: 44.56"/>
                <button onClick={fileUploadHandler} class="form-element" id="btn">Upload</button>
            </div>

            <div id="carregando">
                <img src="https://miro.medium.com/max/656/1*LruTBJfGS0SDPrR9icfrMw.gif" alt="carregando"></img>
            </div>

            <div id="produtoCriado">
                <p>Produto Criado Com Sucesso</p>
                <img src={Done}></img>
            </div>

            <div id="erroCriando">
                <p>Erro na criação do Produto</p>
                <img src={Error}></img>
            </div>
        </>
    )
}

export default CadastrarProduto;