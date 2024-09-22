import { useState, ChangeEvent } from "react";
import useGetRefeicaoPadraController from './getRefeicaoPadraoController';

interface Ingrediente {
    nomeIngrediente: string;
    quantidade: number;
}

interface RefeicaoPadrao {
    _id: string;
    nome: string;
    descricao: string;
    ingredientes: Ingrediente[];
}

const useUpdateRefeicaoController = () => {
    const [ingredientesAdicionados, setIngredientesAdicionados] = useState<Ingrediente[]>([]); // Passo 1

    const { selectedRefeicao, setSelectedRefeicao } = useGetRefeicaoPadraController();

    // Função para adicionar um novo ingrediente ao estado de ingredientes adicionados
    const adicionarNovoIngrediente = () => {
        const novoIngrediente: Ingrediente = {nomeIngrediente: '', quantidade: 0 }; // Corrigido tipo
        setIngredientesAdicionados([...ingredientesAdicionados, novoIngrediente]);
    };

    

    const removerIngredienteAdicionado = (index: number, isEditing: boolean) => {
    
        if (isEditing && selectedRefeicao !== null) { // Ajuste aqui, verificando se isEditing é verdadeiro
            const novosIngredientesCadastrados = [...selectedRefeicao.ingredientes];
            novosIngredientesCadastrados.splice(index, 1);
    
            console.log('Novos ingredientes cadastrados:', novosIngredientesCadastrados);
    
            setSelectedRefeicao({
                ...selectedRefeicao,
                ingredientes: novosIngredientesCadastrados
            });
    
            console.log('selectedRefeicao após remoção:', selectedRefeicao);
        } else {
            const novosIngredientes = [...ingredientesAdicionados];
            novosIngredientes.splice(index, 1);
            setIngredientesAdicionados(novosIngredientes);
    
            console.log('Ingredientes adicionados após remoção:', ingredientesAdicionados);
        }
    };

    
    
    

    return {
        ingredientesAdicionados,
        setIngredientesAdicionados,
        adicionarNovoIngrediente,
        removerIngredienteAdicionado,
    };
};

export default useUpdateRefeicaoController;
