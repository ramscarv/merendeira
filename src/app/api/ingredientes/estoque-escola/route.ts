import { NextRequest, NextResponse } from "next/server";
import Ingrediente from "@/models/ingredientes/ingredientesModel";
import { getDataFromToken } from "../../../../../helpers/getDataFromToken";
import schoolModel from "@/models/users/schoolModel";
import { connect } from "../../../../../db";

export async function GET(request: NextRequest) {
    try {
        await connect();
        // Obtendo o ID do usuário do token
        const userId = await getDataFromToken(request);

        // Buscando a escola associada ao usuário logado
        const schoolObj = await schoolModel.findOne({ _id: userId });

        if (!schoolObj) {
            console.error("Escola não encontrada para o usuário:", userId);
            return NextResponse.json({ error: "Escola não encontrada" }, { status: 400 });
        }

        // Buscando os ingredientes associados à escola
        const ingredientes = await Ingrediente.find({ school: schoolObj._id });

        return NextResponse.json({
            message: "Ingredientes recuperados com sucesso",
            data: ingredientes
        });
    } catch (error) {
        console.error("Erro ao recuperar ingredientes:", error);
        return NextResponse.json({ error: "Erro ao recuperar ingredientes" }, { status: 500 });
    }
}

