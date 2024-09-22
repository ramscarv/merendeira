import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Ingrediente {
    _id?: string;
    nomeIngrediente: string;
    quantidade: number;
}

interface IngredienteAdicionado extends Ingrediente {}

interface Refeicao {
    nomeRefeicao: string;
    turnoRefeicao: string;
    quantidadeAlunos: number;
    descricaoPreparo: string;
    padraoMantido: boolean;
    observacao: string;
    ingredientes: Ingrediente[];
    ingredientesAdicionados: IngredienteAdicionado[];
}

const useCadastrarRefeicaoEscolaController = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (refeicao: Refeicao) => {
        try {
            setLoading(true);
    
            // Verifica se há observação escrita
            const observacaoPresente = refeicao.observacao.trim().length > 0;
    
            // Cria um objeto com os dados da refeição para enviar
            const dadosParaEnviar = {
                nomeRefeicao: refeicao.nomeRefeicao,
                turnoRefeicao: refeicao.turnoRefeicao,
                quantidadeAlunos: refeicao.quantidadeAlunos,
                descricaoPreparo: refeicao.descricaoPreparo,
                padraoMantido: !observacaoPresente, // Define refeicaoPadrao como false se houver observação presente
                observacao: refeicao.observacao,
                ingredientes: refeicao.ingredientes,
                ingredientesAdicionados: refeicao.ingredientesAdicionados.filter(ingrediente => ingrediente.nomeIngrediente && ingrediente.quantidade),
            };
    
            console.log("Dados a serem enviados:", dadosParaEnviar);
    
            const response = await axios.post("/api/refeicoes/escolas/register", dadosParaEnviar);
            Swal.fire({
                icon: "success",
                title: "Cadastrado com sucesso!",
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Cadastro falhou:', error);
            alert('Cadastro falhou.');
        } finally {
            setLoading(false);
        }
    };
    

    return {
        handleSubmit,
        loading,
    };
};

export default useCadastrarRefeicaoEscolaController;