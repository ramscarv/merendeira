import { useState, useEffect } from "react";
import axios from "axios";
import useBuscarNomesIngredientesController from "./getIngredientesController";
import Swal from "sweetalert2";
// Definição da interface para representar a estrutura de um ingrediente
interface Ingrediente {
  genero: string;
  quantidadeRecebida: string;
  validade: string;
  classificacao: string;
}

const useCadastrarIngredientesController = () => {

  //Estados de armazenamento
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showOptionsList, setShowOptionsList] = useState<boolean[]>([]);
  const [nomesIngredientesLoaded, setNomesIngredientesLoaded] = useState(false);

  // Trazendo os nomes dos ingredientes cadastrados pelas nutricionistas
  const { nomesIngredientes } = useBuscarNomesIngredientesController();

 // Função para lidar com a mudança de entrada de texto
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  const { name, value } = e.target;
  const newIngredientes = [...ingredientes];
  newIngredientes[index] = { ...newIngredientes[index], [name]: value };
  
  setIngredientes(newIngredientes);
};

  // Função para lidar com a mudança de seleção
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = { ...newIngredientes[index], [name]: value };
    setIngredientes(newIngredientes);
  };

  // Função para cancelar um ingrediente da lista
  const handleCancelarIngrediente = (index: number) => {
    const newIngredientes = [...ingredientes];
    newIngredientes.splice(index, 1);
    setIngredientes(newIngredientes);
  };

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = async () => {
    try {
      setLoading(true);
      for (const ingrediente of ingredientes) {
        const response = await axios.post("/api/ingredientes/register", ingrediente);
      }
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
      Swal.fire({
        icon: "error",
        title: "ERRO...",
        text: "Falha ao cadastrar produto!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Efeito para verificar a validade do formulário sempre que a lista de ingredientes mudar
  useEffect(() => {
    const atLeastOneIngredient = ingredientes.length > 0;
    const allIngredientsValid = ingredientes.every(ingrediente => {
      const { quantidadeRecebida, validade, classificacao } = ingrediente;
      return quantidadeRecebida && validade && classificacao;
    });
    setFormValid(atLeastOneIngredient && allIngredientsValid);
  }, [ingredientes]);

  // Função para lidar com a mudança de entrada de texto e limpar o valor de pesquisa
  const handleInputChangeAndClear = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = {
      ...newIngredientes[index],
      genero: value,
    };
    setIngredientes(newIngredientes);
    setSearchValue(value);

    const newShowOptionsList = Array(ingredientes.length).fill(false);
    newShowOptionsList[index] = true;
    setShowOptionsList(newShowOptionsList);
  };

  // Função para lidar com o clique em uma opção de nome de ingrediente
  const handleOptionClick = (nome: string, index: number) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index].genero = nome;
    setIngredientes(newIngredientes);

    const newShowOptionsList = Array(ingredientes.length).fill(false);
    setShowOptionsList(newShowOptionsList);
  };

  // Função para lidar com o foco no campo de entrada de texto e exibir a lista de opções
  const handleInputFocus = (index: number) => {
    const newShowOptionsList = Array(ingredientes.length).fill(false);
    newShowOptionsList[index] = true;
    setShowOptionsList(newShowOptionsList);
  };

  // Função para adicionar um novo ingrediente à lista
  const handleAddIngrediente = () => {
    // Define um novo ingrediente com os valores padrão
    const newIngrediente: Ingrediente = {
      genero: "",
      quantidadeRecebida: "",
      validade: "",
      classificacao: "",
    };

    // Adiciona o novo ingrediente à lista de ingredientes
    setIngredientes([...ingredientes, newIngrediente]);

    // Limpa o valor de pesquisa
    setSearchValue("");
  };

  const isLastIngredientComplete = () => {
    const lastIngredientIndex = ingredientes.length - 1;
    const lastIngredient = ingredientes[lastIngredientIndex];
    if (!lastIngredient) {
      return false; // Se não houver último ingrediente, retorna falso
    }
    // Verifica se todos os campos do último ingrediente estão preenchidos
    return (
      lastIngredient.genero &&
      lastIngredient.quantidadeRecebida &&
      lastIngredient.validade &&
      lastIngredient.classificacao
    );
  };


  // Filtra os nomes de ingredientes com base no valor de pesquisa
  const filteredNomesIngredientes = nomesIngredientes.filter(nome =>
    nome.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Efeito para indicar que os nomes de ingredientes foram carregados
  useEffect(() => {
    if (nomesIngredientes.length > 0) {
      setNomesIngredientesLoaded(true);
    }
  }, [nomesIngredientes]);

  // Retorna os métodos e estados necessários para o componente de cadastro de ingredientes
  return {
    ingredientes,
    loading,
    formValid,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handleCancelarIngrediente,
    handleAddIngrediente,
    searchValue,
    setSearchValue,
    showOptionsList,
    setShowOptionsList,
    isLastIngredientComplete,
    nomesIngredientesLoaded,
    filteredNomesIngredientes,
    handleInputChangeAndClear,
    handleOptionClick,
    handleInputFocus
  };
};

export default useCadastrarIngredientesController;