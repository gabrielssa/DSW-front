import React from 'react';
import Api from '../pages/login/Api';

const removeProduto = (produto, appToken, local) => {
    
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
            `https://dsw-backend.herokuapp.com/product/${produto._id}`,
            config,
          ).then(res =>{
              console.log(res);
              alert('Item Apagado');

              if(local === 'listar-produto'){
                let child = document.getElementById(produto.name)
                let parent = document.getElementById("produtos")
                parent.removeChild(child)
              }else{
                  document.getElementById("produto").style.display = 'none';
                  document.getElementById("produtoDeletado").style.display = 'block';
              }
  
          })
    } else {
        alert("Remoção de Item Cancelada");
    } 

}

export default removeProduto;