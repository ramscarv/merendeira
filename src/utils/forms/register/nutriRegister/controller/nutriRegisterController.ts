import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter em vez de next/navigation
import axios from "axios";
import Swal from "sweetalert2";

interface NutriFormData {
    profile: string;
    nome: string;
    cpf: string;
    email: string;
    password: string;
}

const useNutriRegisterController = () => {

    const router = useRouter();

    const [nutri, setNutri] = useState<NutriFormData>({
        profile: "nutricionista",
        nome: "",
        cpf: "",
        email: "",
        password: "",
    });

    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNutri({ ...nutri, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("./api/users/nutriRegister", nutri);
            Swal.fire({
                icon: "success",
                title: "Cadastrado com sucesso!",
                showConfirmButton: false,
                timer: 2000
              });
            router.push("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Falha ao cadastrar",
              });
        } finally {
            setLoading(false);
        }
    };

    // Verifica se o formulário é válido
    useEffect(() => {
        const { nome, email, cpf, password } = nutri;
        if (nome && email && cpf && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [nutri]);

    return { nutri, loading, formValid, handleInputChange, handleSubmit };
};

export default useNutriRegisterController;