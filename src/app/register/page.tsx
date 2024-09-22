'use client'
import React, { useState } from 'react';
import NutriRegisterForm from "@/utils/forms/register/nutriRegister/nutriRegisterForm";
import SchoolRegisterForm from "@/utils/forms/register/schoolRegister/schoolRegisterForm";
import Profiles from "@/utils/profiles/profiles";

export default function RegisterPage() {

  const [perfilSelecionado, setPerfilSelecionado] = useState('');
  const [layoutFlex, setLayoutFlex] = useState(false);

  const handlePerfilChange = (perfil: string) => {
    setPerfilSelecionado(perfil);
    setLayoutFlex(true);
  }

  return (
    <div className={`${layoutFlex ? 'flex' : 'flex '} flex-row h-svh justify-center items-center`}>
      <div className={`${layoutFlex ? 'w-full' : ''}`}>
        <Profiles handleFormChange={handlePerfilChange} />
      </div>
      <div className={`${layoutFlex ? 'w-full' : ''}`}>
        {perfilSelecionado === 'nutricionista' && <NutriRegisterForm />}
        {perfilSelecionado === 'escola' && <SchoolRegisterForm />}
      </div>
    </div>
  );
}