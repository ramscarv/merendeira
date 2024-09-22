'use client'
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Ingrediente {
    nomeIngrediente: string;
    quantidade: string;
}

interface Refeicao {
    nomeRefeicao: string;
    descricaoPreparo: string;
    ingredientes: Ingrediente[];
}

const useCadastrarRefeicaoNutriController = () => {
    const [loading, setLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [refeicao, setRefeicao] = useState<Refeicao>({
        nomeRefeicao: "",
        descricaoPreparo: "",
        ingredientes: []
    });

    const [ingrediente, setIngrediente] = useState<Ingrediente[]>([]);

    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRefeicao({ ...refeicao, [name]: value })
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRefeicao({ ...refeicao, [name]: value })
        console.log(handleSelectChange);
        
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newIngredientes = [...ingrediente];
        newIngredientes[index] = { ...newIngredientes[index], [name]: value };
    
        setIngrediente(newIngredientes);
    }
    
    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newIngredientes = [...ingrediente];
        newIngredientes[index] = { ...newIngredientes[index], [name]: parseInt(value, 10) };
    
        setIngrediente(newIngredientes);
    }

    const handleAddIngredientes = () => {
        const newIngrediente: Ingrediente = {
            nomeIngrediente: "",
            quantidade: ""
        }

        setIngrediente([...ingrediente, newIngrediente]);
    }

    const handleCancelarIngrediente = (index: number) => {
        const newIngredientes = [...ingrediente];
        newIngredientes.splice(index, 1);
        setIngrediente(newIngredientes);
      };

      useEffect(() => {
        const atLeastOneIngredient = ingrediente.length > 0;
        const allIngredientsValid = ingrediente.every(item => {
          const { nomeIngrediente, quantidade } = item;
          return nomeIngrediente && quantidade;
        });
        setFormValid(atLeastOneIngredient && allIngredientsValid);
      }, [ingrediente]);

      const handleSubmit = async () => {
        try {

            const dadosParaEnviar = {
                ...refeicao,
                ingredientes: ingrediente
            };
    
            console.log("Dados a serem enviados:", dadosParaEnviar)

            setLoading(true);
            
            const response = await axios.post("/api/refeicoes/nutri/register", dadosParaEnviar);            
            alert("Refeição cadastrada com sucesso");
            window.location.reload();
        } catch (error) {
            console.error('Cadastro falhou:', error);
            alert('Cadastro falhou.');
        } finally {
            setLoading(false);
        }        
    };
    


    return {
        refeicao,
        ingrediente,
        formValid,
        setFormValid,
        loading,
        handleInputChange,
        handleSelectChange,
        handleAddIngredientes, 
        handleCancelarIngrediente,
        handleTextChange,
        handleNumberChange,
        handleSubmit
    };
};

export default useCadastrarRefeicaoNutriController;