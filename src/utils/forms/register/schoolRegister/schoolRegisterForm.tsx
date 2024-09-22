'use client'
import Link from "next/link";
import React from "react";
import useSchoolRegisterController from "./controller/schoolRegisterController";
import LoadingButtons from "@/components/LoadingButtons";

export default function SchoolRegisterForm() {
    const { school, loading, formValid, handleInputChange, handleSubmit } = useSchoolRegisterController();

    return (
        <div className="flex flex-col gap-y-4 items-center justify-center h-svh bg-white">
            <h1 className="text-cor3 font-medium uppercase">Cadastro Escola</h1>

            <div className="flex flex-col gap-y-6 h-fit w-96">
                {/**NOME */}
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="nome">Nome</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="nome"
                        type="text"
                        name="nome"
                        value={school.nome}
                        onChange={handleInputChange}
                        placeholder="Nome"
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
                        value={school.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                </div>
                {/**CPF */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="cnpj">CNPJ</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="cnpj"
                        type="text"
                        name="cnpj"
                        value={school.cnpj}
                        onChange={handleInputChange}
                        placeholder="CNPJ"
                    />
                </div>
                {/**SENHA */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="password">Senha</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                        id="password"
                        type="password"
                        name="password"
                        value={school.password}
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
                    {loading ? <LoadingButtons/> : "Cadastrar"}
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
