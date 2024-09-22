'use client';
import React, { useState, useEffect } from 'react';
import useBuscarRefeicoesEscolasController from '../controller/getRefeicoesEscolaController';
import MenuNutri from '@/components/MenuNutri';
import Loading from '@/components/Loading';

const ProdutosUsadosPage: React.FC = () => {
    const { refeicoesEscolas, isLoading, ingredientesUsados } = useBuscarRefeicoesEscolasController();
    const [escolaSelecionada, setEscolaSelecionada] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!isLoading && refeicoesEscolas.length > 0 && !escolaSelecionada) {
            setEscolaSelecionada(refeicoesEscolas[0].school._id);
        }
    }, [isLoading, refeicoesEscolas, escolaSelecionada]);

    const handleEscolaSelecionadaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEscolaSelecionada(event.target.value);
    };

    const refeicoesFiltradas = refeicoesEscolas.filter(refeicaoEscola => refeicaoEscola.school._id === escolaSelecionada);

    return (
        <div className="flex flex-row h-screen">
            <title>Produtos usados</title>
            <div className="sticky top-0">
                <MenuNutri />
            </div>
            <div className='flex flex-col w-full h-full overflow-auto'>
                {isLoading ? (
                    <div className='h-full flex justify-center items-center'>
                        <Loading />
                    </div>
                ) : (
                    <>
                        {/** FILTRO */}
                        <div className="filter-container p-4 sticky top-0 z-50 bg-white">
                            <select
                                value={escolaSelecionada}
                                onChange={handleEscolaSelecionadaChange}
                                className="w-60 border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-cor4 rounded p-1"
                            >
                                {refeicoesEscolas.map((item) => (
                                    <option key={item.school._id} value={item.school._id}>{item.school.nome}</option>
                                ))}
                            </select>
                        </div>
                        {/** NENHUMA REFEIÇÃO */}
                        {refeicoesFiltradas.length === 0 || refeicoesFiltradas[0].meals.length === 0 ? (
                            <div className="p-8 flex justify-center items-center">
                                <p>Nenhuma refeição produzida</p>
                            </div>
                        ) : (
                            <div className="flex-1 p-10 overflow-auto">
                                {/** TELA PRINCIPAL */}
                                <div className="grid grid-cols-[auto_auto_auto_auto] gap-4 text-center">
                                    <div className="font-semibold">Ingrediente</div>
                                    <div className="font-semibold">Quantidade</div>
                                    <div className="font-semibold">Refeição</div>
                                    <div className="font-semibold">Data</div>
                                    {refeicoesFiltradas.map((refeicaoEscola) => (
                                        refeicaoEscola.meals.map((meal) => (
                                            meal.ingredientes.map((ingrediente) => (
                                                <React.Fragment key={ingrediente._id}>
                                                    <div className="bg-white p-2 rounded-md shadow h-fit">{ingrediente.nomeIngrediente}</div>
                                                    <div className="bg-white p-2 rounded-md shadow h-fit">{ingrediente.quantidade}g</div>
                                                    <div className="bg-white p-2 rounded-md shadow h-fit">{meal.nome}</div>
                                                    <div className="bg-white p-2 rounded-md shadow h-fit">{new Date(meal.createdAt).toLocaleDateString()}</div>
                                                </React.Fragment>
                                            ))
                                        ))
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProdutosUsadosPage;