import './App.css'
import { useEffect, useState } from 'react'
import ItemLista from './components/ItemLista';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});


function AppPWA() {
    const [lista, setLista] = useState(JSON.parse(localStorage.getItem("lista") || "[]") || []);

    useEffect(() => {
        localStorage.setItem("lista", JSON.stringify(lista))
    }, [lista]) 
  
    const [nomeLista, setNomeLista] = useState("");
    const [quantidadeLista, setQuantidadeLista] = useState(0);
  
    const generateText = async () => {

        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: nomeLista }],
          model: 'gpt-3.5-turbo',
        });

        console.log(chatCompletion)
        setNomeLista(completion.choices[0].message);
        setQuantidadeLista(1);
        adicionarNaLista()
  
    };

    const handleNomeChange = (event) => {
      setNomeLista(event.target.value)
    }
  
    const handleQuantidadeChange = (event) => {
      setQuantidadeLista(event.target.value)
    }
  
    const removerDaLista = (index) => {
      let copiaLista = lista
      copiaLista.splice(index, 1)
      setLista([...copiaLista])
    }
  
    const adicionarNaLista = () => {
      if (nomeLista.length > 0) {
        if (quantidadeLista <= 0 ) {
          return alert("A quantidade precisa ser maior que zero!")
        }
    
        let objLista = {
          nome: nomeLista,
          quantidade: quantidadeLista
        }
  
        setLista([...lista, objLista])
  
      }else {
        alert("O nome é muito curto!")
      }
    } 
  
    return (
      <>
        <div>
          <h1> Minha lista com PWA</h1>
  
          <div className="divDivInputs">
            <div className='divInputs'>
            <div className='divPInput'> <p>Nome: </p> <input type="text" onChange={handleNomeChange}></input></div>
              <div className='divPInput'> <p>Quantidade: </p> <input type="number" onChange={handleQuantidadeChange}></input></div>
            </div>
  
              <button onClick={adicionarNaLista}>
                Adicionar na lista
            </button>    

            <button onClick={generateText}>
                GPT
            </button>    
          </div>
  
          <div className='carregarItemsDiv'>
            {
              lista.map((value, index) => {
                return <ItemLista key={index} quantidade={value.quantidade} nome={value.nome} index={index} removerDaLista={removerDaLista} />
              })
            }
          </div>
  
  
        </div>
      </>
    )
}

export default AppPWA;