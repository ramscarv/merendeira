'use client'
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import MenuEscola from '@/components/MenuEscola';
import useGetRefeicaoPadraController from './controller/getRefeicaoPadraoController';
import useUpdateRefeicaoController from './controller/updateRefeicaoPadraoController';
import useCadastrarRefeicaoEscolaController from './controller/postRefeicaoController';
import useGetIngredientesEscolaLogadaController from '../controller/getIngredientesEscolaLogadaController';
import { formatarData } from '@/utils/formatarData';
import Loading from '@/components/Loading';
import Swal from "sweetalert2";


const EscolaCadastroRefeicao = () => {
    const { estoque } = useGetIngredientesEscolaLogadaController();

    const {
        handleSubmit,
    } = useCadastrarRefeicaoEscolaController();

    const {
        ingredientesAdicionados,
        setIngredientesAdicionados,
        adicionarNovoIngrediente,
        removerIngredienteAdicionado,
    } = useUpdateRefeicaoController();

    const {
        refeicaoPadrao,
        quantidadeAlunos,
        handleQuantidadeAlunosChange,
        loading,
        error,
        selectedRefeicao,
        setSelectedRefeicao,
        handleSelectChange,
    } = useGetRefeicaoPadraController();

    const [estoqueValue, setEstoqueValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownIngredienteOpen, setDropdownIngredienteOpen] = useState<number | null>(null);
    const [dropdownIngredienteAdicionadoOpen, setDropdownIngredienteAdicionadoOpen] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddNewRefeicao, setIsAddNewRefeicao] = useState(false);
    const [observacao, setObservacao] = useState('');
    const [observacaoModalVisible, setObservacaoModalVisible] = useState(false);

    useEffect(() => {
        if (isAddNewRefeicao) {
            setSelectedRefeicao(null); // Limpe a seleção da refeição
            setIngredientesAdicionados([]); // Limpe os ingredientes adicionados
            setSearchValue(''); // Limpe o valor de pesquisa
            setIsEditing(false); // Desative o modo de edição
            setObservacao(''); // Limpe a observação
        }
    }, [isAddNewRefeicao]);

    const handleEstoqueSelect = (opcao: any, ingredienteId: any, isAddedIngredient: boolean = false, addedIndex: number = -1) => {
        if (!isAddedIngredient) {
            if (selectedRefeicao) {
                const ingredienteIndex = selectedRefeicao.ingredientes.findIndex(ingrediente => ingrediente._id === ingredienteId);
                if (ingredienteIndex !== -1) {
                    const novosIngredientes = [...selectedRefeicao.ingredientes];
                    novosIngredientes[ingredienteIndex] = {
                        ...novosIngredientes[ingredienteIndex],
                        nomeIngrediente: opcao.genero
                    };
                    setSelectedRefeicao({
                        ...selectedRefeicao,
                        ingredientes: novosIngredientes
                    });
                    setDropdownIngredienteOpen(null); // Fechar o dropdown
                }
            }
        } else {
            const novosIngredientes = [...ingredientesAdicionados];
            novosIngredientes[addedIndex] = {
                ...novosIngredientes[addedIndex],
                nomeIngrediente: opcao.genero
            };
            setIngredientesAdicionados(novosIngredientes);
            setDropdownIngredienteAdicionadoOpen(null);
        }
    };


    const toggleObservacaoModal = () => {
        setObservacaoModalVisible(!observacaoModalVisible);
    };

    const handleSubmitObservacao = () => {
        // Verifica se a observação não está vazia antes de salvar
        if (observacao.trim() !== '') {
            console.log('Observação salva:', observacao);
            toggleObservacaoModal(); // Fecha a modal após salvar
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Campo vazio, observação não pode ser salva.",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };
    

    const handleIngredientChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, ingredienteId: any) => {
        const { value } = e.target;
        if (selectedRefeicao !== null) {
            const ingredienteIndex = selectedRefeicao.ingredientes.findIndex(ingrediente => ingrediente._id === ingredienteId);
            if (ingredienteIndex !== -1) {
                const novosIngredientes = [...selectedRefeicao.ingredientes];
                novosIngredientes[ingredienteIndex] = {
                    ...novosIngredientes[ingredienteIndex],
                    nomeIngrediente: value
                };
                setSelectedRefeicao({
                    ...selectedRefeicao,
                    ingredientes: novosIngredientes
                });
            }
        }
    };

    const removerIngrediente = (index: number) => {
        if (selectedRefeicao && selectedRefeicao.ingredientes && selectedRefeicao.ingredientes.length > index) {
            const novosIngredientes = [...selectedRefeicao.ingredientes];
            novosIngredientes.splice(index, 1);
            setSelectedRefeicao({
                ...selectedRefeicao,
                ingredientes: novosIngredientes
            });
        }
    };

    const handleNomeRefeicaoBlur = () => {
        if (!searchValue.trim()) {
            setSelectedRefeicao(null);
        }
    };

    const handleOptionSelect = (option: any) => {
        setSearchValue(option.nome);
        handleSelectChange(option._id);
        setDropdownOpen(false);
    };

    const handleSubmitForm = () => {
        if (selectedRefeicao && quantidadeAlunos && selectedRefeicao.ingredientes.length > 0) {
            const ingredientesMultiplicados = selectedRefeicao.ingredientes.map(ingrediente => ({
                ...ingrediente,
                quantidade: ingrediente.quantidade * Number(quantidadeAlunos) // Multiplica a quantidade pelo número de alunos
            }));

            const refeicaoParaEnviar = {
                nomeRefeicao: selectedRefeicao.nome,
                turnoRefeicao: selectedRefeicao.turno,
                quantidadeAlunos: Number(quantidadeAlunos),
                descricaoPreparo: selectedRefeicao.descricao,
                padraoMantido: true,
                observacao: observacao,
                ingredientes: ingredientesMultiplicados, // Envia os ingredientes com as quantidades multiplicadas
                ingredientesAdicionados: ingredientesAdicionados.filter(ingrediente => ingrediente.nomeIngrediente && ingrediente.quantidade),
            };

            handleSubmit(refeicaoParaEnviar);
        }
    };


    if (loading) {
        <div className="flex justify-center items-center">
            <Loading />
        </div>
    }

    if (error) {
        return <p>{error}</p>;
    }

    const filteredRefeicoes = refeicaoPadrao.filter(refeicao =>
        refeicao.nome.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="flex flex-row h-svh">
            <title>Cantina Tech | Cadastrar refeição</title>
            <section>
                <MenuEscola />
            </section>

            <div className='w-full flex flex-col overflow-auto p-4'>
                <div className='flex flex-col'>
                    <div className='w-full text-center uppercase text-cor3 text-md font-semibold'>
                        <p>Cadastrar refeição</p>
                    </div>
                    <div className='flex flex-row justify-between px-10'>
                        <div className='hidden'>
                            <button
                                onClick={() => {
                                    setIsAddNewRefeicao(!isAddNewRefeicao)
                                    if (isAddNewRefeicao) {
                                        toggleObservacaoModal(); // Abre o modal somente ao finalizar a edição
                                    }
                                }}
                                className="text-sm p-2 border bg-cor3 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:border-gray-600"
                            >
                                {isAddNewRefeicao ? "Finalizar Edição" : "Adicionar refeição não cadastrada"}
                            </button>
                        </div>

                        <div className='flex w-full justify-end'>
                            {selectedRefeicao && (
                                <button
                                onClick={() => {
                                    setIsEditing(!isEditing); // Alterna o estado de edição
                                    if (isEditing) {
                                        toggleObservacaoModal(); // Abre o modal somente ao finalizar a edição
                                    }
                                }}
                                className=" text-sm p-2 border bg-red-600 hover:bg-red-500 text-white rounded-lg focus:outline-none focus:border-gray-600"
                            >
                                {isEditing ? "Finalizar Edição" : "Editar refeição"}
                            </button>
                            )}
                        </div>


                        {observacaoModalVisible && (
                            <div className="fixed w-full inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                <div className="bg-white w-96 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Observação</h2>
                                    <textarea
                                        className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                        id="observacao"
                                        name="observacao"
                                        rows={4}
                                        value={observacao}
                                        onChange={(e) => setObservacao(e.target.value)}
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <button
                                             onClick={handleSubmitObservacao}
                                            className="p-2 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row px-6">
                    <div className='w-1/2 flex flex-col gap-6 mt-12 overflow-auto'>
                        <section className="flex flex-col gap-8 items-center">
                            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className="w-96 flex flex-col gap-2">
                                    <label className='font-semibold text-sm' htmlFor="nomeRefeicao">Refeição</label>
                                    <div className="relative" ref={dropdownRef}>
                                        <input
                                            type="text"
                                            autoComplete='off'
                                            className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                            id="nomeRefeicao"
                                            name="nomeRefeicao"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            onFocus={() => setDropdownOpen(true)}
                                            onBlur={handleNomeRefeicaoBlur}
                                            placeholder="Pesquise a refeição"
                                        />
                                        {dropdownOpen && (
                                            <ul className="absolute z-10 w-full bg-white border border-gray-400 rounded-b-lg shadow-lg mt-2">
                                                {filteredRefeicoes.map(refeicao => (
                                                    <li key={refeicao._id} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleOptionSelect(refeicao)}>
                                                        {refeicao.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between text-center gap-10'>
                                    <div className='w-52 flex flex-col gap-2 items-center'>
                                        <label className='font-semibold text-sm' htmlFor="quantidadeAlunos">Quantidade de alunos</label>
                                        <input
                                            className='w-32 p-1 text-center rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                            type="number"
                                            id="quantidadeAlunos"
                                            name="quantidadeAlunos"
                                            value={quantidadeAlunos}
                                            onChange={handleQuantidadeAlunosChange}
                                        />
                                    </div>

                                    <div className='w-40 flex flex-col gap-2 items-center'>
                                        <label className='font-semibold text-sm' htmlFor="turnoRefeicao">Turno</label>
                                        <select
                                            className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                            id="turnoRefeicao"
                                            name="turnoRefeicao"
                                            value={selectedRefeicao?.turno || ''}
                                            onChange={(e) => setSelectedRefeicao({
                                                ...selectedRefeicao!,
                                                turno: e.target.value
                                            })}
                                        >
                                            <option value="" disabled>Selecione</option>
                                            <option value="Manhã">Manhã</option>
                                            <option value="Tarde">Tarde</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="flex flex-col gap-8 items-center">
                            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className='w-96 flex flex-col gap-2'>
                                    <label className='font-semibold text-sm' htmlFor="descricaoPreparo">Descrição do Preparo</label>
                                    <textarea
                                        rows={10}
                                        className='w-full bg-white p-2 text-justify rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                        id="descricaoPreparo"
                                        name="descricaoPreparo"
                                        value={selectedRefeicao?.descricao || ''}
                                        onChange={(e) => setSelectedRefeicao({
                                            ...selectedRefeicao!,
                                            descricao: e.target.value
                                        })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className='w-1/2 flex flex-col gap-6 mt-12 overflow-auto'>

                        <section className="flex flex-col gap-8 items-center">
                            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className='w-96 flex flex-col gap-2'>
                                    <div className='flex flex-row justify-between'>
                                        <label className='font-semibold m-auto text-sm' htmlFor="ingredientes">Ingredientes</label>
                                        <label className='font-semibold  text-sm' htmlFor="ingredientes">Quantidade (g)</label>
                                    </div>
                                    {!selectedRefeicao && (
                                        <div className='w-96 h-80 flex items-center justify-center' >
                                            <p className='pl-20 texte-center font-semibold text-red-700'>Selecione uma refeição</p>
                                        </div>
                                    )}
                                    {selectedRefeicao?.ingredientes.map((ingrediente, index) =>  (
                                        <div key={ingrediente._id} className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <div>
                                                    <input
                                                        className='w-64 bg-white p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                        type="text"
                                                        value={ingrediente.nomeIngrediente}
                                                        onChange={(e) => handleIngredientChange(e, ingrediente._id)}
                                                        disabled={!isEditing}
                                                        onFocus={() => setDropdownIngredienteOpen(index)}
                                                    />
                                                </div>
                                                {dropdownIngredienteOpen === index && (
                                                    <div className='relative'>
                                                        <div className='absolute z-10 w-96 bg-white border border-gray-300 shadow-lg'>
                                                            {estoque.map((opcao) => (
                                                                <div
                                                                    key={opcao._id}
                                                                    className='cursor-pointer p-2 hover:bg-gray-200'
                                                                    onMouseDown={() => handleEstoqueSelect(opcao, ingrediente._id)}
                                                                >
                                                                    {opcao.genero}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {Number(quantidadeAlunos) > 0 ? (
                                                <div>
                                                    <input
                                                        className='w-32 bg-white text-center p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                        type="number"
                                                        placeholder='0'
                                                        value={Number(ingrediente.quantidade) * Number(quantidadeAlunos)}
                                                        onChange={(e) => handleIngredientChange(e, ingrediente._id)}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                            ) : (
                                                <div className='w-32' >
                                                    <p className='text-center text-gray-500'>0</p>
                                                </div>
                                            )}                                            
                                            {isEditing && (
                                                <div className='w-20'>
                                                    <button
                                                        className="w-7 h-7 bg-red-600 hover:bg-red-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                                        onClick={() => removerIngrediente(index)}>
                                                        x
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {ingredientesAdicionados.length > 0 && !observacaoModalVisible && !isEditing && (
                                        <div>
                                            <h2 className='font-semibold m-auto text-sm py-3' >Ingredientes Adicionados:</h2>
                                            <ul>
                                                {ingredientesAdicionados.map((ingrediente, index) => (
                                                    <span className='w-80 rounded-md border border-gray-400 flex flex-row justify-between p-2 bg-white mt-1' key={index}>
                                                        <span>{ingrediente.nomeIngrediente}</span>
                                                        <span> {ingrediente.quantidade}g</span>
                                                    </span>
                                                ))}
                                            </ul>
                                        </div>
                                    )}




                                    {isEditing && (
                                        <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                            <div className='w-96 flex flex-col gap-2'>
                                                <p className='font-semibold text-sm'>Adicionados: </p>
                                                {ingredientesAdicionados.map((ingrediente, index) => (
                                                    <div key={index} className='flex flex-row gap-2 items-center'>
                                                        <div>
                                                            <input
                                                                className='w-72 bg-white p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                                type="text"
                                                                value={ingrediente.nomeIngrediente}
                                                                onChange={(e) => {
                                                                    const novosIngredientes = [...ingredientesAdicionados];
                                                                    novosIngredientes[index].nomeIngrediente = e.target.value;
                                                                    setIngredientesAdicionados(novosIngredientes);
                                                                }}
                                                                onFocus={() => setDropdownIngredienteAdicionadoOpen(index)}
                                                            />
                                                            {dropdownIngredienteAdicionadoOpen === index && (
                                                                <div className='relative'>
                                                                    <div className='absolute z-10 w-96 bg-white border border-gray-300 shadow-lg'>
                                                                        {estoque.map((opcao) => (
                                                                            <div
                                                                                key={opcao._id}
                                                                                className='cursor-pointer p-2 hover:bg-gray-200'
                                                                                onMouseDown={() => handleEstoqueSelect(opcao, ingrediente.nomeIngrediente, true, index)}
                                                                            >
                                                                                <span>{opcao.genero}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <input
                                                            className='w-24 bg-white text-center p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                            type="number"
                                                            value={ingrediente.quantidade}
                                                            onChange={(e) => {
                                                                const novosIngredientes = [...ingredientesAdicionados];
                                                                novosIngredientes[index].quantidade = parseFloat(e.target.value);
                                                                setIngredientesAdicionados(novosIngredientes);
                                                            }}
                                                        />
                                                        <div className='w-20'>
                                                            <button
                                                                className="w-7 h-7 bg-red-600 hover:bg-red-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                                                onClick={() => removerIngredienteAdicionado(index, true)}>
                                                                x
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <button
                                        onClick={() => {
                                            setIsEditing(true)
                                            adicionarNovoIngrediente(); // Chama a função para adicionar novo ingrediente
                                        }}
                                        className="w-7 h-7 bg-green-600 hover:bg-green-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                    >
                                        +
                                    </button>
                                )}
                                {observacao && !observacaoModalVisible && (
                                    <div className="w-96">
                                        <p className="font-semibold text-red-600">Observação</p>
                                        <p>{observacao}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

                <div className='w-full flex justify-center mt-6'>
                    <button
                        disabled={isEditing}
                        onClick={handleSubmitForm}
                        className={`w-40 h-10 p-2 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none ${isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EscolaCadastroRefeicao;