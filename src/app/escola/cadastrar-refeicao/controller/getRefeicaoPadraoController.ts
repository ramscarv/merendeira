import { useState, useEffect, ChangeEvent} from "react";
import axios from "axios";

interface Ingrediente {
    _id: string;
    nomeIngrediente: string;
    quantidade: number;
}

interface RefeicaoPadrao {
    _id: string;
    nome: string;
    turno:string;
    descricao: string;
    ingredientes: Ingrediente[];
    
}

const useGetRefeicaoPadraController = () => {
    const [refeicaoPadrao, setRefeicaoPadrao] = useState<RefeicaoPadrao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRefeicao, setSelectedRefeicao] = useState<RefeicaoPadrao | null>(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [quantidadeAlunos, setQuantidadeAlunos] = useState('');

    const handleInputChange = (search: string) => {
        setSearchTerm(search);
    };

    const fetchRefeicaoPadrao = async () => {
        try {
            const response = await axios.get("/api/refeicoes/escolas/get");
            const data = response.data;
            setRefeicaoPadrao(data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar refeições:", error);
            setError("Erro ao buscar refeições");
            setLoading(false);
        }
    };

    const handleSelectChange = (selectedId: string) => {
        const selected = refeicaoPadrao.find((refeicao: RefeicaoPadrao) => refeicao._id === selectedId);
        setSelectedRefeicao(selected || null);
    };

    const handleQuantidadeAlunosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setQuantidadeAlunos(value);
    };



    useEffect(() => {
        fetchRefeicaoPadrao();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setSelectedRefeicao(null);
        }
    }, [searchTerm]);

    return {
        refeicaoPadrao,
        quantidadeAlunos,
        handleQuantidadeAlunosChange,
        loading,
        error,
        selectedRefeicao,
        setSelectedRefeicao, // Adicione este export para permitir que o componente principal atualize o estado
        searchTerm,
        handleInputChange,
        handleSelectChange,
        
    };
};

export default useGetRefeicaoPadraController;