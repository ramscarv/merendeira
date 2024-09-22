import { useState, useEffect } from "react";
import axios from "axios";

const useBuscarEstoquesController = () => {
  const [estoquesEscolas, setEstoques] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEstoques = async () => {
    try {
      const response = await axios.get("/api/escolas/estoques");
      const data = response.data.data;
      console.log(data);
      
      setEstoques(data);
    } catch (error) {
      console.error("Erro ao buscar estoques:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEstoques();
  }, [setEstoques]);

  return { estoquesEscolas, isLoading };
};

export default useBuscarEstoquesController;