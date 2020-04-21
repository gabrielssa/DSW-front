import React from 'react';
import Menu from '../../components/Menu';

const CadastrarProduto = () => {
    return (
        <>
            <Menu page="cadastrarProduto"/>
            <h1>CadastrarProduto</h1>

            <form>
            <input type="file"></input>
            </form>
        </>
    )
}

export default CadastrarProduto;