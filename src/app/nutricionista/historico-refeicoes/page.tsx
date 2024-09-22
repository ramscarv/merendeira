'use client'
import React, { useState, useEffect } from 'react';
import MenuNutri from '@/components/MenuNutri';
import useBuscarRefeicoesEscolasController from '../controller/getRefeicoesEscolaController';
import Loading from '@/components/Loading';
import Link from 'next/link';

const HistoricoPage: React.FC = () => {
    const { refeicoesEscolas, isLoading } = useBuscarRefeicoesEscolasController();
    const [escolaSelecionada, setEscolaSelecionada] = useState<string | undefined>(undefined);
    const [organizedMeals, setOrganizedMeals] = useState<{ [monthYear: string]: { [key: string]: { _id: string, date: string, nome: string, padraoMantido: boolean }[] } }>({});

    useEffect(() => {
        if (!isLoading && refeicoesEscolas.length > 0 && !escolaSelecionada) {
            setEscolaSelecionada(refeicoesEscolas[0].school._id);
        }
    }, [isLoading, refeicoesEscolas, escolaSelecionada]);

    useEffect(() => {
        // Filtrando as refeições da escola selecionada
        const filteredRefeicoes = refeicoesEscolas.filter(refeicaoEscola => refeicaoEscola.school._id === escolaSelecionada);
        const refeicoesDaEscola = filteredRefeicoes.length > 0 ? filteredRefeicoes[0].meals : [];

        const mealsGroupedByMonthYear: { [monthYear: string]: { [key: string]: { _id: string, date: string, nome: string, padraoMantido: boolean }[] } } = {};

        refeicoesDaEscola.forEach(meal => {
            const date = new Date(meal.createdAt);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
            const shift = meal.turno;

            if (!mealsGroupedByMonthYear[monthYear]) {
                mealsGroupedByMonthYear[monthYear] = { "Manhã": [], "Tarde": [] };
            }

            mealsGroupedByMonthYear[monthYear][shift].push({
                _id: meal._id,
                date: date.toLocaleDateString(),
                nome: meal.nome,
                padraoMantido: meal.padraoMantido,
            });
        });

        setOrganizedMeals(mealsGroupedByMonthYear);
    }, [refeicoesEscolas, escolaSelecionada]);

    const handleEscolaSelecionadaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEscolaSelecionada(event.target.value);
    };

    return (
        <div className="flex flex-row h-svh">
            <div className='sticky top-0'>
                <title>Histórico de refeições</title>
                <MenuNutri />
            </div>

            <div className="flex flex-col w-full">
                {/**FILTRO */}
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

                {isLoading ? (
                    <div className="h-full flex justify-center items-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex-1 p-10 overflow-auto">
                        {/**TELA PRINCIPAL */}
                        {Object.keys(organizedMeals).length === 0 ? (
                            <div className="p-8 flex justify-center items-center">
                                <p>Nenhuma refeição produzida</p>
                            </div>
                        ) : (
                            <div className='flex flex-col'>
                                <p className='text-red-500 text-xs pb-3 text-right'>*selecione uma refeição para mais detalhes</p>
                                {Object.keys(organizedMeals).map((monthYear, index) => (
                                    <div key={index} className="mb-10">
                                        <h3 className='font-bold text-lg mb-4'>{monthYear}</h3>
                                        <div className='grid grid-cols-2 gap-10'>
                                            {["Manhã", "Tarde"].map(shift => (
                                                <div key={shift}>
                                                    <h4 className='font-semibold text-center mb-6 text-cor3 uppercase'>{shift}</h4>
                                                    <div>
                                                        {organizedMeals[monthYear][shift] && organizedMeals[monthYear][shift].length > 0 ? (
                                                            organizedMeals[monthYear][shift].map((meal, mealIndex) => (
                                                                <div key={mealIndex} className="flex flex-col gap-2 mb-6 text-center p-4">
                                                                    <span className='font-semibold text-sm'>{meal.date}</span>
                                                                    <Link className={meal.padraoMantido ? 'bg-white border rounded-md p-2 shadow-sm cursor-pointer hover:shadow-md' : 'bg-white border rounded-md border-red-500 p-2 shadow-sm cursor-pointer hover:shadow-md'} href={`/nutricionista/historico-refeicoes/detalhes/${meal._id}`}>
                                                                        <span>{meal.nome}</span>
                                                                    </Link>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className='text-center'>Nenhuma refeição cadastrada</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default HistoricoPage;

