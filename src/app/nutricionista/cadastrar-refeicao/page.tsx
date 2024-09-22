'use client'
import React, { useEffect } from 'react';
import MenuNutri from '@/components/MenuNutri';
import useCadastrarRefeicaoNutriController from './controller/cadastrarRefeicaoNutriController';
import LoadingButtons from '@/components/LoadingButtons';

const NutriCadastroRefeicao = () => {
    const {
        refeicao,
        ingrediente,
        loading,
        formValid,
        setFormValid,
        handleInputChange,
        handleSelectChange,
        handleAddIngredientes,
        handleCancelarIngrediente,
        handleTextChange,
        handleNumberChange,
        handleSubmit
    } = useCadastrarRefeicaoNutriController();

    useEffect(() => {
        handleAddIngredientes();
    }, []);
    return (
        <div className="flex flex-row h-svh">
            <title>Merendeira | Cadastrar refeição</title>
            <section>
                <MenuNutri />
            </section>

                <div className='w-full flex flex-col overflow-auto'>
                    <div className='flex flex-col justify-center items-center pt-8'>
                        <p className='text-center uppercase text-cor3 font-semibold'>Cadastrar Refeições</p>
                        <p className='text-xs text-red-600'>*cardápio com cálculos para 1 aluno</p>
                    </div>

                    <div className="flex flex-row px-6">
                        {/**LADO ESQUERDO */}
                        <div className='w-1/2 flex flex-col gap-6 mt-12 overflow-auto'>
                    
                            <section className="flex flex-col gap-8 items-center">
                                <div className='w-full flex flex-row gap-6 items-center justify-center'>
                                    {/**NOME REFEIÇÃO */}
                                    <div className="w-96 flex flex-col gap-2">
                                        <label
                                            className='font-semibold text-sm'
                                            htmlFor="nomeRefeicao">Refeição</label>
                                        <input
                                            className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:boder-2 focus:border-cor4'
                                            type="text"
                                            id={`nomeRefeicao`}
                                            name={`nomeRefeicao`}
                                            value={refeicao.nomeRefeicao}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    
                                </div>
                                {/** DESCRIÇÃO */}
                                <div className="w-96 flex flex-col gap-2">
                                    <label
                                        className='font-semibold text-sm'
                                        htmlFor="descricaoPreparo">Descrição de preparo</label>
                                    <textarea
                                        className="w-full p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4"
                                        name={`descricaoPreparo`}
                                        id={`descricaoPreparo`}
                                        rows={10}
                                        value={refeicao.descricaoPreparo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button
                                    className={`w-40 h-10 p-2 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:border-gray-600 ${(!formValid || loading) ? "cursor-not-allowed opacity-50" : ""}`}
                                    disabled={!formValid || loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? <LoadingButtons /> : "Cadastrar"}
                                </button>
                            </section>
                        </div>

                        {/**LADO DIREITO */}
                        <section className="h-full w-1/2 p-2">
                            <table className="w-full border-separate border-spacing-y-6 border-spacing-x-4">
                                <thead>
                                    <tr>
                                        <th className="text-center font-semibold text-sm">Ingrediente</th>
                                        <th className="text-center font-semibold text-sm">Quantidade (g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingrediente.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center w-52">
                                                <input
                                                    type="text"
                                                    name={`nomeIngrediente`}
                                                    id={`nomeIngrediente`}
                                                    value={item.nomeIngrediente}
                                                    onChange={(e) => handleTextChange(e, index)}
                                                    className='w-full p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4'
                                                />
                                            </td>
                                            <td className="text-center w-20">
                                                <input
                                                    className='w-full text-center p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4'
                                                    type="number"
                                                    name={`quantidade`}
                                                    id={`quantidade`}
                                                    value={item.quantidade}
                                                    onChange={(e) => handleNumberChange(e, index)}
                                                />
                                            </td>
                                            <td className='text-center w-8'>
                                                <button
                                                    onClick={() => handleCancelarIngrediente(index)}
                                                    className="w-7 h-7 bg-red-600 hover:bg-red-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                                >
                                                    x
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                className="mx-auto block w-7 h-7 bg-cor4  hover:bg-green-600 text-white rounded-full"
                                onClick={handleAddIngredientes}>+</button>
                        </section>
                    </div>
                </div>
            
        </div>
    );
};

export default NutriCadastroRefeicao;