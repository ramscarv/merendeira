import { useState, useEffect } from "react";
import axios from "axios";

interface Refeicao {
    _id: string;
    nome: string;
    turno: string;
    quantidadeAlunos: number;
    descricao: string;
    ingredientes: Ingrediente[];
    ingredientesAdicionados: Ingrediente[];
    padraoMantido: boolean;
    observacao: string;
    school: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Ingrediente {
    nomeIngrediente: string;
    quantidade: number;
    _id: string;
}

interface RefeicaoEscola {
    school: {
        _id: string;
        nome: string;
    };
    meals: Refeicao[];
}

const useRefeicaoEscolaIdController = () => {
    const [refeicoesEscolas, setRefeicoes] = useState<RefeicaoEscola[]>([]);
    const [refeicao, setRefeicao] = useState<Refeicao[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ingredientesUsados, setIngredientesUsados] = useState<Ingrediente[]>([]);

    const fetchRefeicoes = async () => {
        try {
            const response = await axios.get("/api/escolas/ingredientes-usados");
            const responseData = response.data;
    
            if (!Array.isArray(responseData.data)) {
                console.error("Os dados retornados não contêm uma matriz:", responseData);
                return;
            }
    
            const data: Refeicao[] = responseData.data;
    
            // Criar uma estrutura de RefeicaoEscola para manter a compatibilidade com o estado existente
            const refeicoesEscolas: RefeicaoEscola[] = data.map(refeicao => ({
                school: { _id: refeicao.school, nome: '' }, // Não temos o nome da escola disponível aqui, mas podemos preencher com uma string vazia
                meals: [refeicao]
            }));
    
            // Extrair ingredientes das refeições
            const ingredientesUsados: Ingrediente[] = refeicoesEscolas.flatMap(escola => escola.meals)
                .flatMap(refeicao => refeicao.ingredientes.concat(refeicao.ingredientesAdicionados));
    
            setRefeicoes(refeicoesEscolas);
            setRefeicao(data);
            setIngredientesUsados(ingredientesUsados);
        } catch (error) {
            console.error("Erro ao buscar refeições:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        fetchRefeicoes();
    }, []);

    return { refeicoesEscolas, refeicao, isLoading, ingredientesUsados };
};

export default useRefeicaoEscolaIdController;