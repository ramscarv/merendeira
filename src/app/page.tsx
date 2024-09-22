'use client'
import React, { useState } from 'react';
import Profiles from "@/utils/profiles/profiles";
import LoginForm from '@/utils/forms/login/loginForm';

export default function LoginPage() {
  const [perfilSelecionado, setPerfilSelecionado] = useState('');

  const handlePerfilChange = (perfil: string) => {
    setPerfilSelecionado(perfil);
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between h-screen bg-gray-100">
      <title>Merendeira | Login</title>
      
      {/** Imagem ajustada para ocupar toda a altura da tela em telas grandes */}
      <div className="lg:w-1/2 h-64 lg:h-full bg-gray-200 flex items-center justify-center">
        <img 
          src="https://media.istockphoto.com/id/1343392632/vector/healthy-food-book-logo-concept-design.jpg?s=612x612&w=0&k=20&c=s_q740z0ENq3hQeBVF37JQG1rmTQ4wB-NYj1ZPYEQw0=" 
          alt="logo merenda"
          className="object-cover h-full w-full"
        />
      </div>

      {/** Área de login */}
      <div className="flex flex-col justify-center items-center lg:w-1/2 bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto lg:mx-0">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Bem-vindo ao Merendeira</h1>
        
        {/** Componentes de perfil e formulário */}
        <Profiles handleFormChange={handlePerfilChange} />
        
        <LoginForm />

        <p className="mt-4 text-sm text-gray-500">Selecione o seu perfil para continuar</p>
      </div>
    </div>
  );
}
