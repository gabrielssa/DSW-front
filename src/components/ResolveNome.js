import React from 'react'

const ResolveNome = (nome) =>{
    if (nome === 'tv'){
        return 'TVs';
    } else if (nome === 'edo'){
        return 'Eletrodomésticos';
    }else if (nome === 'vga'){
        return 'Video Games';
    }else if(nome === 'cel'){
        return 'Celulares';
    }
}

export default ResolveNome;