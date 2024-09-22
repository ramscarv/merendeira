import React, { useState } from 'react'; // Importe useState do 'react' aqui

interface ChooseProfileController {
  perfil: string | null;
  handlePerfilChange: (novoPerfil: string) => void;
  handleFormChange:(novoPerfil: string) => void;
}

const useChooseProfileController = (): ChooseProfileController => {
  const [perfil, setPerfil] = useState<string | null>(() => {
    // Tenta obter o perfil armazenado na sessão
    if (typeof window !== 'undefined') {
      const perfilSelecionado = sessionStorage.getItem('perfilSelecionado');
      // Retorna o perfil armazenado, se existir, caso contrário, retorna null
      return perfilSelecionado ? perfilSelecionado : null;
    }
    return null;
  });

  const handlePerfilChange = (novoPerfil: string) => {
    setPerfil(novoPerfil);
    // Armazena o novo perfil na sessão, se window estiver definido (ou seja, no navegador)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('perfilSelecionado', novoPerfil);
    }
  };

  const handleFormChange = handlePerfilChange;

  return {
    perfil: perfil || '',
    handlePerfilChange,
    handleFormChange
  };
};

export default useChooseProfileController;