'use client'
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import useBuscarRefeicoesEscolasController from '../../../controller/getRefeicoesEscolaController';
import { formatarData } from '@/utils/formatarData';

const DetalhesRefeicaoPage: React.FC = () => {
    const [routerReady, setRouterReady] = useState(false);
    const [meal, setMeal] = useState<any>(null);
    const { refeicoesEscolas, isLoading: hookLoading } = useBuscarRefeicoesEscolasController();

    useEffect(() => {
        setRouterReady(true);
    }, []);

    useEffect(() => {
        if (routerReady) {
            const id = window.location.pathname.split('/').pop();
            if (!hookLoading && refeicoesEscolas) {
                const allMeals = refeicoesEscolas.flatMap((schoolData: any) => schoolData.meals);
                const selectedMeal = allMeals.find((meal: any) => meal._id === id);
                setMeal(selectedMeal);
            }
        }
    }, [hookLoading, refeicoesEscolas, routerReady]);

    if (!routerReady || hookLoading || !meal) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'><Loading /></div>
        );
    }

    return (
        <div className="p-10 h-svh">
            <title>Detalhes refeição</title>
            <h1 className="text-xl font-bold mb-4 text-center text-cor3 pb-3">{meal.nome}</h1>
            <div className='grid grid-cols-4 gap-20 px-8'>

                <div className='w-full flex flex-col gap-2 m-auto text-center'>
                    <p className='font-semibold text-sm'>Padrão mantido</p>
                    <span className='bg-white p-2 rounded-md shadow-sm'>{meal.padraoMantido ? 'Sim' : 'Não'}</span>
                </div>

                <div className='w-full flex flex-col gap-2 m-auto text-center'>
                    <p className='font-semibold text-sm'>Turno</p>
                    <span className='bg-white p-2 rounded-md shadow-sm'>{meal.turno}</span>
                </div>

                <div className='w-full flex flex-col gap-2 m-auto text-center'>
                    <p className='font-semibold text-sm'>Quantidade de alunos</p>
                    <span className='bg-white p-2 rounded-md shadow-sm'>{meal.quantidadeAlunos}</span>
                </div>

                <div className='w-full flex flex-col gap-2 m-auto text-center'>
                    <p className='font-semibold text-sm'>Preparo</p>
                    <span className='bg-white p-2 rounded-md shadow-sm'>{formatarData(meal.createdAt)}</span>
                </div>
            </div>

            <div className='flex flex-row gap-16 p-10'>
                <div className='flex flex-col gap-3'>
                    <div className='w-96 flex flex-col gap-2'>
                        <p className='font-semibold text-sm'>Ingredientes</p>
                        <ul className='gap-3'>
                            {meal.ingredientes.map((ingrediente: any) => (
                                <li
                                 key={ingrediente._id}
                                 className='bg-white rounded-sm mb-3 p-1 shadow-sm'
                                 >
                                    <div className='flex flex-row justify-between'>
                                        <span>{ingrediente.nomeIngrediente}</span>
                                        <span>{ingrediente.quantidade}g</span>
                                    </div>
                                 </li>
                            ))}
                        </ul>
                    </div>
                    {meal.ingredientesAdicionados && meal.ingredientesAdicionados.length > 0 && (
                        <>
                            <div className='w-96 flex flex-col gap-2'>
                                <p className='font-semibold text-sm'>Ingredientes adicionados</p>
                                <ul>
                                    {meal.ingredientesAdicionados.map((ingrediente: any) => (
                                        <li
                                         key={ingrediente._id}
                                         className='bg-white rounded-sm mb-3 p-1 shadow-sm'
                                         >
                                            <div className='flex flex-row justify-between'>
                                                <span>{ingrediente.nomeIngrediente}</span>
                                                <span>{ingrediente.quantidade}g</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-sm'>Modo de preparo</p>
                        <div className='bg-white leading-7 p-2 rounded-sm text-justify shadow-sm'>
                            {meal.descricao}
                        </div>
                    </div>
                    <div>
                    <p className='font-semibold text-sm text-red-500'>Observação:
                        {meal.observacao ? (
                            <p className='font-normal text-md text-black'>
                                {meal.observacao}
                            </p>
                        ):(
                            <p className='font-normal text-md text-black'>
                                -
                            </p>
                        )}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalhesRefeicaoPage;