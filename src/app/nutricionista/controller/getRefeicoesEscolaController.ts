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

const useBuscarRefeicoesEscolasController = () => {
    const [refeicoesEscolas, setRefeicoes] = useState<RefeicaoEscola[]>([]);
    const [refeicao, setRefeicao] = useState<Refeicao[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ingredientesUsados, setIngredientesUsados] = useState<Ingrediente[]>([]);

    const fetchRefeicoes = async () => {
        try {
            const response = await axios.get("/api/ingredientes/usados-refeicoes");
            const responseData = response.data;

            if (!Array.isArray(responseData.data)) {
                console.error("Os dados retornados não contêm uma matriz:", responseData);
                return;
            }

            const data: RefeicaoEscola[] = responseData.data;

            // Agrupar ingredientes por nome e somar quantidades
            const ingredientesUsados = data.flatMap(refeicaoEscola => {
                return refeicaoEscola.meals.flatMap(refeicao => {
                    return refeicao.ingredientes.concat(refeicao.ingredientesAdicionados);
                });
            }).reduce((acc, ingrediente) => {
                const existing = acc.find(item => item.nomeIngrediente === ingrediente.nomeIngrediente);
                if (existing) {
                    existing.quantidade += ingrediente.quantidade;
                } else {
                    acc.push({ ...ingrediente });
                }
                return acc;
            }, [] as Ingrediente[]).sort((a, b) => a.nomeIngrediente.localeCompare(b.nomeIngrediente, 'pt', { sensitivity: 'base' }));

            console.log('ingredientes usados: ', ingredientesUsados);

            setRefeicoes(data);
            setRefeicao(data.flatMap(escola => escola.meals)); // Set the refeicao state
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

export default useBuscarRefeicoesEscolasController;