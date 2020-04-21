import React from 'react';
import Menu from '../../components/Menu';
import axios from 'axios';
import './CadastrarProduto.css'
import Done from './img/done.png'
import Error from './img/error.png'

const CadastrarProduto = () => {

    const fileUploadHandler = () => {
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
        axios.post('http://localhost:5555/product', fd, {
            'headers': {
              'Authorization': 'Bearer ' + appToken
            }})
            .then(res => {
                console.log(res);
                if(res.status == 200){
                    if (res.data.err == null){
                        document.getElementById("form").style.display = "none";
                        document.getElementById("produtoCriado").style.display = "block";
                    }else{
                        document.getElementById("form").style.display = "none";
                        document.getElementById("erroCriando").style.display = "block";
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
                <label for="file" class="form-element" id="imgLabel">Imagem do Produto</label>
                <input type="file" id="file" class="form-element"/>

                <input type="text" name ="name" id="name" class="form-element" placeholder="Nome do Produto"/>
                <span id="labelCategoria">Categoria</span>
                <select id="categoria">
                    <option value="tv">TVs</option>
                    <option value="edo">Eletrodomésticos</option>
                    <option value="vga">Videogames</option>
                    <option value="cel">Celulares</option>
                </select>

                <input type="text" name ="amount" id="amount" class="form-element" placeholder="Quantidade em Estoque"/>

                <input type="text" name ="value" id="value" class="form-element" placeholder="Valor do Produto"/>
                <button onClick={fileUploadHandler} class="form-element" id="btn">Upload</button>
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