import { useState, useEffect } from "react";
import axios from "axios";

const useBuscarNomesIngredientesController = () => {
  const [nomesIngredientes, setNomesIngredientes] = useState<string[]>([]);

  const fetchNomesIngredientes = async () => {
    try {
      const response = await axios.get("/api/refeicoes/ingredientes/get");
      const produtos = response.data.map((produto: any) => produto.nomeIngrediente);
      console.log('controler ',produtos);
      
      setNomesIngredientes(produtos); 
    } catch (error) {
      console.error("Erro ao buscar nomes dos ingredientes:", error);
    }
  };

  useEffect(() => {
    fetchNomesIngredientes();
  }, []);

  return { nomesIngredientes };
};

export default useBuscarNomesIngredientesController;