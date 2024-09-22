import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../../../helpers/getDataFromToken";
import schoolModel from "@/models/users/schoolModel";
import schoolMealModel from "@/models/refeicoes/schoolMealModel";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userId = getDataFromToken(request);

        const schoolObj = await schoolModel.findOne({ _id: userId });
        if (!schoolObj) {
            return NextResponse.json({ error: "Escola não encontrada" }, { status: 400 });
        }

        const {
            nomeRefeicao, 
            quantidadeAlunos, 
            turnoRefeicao, 
            descricaoPreparo, 
            ingredientes = [], 
            ingredientesAdicionados = [], 
            padraoMantido, 
            observacao
        } = reqBody;

        if (!Array.isArray(ingredientes) || !Array.isArray(ingredientesAdicionados)) {
            return NextResponse.json({ error: "Os ingredientes e ingredientes adicionados devem ser fornecidos como arrays." }, { status: 400 });
        }

        const novaRefeicao = new schoolMealModel({
            nome: nomeRefeicao,
            turno: turnoRefeicao,
            quantidadeAlunos: quantidadeAlunos,
            descricao: descricaoPreparo,
            ingredientes: ingredientes,
            ingredientesAdicionados: ingredientesAdicionados,
            padraoMantido: padraoMantido,
            observacao: observacao,
            school: schoolObj._id
        });

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
