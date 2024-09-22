import { NextRequest, NextResponse } from "next/server";
import nutriMealModel from "@/models/refeicoes/nutriMealModel";

export async function POST(request: NextRequest) {
    try {
        const { nomeRefeicao, descricaoPreparo, ingredientes } = await request.json();

        // Verifique se os ingredientes são um array
        if (!Array.isArray(ingredientes)) {
            throw new Error("Os ingredientes devem ser fornecidos como um array.");
        }

        // Verifique se cada ingrediente tem os campos necessários
        ingredientes.forEach(item => {
            if (!item.nomeIngrediente || !item.quantidade) {
                throw new Error("Cada ingrediente deve ter um nome e uma quantidade.");
            }
        });

        // Crie um novo registro de refeição
        const novaRefeicao = new nutriMealModel({
            nome: nomeRefeicao,
            descricao: descricaoPreparo,
            ingredientes: ingredientes // Aqui você substitui os ingredientes da refeição pelos que estão sendo recebidos
        });
        
        // Salve a nova refeição no banco de dados
        const refeicaoRegistrada = await novaRefeicao.save();

        return NextResponse.json({
            message: "Refeição cadastrada com sucesso",
            success: true,
            refeicaoRegistrada
        });
    } catch (error) {
        console.error("Erro ao cadastrar refeição:", error);
        return NextResponse.json({ error: "Erro ao cadastrar refeição" }, { status: 500 });
    }
}