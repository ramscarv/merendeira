'use client'
// Importe a interface IngredienteEstoque do controlador
import { IngredienteEstoque } from "./controller/getIngredientesEscolaLogadaController";
import React from "react";
import MenuEscola from "@/components/MenuEscola";
import useGetIngredientesEscolaLogadaController from "./controller/getIngredientesEscolaLogadaController";
import useRefeicaoEscolaIdController from "./controller/getRefeicaoEscolaId";
import Loading from "@/components/Loading";
import { formatarData } from "@/utils/formatarData";

const VisualizarEstoque: React.FC = () => {
  const { estoque, loading, error } = useGetIngredientesEscolaLogadaController();
  const { refeicoesEscolas } = useRefeicaoEscolaIdController();
  
  // Somar os ingredientes utilizados nas refeições
  const somarIngredientes = (refeicoesEscolas: any[]) => {
    const ingredientesUtilizados: { [key: string]: number } = {};
  
    refeicoesEscolas.forEach((escola: any) => {
      escola.meals.forEach((refeicao: any) => {
        refeicao.ingredientes.forEach((ingrediente: any) => {
          const nomeIngrediente: string = ingrediente.nomeIngrediente;
          const quantidade: number = ingrediente.quantidade;
  
          if (ingredientesUtilizados[nomeIngrediente]) {
            ingredientesUtilizados[nomeIngrediente] += quantidade;
          } else {
            ingredientesUtilizados[nomeIngrediente] = quantidade;
          }
        });
  
        // Somar os ingredientes adicionais
        refeicao.ingredientesAdicionados.forEach((ingrediente: any) => {
          const nomeIngrediente: string = ingrediente.nomeIngrediente;
          const quantidade: number = ingrediente.quantidade;
  
          if (ingredientesUtilizados[nomeIngrediente]) {
            ingredientesUtilizados[nomeIngrediente] += quantidade;
          } else {
            ingredientesUtilizados[nomeIngrediente] = quantidade;
          }
        });
      });
    });
  
    return ingredientesUtilizados;
  };
  
  const atualizarEstoque = (estoque: IngredienteEstoque[], ingredientesUtilizados: { [key: string]: number }) => {
    const ingredientesNoEstoque: { [key: string]: { quantidade: number; validade: string } } = {};
    
    // Inicializar o estoque atualizado com as quantidades recebidas do estoque original
    estoque.forEach((ingrediente: IngredienteEstoque) => {
        const { genero: nomeIngrediente, quantidadeRecebida: quantidade, validade } = ingrediente;
        
        // Adicionar a quantidade recebida ao estoque
        if (!ingredientesNoEstoque[nomeIngrediente]) {
            ingredientesNoEstoque[nomeIngrediente] = { quantidade, validade };
        } else {
            ingredientesNoEstoque[nomeIngrediente].quantidade += quantidade;
        }
    });

    // Subtrair as quantidades utilizadas do estoque
    for (const nomeIngrediente in ingredientesUtilizados) {
        if (ingredientesNoEstoque[nomeIngrediente]) {
            ingredientesNoEstoque[nomeIngrediente].quantidade -= ingredientesUtilizados[nomeIngrediente];
        }
    }

    return ingredientesNoEstoque;
};
   
  

  const ingredientesUtilizados = somarIngredientes(refeicoesEscolas);
  const estoqueAtualizado = atualizarEstoque(estoque, ingredientesUtilizados);

  return (
    <div>
      <title>Merendeira | Visualizar Estoque</title>
      <div className="flex flex-row">
        <section>
          <MenuEscola />
        </section>
        <section className="w-full">
          <div className="h-svh p-8 flex justify-center overflow-auto">
            {loading && (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            )}
            {error && (
              <p>Erro ao carregar os ingredientes: {error}</p>
            )}
            {!loading && estoque.length === 0 && (
              <p>Nenhum estoque cadastrado</p>
            )}
            {!loading && !error && estoque && estoque.length > 0 && (
              <div className="w-full text-center">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Estoque</h2>
                    <div className="flex flex-col gap-3 m-auto">
                      {Object.entries(estoqueAtualizado).map(([nomeIngrediente, info], index) => (
                        <div className="bg-white w-auto hh-auto p-2 rounded-md shadow" key={index}>
                          <p className="truncate">{nomeIngrediente}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Quantidade</h2>
                    <div className="flex flex-col gap-3 m-auto">
                      {Object.entries(estoqueAtualizado).map(([nomeIngrediente, info], index) => (
                        <div className="bg-white w-72 p-2 rounded-md shadow" key={index}>
                          <p>{info.quantidade}g</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Validade</h2>
                    <div className="flex flex-col gap-3 m-auto">
                      {Object.entries(estoqueAtualizado).map(([nomeIngrediente, info], index) => (
                        <div className="bg-white w-72 p-2 rounded-md shadow" key={index}>
                          <p className="truncate">{formatarData(info.validade)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisualizarEstoque;