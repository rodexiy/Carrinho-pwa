import { Component } from 'react';
import './ItemLista.css'

function ItemLista(props){

    const handleClick = () => {
        props.removerDaLista(props.index)
    }
    return (
        <div className='itemListaDiv'>
            <p className="nomeItemLista">{props.nome}</p>
            <p>{props.quantidade}</p>
            <img className='lixeira' src='./lixeira.png' onClick={handleClick}/>
        </div>
    )
}

export default ItemLista;