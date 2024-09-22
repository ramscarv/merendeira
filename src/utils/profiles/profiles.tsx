'use client'
import React from 'react';
import Checkbox from '@/components/Checkbox';
import useChooseProfileController from './controller/chooseProfileController';

interface ProfilesProps {
    handleFormChange: (perfil: string) => void;
}

const Profiles: React.FC<ProfilesProps> = ({ handleFormChange }) => {
    const { perfil, handlePerfilChange } = useChooseProfileController();

    const handleChange = (newPerfil: string) => {
        handlePerfilChange(newPerfil);
        handleFormChange(newPerfil);
    };

    return (
        <section className="flex justify-center ">
            <div className="flex flex-col gap-y-8 text-center">
                <p className="text-2xl text-cor3">Escolha o tipo de perfil</p>

                {/**PERFIS */}
                <div className="text-center flex flex-row gap-x-14">

                    {/** PERFIL ESCOLA */}
                    <section id="schoolOption" className="bg-white w-36 p-5 rounded-lg relative">
                        <img className="m-auto" src="../../../svg/SchoolIcon.svg" alt="icone-escola" />
                        <div className="text-cor4 text-center font-bold mt-1">
                            <p>Escola</p>
                        </div>
                        <div className="absolute -bottom-6 right-0">
                            <Checkbox 
                                value="escola" 
                                onChange={() => handleChange('escola')} 
                                checked={perfil === "escola"} 
                            />
                        </div>
                    </section>

                    {/** PERFIL NUTRI */}
                    <section id="nutricionistaOption" className="bg-white w-36 p-5 rounded-lg relative">
                        <img className="m-auto" src="../../../svg/NutriIcon.svg" alt="icone-nutricionista" />
                        <div className="text-cor4 text-center font-bold mt-1">
                            <p>Nutricionista</p>
                        </div>
                        <div className="absolute -bottom-6 right-0">
                            <Checkbox 
                                value="nutricionista" 
                                onChange={() => handleChange('nutricionista')} 
                                checked={perfil === "nutricionista"} 
                            />
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default Profiles;
