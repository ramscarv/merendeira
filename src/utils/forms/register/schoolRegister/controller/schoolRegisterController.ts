import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SchoolFormData {
    profile: string;
    nome: string;
    email: string;
    cnpj: string;
    password: string;
    solicitation: string;
}

const useSchoolRegisterController = () => {
    const router = useRouter();
    const [school, setSchool] = useState<SchoolFormData>({
        profile: "school", 
        nome: "",
        email: "",
        cnpj: "",
        password: "",
        solicitation: "pendente"
    });
    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSchool({ ...school, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/schoolRegister", school);
            console.log("Cadastro feito com sucesso", response.data);
            alert('Cadastro realizado.');
            router.push("/");
        } catch (error) {
            console.log('Cadastro falhou.', error);
            alert('Cadastro falhou.');
        } finally {
            setLoading(false);
        }
    };

    // Verifica se o formulário é válido
    useEffect(() => {
        const { nome, email, cnpj, password } = school;
        if (nome && email && cnpj && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [school]);

    return { school, loading, formValid, handleInputChange, handleSubmit };
};

export default useSchoolRegisterController;