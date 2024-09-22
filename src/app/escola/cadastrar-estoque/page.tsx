import MenuEscola from "@/components/MenuEscola";
import CadastrarIngredientesForm from "@/utils/forms/cadastrar-estoque/cadastrarIngredientesForm";

export default function cadastrarProdutos() {
    return (
        <div>
            <title>Cantina Tech | Cadastrar produtos</title>
            <div className="flex flex-row">
                <section>
                    <MenuEscola />
                </section>
                <section className="w-full">
                    <CadastrarIngredientesForm />
                </section>
            </div>
        </div>
    )
}