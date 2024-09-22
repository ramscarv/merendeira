import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import axios from "axios";

interface LoginFormData {
    email: string;
    password: string;
}

const useLoginFormController = () => {
    const router = useRouter();
    const [user, setUser] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const perfilRoutes: { [key: string]: string } = {
        nutricionista: "/nutricionista/",
        escola: "/escola/",
    };

    const updateUser = (fieldName: string, value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [fieldName]: value,
        }));
    };

    const onLogin = async () => {
        try {
            setLoading(true);
            const perfilSelecionado = sessionStorage.getItem("perfilSelecionado");
            const response = await axios.post("/api/users/login", { email: user.email, password: user.password, perfilSelecionado });
            console.log("Login success");

            // Redireciona com base no perfil do usuário
            const route = perfilSelecionado && perfilSelecionado in perfilRoutes ? perfilRoutes[perfilSelecionado] : "/home";
            router.push(route);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro...",
                text: "Login falhou, verifique os campos preenchidos e o perfil selecionado",
              });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const { email, password } = user;
        if (email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [user]);

    return {
        user,
        updateUser,
        loading,
        perfilRoutes,
        formValid,
        onLogin,
    };
};

export default useLoginFormController;