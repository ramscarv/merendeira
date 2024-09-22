import Link from "next/link";
import React from "react";
import useNutriRegisterController from "./controller/nutriRegisterController";
import LoadingButtons from "@/components/LoadingButtons";

export default function NutriRegisterForm() {
    const { nutri, loading, formValid, handleInputChange, handleSubmit } = useNutriRegisterController();

    return (
        <div className="flex flex-col gap-y-4 items-center justify-center h-svh bg-white">
            <h1 className="text-cor3 font-medium uppercase">Cadastro nutricionista</h1>

            <div className="flex flex-col gap-y-6 h-fit w-96">
                {/**NOME */}
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="nome">Nome</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="nome"
                        type="text"
                        name="nome" // Adicione o atributo name para identificar o campo
                        value={nutri.nome}
                        onChange={handleInputChange} // Use handleInputChange fornecido pelo controller
                        placeholder="Nome"
                    />
                </div>

                {/**CPF */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="cpf"
                        type="text"
                        name="cpf"
                        value={nutri.cpf}
                        onChange={handleInputChange}
                        placeholder="CPF"
                    />
                </div>

                {/**EMAIL */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="email"
                        name="email"
                        value={nutri.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                </div>
                
                {/**SENHA */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="password">Senha</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="password"
                        type="password"
                        name="password"
                        value={nutri.password}
                        onChange={handleInputChange}
                        placeholder="Senha"
                    />
                </div>

                {/**BOTÃO CADASTRAR */}
                <button
                    onClick={handleSubmit}
                    disabled={!formValid || loading}
                    className={`p-2 h-10 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:border-gray-600 ${(!formValid || loading) ? "cursor-not-allowed opacity-50" : ""}`}
                >
                    {loading ? <LoadingButtons/>: "Cadastrar"}
                </button>
                {/**LINK LOGIN */}
                <Link 
                    href="/"
                    className="text-center text-sm text-cor2 dark:text-blue-500 hover:underline"
                >Ir para página de login</Link>
            </div>
        </div>
    );
}